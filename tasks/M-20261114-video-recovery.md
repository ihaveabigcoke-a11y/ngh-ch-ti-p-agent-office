# M-20261114-video-recovery: Video trống sau khi Muse không trả media

- Repo: app Hermes Clip hiện tại, nhánh main; một main Codex, 14/11/2026.
- Người giao: người dùng yêu cầu sửa ảnh màn Video trống.

## Mục tiêu và phạm vi
Sửa chặn xuất gói cùng phút, hiện clip/bản xuất của mọi dự án thuộc sản phẩm, và lý do cùng bước tiếp theo khi chưa có video mới. Giữ theme/font, media, receipt, phiên và giới hạn dịch vụ; không gửi lại Muse hoặc tự gắn clip cũ vào cảnh mới. Không push/merge trong việc sửa này.

## Bố cục
Màn Video: trạng thái/lý do và liên kết Tài khoản/Tín hiệu; gói prompt và Hộp nhận ở phần chờ file; thư viện sản phẩm có tên dự án nguồn, bản xuất trước ghi rõ. Kiểm 1366×768 và 1920×1080.

## Tiêu chí đạt
- [x] Xuất lại cùng phút và cùng sản phẩm qua dự án khác thành công, không ghi đè gói cũ.
- [x] Clip/bản xuất cũ xuất hiện đúng sản phẩm; không bị tính là clip mới của timeline.
- [x] MUSE_NO_MEDIA và kết quả chưa rõ có lý do/bước tiếp theo, không tự gửi lại.
- [x] Trạng thái/đường dẫn gói giữ sau tải lại; đổi sản phẩm không mang thông báo của sản phẩm trước.
- [x] Test riêng, typecheck/domain/API/desktop, ảnh hai khổ, tự review hermes-night-review Office mode.
- [x] Commit đúng path; local:build khi app tắt/cây sạch; kiểm bản build và cập nhật STATUS, nhả khóa.

## Chưa kiểm
Quyền tạo video trên dịch vụ Muse, clip mới và chất lượng SKU không được suy ra từ fixture.
