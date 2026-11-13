# T-024: Màn đầu có số liệu thật, giao diện gọn đẹp, luồng ít bước

- **Repo:** hermes-clip, sửa thẳng trong app chính `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` (tag `before-T-024`) · **Worker:** Codex (CODEX-BOSS, một agent) · **Ngày:** 13/11/2026
- **Luật:** theo mục "Luật cho cả đêm" trong `C:/Users/ADMIN/Downloads/CODEX-LAM-HET.md` (tag lùi, khoá file, test riêng, full suite, tự review, commit theo path, `pnpm local:build` khi app tắt, cập nhật STATUS của văn phòng `D:/agent-office/ngh-ch-ti-p-agent-office`). Cấm push, đăng bài, DM, dịch vụ trả phí, đụng AppData. **Muse giữ Tạm dừng, không gửi job.**

## Mục tiêu
Người dùng mở app sáng 13/11 và chê thẳng: "app bắt đầu rất tệ, không có số liệu, không đẹp, workflow chậm". Boss Claude xem ảnh `outputs/T-015-ui/menu-1366.png` và `outputs/T-022b-ui/results-empty-1366.png` và xác nhận. Việc này sửa **đúng 4 chỗ đó**, không thêm tính năng mới.

## Vấn đề cụ thể (đã thấy trên ảnh)
1. **Màn mở đầu không cho biết gì.** Không có con số nào về tình hình: bao nhiêu sản phẩm, clip, MP4, bài nháp, bài đã đăng, lượt xem. Người dùng không biết hôm nay phải làm gì.
2. **Màn Số liệu là một tờ khai 11 ô trống.** Ô "Thời điểm đo" bắt gõ ISO `2026-11-12T22:37:39.223Z`. Số liệu đã lưu bị giấu trong `<details>` cuối trang. Không có biểu đồ hay bảng nào.
3. **Thẻ sản phẩm toàn chữ độn.** 4 thẻ lặp y nguyên "Ghi vấn đề khách hàng để bắt đầu đánh giá sản phẩm", "Vốn chưa biết + ship chưa biết · 0 tài khoản", "Chưa biết", "Chưa đủ dữ liệu". Có nhãn lẫn tiếng Anh ("Biên trước acquisition"). Ảnh là hộp giấy mặc định, chiếm 1/3 thẻ. Chữ mono cho "Chưa biết" trông như lỗi.
4. **Quá nhiều chỗ phải bấm.** Menu có 16 mục. Từ "chọn sản phẩm" tới "có MP4" phải đi qua 5–6 màn và tự gõ từ khoá CTA, tình huống, tên hộp cho từng sản phẩm.

## Phạm vi
### A. Màn **Tổng quan** thành "Hôm nay" (màn mặc định khi mở app)
- **Hàng số liệu thật** (đếm từ record có sẵn, không bịa): Sản phẩm đang làm · Clip đã nhận · MP4 đã xuất · Bài nháp · Bài đã đăng · Lượt xem 7 ngày · Comment đúng từ khoá 7 ngày · Click UTM 7 ngày. Số đếm được thì hiện số (kể cả 0 thật). Số đo từ Instagram chưa có thì hiện "—" kèm chú thích nhỏ "chưa nhập số", **không** hiện 0.
- **Bảng "Việc hôm nay"**: mỗi sản phẩm đang làm một dòng: ảnh nhỏ, tên, thanh tiến độ 10 bước (dùng `product-next-step` của T-020), và **một** nút chính lime dẫn thẳng tới bước tiếp theo. Sắp theo bước gần xong nhất trước.
- **Khối "Kết quả gần nhất"**: 5 bài đăng mới nhất có số liệu (lượt xem, comment từ khoá, click UTM, thời điểm đo). Chưa có bài nào thì hiện một câu và nút "Nhập số liệu".
- Không còn màn chào trống. Workspace trống hoàn toàn thì hiện đúng 1 nút "Săn 10 sản phẩm".

### B. Màn **Số liệu**: số trước, form sau
- Trên cùng: bảng các bài đã có số (sản phẩm, hook, tài khoản, lượt xem, like, comment, comment từ khoá, DM, click UTM, đơn, thời điểm đo), sắp xếp được theo cột. Kèm biểu đồ cột đơn giản so 3 hook của sản phẩm đang chọn (SVG tự vẽ, không thêm thư viện).
- Form nhập tay thu gọn sau nút "Nhập số liệu" (mở thành modal hoặc khối xổ ra). Ô thời điểm dùng `datetime-local`, mặc định là bây giờ theo giờ Việt Nam; lưu vẫn là ISO có múi giờ.
- "Dán CSV" là nút ngang hàng với "Nhập số liệu", không giấu trong `<details>`.

