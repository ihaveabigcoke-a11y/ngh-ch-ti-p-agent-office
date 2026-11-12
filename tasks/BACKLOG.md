# Hàng việc tiếp theo và phân vai (13/11/2026)

**Chỉ đạo trực tiếp mới nhất:** T-010 và T-011 đều làm trong Hermes Clip. T-010 dùng `buildOfficeView` qua route local, không ghi `live/snapshot.json`; T-011 thêm hai màn trong app. Không dùng repo production-office, không áp patch phòng ban. Các cột lịch sử bên dưới được đọc theo phạm vi mới này.

T-010 và T-011 theo mốc nghiệm thu đầu tiên trong `CLAUDE.md` của Hermes Clip. Cột *Phân vai* chỉ áp dụng ở chế độ `CLAUDE-BOSS`. Ở `CODEX-BOSS`, một main agent làm tuần tự từ trên xuống.

| # | Việc | Repo | Độ khó | Phân vai (CLAUDE-BOSS) |
|---|---|---|---|---|
| T-010 | Đã đạt `4f759c3`: ngày VN, `productKey` tự gán, `rank` tự xếp, n/3; hàm thuần `buildOfficeView` qua route local đã xác thực | hermes-clip | Vừa–khó | Một main agent thực hiện và tự review theo yêu cầu trực tiếp |
| T-011 | Đã đạt 7007d08 (báo cáo a473b72), build 02:39:54: hai màn trong app: tươi/cũ/mất kết nối/mô phỏng; Tín hiệu & Phòng chờ theo lượt, Phòng sản xuất theo sản phẩm; ảnh 1366/1920 | hermes-clip | Vừa | Một main agent thực hiện và tự review |
| — | **Mốc dừng 1:** MP4 local mới đổi unmatched → received thì màn Tín hiệu đổi nhóm trong ≤1 phút; fixture ra "Hôm nay 3/3 · Đang triển khai 4". DB kiểm riêng, không tài khoản/dữ liệu thật | hermes-clip | — | Báo đã kiểm/chưa kiểm trong STATUS; không tự sang T-012 |
| T-012 | Một video xuyên suốt: `renderPlan`, chọn đoạn in/out, cắt + ghép + đè chữ, **giữ tiếng gốc**, xuất MP4 đã kiểm, 3 hook trên một thân video, `content_plan.variantId` | hermes-clip | Khó | co-van **1 lần** chốt `renderPlan` trước khi code → Codex → boss-phu duyệt, xem MP4 bằng ffprobe |
| T-013 | Đổi "Kịch bản" thành **Khung content**; thêm **link video đối thủ** vào hồ sơ, có nút "Dùng làm khung content"; nối với rea-video nếu có | hermes-clip | Nhẹ–vừa | Codex → trinh-sat soát nhãn, boss-phu soi ảnh |
| T-014 | Hồ sơ sản phẩm nhiều tab (đề cũ "T-010 hồ sơ" đổi số) | hermes-clip | Vừa | Codex → boss-phu |
| T-015 | Menu theo phòng ban (đề cũ "T-009 menu" đổi số, vì T-009 đã dùng cho Codex main agent) | hermes-clip | Nhẹ–vừa | Codex → boss-phu ảnh 1366/1920 |
| T-016 | (Chờ người dùng chốt) Link mở thẳng Hermes từ Office: `hermes-clip://product/<id>` | hermes-clip + office | Nhẹ | Codex; co-van **1 lần** về an toàn của handler |

Việc chỉ sửa tài liệu hoặc STATUS: boss làm luôn hoặc giao trinh-sat. Không gọi Codex cho việc này.
