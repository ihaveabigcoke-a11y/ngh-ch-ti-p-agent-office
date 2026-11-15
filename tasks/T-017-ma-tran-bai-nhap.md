# T-017: Ma trận sản phẩm × hook × tài khoản × bài nháp

- **Repo / tầng:** Hermes Clip, domain/API/UI.
- **Người giao / Worker:** người dùng / một main Codex, 13/11/2026.

## Mục tiêu
Tạo ba bài nháp từ ba bản render hook chung thân, theo từng tài khoản được chọn. Ma trận cho thấy bài và số liệu, cảnh báo khi một bài đổi điều kiện so sánh.

## Phạm vi
- Làm: lib/lab/hook-matrix.ts, operations.ts; route lab; thành phần ma trận tích hợp màn sản xuất và Instagram; tests, script chụp fixture; báo cáo T-017.
- Không đăng, không gọi Meta, không tạo tài khoản hoặc giả link bán. Chưa chọn tài khoản có thể lưu ba draft chưa gán; UTM giữ null nếu thiếu thông tin.
- Dùng buildUtmLink hiện có; snapshot CTA/giá/tiền tệ/landing cho mỗi lượt. Tạo id ổn định để thao tác lặp không sinh bản sao. Dữ liệu cũ vẫn đọc.

## Giao diện
- Khối “Tạo 3 bài nháp” chọn các tài khoản đang có, CTA/landing; số bài dự kiến.
- Ma trận hàng hook, cột tài khoản; trạng thái, comment từ khóa, DM, share, UTM, đơn. Null hiện “Chưa biết”. Cảnh báo “lệch lượt so sánh”.
- Giữ theme/font, chụp 1366 và 1920.

## Tiêu chí đạt
- [ ] 1 sản phẩm × 3 hook × 3 tài khoản = 9 ô và 9 draft, cùng CTA/giá/landing.
- [ ] Chạy lại không nhân đôi; chỉ dùng bản render đã kiểm của đúng sản phẩm/variant.
- [ ] CTA khác snapshot hiện cảnh báo; unknown giữ null.
- [ ] UTM khác theo tài khoản/hook, không gọi dịch vụ ngoài.
- [ ] Full suite, tự review Office mode, commit đúng path, STATUS/nhả khóa.

## Cách kiểm
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop (FFmpeg PATH). Test riêng hook-matrix. local:build theo lịch hai việc và cuối đêm.

## Báo cáo
ops/office/reports/T-017.md và REVIEW-T-017.md văn phòng: thay đổi, bằng chứng, phần chưa kiểm, cách chạy tiếp.
