# T-022c: Focus, nhãn và bàn phím

- **Repo / tầng:** Hermes Clip, giao diện source.
- **Người giao:** người dùng, mục bổ sung cuối brief. **Worker:** một main Codex. **Ngày:** 13/11/2026.

## Mục tiêu
Kiểm các điều khiển mới có tên/role đúng, thao tác được bằng bàn phím và thấy focus. Sửa phát hiện trong phạm vi này, không thêm tính năng.

## Phạm vi
- scripts/check-t022c-ui.mjs, ops/office/reports/T-022c.md; sửa lỗi phát hiện ở components/lab/metric-import.tsx. Các component hồ sơ, ma trận, bước tiếp, hướng dẫn chỉ đọc nếu không có lỗi.
- Axe-core 4.11.0 đặt riêng trong outputs, không sửa package/lockfile. Browser/workspace fixture, chặn request ngoài; không dữ liệu/tài khoản thật.

## Bố cục giao diện
Giữ theme/font/bố cục. Bảng xem trước thêm vùng cuộn có tên; nhóm lỗi giữ danh sách bên trong vùng thông báo. Ảnh ở 1366×768 và 1920×1080.

## Tiêu chí đạt
- Chín tab: ArrowRight/Left, Home/End, Tab; link bước tiếp/ma trận/hướng dẫn mở đúng màn bằng Enter.
- Form số liệu: trường có nhãn, preview và lỗi bằng phím; cuộn ngang được với ArrowRight và thoát vùng bằng Tab.
- Axe không còn violation ở sáu trạng thái; lưu các incomplete và giới hạn. Có ARIA snapshot, 18 kiểm focus, 8 PNG. Không tuyên bố WCAG toàn app.
- Hồi quy T-019 nhập/lưu/khóa dòng lỗi; full suite giữ assertion.

## Cách kiểm
node scripts/check-t022c-ui.mjs; node scripts/check-t019-ui.mjs; pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop. Thêm desktop/tools/ffmpeg/bin vào PATH. Review Office mode, commit đúng path; local:build cuối trên cây sạch/app tắt.

## Báo cáo
ops/office/reports/T-022c.md; REVIEW-T-022c.md và STATUS văn phòng. Nêu rõ các giới hạn kiểm trình đọc màn hình và dữ liệu thật.
