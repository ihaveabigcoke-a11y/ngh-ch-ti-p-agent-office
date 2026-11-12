# T-002: Tạm dừng Muse và thêm nhà cung cấp media `manual`

- **Repo:** hermes-clip, **sửa thẳng trong thư mục app chính** (tag `before-T-xxx`), không clone, không worktree · **Worker:** codex, effort high · **Ngày:** 12/11/2026

## Mục tiêu
Tài khoản Muse đã bị khoá ngày 12/11/2026. App phải tiếp tục làm video mà **không gửi gì tới Muse**. Ảnh và video sẽ do người dùng tự tạo trên Google Flow/Gemini (hoặc Grok), app lo phần còn lại: gói prompt và tự nhập file vào đúng cảnh.

## Bối cảnh trong code
- Muse: `desktop/src/muse.mjs`, `muse-chat.mjs`, `muse-quota.mjs`, `touch-vpn.mjs`, `worker.mjs`, `lib/lab/muse-connection.ts`, `lib/lab/muse-workflows.ts`.
- Interface nhà cung cấp: `lib/lab/provider.ts` (`GenerationAdapter`, `disconnectedAdapter`).
- Đọc `ops/night/out/CHANGES*.md` trước để không làm trùng việc T01–T27.

## Phạm vi
1. **Công tắc "Tạm dừng Muse"**, mặc định **BẬT tạm dừng**. Lưu trong cài đặt của desktop.
   - Khi tạm dừng: worker không mở profile Muse, không gửi chat, research hay media; nút liên quan hiện trạng thái "Muse đang tạm dừng".
   - **Không** xoá profile, phiên đăng nhập, job hay receipt cũ của Muse.
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

## Không làm
- Không tự động hoá Flow, Gemini web hay Muse bằng trình duyệt.
- Không gọi API trả phí.
- Không xoá dữ liệu Muse.

## Tiêu chí đạt
- [ ] Muse tạm dừng thì không có request nào tới Muse. Có test bằng fixture đếm số lần gọi.
- [ ] Gói prompt có đúng cấu trúc thư mục trên. Có test.
- [ ] Thả file `<MÃ-CẢNH>-x.mp4` vào hộp thì file vào đúng cảnh. Thả lại đúng file đó thì không nhập trùng. File sai mã thì vào "Chưa gắn cảnh". Có test với MP4 thật tạo bằng FFmpeg.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop`, `pnpm build` đều đạt.
- [ ] Ảnh chụp màn **Tạo video** ở 1366 px và 1920 px, đính vào PR.

## Báo cáo (trong mô tả PR)
Đã thay đổi · Đã kiểm (lệnh và kết quả, ảnh) · Chưa kiểm (ví dụ: chưa thử file tải thật từ Flow) · Cách chạy thử.
