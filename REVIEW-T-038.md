# Review T-038 — một Codex tự kiểm, Office mode

Spec: tasks/T-038-do-3-ho-so-chim.md. Baseline/tag before-T-038=1515a30. Đọc source MusePackage.preview/start, useBundle và Worker.tick, so với hành vi app thật; không dựa chỉ vào báo cáo.

| Hạng mục | Kết luận | Bằng chứng / giới hạn |
|---|---|---|
| Một worker, khóa/tag, checkout sạch | Đạt | Baseline/progress, đúng app main, worker T-038 duy nhất; không sub-agent. |
| Chim và nhóm gửi | Đạt kỳ đo | preflight IPC: ready/signed_in, quota available, VPN connected; auto ba tin. Hai lần mỗi Cho/Duc/Chim một cảnh; Chi vẫn bật/stopped, không gửi. Chưa kiểm rollover; không hứa loại Chi vĩnh viễn qua kỳ mới. |
| Giới hạn, pacing, không retry | Đạt | 6 job mới, 2/profile; khoảng cách ≥140,698s. Lần 2 sau verified-1. Guard trước click từng chặn, không tạo attempt/gửi khi chặn. |
| Đo thật/ba MP4 mỗi lần | Đạt | DOM click 85,344/87,132s; mỗi bộ 3 hash khác nhau, 720×1280/15s; 3 nguồn 8s, giải mã/A-V/hash tải lại đạt. Thân cũ nêu rõ. |
| Mục tiêu <60s | Chưa đạt | Nhánh chậm chờ+tải+dựng 76,953/75,890s; thêm các chặng còn lại mới bằng tổng. Mục tiêu phụ thuộc Muse. |
| Source/test/build | Đạt, không có sửa mã | Diff source/test/protected paths rỗng; full 862/862, typecheck exit0. Không cần build lại, dùng build T-037 đang chạy. Không nới assertion. |
| Bảo toàn | Đạt phạm vi đã đo | 120 record cũ nguyên hash, 78 job cũ đủ ID; receipt/phanh Chi nguyên, công tắc giữ bật. Không đọc trực tiếp AppData/DB/cookie/token; app tự dùng phiên qua IPC theo task. |

Rủi ro/giới hạn: dữ liệu mới chỉ local; báo cáo Git không chứa receipt raw, URL tài khoản hoặc media mới. Hai mẫu không chứng minh tốc độ phổ quát; mốc T-035 từ handler khác DOM click T-038. Chọn đoạn kỹ thuật tự động không thay duyệt nội dung. Phanh hồ sơ của app hiện theo kỳ; chưa nghiệm thu qua kỳ mới. Không lỗi mã trong phạm vi này cần fix prompt.

Người dùng kiểm trên giao diện thật: xem các bộ auto_T038_1/2 trong Video/Thư viện, duyệt SKU/công dụng/hình/âm thanh trước dùng. Giữ Chi dừng gửi; chưa cấp quyền đăng/DM hoặc gửi tiếp. Không cần xác nhận để khép task đo này.

Review chỉ đọc source và bằng chứng; HEAD 1515a30, nhánh main, stash rỗng giữ nguyên trong pha review. Commit/push báo cáo diễn ra sau review theo quyền trực tiếp trong T-038.

Kết thúc: báo cáo app 4520466 và tag before-T-038 đã push thường, remote khớp; cây app sạch, khóa codex-T-038.txt đã nhả. STATUS 15 dòng; phần văn phòng có trước giữ nguyên.
