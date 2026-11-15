# T-043: Hàng đợi có lọc/tìm/đếm + dòng xem trước trước khi bấm "Làm video"

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn ý: học từ 2 video hướng dẫn công cụ Meosu (D:/hermes-wt/meosu-frames/PHAN-TICH-VIDEO.md), Opus xếp hạng. **Chỉ lấy ý UX/prompt, KHÔNG đọc/chạy/sao chép mã Meosu** (thư mục Meosu có mã độc).
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi giữ bật nhưng không gửi video; mọi prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND` (khoá, không sửa được); không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu, không đổi font/theme. Chạy sau việc trước (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh chụp 1366 và 1920 cho việc giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx: đã làm (SHA) · đã kiểm · chưa kiểm · Cần anh chốt.

## Việc
1. **Hàng đợi:** tab Tất cả / Đang chạy / Lỗi / Xong có bộ đếm; ô tìm theo nội dung prompt hoặc mã `#N`; mỗi việc có **lý do lỗi một dòng** (nguyên văn rút gọn, không token/URL ký). Kiểm trước xem đã có tới đâu (production.tsx, worker); chỉ làm phần thiếu.
2. **Xem trước trước khi bấm:** dòng như "3 hook → Cho / Duc / Chim, dự kiến ~85 s" (số dự kiến lấy từ thời gian đo gần nhất trong app, nếu chưa có thì ẩn ước lượng, **không bịa số**); danh sách hồ sơ sẽ dùng lấy từ trạng thái thật (Chi không có trong danh sách khi dừng gửi video).
## Tiêu chí đạt
- [ ] Test: lọc/tìm/đếm đúng trên dữ liệu mẫu; dòng xem trước khớp số hồ sơ gửi được và số thẻ; không số 0 giả (chưa biết = ẩn hoặc "chưa có số đo").
- [ ] Ảnh 1366/1920. Không gửi Muse thật.
