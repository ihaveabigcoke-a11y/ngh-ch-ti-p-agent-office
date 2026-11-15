# T-022: Review tổng, build cuối và báo cáo sáng
- Repo: Hermes Clip và tài liệu văn phòng. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Review diff a473b72..HEAD theo hermes-night-review Office mode. Sửa phát hiện bằng commit nhỏ đúng path. Cập nhật CLAUDE/docs/context/HANDOVER/BACKLOG; xóa mô tả snapshot ra repo ngoài, ghi Office trong app.
## Bố cục
Không đổi theme/font; nếu sửa UI chụp lại 1366/1920.
## Tiêu chí đạt
- [ ] Full suite cuối và local:build một lần trên cây sạch, app tắt.
- [ ] STATUS đầu “Sáng 13/11 — đọc cái này trước” tối đa 25 dòng, bảng Xong/Kẹt/Bỏ qua+SHA, tổng test, ảnh, Cần anh chốt (SAC/ngưỡng), Chưa kiểm.
- [ ] Muse gửi/thành công/lỗi, clip thật, MP4 thật+SHA256, trạng thái tài khoản cuối; không cookie/keys/proxy/DB.
- [ ] Không push/merge, không xóa media/receipt/phiên bản; không còn khóa của phiên.
## Kiểm / báo cáo
pnpm typecheck/test/test:api/test:desktop với FFmpeg; pnpm local:build. ops/office/reports/T-022.md; REVIEW-T-022.md.
