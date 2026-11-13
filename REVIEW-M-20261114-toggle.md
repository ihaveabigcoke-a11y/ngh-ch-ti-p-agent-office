# M-20261114-toggle — tự review Office mode

Một main Codex. Đề tasks/M-20261114-toggle-muse.md, baseline/tag before-M-20261114-toggle = b05d591; app đã đóng êm, source sạch trước sửa. Review giữ HEAD b05d591, nhánh main, không stash. Không reviewer độc lập.

| Tiêu chí | Kết quả / bằng chứng |
| --- | --- |
| Lý do bật thất bại rõ ràng | Ánh xạ MUSE_NIGHT_STOP/LIMIT/CAPTCHA/ACCOUNT_WARNING/REFUSED trong safeMessage; chỉ hai chuỗi lý do nội bộ được nhận diện riêng, không phản chiếu exception lạ. |
| Lỗi đọc được khi modal mở | Alert nằm trong modal; refresh status khi lỗi. Khi phiên bị chặn, nút Bật bị vô hiệu hóa và giữ nút đóng. |
| Không nhầm cảnh báo thành khóa tài khoản | Mô tả hộp thoại giải thích cho phép tạo/chat và không tự chạy lượt cũ. Bỏ câu cảnh báo khóa tài khoản chung. |
| Phiên bình thường vẫn bật/tạm dừng | UI fixture gọi Worker thật, bật/tắt thành công; browserCalls=0, submitted=0, job cũ nguyên vẹn. |
| Giữ phanh khi phiên dừng | Mô phỏng dừng sau mở modal và dừng có sẵn; paused/ledger/dispatch không bị reset, có lý do và link đối soát. |
| Kiểm riêng | 17/17 muse-night + muse-pause đạt; assertion cũ giữ nguyên. Script check-muse-switch-ui.mjs đạt, 6 PNG (3 trạng thái × 1366/1920), 0 page error/request ngoài. |

Đã xem ảnh modal lỗi 1366, xác nhận 1366, trạng thái dừng 1920; theme/font giữ nguyên, thông báo/nút không bị che hoặc tràn. UI dùng trường museNight đã có trong status, type optional giữ tương thích.

Không thay logic giới hạn, worker/setMusePaused, schema/receipt/media, data/, evidence/ hoặc dependency. Không gọi Muse thật trong đợt sửa này, không thay quyền tài khoản/khu vực và không khẳng định đã tạo được clip mới. Bản sửa chỉ giúp thông báo/thao tác phản ánh đúng giới hạn hiện có. Full suite/build/launcher và SHA cuối ghi ở STATUS.

Full suite: typecheck đạt; 267 domain + 29 API + 495 desktop = 791 đạt / 0 lỗi / 0 skip. Không gửi Muse mới. Đã xem thêm ảnh lỗi modal 1920.

Chốt: commit 02d509e, build 14/11/2026 01:58:14 +07 đạt, source sạch/Electron tắt khi build. Launcher Electron qua START-HERMES-CLIP.cmd trên QA riêng đạt bật/tắt bằng IPC thật, 0 job/0 request ngoài/0 console error; 2 ảnh 1366/1920 tại outputs/M-20261114-toggle-desktop-ui. Không mở dữ liệu người dùng hay gửi Muse. Đã đóng QA êm/nhả khóa; chưa push.
