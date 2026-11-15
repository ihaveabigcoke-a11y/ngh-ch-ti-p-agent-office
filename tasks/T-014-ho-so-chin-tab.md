# T-014: Hồ sơ sản phẩm 9 tab
- Repo: Hermes Clip. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Dùng dữ liệu research/product-check/financials/sample/metrics hiện có. Chín tab Tổng quan, Thị trường, Đối thủ, Giá & lợi nhuận, Nguồn hàng & mẫu, Bao bì & thương hiệu, Tiềm năng & rủi ro, Nội dung, Kết quả. Optional brandName, boxText, ctaKeyword/Placement, situation, audience, usCues, season, demandNote, leadDays, competitors. Chung hàm readiness với Khung content. Không tự nghiên cứu/đổi nguồn hay số liệu unknown.
## Bố cục
Tab phím mũi tên, URL giữ tab; profile header có bước tiếp. Bốn tab chụp 1366/1920. Giữ theme/font.
## Tiêu chí đạt
- [ ] Trống hiện Chưa biết, không bịa 0; dữ liệu cũ đọc.
- [ ] 5,2 + 2,6 USD và 34 USD: 7,80 USD trong mức ≤20; ×4,4. Khác tiền tệ cảnh báo, không quy đổi.
- [ ] Đối thủ có link T-013, bảng dữ liệu có nguồn/kỳ/SKU. Checklist CTA/tình huống/tên hộp/báo giá dùng chung.
- [ ] Full suite, review, commit đúng path, STATUS/nhả khóa.
## Kiểm / báo cáo
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop, FFmpeg PATH; build theo lịch. ops/office/reports/T-014.md; REVIEW-T-014.md.
