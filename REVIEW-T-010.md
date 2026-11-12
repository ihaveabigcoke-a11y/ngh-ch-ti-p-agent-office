# T-010 — tự review theo hermes-night-review, Office mode

| Việc | Kết luận | Bằng chứng |
| --- | --- | --- |
| Chọn theo ngày/mã/hạng | Đạt | `4f759c3`: giữ ID cũ, productKey optional; giao dịch BEGIN IMMEDIATE; giới hạn 3/ngày, rank duy nhất, retry/xung đột không tạo trùng |
| View nội bộ | Đạt | Hàm thuần, route đã xác thực, fixture 3 hôm nay + 1 hôm qua; 10 nhóm, history 20, số chưa biết null; không writer file |
| Hồi quy / UI | Đạt | typecheck; domain 213; API 28; desktop 475 pass/1 skip/0 fail; 4 PNG 1366/1920 và lưu form qua HTTP local |

Main agent đọc diff và ảnh, không có reviewer độc lập. Không xóa/nới assertion; đã sửa hai lỗi hiển thị legacy trong code. Data/evidence/media/dependency giữ nguyên. Build từ cây sạch, app tắt, `4f759c3`, lúc 02:24:51 13/11/2026 +07.

Giới hạn: fixture/SQLite kiểm riêng; chưa Electron trên dữ liệu thật, chưa Muse/Meta/dịch vụ thật. Mốc media local thật và hai màn mới được nghiệm thu sau T-011. Compose `done` không có mapping trong hợp đồng nên giữ Chưa phân loại; gói prompt không được tính MP4. Không có rủi ro xóa dữ liệu cũ do migration; legacy thiếu ngày/rank không bị tự điền.

Review không đổi HEAD/nhánh/stash; commit/build được thực hiện ở bước triển khai sau review. Không push/merge. Khóa T-010 chính phiên đã nhả để sang T-011.
