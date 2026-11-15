# T-019: Nhập số liệu tay nhanh
- Repo: Hermes Clip. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Form theo bài: views, likes, comments, saves, shares, keywordComments, DM, UTM clicks, orders, observedAt và nguồn. CSV/tab paste nhiều bài, xem trước rồi lưu; không gọi Meta.
## Bố cục
Form và bảng preview trong màn Số liệu; lỗi theo dòng/cột, không lưu khi có lỗi. Giữ theme/font, ảnh 1366/1920.
## Tiêu chí đạt
- [x] Trống=null, 0=0; tiêu đề Việt/Anh, số có phẩy nghìn; CSV quoted và TSV.
- [x] Dòng lỗi/ID không tồn tại/số âm/thời điểm sai hiển thị rõ, không lưu một phần.
- [x] Nguồn và observedAt giữ trên mỗi bản đo, không ghi đè lịch sử.
- [x] Full suite, review Office, commit đúng path, STATUS/nhả khóa.
## Kiểm / báo cáo
Test parser, transaction và UI; pnpm typecheck/test/test:api/test:desktop với FFmpeg. ops/office/reports/T-019.md; REVIEW-T-019.md.
