# T-005: Chọn 3 sản phẩm xong thì tự triển khai, không làm tay

- **Repo / tầng:** hermes-clip, **sửa thẳng trong thư mục app chính** (tag `before-T-005`). **Tắt app Hermes Clip trước khi sửa.**
- **Người giao:** boss phụ viết, boss chính giao · **Worker:** codex, effort high · **Ngày:** 12/11/2026
- **Mức:** Vừa, chặn luồng chính. Người dùng đang kẹt ngay bây giờ.

## Mục tiêu
Người dùng đã chọn 3/3 ứng viên ở màn **Nghiên cứu**, nhưng app báo lỗi và không tạo được hồ sơ sản phẩm. App cũng không có bước tiếp theo. Người dùng muốn **tự động**: chọn xong 3 sản phẩm thì app tự tạo hồ sơ và dẫn sang làm video, không phải bấm từng dòng.

Lời người dùng, nguyên văn: "APP THIẾU NÚT HOÀN TẤT CHỌN TỔNG, và nút chuyển sang bước tiếp theo. TÔI MUỐN NÓ TỰ ĐỘNG".

## Nguyên nhân đã tìm ra (boss phụ, tái hiện bằng fixture, không đọc dữ liệu thật)
Bấm "Hoàn tất chọn" thì app báo: *"Đã chọn; chưa xác nhận hồ sơ… Kiểm tra các trường được đánh dấu."* Đây là lỗi 422 từ `parsed('product', …)` trong `app/api/lab/route.ts`.

`productFromCandidate` (`lib/lab/domain.ts:223`) chép thẳng các trường dài của ứng viên sang hồ sơ sản phẩm, nhưng giới hạn của hai bên **lệch nhau**:

| Trường hồ sơ sản phẩm | Giới hạn | Lấy từ ứng viên | Giới hạn ứng viên |
|---|---|---|---|
| `proofNotes` | 2000 | `evidenceNotes` + `"\n"` + `risks` | 3000 + … |
| `problem` | 1000 | `contentAngle` | 2000 |

Muse viết ghi chú dài, nên vượt giới hạn. Tái hiện: `evidenceNotes` 1500 + `risks` 800 + `contentAngle` 1200 → batch hợp lệ, nhưng `schemas.product.safeParse` báo lỗi ở `problem` (max 1000) và `proofNotes` (max 2000).

## Phạm vi
1. **Sửa lỗi tạo hồ sơ.** Hồ sơ sản phẩm phải tạo được với **mọi** ứng viên hợp lệ trong batch.
   - Ưu tiên: `productFromCandidate` cắt gọn có đánh dấu, ví dụ `…[đã rút gọn, xem đầy đủ ở ứng viên research]`. Bản đầy đủ vẫn nằm trong ứng viên (`researchOrigin` trỏ về), **không mất dữ liệu**.
   - Hoặc nâng giới hạn trong `schemas.product` cho khớp, nếu không vỡ chỗ nào khác (form sửa hồ sơ, xuất, test).
   - Hồ sơ đã có thì không đụng.
2. **Tự động tạo hồ sơ.**
   - Tick chọn thì vẫn promote như hiện tại.
   - Nếu promote lỗi: hiện lỗi **cụ thể theo trường** (nói rõ trường nào), không chỉ câu "Kiểm tra các trường được đánh dấu".
   - Khi mở màn Nghiên cứu, hoặc tải lại dữ liệu: ứng viên nào đã chọn mà chưa có hồ sơ thì app **tự thử promote lại**. Mỗi lần mở màn chỉ thử 1 lượt; an toàn vì API dedupe `promote`.
3. **Nút tổng "Hoàn tất tạo hồ sơ"** trên thanh "Chọn 3 sản phẩm để thử" (`components/lab/research-candidates.tsx:43`). Chỉ hiện khi còn ứng viên đã chọn mà chưa có hồ sơ; bấm một lần là chạy cho tất cả. Nút "Hoàn tất chọn" trên từng dòng vẫn giữ.
4. **Nút bước tiếp "Triển khai N sản phẩm"** (N = số đã chọn và đã có hồ sơ), cũng trên thanh đó, nút chính màu lime. Bấm thì:
   - tạo **dự án video nháp** cho mỗi sản phẩm chưa có dự án (dùng đúng cách tạo dự án sẵn có, action `create` của `/api/production`, có chống tạo trùng theo sản phẩm);
   - chuyển sang màn **Tạo video**, mở dự án của sản phẩm đầu tiên;
   - hiện thông báo "Đã tạo N dự án video. Bước tiếp: viết cảnh → duyệt → Xuất gói prompt cho Flow/Gemini".
   - **Không** gửi gì tới Muse, Flow hay Gemini. **Không** gọi dịch vụ trả phí. Nhà cung cấp media của dự án theo quy tắc tự chuyển hiện có (Muse đang tạm dừng thì là `manual`).
5. **Đổi nhãn** "Nhà cung cấp: muse" dưới mỗi ứng viên thành "Nguồn research: Muse", để khỏi nhầm với nhà cung cấp hàng.

**Không làm:**
- không đổi dữ liệu ứng viên, không tự chọn hay bỏ chọn thay người dùng;
- không tự đăng Instagram, không gọi Muse;
- không đụng AppData hay SQLite thật.

## Bố cục giao diện
```
┌ Chọn 3 sản phẩm để thử ─────────────────────────────── [Tất cả 10] [Đã chọn 3/3] ┐
│ Tên 3 sản phẩm…                                                                    │
│ ⚠ 3 sản phẩm chưa tạo hồ sơ: <lỗi theo trường nếu có>   [Hoàn tất tạo hồ sơ]       │ ← chỉ hiện khi thiếu
│ ✓ 3/3 hồ sơ sẵn sàng                                    [Triển khai 3 sản phẩm →]  │ ← nút chính lime
└────────────────────────────────────────────────────────────────────────────────────┘
```
Nhãn tiếng Việt có dấu, giữ theme graphite–lime. Chụp ảnh ở **1366 px và 1920 px**, gồm cả trạng thái "thiếu hồ sơ" và trạng thái "sẵn sàng".

## Tiêu chí đạt
- [ ] Test: ứng viên có `evidenceNotes` 1500 + `risks` 800 + `contentAngle` 1200 → promote thành công, hồ sơ có ghi chú đã rút gọn kèm đánh dấu, ứng viên giữ nguyên bản đầy đủ.
- [ ] Test: batch có 3 ứng viên đã chọn mà thiếu hồ sơ → mở màn thì tự promote; bấm "Hoàn tất tạo hồ sơ" tạo đủ 3; bấm lần 2 không tạo trùng.
- [ ] Test: "Triển khai 3 sản phẩm" tạo đúng 3 dự án video nháp; bấm lại thì không tạo thêm; 0 request tới Muse.
- [ ] Lỗi promote hiện tên trường cụ thể.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop` đạt; `pnpm local:build` đạt **khi app đang tắt**.

## Cách kiểm
```
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build
```

## Báo cáo
Đã thay đổi · Đã kiểm (lệnh, kết quả, ảnh) · Chưa kiểm (dữ liệu thật của người dùng: 3 ứng viên đợt "10 sản phẩm · 17:49:44 12/11/2026") · Cách chạy thử.
