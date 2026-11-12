# T-011: Tín hiệu & Phòng chờ và Phòng sản xuất trong Hermes

- **Repo / tầng:** hermes-clip · React UI và route local hiện có.
- **Người giao:** người dùng trực tiếp · **Thực hiện / tự review:** một main agent Codex · **Ngày:** 13/11/2026.

## Mục tiêu
Người dùng đọc tiến độ theo lượt chạy hoặc theo sản phẩm ngay trong app. Dùng dữ liệu `buildOfficeView` của T-010, không tạo app/repo Office riêng và không ghi snapshot ra file.

## Phạm vi
- Làm hai màn, bộ lọc, chi tiết, lịch sử, bộ đếm thanh bên, cập nhật khi workspace đổi và mỗi 5 giây khi mở màn.
- Patch `production-office-phong-ban.patch` chỉ tham khảo tổ chức thanh bên/phòng ban, bộ lọc và thẻ. Không áp patch, không port engine storyboard hoặc chín tab hồ sơ.
- Không sửa workflow tạo/duyệt/đăng ngoài phạm vi; không Muse, API trả phí, dữ liệu/profile thật; không push/merge.

## Bố cục giao diện
- Thanh bên có đúng một mục Sản phẩm, kèm `Hôm nay n/3`; thêm hai lối vào mới cạnh công việc sản xuất hiện có.
- Tín hiệu & Phòng chờ: đầu trang có giờ cập nhật và nhãn trực tiếp/cũ/mất kết nối/mô phỏng; lọc sản phẩm + nhóm đồng thời; các nhóm có số lượt và nhãn chữ; danh sách lượt và dialog lịch sử.
- Phòng sản xuất: đầu trang `Hôm nay 3/3 · Đang triển khai 4`, nút Đợt hôm nay / Đang triển khai; thẻ tên/mã/hạng/giai đoạn/ngày chọn/lượt chọn/việc cần xử lý. Bộ lọc ngày và tìm tên/mã. Bản xuất và bài đăng ghi đơn vị riêng.
- Giữ theme/font, nhãn Việt có dấu. Ảnh 1366 và 1920 px; modal đọc được, không tràn ngang trang.

## Tiêu chí đạt
- [x] Fixture hôm nay 3, hôm qua 1 khác: `Hôm nay 3/3 · Đang triển khai 4`; today view 3 theo hạng, active view 4.
- [x] Hai bộ lọc lượt chạy giao nhau; đủ 10 nhóm, `ready` thiếu asset chưa vào Thư viện; provider/metric chưa biết ghi Chưa biết.
- [x] Chi tiết có ID, sự kiện cuối/giờ cập nhật, tối đa 20 sự kiện, lý do cần xử lý, asset/take khi có; chỉ đọc và sao chép ID.
- [x] Mất kết nối giữ view cuối, không trộn demo và thật; dữ liệu >3 phút có nhãn cũ; API sai schema/version không nhận.
- [x] Một MP4 mới kiểm local qua pipeline ManualMedia thật (DB/profile kiểm riêng, không dịch vụ/tài khoản thật) đổi unmatched → received; trong ≤1 phút màn Tín hiệu đổi attention → library, giữ ID/hash, có ảnh trước/sau và JSON view không nhạy cảm.
- [x] Test phù hợp, typecheck, full suite và local:build đạt sau commit/cây sạch; không giảm assertion.
- [x] Main agent tự review Office mode, cập nhật STATUS SHA/giờ build/đã kiểm/chưa kiểm; nhả khóa chính phiên. Dừng trước T-012.

## Cách kiểm
```powershell
pnpm typecheck
pnpm test
pnpm test:api
pnpm test:desktop
pnpm local:build
node scripts/check-t011-ui.mjs
```
Chạy test với FFmpeg trong PATH; các script UI phải tạo profile Chrome mới trong outputs và chặn request ngoài.

## Báo cáo
- Đã thay đổi: code 7007d08; hai màn, bộ đếm sidebar, kiểm schema đầy đủ, polling, trạng thái kết nối; CLAUDE.md cập nhật hướng trong app. Báo cáo/context cuối a473b72.
- Đã kiểm: typecheck; domain 213/213; API 28/28; desktop 477 pass / 1 skip / 0 fail; 13 PNG 1366/1920, 0 lỗi trang/request ngoài; MP4 local mới đổi nhóm trong 4937 ms. Build a473b72 cây sạch/app tắt lúc 02:39:54 +07 13/11. Xem REVIEW-T-011.md và app outputs/T-011-acceptance.
- Chưa kiểm: dữ liệu/phiên/tài khoản thật, Electron với AppData thật.
- Cách chạy: mở hai mục mới trong app sau build cuối; không cần repo production-office.
