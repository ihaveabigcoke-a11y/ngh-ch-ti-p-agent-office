# T-026j: Khép các kiểm tra local còn thiếu của T-026

- **Repo / tầng:** hermes-clip, app main hiện tại.
- **Người giao:** người dùng yêu cầu làm hết phần chưa xong ngày 14/11/2026; một main agent Codex tự thực hiện.

## Mục tiêu
Hoàn tất kiểm tra local còn được ghi chưa kiểm trong các review T-026; sửa lỗi phát hiện, đồng bộ backlog với kết quả thật. Hai ngưỡng 48 giờ giữ null theo trao đổi mới, không coi là việc chờ người dùng hoặc blocker.

## Phạm vi
- Kiểm bảy màn rỗng/đầy bằng bàn phím, axe, phóng to 200% và forced-colors mô phỏng; ảnh 1366/1920. Sửa lỗi trong phần compact, giữ theme/font.
- Kiểm tải MP4 đúng hash/tên và caption UTM trên workspace QA; hoàn tất luồng Đổi hook qua UI tới ba MP4 mới với Muse giả/OpenMontage local, bảo toàn thân và lịch sử.
- Bật kiểm OpenMontage local đang skip nếu công cụ sẵn có và lệnh chỉ chạy local. Không cài thêm dependency để né kiểm.
- Đồng bộ STATUS/BACKLOG/HANDOVER; ghi rõ kiểm tự động không thay thử NVDA bằng người hoặc dịch vụ thật.
- Không AppData/dữ liệu/phiên thật, Muse thật, web tiêu dùng, paid API, đăng/DM, reset/clean hay xóa media cũ.

## Tiêu chí đạt
- [x] Các kiểm local trên có bằng chứng đạt hoặc blocker cụ thể; không báo kiểm NVDA nếu chỉ có axe/ARIA.
- [x] Không tràn ngang trang, thao tác chính và modal dùng được bằng phím; trạng thái vẫn phân biệt bằng chữ/icon ở forced-colors.
- [x] Đổi hook tạo đúng ba MP4 mới, thân giữ nguyên, dự án/bản xuất cũ không đổi; tải đúng bytes, caption không tự đăng.
- [x] Full suite đạt, không hạ assertion; review Office mode, commit đúng path, local:build cây sạch/app tắt, push theo quyền T-026 còn hiệu lực.

## Cách kiểm
`node scripts/check-t026j-ui.mjs`; kiểm luồng video bổ sung; `pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop`; `pnpm local:build`; launcher QA riêng.

## Báo cáo
SHA, kết quả, ảnh, phần chưa kiểm tại REVIEW-T-026j.md và STATUS.md. Dữ liệu/nguồn SKU và dịch vụ thật không được đánh dấu hoàn thành bằng fixture.
