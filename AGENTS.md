# Luật văn phòng (cập nhật 13/11/2026)

**Hai chế độ**, ghi ở dòng `Chế độ:` đầu `STATUS.md`. Chi tiết xem `CHE-DO-VAN-PHONG.md`.
- **`CODEX-BOSS`** (mặc định khi không có dòng chế độ): Codex tự làm boss, **chỉ một main agent**. Áp dụng các gạch đầu dòng bên dưới.
- **`CLAUDE-BOSS`**: Claude Code làm boss, Codex là **worker**. Worker chỉ làm đúng đề `tasks/T-xxx` được giao, không tự nhận việc mới, không sửa STATUS. Báo cáo theo mục *Báo cáo* của đề. Mọi luật cứng bên dưới vẫn áp dụng; chỉ riêng câu "không gọi codex exec" là không áp dụng cho boss Claude khi giao việc.

- Đọc HANDOVER.md, STATUS hiện hành, README/context và AGENTS của app. Làm việc tuần tự; không spawn, không gọi codex exec/office-workers/runner để giao việc, không orchestrator.
- App ở C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local. Sửa source trực tiếp trên nhánh hiện tại, không worktree/đổi nhánh. Xác định app đang chạy trước khi sửa/build.
- Kiểm WIP/khóa .git/office-locks; không đụng file phiên khác. App tắt, cây sạch, tạo tag before-T-xxx nếu chưa có, khóa file chính phiên trước khi sửa.
- Main agent tự phân tích, sửa, kiểm và review theo skill hermes-night-review Office mode. Không bịa reviewer độc lập. Chạy test phù hợp; full suite và local:build chỉ khi không có WIP phiên khác.
- Commit cục bộ theo đúng path; cấm add -A, stash, checkout/reset/clean. Lùi bằng revert đúng phạm vi, bảo toàn WIP. Không push/merge khi người dùng chưa yêu cầu rõ trực tiếp trong phiên.
- Không đọc/ghi AppData, worker.sqlite, profile hay phiên thật trong các tác vụ kiểm. Giữ media/receipt/phiên bản cũ. Ngoại lệ T-006 chỉ áp trong chức năng app với file Hộp nhận mới sau khi nhập/nén/kiểm thành công; không cho agent xóa media thật để thử.
- Không in/commit key, token, cookie, mật khẩu proxy, email hay cấu hình tài khoản. Public snapshot cũ không cho phép công khai dữ liệu nhạy cảm mới.
- Muse tạm dừng, không tự động hóa web app tiêu dùng. Không gọi API trả phí, gửi tin, đăng bài hoặc thao tác tiền/tài khoản ngoài phạm vi được duyệt cụ thể.
- Unknown giữ null, ghi nguồn/kỳ đo/SKU. Giao diện tiếng Việt có dấu, prompt tiếng Anh; giữ theme/font và workflow ngoài phạm vi.
- Tách fixture, CLI local thật và dịch vụ/tài khoản thật. Không coi URL/cookie, báo cáo cũ hoặc checkbox là bằng chứng hoàn tất. Không hạ assertion.
- Ghi checkpoint/blocker, tiếp tục phần độc lập. Cập nhật STATUS với SHA, giờ build, đã kiểm/chưa kiểm rồi nhả khóa chính phiên.

Không tự chạy script cũ có hành động bên ngoài. Quyền approve all trong phiên không phải yêu cầu tự bật dịch vụ trả phí, gửi DM hoặc public dữ liệu mới.
