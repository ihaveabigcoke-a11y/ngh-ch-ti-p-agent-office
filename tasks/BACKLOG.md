# Hàng việc tiếp theo và phân vai (13/11/2026)

Thứ tự theo mốc nghiệm thu đầu tiên trong `CLAUDE.md` của hai repo. Cột *Phân vai* chỉ áp dụng ở chế độ `CLAUDE-BOSS`. Ở `CODEX-BOSS`, một main agent làm tuần tự từ trên xuống.

| # | Việc | Repo | Độ khó | Phân vai (CLAUDE-BOSS) |
|---|---|---|---|---|
| T-010 | Đợt chọn theo ngày VN, `productKey` người dùng tự gán, `rank` người dùng tự xếp, bộ đếm n/3; `buildOfficeSnapshot` + ghi `live/snapshot.json` nguyên tử | hermes-clip | Vừa–khó | trinh-sat (Haiku) đọc lại schema ở HEAD → Codex code → boss-phu (Sonnet) duyệt. co-van (Opus) **1 lần** nếu phải đổi khoá sản phẩm của record cũ |
| T-011 | Office đọc snapshot: tươi/cũ/mất kết nối/mô phỏng, Tín hiệu & Phòng chờ theo lượt, Phòng sản xuất (Đợt hôm nay / Đang triển khai), gỡ nút ghi | production-office | Vừa | Codex → boss-phu duyệt + ảnh 1366/1920. Không cần Opus |
| — | **Mốc nghiệm thu 1:** lượt thật đổi trạng thái thì Office hiện đúng; fixture ra "Hôm nay 3/3 · Đang triển khai 4" | cả hai | — | boss chạy thật cùng người dùng; trinh-sat ghi STATUS |
| T-012 | Một video xuyên suốt: `renderPlan`, chọn đoạn in/out, cắt + ghép + đè chữ, **giữ tiếng gốc**, xuất MP4 đã kiểm, 3 hook trên một thân video, `content_plan.variantId` | hermes-clip | Khó | co-van **1 lần** chốt `renderPlan` trước khi code → Codex → boss-phu duyệt, xem MP4 bằng ffprobe |
| T-013 | Đổi "Kịch bản" thành **Khung content**; thêm **link video đối thủ** vào hồ sơ, có nút "Dùng làm khung content"; nối với rea-video nếu có | hermes-clip | Nhẹ–vừa | Codex → trinh-sat soát nhãn, boss-phu soi ảnh |
| T-014 | Hồ sơ sản phẩm nhiều tab (đề cũ "T-010 hồ sơ" đổi số) | hermes-clip | Vừa | Codex → boss-phu |
| T-015 | Menu theo phòng ban (đề cũ "T-009 menu" đổi số, vì T-009 đã dùng cho Codex main agent) | hermes-clip | Nhẹ–vừa | Codex → boss-phu ảnh 1366/1920 |
| T-016 | (Chờ người dùng chốt) Link mở thẳng Hermes từ Office: `hermes-clip://product/<id>` | hermes-clip + office | Nhẹ | Codex; co-van **1 lần** về an toàn của handler |

Việc chỉ sửa tài liệu hoặc STATUS: boss làm luôn hoặc giao trinh-sat. Không gọi Codex cho việc này.
