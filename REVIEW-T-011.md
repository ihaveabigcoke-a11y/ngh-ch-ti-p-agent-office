# T-011 — tự review theo hermes-night-review, Office mode

Phạm vi code `before-T-011..7007d08`, baseline `4f759c3`. Main agent tự đọc diff và ảnh; không có reviewer độc lập.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| Trong app, giữ theme/font | Đạt | Hai mục Phòng sản xuất/Tín hiệu trong `components/lab/app.tsx`, component `office-views.tsx`, CSS dùng biến theme hiện có. Patch phòng ban chỉ tham khảo. |
| Hôm nay 3/3 · Đang triển khai 4 | Đạt | Fixture today 3 theo hạng, active 4; tìm tên/mã và ngày, chuyển từ thẻ sản phẩm sang đúng bộ lọc lượt. Một mục Sản phẩm với bộ đếm. |
| Tín hiệu và lịch sử | Đạt | Lọc sản phẩm và trạng thái giao nhau, đủ 10 nhóm; provider unknown hiện Chưa biết, ready thiếu asset chưa vào Thư viện. Modal ID, giờ, lịch sử, asset/take, lý do cần xử lý và sao chép ID. |
| Dữ liệu cũ/mất kết nối/demo | Đạt | Cũ quá 3 phút, mất kết nối giữ view cuối, schema/version và cấu trúc lồng sai bị từ chối. Test chuyển demo/local không trộn lượt. |
| Lượt local thật đổi nhóm | Đạt | MP4 kỹ thuật mới 720×1280/1 giây qua ManualMedia, unmatched → received; UI attention → library sau **4937 ms**. ID/hash lượt giữ nguyên, file nguồn giữ SHA-256, có asset/take và giờ sự kiện cuối. |
| Kiểm hồi quy | Đạt | Trên cây sạch `7007d08`: typecheck; domain 213/213; API 28/28; desktop 477 pass / 1 skip / 0 fail. T-010 UI kiểm lại 4 PNG; T-011 13 PNG, 0 lỗi trang/request ngoài. |

Bằng chứng trong app `outputs/T-011-acceptance`: `result.json`, `before.json`, `after.json`, 13 PNG, các log suite và `build-result.json`. Bản ghi build cuối theo SHA/giờ trong STATUS. Báo cáo app `ops/office/reports/T-011.md`.

Hai test regression mới kiểm schema/freshness và các trường lồng sai; không xóa test hoặc giảm assertion. Selector T-010 được giới hạn vào khối nghiên cứu do sidebar nay có cùng nhãn bộ đếm. Đã sửa tiêu đề lặp sau khi soi ảnh. Data/evidence/media/dependencies không đổi, không truy cập AppData/profile/SQLite người dùng. Không ghi snapshot sang repo khác.

Rủi ro/giới hạn: media và DB/profile là kiểm riêng, MP4 mới sinh bằng FFmpeg. Chưa Electron trên dữ liệu thật, Muse/Meta/Codex/Gemini thật, file Flow/Gemini mới và Thùng rác thật. OpenMontage thật thiếu cấu hình nên skip; không coi đó là đạt. Compose done vẫn Chưa phân loại theo hợp đồng; raw diagnostic ở màn tác vụ gốc.

Trong bước review chỉ đọc, HEAD giữ `7007d08`, nhánh `main`, stash list rỗng trước/sau. Commit tài liệu và build là bước triển khai tiếp sau. Không push/merge. Dừng trước T-012; không có mục Cần sửa còn mở.
