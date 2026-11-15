# Review T-044 — 15/11/2026

Một Codex tự review theo `.claude/skills/hermes-night-review/SKILL.md`, Office mode; không reviewer độc lập. Đối chiếu đề `tasks/T-044-khung-cuoi-hook-khop-than.md`, diff từ `before-T-044=49a267f`, source `4f6d33f` và bằng chứng local T-044.

| Phần | Kết luận | Bằng chứng / việc cần sửa |
|---|---|---|
| Prompt | Đạt | helper trong muse-bundle; manual/UNIT và MusePackage chỉ đổi nội dung. Snapshot thật của cả ba hook có 1 command đầu, 1 dòng nối; bỏ dòng mới thì khớp T-041. +658 ký tự/hook. |
| Bảo toàn và routing | Đạt | Không sửa worker, dữ liệu Git, theme/font/dependency; không hạ assertion. Muse và ba hồ sơ/VPN nguyên trạng, 141 record cũ nguyên hash, job cũ còn. |
| Test/build | Đạt | Typecheck + 907/907, 0 skip/fail. Build 18:08:18 +07 cây sạch/app tắt. Launcher QA thật 1366/1920, reload/persistence, 0 console error/request ngoài. |
| Số gửi / MP4 | Đạt | Đúng 3 gửi Cho/Duc/Chim, lệch 25ms, VPN connected; 3 MP4 khác hash, 720×1280/15s/audio/full decode, <6 MiB. 0 retry/đăng/DM. |
| Chi giữ bật | Chưa kiểm | Chi vắng sẵn từ baseline, như T-041. Không tự tạo lại hoặc suy đoán công tắc; 0 gửi Chi. |
| Khung nối | Cần sửa | Cả ba ảnh nối khác bố cục/ánh sáng. So T-041, khoảng cách RGB32 H1/H2 tăng, H3 giảm nhẹ. Không chứng minh nối mượt. |
| Tổng thời gian | Cần sửa | 112,423s; +11,888s T-041, +25,291/+27,079s T-038. Không đạt +3s. |

Rủi ro: hướng dẫn chữ tham chiếu mô tả đã duyệt không khóa được pixel mở đầu của clip thân thực tế; đoạn thân có thể khác mô tả. Một lần đo không xác định được nguyên nhân chờ Muse tăng. Giữ bản thử và báo không đạt, không tự nới giới hạn ba lượt hoặc thay đường gửi để làm đẹp số.

Phần người dùng cần xem: ba MP4 thật T-044 trong Video, chất lượng toàn clip/SKU/công dụng. Chưa có nghiệm thu những phần này; ảnh đôi chỉ chứng minh chỗ cắt. Không đưa snapshot/media/receipt thật mới lên Git.

Gợi ý giao việc sửa (chỉ sau khi có phạm vi mới): “Tiếp tục T-044 từ source 4f6d33f và D:/hermes-wt/artifacts/T-044/progress.md. Đối chiếu khung đầu thân thực tế với câu mô tả cuối hook; đề xuất một câu prompt chính xác hơn, giữ cảnh đã duyệt/command/worker/công tắc. Tách số đo phần app và chờ Muse; không hạ ngưỡng +3s. Không gửi Muse thêm khi chưa được duyệt rõ số lượt và hồ sơ. Giữ mọi bằng chứng cũ. Kết thúc bằng === BAO CAO T-044 === và TRANG THAI.”

Pha review đọc: HEAD `4f6d33f`, branch `main`, stash rỗng giữ nguyên; chỉ viết báo cáo, không đụng AppData/DB/cookie/token trực tiếp. Chỉ app tự dùng phiên hiện có theo quyền ba lượt thật của đề. Kết luận toàn task: **CHƯA ĐẠT nghiệm thu thật**, không gọi source/test xanh là đạt nối khung/thời gian.
