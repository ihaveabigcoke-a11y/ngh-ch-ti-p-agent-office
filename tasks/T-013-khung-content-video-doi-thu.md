# T-013: Khung content và video đối thủ
- Repo: Hermes Clip. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Đổi nhãn Kịch bản/Mẫu kịch bản thành Khung content trên UI, giữ view ID. Product thêm optional competitorVideos tối đa 20: HTTPS, platform, competitor/note/referenceId nullable. Thêm/sửa/xóa link; không tải, không iframe. Nối phân tích rea-video có sẵn và nút Dùng làm khung content mang sản phẩm + mẫu.
## Bố cục
Khối Video đối thủ trong hồ sơ sản phẩm, link tab mới và thông tin shot/cắt/phút/chữ đè khi có referenceId. Giữ theme/font; ảnh 1366/1920.
## Tiêu chí đạt
- [ ] Reject HTTP/credentials/URL lỗi, 21 mục; dữ liệu cũ parse.
- [ ] CRUD link và navigation truyền đúng sản phẩm/mẫu; nhãn tiếng Việt.
- [ ] Full suite, ảnh, tự review Office mode, commit đúng path, STATUS và nhả khóa.
## Kiểm / báo cáo
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop với FFmpeg PATH. local:build mỗi hai việc. ops/office/reports/T-013.md; REVIEW-T-013.md.
