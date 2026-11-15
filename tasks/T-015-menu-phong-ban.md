# T-015: Menu phòng ban
- Repo: Hermes Clip. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Menu Tổng quan; Nghiên cứu: Săn sản phẩm, Đối thủ & video; Sản phẩm; Sản xuất: Khung content, Tạo media, Tín hiệu & Phòng chờ, Thư viện; Phát hành: Instagram, Trang giới thiệu; Số liệu: Số liệu, Quyết định; Nhà cung cấp AI, Cài đặt, Hướng dẫn. Giữ mọi view ID/alias. Mục chưa có màn ẩn. Bỏ bộ đếm Hôm nay n/3 khỏi menu sản phẩm; màn có danh sách đủ, lọc ngày và tìm kiếm.
## Bố cục
Nhóm menu gọn ở 1366, không phải cuộn; giữ theme/font. Chụp 1366/1920.
## Tiêu chí đạt
- [ ] Mọi URL view cũ vẫn mở đúng màn; gộp media và provider vẫn truy cập tính năng cũ.
- [ ] 1366 menu không tràn cuộn; danh sách sản phẩm không bị giới hạn 3.
- [ ] Full suite, review, commit đúng path, STATUS/nhả khóa.
## Kiểm / báo cáo
Test URL và ảnh; pnpm typecheck/test/test:api/test:desktop với FFmpeg. local:build theo lịch. ops/office/reports/T-015.md; REVIEW-T-015.md.
