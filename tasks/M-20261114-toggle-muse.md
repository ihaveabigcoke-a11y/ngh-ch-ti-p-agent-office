# M-20261114-toggle: Sửa thông báo và thao tác bật Muse

- **Repo:** Hermes Clip main; baseline b05d591.
- **Người giao:** người dùng trực tiếp “sửa giúp tôi đi” sau ảnh hộp Bật Muse. Một main Codex.

## Mục tiêu
Hiện rõ vì sao không bật được Muse, không dùng cảnh báo chung như thông báo khóa tài khoản và không giấu lỗi sau modal. Bật/tạm dừng hoạt động bình thường khi phiên không bị chặn; giữ phanh dừng và receipt.

## Phạm vi / giao diện
- Ánh xạ lỗi MUSE_NIGHT_STOP/LIMIT và lỗi tài khoản thành thông báo tiếng Việt an toàn.
- Công tắc hiển thị lý do phiên dừng; modal nêu hành vi thật, lỗi nằm trong modal; không cho bấm bật khi status xác nhận bị chặn.
- Giữ theme/font; ảnh 1366/1920. Không gửi Muse, mở DB/profile/AppData, reset phanh, đổi hạn mức, đăng/DM hoặc push.

## Tiêu chí đạt
- [x] Phiên bình thường bật/tạm dừng, không tự gửi hay chạy lại job.
- [x] Phiên dừng hiện lý do, giữ paused/ledger; lỗi phát sinh sau mở modal hiện ngay trong modal.
- [x] Mã lỗi có lời giải thích an toàn; lỗi lạ vẫn không lộ nội dung/credentials.
- [x] Test riêng, full suite, review Office mode; commit đúng path; local:build khi cây sạch/app tắt.

## Báo cáo
STATUS và REVIEW-M-20261114-toggle.md; báo cáo app ops/office/reports/M-20261114-toggle.md. Phân biệt fixture/local và dịch vụ thật; đợt này không gửi thử Muse.

Kết quả: 02d509e; 791 kiểm đạt/0 lỗi/0 skip; build 01:58:14 +07 và launcher QA đạt. Xem STATUS/REVIEW. Không test gửi Muse thật.
