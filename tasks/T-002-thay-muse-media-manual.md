# T-002: Tạm dừng Muse và thêm nhà cung cấp media `manual`

- **Repo:** hermes-clip, **sửa thẳng trong thư mục app chính** (tag `before-T-xxx`), không clone, không worktree · **Worker:** codex, effort high · **Ngày:** 12/11/2026

## Mục tiêu
Tài khoản Muse đã bị khoá ngày 12/11/2026. App phải tiếp tục làm video mà **không gửi gì tới Muse**. Ảnh và video sẽ do người dùng tự tạo trên Google Flow/Gemini (hoặc Grok), app lo phần còn lại: gói prompt và tự nhập file vào đúng cảnh.

## Bối cảnh trong code
- Muse: `desktop/src/muse.mjs`, `muse-chat.mjs`, `muse-quota.mjs`, `touch-vpn.mjs`, `worker.mjs`, `lib/lab/muse-connection.ts`, `lib/lab/muse-workflows.ts`.
- Interface nhà cung cấp: `lib/lab/provider.ts` (`GenerationAdapter`, `disconnectedAdapter`).
- Đọc `ops/night/out/CHANGES*.md` trước để không làm trùng việc T01–T27.

## Phạm vi
1. **Công tắc "Muse: Bật / Tạm dừng"**, mặc định **Tạm dừng**. Lưu trong cài đặt của desktop, giữ nguyên sau khi khởi động lại.
   - **GIỮ NGUYÊN TOÀN BỘ MUSE** (yêu cầu của người dùng): không xoá hay vô hiệu hoá vĩnh viễn code Muse, màn Chat Muse, quản lý tài khoản, quota, VPN, profile, phiên đăng nhập, job hay receipt. Công tắc chỉ chặn việc **gửi tác vụ mới**.
   - **Vị trí nút:** một nút gạt dễ thấy ở đầu màn **Tài khoản Muse**, kèm một nút gạt giống hệt ở **Cài đặt**. Hai nút luôn đồng bộ. Trên thanh trạng thái hoặc thẻ kết nối Muse (`lib/lab/muse-connection.ts`) hiện rõ "Muse: đang tạm dừng" hoặc "Muse: đang bật".
   - **Tạm dừng:** worker không mở profile Muse, không gửi chat, research hay media. Nút liên quan bị mờ, kèm chú thích "Muse đang tạm dừng, bật lại ở Tài khoản Muse". Job đang chạy dở **không bị huỷ**, chỉ không nhận job mới.
   - **Bật lại:** mọi luồng Muse cũ chạy lại y như trước T-002. Có test chứng minh: bật lại thì đúng luồng gửi Muse cũ được gọi (dùng fixture, không gọi Muse thật). Nhà cung cấp `muse` trong mục 2 mở khoá.
   - Khi người dùng bật, hiện một dòng nhắc trong hộp xác nhận: "Muse chạy bằng trình duyệt tự động; tài khoản có thể bị khoá. Bật?"
2. **Tầng nhà cung cấp media:** chọn nhà cung cấp cho từng cảnh hoặc cho cả dự án. Có 4 lựa chọn:
   - `manual` (mặc định);
   - `muse` (bị khoá khi đang tạm dừng);
   - `grok-cli` (tắt, ghi "chưa kiểm");
   - `fal` (tắt, ghi "trả phí, phải báo giá trước").
3. **`manual`, phần xuất gói prompt.** Với các cảnh đã duyệt, nút **"Xuất gói prompt"** tạo thư mục `exports/prompt-packs/<mã-sản-phẩm>-<yyyyMMdd-HHmm>/` gồm:
   - `README-VI.txt`: hướng dẫn dán vào Flow/Gemini từng bước;
   - mỗi cảnh một file `<MÃ-CẢNH>.txt`: prompt tiếng Anh, tỉ lệ 9:16, 8 giây, ghi chú ảnh tham chiếu;
   - ảnh tham chiếu đi kèm, đặt tên `<MÃ-CẢNH>-ref-<n>.<ext>`.
4. **`manual`, phần tự nhập file.** Một thư mục "Hộp nhận media" (đường dẫn cấu hình được). App theo dõi thư mục này. File có tên chứa `<MÃ-CẢNH>`, ví dụ `P12-S03-take2.mp4`, sẽ được:
   - kiểm bằng ffprobe: là video hoặc ảnh, đọc tỉ lệ và thời lượng; sai 9:16 thì cảnh báo, không chặn;
   - tính checksum và nhập vào đúng cảnh như một phiên bản mới, có receipt;
   - giữ nguyên file gốc, chống nhập trùng theo checksum.

   File không khớp mã cảnh nào thì vào mục "Chưa gắn cảnh" để người dùng gắn tay.
5. **Giao diện.**
   - Trong màn **Tạo video**, mỗi cảnh hiện nhà cung cấp và trạng thái: *Chờ xuất prompt / Đã xuất / Chờ file / Đã nhận*.
   - Nút **Xuất gói prompt** và **Mở hộp nhận media** đặt ở thanh hành động trên cùng của màn đó.
   - Nhãn tiếng Việt có dấu. Giữ font và theme graphite–lime.

## Quy tắc tự chuyển Muse ↔ worker khác (áp dụng cho T-002 và T-003)
- **Muse sẵn sàng** khi: nút Muse đang **Bật**, có profile đã đăng nhập, và còn hạn mức. Đúng logic `ready` hiện có trong `lib/lab/muse-connection.ts`.
- Muse sẵn sàng thì app **mặc định dùng Muse** cho research, nội dung và media, y như trước.
- Muse **không** sẵn sàng (tạm dừng, chưa đăng nhập, hết hạn mức, lỗi phiên) thì app **tự quay về**:
  - research và nội dung đi qua Codex hoặc nhập JSON (T-003);
  - media đi qua nhà cung cấp `manual`, tức gói prompt cho Flow/Gemini (T-002).
- Mỗi tác vụ ghi rõ nó đã chạy bằng nhà cung cấp nào. Người dùng vẫn chọn tay được cho từng cảnh nếu muốn.
- Không tự gửi lại job Muse có kết quả chưa rõ sang nhà cung cấp khác; phải đối soát trước.

## Không làm
- Không tự động hoá Flow, Gemini web hay Muse bằng trình duyệt.
- Không gọi API trả phí.
- Không xoá dữ liệu Muse.

## Tiêu chí đạt
- [ ] Muse tạm dừng thì không có request nào tới Muse; bật lại thì luồng Muse cũ chạy như trước. Có test cho cả hai chiều, dùng fixture đếm số lần gọi.
- [ ] Không file, bảng hay màn hình Muse nào bị xoá. `git diff --stat` không có file Muse nào bị xoá.
- [ ] Gói prompt có đúng cấu trúc thư mục trên. Có test.
- [ ] Thả file `<MÃ-CẢNH>-x.mp4` vào hộp thì file vào đúng cảnh. Thả lại đúng file đó thì không nhập trùng. File sai mã thì vào "Chưa gắn cảnh". Có test với MP4 thật tạo bằng FFmpeg.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop`, `pnpm local:build` đều đạt.
- [ ] Ảnh chụp màn **Tạo video** ở 1366 px và 1920 px, đính vào PR.

## Báo cáo (trong mô tả PR)
Đã thay đổi · Đã kiểm (lệnh và kết quả, ảnh) · Chưa kiểm (ví dụ: chưa thử file tải thật từ Flow) · Cách chạy thử.
