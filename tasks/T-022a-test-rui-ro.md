# T-022a: Kiểm bổ sung render, matrix và CSV
- Repo Hermes; người giao người dùng (mục còn thời gian), một main Codex, 13/11.
## Phạm vi
Ca biên CSV multiline/BOM/CRLF/cùng thời điểm khác offset; matrix thiếu ô; replay import đồng thời; render plan chưa lưu và chữ ngoài timeline. Sửa lỗi trực tiếp nếu phát hiện, giữ assertion cũ.
## Tiêu chí / kiểm
- Test mới đo hành vi, không gọi dịch vụ hay dữ liệu thật; full suite với FFmpeg PATH.
- Giữ null/0, toàn lô/replay, không đổi theme/font; không UI mới nên không cần ảnh riêng.
- Review, commit đúng path, STATUS/nhả khóa; build theo lịch hai việc.
