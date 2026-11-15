# Review T-050 — Office mode, 15/11/2026

| Task | Kết luận | Căn cứ | Còn lại |
| --- | --- | --- | --- |
| T-050 | Đạt source, 954 kiểm, build riêng và launcher QA; chờ áp build chính | `4cb808c` + `6d5fd72`, diff từ `before-T-050=f3e3573`; store recover SHA/heartbeat, transaction ready, status jobs và retry guard | App thật được mở trong lúc kiểm; chờ xác nhận app rảnh trước đóng êm/build chính |

Đã đọc skill `.claude/skills/hermes-night-review/SKILL.md`, Office mode. Sáu test mới có giết Worker giả thật, FFmpeg thật, sai hash/file thiếu, timeout đúng hạn, transaction rollback, ledger cũ và kết nối SQLite khác; 954/954 kiểm khác nhau, typecheck đạt. Không xóa/hạ assertion; test cũ không đổi. T-041/T-048 có trong full và focused; số đo thật 85,344/87,132/100,535 giây nguyên văn, không nhận fixture là live.

UI dùng cùng tập state cho header/thẻ; đã xem ảnh 1366/1920, mất dấu không còn đang chạy, Tạo lại khóa, lấy kết quả cũ còn. `needs_attention` giữ đường đối soát cũ; nhãn Lỗi không tự tạo quyền retry. Gói appearance cần ba file đã qua hàng rào kiểm hình, không phục hồi một thẻ riêng. Map runner tiếp tục khóa profile tới khi dọn xong.

Rủi ro/giới hạn: chỉ phục hồi output còn báo cáo kiểm container/full decode và hash; file tải dở/thiếu báo cáo vẫn đối soát. Heartbeat là liveness local, không phải chứng nhận dịch vụ. Chưa kiểm Muse/VPN/quota/dữ liệu cài thật; không mở/copy DB/profile/cookie/token thật. App thật vừa mở là lý do không thay local-dist khi đang chạy. Không đổi công tắc, font/theme, command Muse, data/evidence/dependencies/lockfiles hoặc số đo lịch sử.

Build riêng tại outputs/T-050-build đạt 20:32:27 +07. Bản sao source/build không có dữ liệu cài chạy đúng START-HERMES-CLIP.cmd, userData QA riêng: launcher + IPC đạt 20:33:48 +07, reload và đóng êm, hash receipt/công tắc/config giữ đúng, phục hồi ready và IPC khóa retry. Hai ảnh launcher 1366/1920 đã xem; cộng UI tổng sáu ảnh. Không thay local-dist khi app thật đang được người dùng dùng.

Không có fix prompt source còn mở. Bước tiếp: build chính lúc app đóng, kiểm launcher QA không đặt mirror; ghi SHA/giờ build vào STATUS. Source/tag đã push thường, tài liệu bàn giao push riêng. Review chỉ đọc diff/test/artifacts và ghi tài liệu này; HEAD/branch/stash không đổi trong thao tác review (main `6d5fd72`, stash rỗng). WIP văn phòng có trước được giữ.
