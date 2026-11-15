# T-018: So hook và quyết định sản phẩm
- Repo: Hermes Clip. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Bảng ba hook theo sản phẩm dùng bản đo mới nhất theo observedAt. Tỷ lệ comment từ khóa/view và UTM/view null nếu mẫu số null/0. Ngưỡng tăng sản lượng do người dùng đặt ở Cài đặt, mặc định null; không tự kết luận khi chưa đặt. Record quyết định đẩy/sửa/bỏ với lý do/thời điểm và lịch sử.
## Bố cục
Màn Số liệu bảng hook; màn Quyết định chọn sản phẩm, lý do, lịch sử. Nhãn tiếng Việt, giữ theme/font. Ảnh 1366/1920.
## Tiêu chí đạt
- [ ] Test chia null/0 và ngưỡng null, latest observedAt không theo thứ tự record.
- [ ] Không trộn lượt có CTA/giá/landing khác; unknown giữ null.
- [ ] Quyết định lưu append-only, thời điểm và lý do bắt buộc.
- [ ] Full suite, review Office, commit đúng path, STATUS/nhả khóa.
## Kiểm / báo cáo
pnpm typecheck/test/test:api/test:desktop với FFmpeg; build theo lịch. ops/office/reports/T-018.md; REVIEW-T-018.md.
