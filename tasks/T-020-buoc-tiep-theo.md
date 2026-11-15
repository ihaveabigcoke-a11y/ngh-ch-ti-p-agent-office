# T-020: Một bước tiếp theo cho mỗi sản phẩm
- Repo: Hermes Clip. Người giao: người dùng. Worker: một main Codex. Ngày: 13/11/2026.
## Mục tiêu / phạm vi
Mở rộng product-next-step theo thứ tự: thiếu productKey/rank; thiếu đầu vào content; chưa xuất prompt; chờ clip; chưa chọn đoạn; chưa MP4; chưa 3 draft; chờ đăng; chờ số; chờ quyết định. Một nút tới đúng sản phẩm/màn, ở phòng sản xuất và đầu hồ sơ.
## Bố cục
Khối bước tiếp ở đầu product và production desk, giữ theme/font; ảnh 1366/1920.
## Tiêu chí đạt
- [x] 10 fixture cho 10 bước; không tính render chưa kiểm hay draft sai sản phẩm.
- [x] Nút mang đúng product/project/section; một CTA chính mỗi bước.
- [x] Giữ unknown null, không tự xếp hạng/đăng/quyết định.
- [x] Full suite, review, commit đúng path, STATUS/nhả khóa.
## Kiểm / báo cáo
pnpm typecheck/test/test:api/test:desktop, FFmpeg PATH; build theo lịch. ops/office/reports/T-020.md; REVIEW-T-020.md.
