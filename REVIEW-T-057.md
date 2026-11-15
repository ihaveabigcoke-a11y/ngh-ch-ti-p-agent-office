# Review T-057 — Office mode, 15/11/2026

Một Codex tự review theo `.claude/skills/hermes-night-review/SKILL.md`, đề `tasks/T-057-don-cuoi-test-chap-chon-va-loi-nho.md`, diff so `before-T-057=2fb0b97`. Không agent phụ/orchestrator.

| Hạng mục | Kết luận | Bằng chứng |
| --- | --- | --- |
| Vòng đời worker | Đạt | tick kiểm closed trước SQLite; close dừng dispatch, chờ runner/reclaim cleanup; teardown giữ mock đến hết runner rồi đóng DB |
| Video dài | Đạt | 10 tiến trình nối tiếp, mỗi lần 13/13, tổng 130 pass/0 fail/skip/cancel; mọi dòng assertion cũ giống tag |
| Băm nguồn ghép | Đạt | createReadStream; 6 kiểm T-051 trong full suite giữ nguyên, nguồn sai hash bị chặn, media/CAS/provenance đạt |
| Cache hash lỗi | Đạt | Chỉ nhớ thất bại ổn định, tối đa 500 job; updatedAt/output/size/mtime/ctime/dev/ino làm mất hiệu lực; mọi thành công vẫn băm lại; test đếm readSync qua status/watchdog và sửa file |
| Nhân vật | Đạt | 2 PNG 1366/1920 đã xem; nền tối/viền trắng, 15,54:1, 32×32; icon cùng dòng, Tab/Shift+Tab/Enter, lưu/reload/giữ asset gốc |
| Dọn ảnh lỗi | Đạt | Chỉ 4 file failure.png/failure.txt trong T-043-ui/T-045-ui, xác thực đường dẫn trước Remove-Item |
| Hồi quy | Đạt | 964/964: 285 domain + 29 API + 642 desktop + 8 runner, 0 fail/skip; typecheck và diff check đạt |
| Build/launcher | Đạt QA riêng | Cây sạch 6f8f62a, 21:28:13 +07; build 40 module API, đúng START-HERMES-CLIP.cmd/IPC/userData riêng; ghép 2,400s 720×1280, phát/reload/so sánh, receipt/công tắc nguyên; đóng QA êm |

Không sửa data/evidence, dependencies/lockfiles, prompt Muse, font/theme hoặc công tắc hồ sơ/Muse/VPN. Không đọc/ghi AppData/DB/profile/phiên thật; log/media/DB fixture không commit. Hash thất bại chỉ cache trong RAM, khởi động lại kiểm mới; file thành công luôn được đối chiếu lại trước recovery.

Rủi ro/giới hạn: close chờ công việc đã giao kết thúc theo timeout hiện có, không hủy việc đang gửi; caller phải await trước khi đóng Store. Băm đầu ra ghi bucket vẫn dùng bytes theo hợp đồng hiện có. Chưa kiểm Muse/VPN/dữ liệu cài thật hoặc NVDA; không suy kết nối thật từ cấu hình fixture. Chưa áp build chính vì app mở.

Cần anh chốt: cần mã lỗi 24 giờ đặt ở đâu / thử lỗi thật. Chỉ ghi nhận, không sửa museFailureKind hoặc thử lỗi dịch vụ.

Review source không đổi HEAD `2fb0b978abab2befee9aff2fc12e55fe0694d41f`, main, stash rỗng trước/sau. Commit/build/push tiếp theo thuộc công việc đã được người dùng giao; giữ WIP văn phòng có sẵn. Không có hạng mục source cần prompt sửa thêm.

Kết luận cuối: **Đạt source, kiểm local, build riêng và launcher QA; chưa áp build chính vì app mở.** Kiểm sau QA: 67 file local-dist giữ nguyên SHA; 5 PID Electron người dùng nguyên. 4 PNG launcher thêm vào 2 PNG UI, 0 lỗi trang/0 Muse. Lần launcher đầu thiếu alias cho import tương đối sau khi copy build lồng sâu, dừng trước mở Electron; thêm junction trong package QA rồi đạt. Chỉ packaging QA thay đổi; không sửa nguồn/bản cài. Khóa/push cuối ở 10 dòng đầu STATUS.
