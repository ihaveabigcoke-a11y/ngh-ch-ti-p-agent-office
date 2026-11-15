# M-20261113: Muse thật → ba hook → bài nháp

- **Repo / tầng:** Hermes Clip, app/worker hiện có.
- **Người giao / Worker:** người dùng / một main Codex; 13/11/2026.

## Mục tiêu
Chọn sản phẩm hạng 1; chưa có hạng thì hồ sơ mới nhất. Chuẩn bị khung content, chạy Muse qua worker hiện có, chọn đoạn và dựng ba MP4 chung thân, tạo bài nháp T-017.

## Phạm vi
- Chỉ thao tác dữ liệu qua app, profile/phiên chỉ do worker Muse sử dụng. Không mở SQLite hay sao chép phiên.
- App chạy HERMES_MUSE_ONLY=1, không khởi động Instagram, DM hay hàng đợi khác.
- Giãn ít nhất 60 giây; tổng đêm tối đa 12 lượt. Dừng ngay khi từ chối/captcha/đăng xuất/cảnh báo hoặc hai lỗi liên tiếp. Không thử lại đêm này và không gửi lại kết quả chưa rõ.
- Giữ mọi cảnh, media, receipt cũ. Báo cáo tổng hợp ở ops/office/reports/M-20261113.md; bằng chứng không nhạy cảm ở outputs/M-20261113.

## Giao diện
Sử dụng màn Tạo nội dung, chọn đoạn, Ghép và xuất hiện có. Chụp 1366/1920 nếu nghiệm thu được.

## Tiêu chí đạt
- Ghi tổng gửi/thành công/lỗi và trạng thái phiên cuối.
- Có clip Muse thật được nhập vào đúng take; phân biệt clip cũ và lượt mới đêm này.
- Ba render được kiểm kích thước/thời lượng/âm thanh, ghi SHA-256, cùng đoạn thân.
- T-017 tạo draft, không đăng. Nếu bị phanh thì ghi blocker và tiếp tục phần độc lập.

## Cách kiểm / báo cáo
Không gửi fixture tới dịch vụ. Dùng receipt và validateMedia thật; ghi rõ phần chưa kiểm. Code T-012/T-023 đã chạy full suite và local:build ở ea5d1ea. Không sửa source trong khi app mở.
