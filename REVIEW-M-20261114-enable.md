# M-20261114-enable — tự review Office mode

Một main Codex. Baseline/tag before-M-20261114-enable = 02d509e; app tắt và cây sạch trước sửa. Đề tasks/M-20261114-enable-muse.md. Không có reviewer độc lập.

| Tiêu chí | Kết luận và bằng chứng |
| --- | --- |
| Bật lại được sau stop | Đạt source/UI: worker nhận resumeStopped=true từ xác nhận Bật lại Muse; bật thường vẫn không tự gỡ stop. Chờ job/chat đang chạy kết thúc trước recovery. |
| Giữ lịch sử và chống trùng | MuseNight.resume giữ submissions/outcomes, append resumptions gồm lý do/thời điểm/số lượt. Không thay job/receipt. Worker xóa approval cũ qua pause; không tự dispatch/browser. |
| Không giới hạn nội bộ | sessionLimit/remaining=null; configure giữ ledger. UI/gói/auto-video phân biệt null với 0. Trần hữu hạn vẫn hoạt động khi được chọn. Mặc định cũ/giới hạn đã lưu không âm thầm đổi; bật null qua chức năng Cài đặt theo yêu cầu trực tiếp. |
| Phanh dịch vụ | Giữ kiểm quota/captcha/login/account warning, giãn ≥60 giây, chống gửi lại, đối soát kết quả chưa rõ. Lỗi mới lại dừng; không đổi vùng/tài khoản hay fake quota. |
| Kiểm riêng/UI | 21/21 Muse; script UI đạt bật/tắt, stop tới muộn, resume, null lưu qua reload, 0 gửi/0 browser. 10 ảnh 1366/1920 outputs/M-20261114-enable-ui. Đã xem modal 1366 và cài đặt 1920; theme/font giữ nguyên. |
| Full suite | Typecheck đạt; 268 domain + 29 API + 498 desktop đạt, 1 skip OpenMontage. Chạy riêng OpenMontage local với executable đúng đạt 1/1; tổng 796 kiểm khác nhau đạt, 0 lỗi còn lại. |
| Scope | Không sửa data/evidence/dependency. Không đọc DB/profile/AppData thật bằng công cụ kiểm. Chỉ bản fixture và code được sửa; lượt bật app thật sẽ dùng UI được người dùng yêu cầu. |

Không xóa/hạ unit assertion cũ. Script UI thay kỳ vọng nút khóa bằng kỳ vọng nút bật lại theo hành vi mới, thêm kiểm audit/giữ receipt/null. Lần OpenMontage riêng đầu tiên lỗi vì đưa thư mục checkout vào biến executable; sửa đường dẫn môi trường rồi 1/1 đạt, giữ log cũ.

Review giữ HEAD 02d509e, nhánh main và stash rỗng; tự review không thay source. Build/launcher thật trên QA và thao tác bật app người dùng sẽ ghi STATUS sau commit. Bật Muse không chứng minh tài khoản có quyền tạo clip mới; chưa tạo clip Muse mới trong lượt này. Không push.

## Chốt nghiệm thu

App main 9d160c4; runtime sửa ở 012bdc0. Build cuối 14/11/2026 09:46:40 +07 exit 0 trên cây sạch/app tắt. Các thay đổi sau full suite chỉ nằm trong script QA, không thay runtime. QA phát hiện trình tự đóng Electron cần thêm CloseMainWindow; đã tách bước UI/đóng/kiểm persistence bằng wrapper PowerShell và giữ assertion process phải thoát. Log các lần fail được giữ; kết quả cuối outputs/M-20261114-enable-checks/electron-qa-two-close.log đạt UI và persistence, không kill.

Launcher QA đạt 4 ảnh 1366/1920, bật lại bằng IPC thật, null/receipt/audit còn sau đóng và đọc lại, không request ngoài/console lỗi. App thật được bật qua UI lúc 09:48:02 +07: Muse đang bật, generationReady=true, limit/remaining=null, giãn 60 giây; 40 job và provider receipt nguyên trạng, ledger 3 không đổi, active 0 và 0 lượt mới. Bằng chứng tổng hợp outputs/M-20261114-enable-live/result.json, ảnh chỉ công tắc. Không ghi thông tin tài khoản ra repo.

Lần launcher thật đầu dùng detached không khởi chạy; chuyển sang cơ chế spawn đã kiểm trên QA rồi thành công, không đụng bảo mật. Chưa tạo clip mới hay kiểm lại hạn chế vùng. App giữ mở cho người dùng; không push/merge.
