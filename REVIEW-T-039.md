# T-039 — tự review Office mode, 15/11/2026

Skill: [hermes-night-review](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/.claude/skills/hermes-night-review/SKILL.md). Một Codex tự kiểm, không reviewer/agent độc lập. Đối chiếu đề T-039, diff `before-T-039` (4520466) tới c708fe7, các source/test liên quan và kết quả chạy; không coi báo cáo task là bằng chứng duy nhất.

| Tiêu chí | Kết luận | Bằng chứng và giới hạn |
|---|---|---|
| Tìm lý do nút khóa và xóa thất bại | Đạt | baseline-probe 26 ca trên mã trước task; blocker/disabled/IPC/name/path đã đối chiếu. Báo cáo app có ma trận trước/sau. Không đọc trạng thái hồ sơ thật, không suy nguyên nhân cụ thể của Chi |
| Xóa rảnh, giữ các công tắc | Đạt local | 8 tổ hợp enabled/musePaused/worker.paused; B active vẫn xóa A rảnh. No pause/setMusePaused/saveProfile trong deletion |
| Bỏ qua cho mọi hồ sơ, có xác nhận | Đạt local | UI hiện nút từ deleteCanSkip; tên và boolean được worker kiểm; cảnh báo kết quả chưa tải; skip job/chat/run đúng profile trong transaction |
| Chặn đang gửi, mở/đóng, kiểm, chat, VPN, hàng chờ | Đạt local | lock/state matrix, runner còn sống dù row paused, recheck sau await; queued không cho skip; giải thích dưới nút |
| Giữ B/media/receipt/history/project | Đạt local | Temp SQLite, snapshot/deepEqual B/job/receipt, media sentinel; rollback giữ mọi record nếu commit cấu hình lỗi; không sửa scene timestamp hay project |
| Không xóa nhầm path | Đạt local | ID/path/reserved device/case alias; target file/junction; parent junction; nested junction không đi vào media; file Windows bị giữ báo cleanupPending |
| Không hạ assertion | Đạt | Bốn test T-028b nguyên vẹn; test deployment chỉ thêm ca; launcher sửa fixture thiếu checkedAt:null, vẫn deepEqual toàn bộ; không skip trong full Windows suite |
| Full suite/build/launcher | Đạt | 278 domain +29 API +569 desktop +8 Codex fixture =884, không lỗi/skip; TypeScript exit0. Build 13:18:04 +07, cây sạch/app tắt; launcher QA build cuối, 4 ảnh 1366/1920, 0 lỗi console/0 request ngoài, persistence sau CloseMainWindow đạt |
| Phạm vi và dữ liệu thật | Đạt | Không sửa data/evidence/dependencies/theme/font. Không đọc trực tiếp DB/profile/cookie/token thật, không gửi Muse, không xóa hoặc ghi công tắc hồ sơ thật. Báo cáo/log/ảnh thật T-038 không đưa thêm vào Git |

## Rủi ro khi áp vào app chính

Bỏ qua là quyết định không lấy tiếp kết quả chưa rõ; phiên trình duyệt bị xóa thì có thể không lấy lại kết quả chưa tải. UI cảnh báo và buộc gõ tên. Nếu Windows giữ file, cấu hình có thể đã xóa nhưng file phiên còn; trả cleanupPending thay vì báo dọn sạch. Tình huống ACL và phần mềm bên ngoài khác chưa được bao phủ hết. Không tự dọn file thật hoặc retry dịch vụ để kiểm.

## Người dùng tự kiểm

Mở START-HERMES-CLIP.cmd → Tài khoản Muse. Nếu yêu cầu đóng trình duyệt, dùng nút của đúng hồ sơ. Chọn Xóa hồ sơ khi rảnh, hoặc Bỏ qua và xóa khi không cần kết quả dở; gõ chính xác tên. Người dùng tự chọn hồ sơ; chưa nghiệm thu xóa tài khoản thật, chưa gọi Muse thật. Không cần tắt công tắc Muse. Không có quyết định cần hỏi để khép phần sửa.

HEAD/main/stash trước và sau lượt review giữ `c708fe7c085d1067cb7c75efa924871ec825e2ac` / main / rỗng. Commit báo cáo và push thực hiện sau review theo yêu cầu task, không phải thao tác trong lượt review.
