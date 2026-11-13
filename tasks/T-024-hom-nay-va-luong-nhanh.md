# T-024: Hôm nay, Số liệu, thẻ sản phẩm và luồng làm video
- Repo: app chính main; Codex duy nhất; 13/11/2026. Tag before-T-024.
- Đề đầy đủ: yêu cầu người dùng T-024 trong phiên. Chỉ bốn phần A–D; giữ theme graphite–lime/font, schema cũ, mọi view cũ. Muse giữ Tạm dừng. Không AppData, dịch vụ ngoài, push/đăng/DM.
- Bố cục: Hôm nay = 8 số đếm/đo → việc theo sản phẩm (10 bước + 1 CTA) → 5 kết quả; Số liệu = bảng sortable + biểu đồ SVG → nút mở form/CSV; sản phẩm = 3 cột, ảnh thấp, tên/badge/giá/thiếu/CTA; modal video = 4 ô có gợi ý → dự án/khung v2 → prompt.
- Tiêu chí: fixture 3 sản phẩm/3 bước + 2 bài đo; 8 số, 3 dòng, 2 kết quả. Trống đúng 1 CTA và số đo null. datetime-local VN lưu ISO; chart 3 hook có null. Không chuỗi độn, ≥6 thẻ ở 1366×768. ≤3 click đến nút Xuất gói prompt, 0 Muse request. Menu chính ≤9, mọi view cũ còn. Ảnh 1366/1920 cho 5 trạng thái.
- Kiểm: test riêng; pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop (FFmpeg PATH); tự review Office mode; commit đúng path; pnpm local:build khi app tắt/cây sạch.
- Báo cáo: ops/office/reports/T-024.md, REVIEW-T-024.md và STATUS văn phòng: thay đổi, test/ảnh, chưa kiểm, SHA, giờ build.