### C. Thẻ sản phẩm gọn và có thông tin
- Bỏ các câu độn lặp lại. Thẻ chỉ hiện: tên, trạng thái (1 badge), vốn + ship → giá bán (hoặc "Chưa có giá" một lần), bước tiếp theo (nút chính). Thiếu dữ liệu thì hiện **một** dòng "Thiếu: giá vốn, ship, từ khoá CTA…" liệt kê đúng thứ còn thiếu.
- Ảnh: có ảnh sản phẩm thì dùng, tỉ lệ cố định, cao tối đa 120 px. Không có ảnh thì dùng ô màu nền với chữ cái đầu tên, không dùng hộp giấy 3D.
- Việt hoá nốt nhãn còn tiếng Anh ("Biên trước acquisition" → "Biên lợi nhuận trước quảng cáo"). Không dùng font mono cho chữ thường.
- Ở 1366 px hiện được ≥ 6 thẻ không cuộn (lưới 3 cột, thẻ thấp hơn).

### D. Luồng nhanh hơn
- Nút **"Làm video cho sản phẩm này"** trên thẻ và hồ sơ sản phẩm: một modal duy nhất gom 4 ô bắt buộc của Khung content (từ khoá CTA, tình huống mở đầu, tên in trên hộp, chữ trên hộp), có **gợi ý điền sẵn** (CTA gợi ý từ nhóm khách/tên sản phẩm; tình huống lấy từ `situationExamples` của công thức; tên hộp gợi ý từ `brandName` nếu có). Người dùng sửa hoặc bấm "Dùng gợi ý", rồi app tự: tạo dự án (nếu chưa có) → sinh Khung content v2 → mở thẳng màn có nút "Xuất gói prompt". Không tự gửi Muse.
- Menu: gom còn tối đa **9 mục** hiện mặc định (Hôm nay · Săn sản phẩm · Sản phẩm · Làm video · Thư viện · Đăng bài · Số liệu · Quyết định · Cài đặt). Mục còn lại vào nhóm "Khác" thu gọn. Giữ mọi `?view=` cũ.

## Không làm
- Không thêm tính năng ngoài 4 mục trên. Không đổi schema ngoài trường optional. Không đổi theme graphite–lime hay font chính.
- Không hiện số 0 cho thứ chưa biết. Không có trường hay nhãn "AI".
- Không gửi Muse, không đăng bài, không gọi Meta.

## Tiêu chí đạt
- [ ] Fixture 3 sản phẩm ở 3 bước khác nhau + 2 bài có số: màn Hôm nay hiện đúng 8 con số, 3 dòng việc với đúng nút bước tiếp, 2 dòng kết quả. Test đếm số.
- [ ] Fixture trống: không có số 0 nào cho số đo; có đúng 1 nút hành động.
- [ ] Số liệu: bảng hiện trước form; `datetime-local` lưu ra ISO đúng múi giờ (test); biểu đồ 3 hook render với số null không vỡ.
- [ ] Thẻ sản phẩm: không còn 3 chuỗi độn nêu ở mục Vấn đề (test `doesNotMatch`); ở 1366×768 thấy ≥ 6 thẻ (script đo).
- [ ] "Làm video cho sản phẩm này": từ thẻ sản phẩm tới màn có nút "Xuất gói prompt" trong **≤ 3 lần bấm** với gợi ý điền sẵn (script UI đếm bước); 0 request tới Muse.
- [ ] Menu ≤ 9 mục mặc định ở 1366 px; mọi `?view=` cũ vẫn mở đúng màn.
- [ ] Full suite xanh; `pnpm local:build` đạt; ảnh 1366 và 1920 cho: Hôm nay (có dữ liệu + trống), Số liệu, Sản phẩm, modal Làm video.

## Báo cáo
Cập nhật STATUS mục "T-024": đã thay đổi · đã kiểm (số test, ảnh) · chưa kiểm · SHA · giờ build. Tin nhắn cuối là báo cáo ngắn bằng tiếng Việt.
