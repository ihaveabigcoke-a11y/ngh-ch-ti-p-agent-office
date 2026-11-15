# T-042: Tạo lại hàng loạt việc lỗi + "Sửa & chạy lại" (ý hay của Meosu)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn ý: học từ 2 video hướng dẫn công cụ Meosu (D:/hermes-wt/meosu-frames/PHAN-TICH-VIDEO.md), Opus xếp hạng. **Chỉ lấy ý UX/prompt, KHÔNG đọc/chạy/sao chép mã Meosu** (thư mục Meosu có mã độc).
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi giữ bật nhưng không gửi video; mọi prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND` (khoá, không sửa được); không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu, không đổi font/theme. Chạy sau việc trước (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh chụp 1366 và 1920 cho việc giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx: đã làm (SHA) · đã kiểm · chưa kiểm · Cần anh chốt.

## Việc
1. **Tạo lại hàng loạt:** chọn nhiều việc `lỗi`/`đã dừng` trong Hàng đợi rồi bấm "Tạo lại" → mỗi việc thành **việc mới** có mã gốc (liên kết việc cũ), receipt cũ giữ nguyên, **không gửi lại lượt chưa đối soát** (cảnh báo/khoá nếu việc cũ chưa đối soát).
2. **Sửa & chạy lại:** sửa **chỉ phần mô tả cảnh** (body) ngay trên thẻ, câu `MUSE_VIDEO_COMMAND` hiện chỉ đọc; lưu thành việc mới.
3. Việc tạo lại tuân phanh: ≥ 60 s mỗi hồ sơ, không gửi tới Chi hay hồ sơ đang dừng gửi, giữ công tắc.
## Tiêu chí đạt
- [ ] Test (Muse giả): tạo lại N việc → N việc mới đúng mã gốc; prompt luôn bắt đầu bằng `MUSE_VIDEO_COMMAND` đúng 1 lần; không gửi Chi; việc chưa đối soát bị chặn; receipt cũ nguyên hash; công tắc không đổi.
- [ ] Ảnh 1366/1920 của Hàng đợi có nút mới. Không gửi Muse thật trong việc này.
