# T-050: Một nguồn sự thật cho trạng thái hàng đợi (hết "Đang chạy" ảo)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn: khảo sát thật một công cụ khác (D:/hermes-wt/meosu-frames/chatgpt-phan-tich/), Opus chốt. **Chỉ học ý, không dùng mã/thương hiệu/văn bản của họ.**
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu; không gửi Muse thật (Muse giả); không đổi luồng 3 video ngoài phạm vi. Chạy sau việc trước (không Codex khác, không khoá, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh 1366/1920 nếu có giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx.

## Vấn đề
Khảo sát thấy thẻ "Đang chạy/Đang gửi tới Muse" trong khi header "Đang nghỉ" và file đã có. Nếu Hermes bị tương tự, hàng đợi kẹt và "Tạo lại" có thể gửi Muse 2 lần (đốt lượt, tăng nguy cơ khoá).
## Việc
1. Đọc `store.mjs`, `worker.mjs`, `job-retry.mjs`, hàng đợi UI: **tìm chỗ trạng thái có thể lệch** (job running mà worker đã dừng/crash, đã có file kiểm sha nhưng chưa "Hoàn tất"). Báo kết quả vào STATUS: có/không có lỗi này.
2. Khi mở app và khi file được lưu: job "running" mà đã có output kiểm sha → "Hoàn tất"; quá timeout cấu hình không có nhịp báo → "Lỗi: mất dấu" (không tự gửi lại; chặn Tạo lại tới khi đối soát). UI chỉ đọc trạng thái từ store (header và từng thẻ khớp nhau).
3. Nếu đã có đối soát đầy đủ: thu nhỏ thành test hồi quy và ghi rõ.
## Tiêu chí đạt
- [ ] Test: tắt worker giữa chừng rồi mở lại → không còn "Đang chạy" ảo; header khớp từng thẻ; "Tạo lại" bị chặn với việc chưa đối soát; chạy lại test T-041/T-048 (mốc 85–100 s giữ nguyên); receipt cũ nguyên hash.
