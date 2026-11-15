# T-044: Khung cuối hook khớp khung đầu của thân (ý "ảnh đầu–cuối / nối cảnh" của Meosu)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn ý: học từ 2 video hướng dẫn công cụ Meosu (D:/hermes-wt/meosu-frames/PHAN-TICH-VIDEO.md), Opus xếp hạng. **Chỉ lấy ý UX/prompt, KHÔNG đọc/chạy/sao chép mã Meosu** (thư mục Meosu có mã độc).
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi giữ bật nhưng không gửi video; mọi prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND` (khoá, không sửa được); không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu, không đổi font/theme. Chạy sau việc trước (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh chụp 1366 và 1920 cho việc giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx: đã làm (SHA) · đã kiểm · chưa kiểm · Cần anh chốt.

## Việc
1. Trong prompt body mỗi hook (`desktop/src/muse-bundle.mjs`, `manual-media.mjs`), thêm **một dòng tiếng Anh** mô tả khung cuối của hook trùng khung mở đầu của đoạn thân (nối mượt), giữ nguyên mô tả cảnh đã duyệt và `MUSE_VIDEO_COMMAND`. **Chỉ đổi nội dung prompt**, không đổi đường gửi/worker.
2. Đo (đúng **3 lượt gửi** thật, Cho/Duc/Chim song song, VPN bật): dựng 3 MP4, so khung ở chỗ nối hook→thân (hash cảm quan 32×32 như T-036 hoặc mắt) so với bản trước; ghi số và ảnh vào `D:/hermes-wt/artifacts/T-044/progress.md`. Tổng bấm→3 MP4 không được tệ hơn T-041/T-038 quá 3 s.
## Tiêu chí đạt
- [ ] Snapshot prompt đúng (đúng 1 lần `MUSE_VIDEO_COMMAND`, 1 dòng khung cuối); test đạt; 3 MP4 sha256 khác nhau; công tắc không đổi.
