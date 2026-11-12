# Bàn giao Codex boss — một main agent

Cập nhật 01:13:47 13/11/2026, Asia/Saigon. Người dùng yêu cầu tự làm boss, tự xử lý các job, giữ một main agent. Claude Pro hết hạn không ảnh hưởng quy trình này.

1. Đọc AGENTS.md và đầu STATUS.md trong văn phòng, rồi README.md và docs/context/01-BOI-CANH-VA-TRANG-THAI.md của app.
2. Đối chiếu git status/log, khóa file và Electron. App/source: C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local. Văn phòng: D:/agent-office/ngh-ch-ti-p-agent-office.
3. Hộp thư hiện không có job code chưa làm. T-001–T-008 đã có code; T-009 hoàn tất việc tiếp quản và kiểm local còn thiếu. Chỉ triển khai job mới khi có đề/phạm vi thực tế; không biến câu hỏi lịch sử thành backlog.
4. Có việc mới: viết tasks/T-xxx theo _TEMPLATE, đặt mốc, sửa source, kiểm riêng, tự review theo hermes-night-review, commit đúng path, full suite/build lúc cây sạch/app tắt, cập nhật STATUS. Không thuê worker hoặc chạy Codex thứ hai.
5. Bộ kiểm: pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build. Kiểm exit code từng lệnh; thêm desktop/tools/ffmpeg/bin vào PATH trong phiên. Không pnpm build. Nếu sandbox chặn spawn, chạy lại đúng kiểm với quyền cần thiết, không giảm assertion.
6. Mở app bằng START-HERMES-CLIP.cmd sau build. Không tự truy cập AppData/SQLite/profile để kiểm. Chỉ push/merge khi người dùng trực tiếp yêu cầu rõ.

Rea-video đã cài đúng revision trong desktop/.integrations, Python 3.12.14 venv riêng; Python hệ thống 3.15 không phù hợp. App 17cb38c tự bổ sung đường dẫn còn thiếu mà không thay lựa chọn của người dùng. Models local dùng chung. Nghiệm thu MP4/review thật sử dụng database fixture; không gọi VLM ngoài.

Chi tiết kỹ thuật/cách cài lại: [runbook app](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/docs/context/T-009-OFFICE-HANDOVER.md). Kết quả cuối: [FINAL.md](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/office-20261113/FINAL.md).

Chưa kiểm tài khoản thật, Electron trên dữ liệu thật, Codex/Gemini thật, file mới Flow/Gemini và Thùng rác thật. Không biến chúng thành việc chạy tự động khi chưa có phạm vi. Màn office/hook không được nghiệm thu lại; cấu hình trust của Codex TUI không được tự bỏ qua. Giữ như một công cụ quan sát tùy chọn, không là điều kiện để chạy job.
