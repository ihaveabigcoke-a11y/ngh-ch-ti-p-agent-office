# T-045 — tự review Office mode

Phạm vi review `before-T-045=c741ced..0b07146`, main; theo `.claude/skills/hermes-night-review/SKILL.md` trong app. Đạt source/QA; chưa áp vào bản app thật đang mở.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| CRUD tên duy nhất, ghi chú, 1–3 ảnh, xoá xác nhận | Đạt | characters.tsx, local/characters.mjs; UI HTTP CRUD/reload/trùng tên/xác nhận |
| Chỉ sản phẩm/linh vật/minh hoạ | Đạt | Kind whitelist phía server; lời nhắc không dùng ảnh người thật; không thêm model mode |
| Mặc định tắt, Unicode @Bông, không tên/tắt không đính | Đạt | scene field optional; Worker enqueue opt-in; 6 test mới |
| Tên lạ chặn trước gửi, tổng tối đa 4 | Đạt | Resolver kiểm trước enqueue; IPC thật trên workspace giả chặn tên lạ, 0 sends |
| Command đầu prompt đúng một lần | Đạt | Fake MuseAdapter.prepare kiểm với 1/2/3 ảnh; không sửa normalizer |
| Migration và công tắc giữ nguyên | Đạt | Snapshot record/null/file trước migration, reopen; profile/Muse/ledger trước-sau và launcher persistence |
| Ảnh 1366/1920, typecheck/test/build | Đạt | 922 kiểm khác nhau, UI+launcher QA, build outputs riêng |
| Muse/tài khoản thật và áp bản cài | Chưa kiểm/chưa áp | Chủ động giữ phiên thật đang mở; không truy cập AppData hoặc gửi Muse |

Không thay data/, evidence/, dependency/lockfile, font/theme, phanh hoặc đường gửi Muse ngoài nhánh đính ảnh. Không giảm assertion test cũ. 6 test mới tăng thêm kiểm bytes/checksum và migration; UI chỉ sửa selector theo role thật, không bỏ ca kiểm. Bộ full desktop skip OpenMontage đã chạy riêng đạt với đúng đường executable Agent Reach.

Rủi ro: quy tắc không dùng người thật không tự nhận diện nội dung ảnh; chưa kiểm đồng nhất nhân vật trên clip thật. Build QA không tự cập nhật phiên app đang mở. Khi áp: chờ việc đang chạy xong, đóng app, local:build mặc định rồi mở launcher. Không chép workspace QA.

HEAD/branch/stash không đổi trong lượt tự review: `0b07146`, `main`, stash rỗng. Không chạm dữ liệu thật. Bản app report có lệnh kiểm và giới hạn; STATUS ghi SHA/push cuối.
