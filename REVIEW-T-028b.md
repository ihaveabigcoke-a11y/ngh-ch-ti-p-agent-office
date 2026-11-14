# REVIEW-T-028b — 15/11/2026

| Task | Kết luận | Bằng chứng | Việc cần sửa |
|---|---|---|---|
| T-028b lần 2 | Đạt | ss biến mất sau xác nhận đúng tên và reload; hai hồ sơ khác, 77 record, 56 job, 277 receipt lệnh, 13 receipt tích hợp giữ nguyên hash/số đếm; Muse bật, 0 gửi mới | Không |

Đã đọc đề, checkpoint, diff source e4cc292 và kết quả thực tế. Hai dấu bỏ qua đã được lưu lúc 00:17:59.214 / 00:18:30.448 +07 sau checkpoint lần 1; không ghi lại. Lý do: **bỏ qua theo xác nhận người dùng: hồ sơ bị ban**. Giữ raw needs_attention để không giả nhận kết quả thành công.

Sửa duy nhất guard xóa còn bỏ sót dấu của cảnh; reader local-owner chỉ dùng trong main process, đọc mới đồng bộ và kiểm lại sau kiểm đường dẫn/trước transaction. Không endpoint mới, không sửa schema/theme/font hoặc dữ liệu lịch sử. Kiểm tên, path confinement, khóa đang chạy và hồ sơ khác giữ nguyên. Test phủ ca ngược/nguồn lỗi/thời điểm mới và receipt/file giữ nguyên; không giảm assertion.

Typecheck đạt; domain 275, API 29, desktop 511 (OpenMontage local bật trong suite), tổng 815 đạt/0 lỗi/0 skip. Build 01:56:09 +07 cây sạch/app tắt; launcher thật mở lại đúng checkout. UI 1366/1920, xác nhận và reload đạt; không console error/alert quan sát được. Lần fixture đầu bị 422 do thiếu receipt, đã bổ sung dữ liệu đúng guard và chạy lại.

## Rủi ro và phần chưa kiểm

- Skip chỉ đánh dấu bỏ đối soát; không chứng minh Muse đã xử lý hay trả video. Không phục hồi/đăng nhập/đo quota hoặc gửi lượt mới.
- Đối chiếu số đếm/hash qua app; không quét thư mục media hoặc giải mã toàn bộ file thật. App tự xóa đúng hồ sơ theo quyền người dùng, không thao tác trực tiếp AppData/DB/profile.
- Không có thao tác tay còn bắt buộc cho T-028b. App giữ Muse bật và hàng chờ đang dừng, không khởi động T-031.

Review không đổi HEAD e4cc292, nhánh main hoặc stash (rỗng); source commit đã có trước review kết quả cuối. data/ và evidence/ không thay đổi. Báo cáo chi tiết ở app ops/office/reports/T-028b.md; bằng chứng mới chỉ local D:/hermes-wt/artifacts/T-028b/run2-*.
