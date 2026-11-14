# M-20261114-muse-flow — tự review Office mode

Một main CODEX-BOSS tự review, không có reviewer độc lập. Base/tag 2b1a1cb; nhánh main. Review không đổi HEAD/nhánh/stash.

| Tiêu chí | Kết quả | Bằng chứng |
| --- | --- | --- |
| Tiếp tục dự án manual và nháp chưa gửi | Đạt local | auto-video, MusePackage; fixture UI giữ existing_manual, 1 lần bấm → 3 MP4 |
| Giữ receipt/chặn kết quả chưa rõ | Đạt local | preview chặn unknown/needs_attention; recheck/resume chỉ đọc hội thoại/lấy kết quả cũ; retry giữ bản cũ |
| Chờ media tới muộn | Đạt local | test 22 giây > mốc cũ 15 giây; 1 lần gửi; timeout hữu hạn giữ phản hồi |
| Không tự tắt Muse | Đạt local | Worker không đổi muse_paused khi lượt lỗi; hàng chờ dừng theo hạn mức/phiên, giữ ledger; UI tiếp tục không cần tắt/bật |
| 1366 và 1920 | Đạt | 8 PNG tại outputs/M-20261114-muse-flow*-ui; không tràn, không lỗi JS/request ngoài |
| Full suite | Đạt | typecheck + 272 domain + 29 API + 504 desktop = 805, 0 lỗi/0 skip; 45 focused đã nằm trong tổng |
| Dựng thật local | Đạt | Muse giả cấp 5 clip kỹ thuật; OpenMontage/FFmpeg tạo 3 MP4 720×1280, chung thân, giữ hash/provenance; bấm lại không nhân đôi |
| Launcher cuối | Đạt QA riêng | START-HERMES-CLIP.cmd/Electron thật, IPC tiếp tục khi Muse bật, 4 PNG, giữ receipt/submissions qua đóng/mở, 0 lỗi/request ngoài |
| Muse thật | Kẹt quyền kiểm | Auto-review chặn launcher dùng AppData mặc định; câu hỏi xin ngoại lệ đang chờ, không lách chặn |

Giữ font/theme, dữ liệu null, media/receipt cũ. Không đổi dependency/lockfile, data/evidence hay đọc trực tiếp AppData. Thay assertion công tắc theo yêu cầu mới của người dùng; giữ và thêm assertion dừng dispatch, giữ submissions và chặn gửi trùng. Không hạ kiểm quota/captcha/phiên.

Giới hạn: một lần bấm tới 3 MP4 là fixture, chưa chứng minh Muse thật tạo được video. Người dùng vẫn cần duyệt SKU/nội dung trước khi đăng. Không đăng, DM hoặc paid API. Không có blocker code trong phạm vi đã kiểm.

Build cec3004 đạt 23:02:01 +07 ngày 14/11/2026, cây sạch/app chưa chạy; source đã push origin/main và đối chiếu remote. Không thao tác tắt Muse thật. Bổ sung harness desktop chỉ tác động QA riêng, không cần lặp lại 805 test cho thay đổi tài liệu/harness; harness mới đã chạy đạt.
