# Review T-051 — Office mode, 15/11/2026

Một Codex tự review theo `.claude/skills/hermes-night-review/SKILL.md`, đề `tasks/T-051-hop-ghep-thu-vien.md`, diff so `before-T-051=cc26e90`. Không dùng hệ thống điều phối hoặc agent phụ.

| Hạng mục | Kết luận | Bằng chứng |
| --- | --- | --- |
| Chọn/đổi thứ tự/bỏ/tên file | Đạt | `workspace-library.tsx`, `library-merge.tsx`; UI thao tác thật và ảnh 1366/1920 |
| Khung đầu, thiếu tiếng, tổng thời lượng | Đạt local | `concatLibraryClips`; FFmpeg thật: 720×1280, 2,400s bằng tổng 1,08+1,32; giải mã exit 0; test PCM và màu từng đoạn |
| Bảo toàn và lưu mới | Đạt | Hash ba clip nguồn, record cũ; asset/cảnh mới cùng dự án, pending + merge provenance; CAS transaction và request replay/concurrency |
| So sánh retryOf | Đạt local | Tra job/attempt, bao gồm take phụ; gốc thiếu báo rõ; cả hai video phát cạnh nhau, 1366/1920 |
| Scope và hồi quy | Đạt | Typecheck + 960/960 khác nhau, 0 fail/skip; không thay assertion cũ, command/worker/preset ba hook/theme/font/lockfile không sửa |
| Build và launcher | Đạt QA riêng | Build từ cây sạch b23bdb9 lúc 20:51:38 +07; đúng launcher + IPC/userData QA, lưu/phát/reload/so sánh đạt, receipt và công tắc nguyên; 4 PNG bổ sung |

Không sửa `data/`, `evidence/`, AppData/phiên/DB thật; chỉ fixture và công cụ media local. Mọi file/DB/log/screenshot mới ở `outputs/` không commit. Không ghi dữ liệu nhạy cảm vào báo cáo. Không suy VPN/Muse thật đạt từ cấu hình fixture.

Rủi ro/giới hạn: 2–30 clip, tổng tối đa 2 giờ, vẫn giới hạn 30 cảnh mỗi dự án; khung đầu phải chẵn. So sánh hai trình phát độc lập. Nội dung/SKU/audio thực cần người dùng duyệt; không tự đăng. Build chính còn chờ app thật đóng; không tự dừng tác vụ của người dùng.

Review nguồn không đổi HEAD `cc26e9061d144f5c6736dcd29f9113a4be21510c`, nhánh `main`, stash rỗng trước/sau. Commit/build/push tiếp theo là giai đoạn triển khai đã được người dùng giao, không phải thao tác của bước review. Checkpoint kết thúc ở STATUS và báo cáo app `ops/office/reports/T-051.md`.

Kết luận cuối: **Đạt source, kiểm local, build riêng và launcher QA; chờ áp build chính**. 10 PNG tổng, 0 lỗi trang, 0 Muse thật. Harness đầu thiếu fingerprint job fixture, sửa đúng hợp đồng Store rồi launcher đạt; không thay runtime/assertion. Không cần prompt sửa source thêm; chỉ cần app thật đóng để áp build chính. Giữ WIP văn phòng có trước, không commit lẫn dữ liệu/tài liệu ngoài task.
