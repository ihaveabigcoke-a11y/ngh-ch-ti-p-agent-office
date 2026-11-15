# T-023: Muse là đường chính, gói lượt tạo và phanh đêm

- Repo/tầng: Hermes Clip desktop worker, IPC, Khung content, Cài đặt và Tín hiệu.
- Người giao/thực hiện: người dùng trực tiếp / một main agent CODEX-BOSS. Ngày 13/11/2026.

## Mục tiêu
Gửi gói lượt tạo qua worker Muse hiện có và phiên hiện có; kiểm số lượt trước gửi. M chạy sau bản build T-012 + T-023, chọn hạng 1 hoặc sản phẩm mới nhất, tối đa 12 lần gửi thực sự trong đêm, giãn ít nhất 60 giây. Không Instagram/DM/Meta hoặc dịch vụ trả phí khác.

## Phạm vi
Làm: chính sách đêm, đếm tại checkpoint submitting, giãn nhịp, dừng khi bị chặn/logout/captcha/cảnh báo hoặc hai lỗi liên tiếp, không tự gửi lại kết quả chưa rõ. Nút gói Muse trong luồng tạo media, thiết lập giãn nhịp và hiển thị lỗi/từ chối riêng. Bộ đếm profile vẫn không giới hạn. Giữ media và receipts cũ.

## Bố cục giao diện
Trong tạo media/Khung content có “Tạo bằng Muse”, số lượt gói và số lượt đêm còn lại trước bấm. Cài đặt giãn nhịp mặc định 60 giây. Tín hiệu ghi rõ Muse từ chối/giới hạn hoặc lỗi kỹ thuật. Nhãn tiếng Việt, giữ theme/font, ảnh 1366/1920.

## Tiêu chí đạt
- Fake Muse: cap 12 kể cả concurrency/restart, khoảng cách >=60s, từ chối/captcha/logout dừng ngay, hai lỗi liên tiếp dừng, timeout chưa rõ không gửi trùng.
- Gói chỉ gửi cảnh có đầu vào/duyệt hợp lệ, không chạm cảnh đã có job chưa đối soát; không gọi dịch vụ trong test fixture.
- Thực thi M đúng phanh, ghi số gửi/thành công/lỗi, clip thật, SHA-256 MP4 và trạng thái phiên cuối.
- Full suite, tự review, commit đúng paths; build cây sạch sau task thứ hai. M thất bại thì ghi blocker và chuyển manual, không thử lại Muse đêm này.

## Cách kiểm
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build. FFmpeg PATH. UI riêng, Muse fake trước thật.

## Báo cáo
Ghi sau kiểm tại STATUS và ops/office/reports/T-023.md. M là tài khoản thật; không trộn bằng chứng fixture với kết quả thật.
