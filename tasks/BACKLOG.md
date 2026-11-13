# Hàng việc — cập nhật 14/11/2026

Chế độ CODEX-BOSS: một main agent, không phân vai/delegation. Chỉ đạo người dùng 04:00 thay các mốc dừng cũ. Office ở trong Hermes; không repo/snapshot ngoài, patch mẫu chỉ tham khảo.

| Việc | Trạng thái | Commit / giới hạn |
| --- | --- | --- |
| T-002–T-008, T-010/T-011 | Có từ trước, không làm lại | baseline a473b72 |
| T-012 | Xong | e29dec7; fixture và dựng từ clip Muse cũ |
| T-023 | Xong phần app | ea5d1ea; Muse giả kiểm quota/từ chối/timeout |
| M: Muse mới | Kẹt dịch vụ | f098843; 1 gửi/0 clip mới/2 lỗi, Tạm dừng hạn chế vùng |
| T-017 | Xong draft | 6c09a9f / 8a8755b; 9 ô fixture, ba draft thật chưa đăng |
| T-013 | Xong | fb7829a |
| T-014 | Xong | dbf3b55 |
| T-015 | Xong | c307a96 |
| T-018 | Xong | 04ddc1f; ngưỡng mặc định null |
| T-019 | Xong | 3b4d68b; preview và import nguyên lô |
| T-020 | Xong | 47bb61a; 10 bước/13 fixture |
| T-021 | Xong | c5be1da; 13 link hướng dẫn |
| T-022 | Review/build cuối | SHA và suite/build cuối ở STATUS |
| T-022a | Xong | c0474fb; test rủi ro, chống trùng thời điểm khác ISO offset |
| T-022b | Xong | c5958fd; bảy màn trống, 14 PNG |
| T-022c | Xong | 8ec2aa5; sửa bảng/role lỗi, axe sáu trạng thái, 18 focus, 8 PNG |
| T-016 | Bỏ qua ngoài danh sách | Không làm deep-link repo Office ngoài |
| T-024 | Xong | d95f16e; giữ phần đã đạt |
| T-024b / T-025 | Được thay bởi T-026 | Không chạy lại đề cũ hoặc nghiệm thu Muse thật |
| T-026a–i | Xong và đã push | 8142ff3; 786 đạt/1 skip/0 lỗi ở mốc 13/11 |
| T-026j | Xong và đã push | 7b8fd40 + 22e66a4; 787/0/0; 28 axe, ảnh 200%/tương phản, tải/caption, đổi hook tới MP4, build/launcher đạt |

Hai ngưỡng tín hiệu giữ null theo thống nhất ngày 14/11; không cần người dùng quyết ngay, không chặn làm video. Không tự thêm tính năng. Quyền video Muse/khu vực, SKU/nội dung và tài khoản/landing chỉ cần xác minh trước nghiệm thu dịch vụ hoặc đăng thật; không thuộc các kiểm local T-026. SAC đã tắt, Electron chạy; không chỉnh bảo mật thêm. Các task code không mở dữ liệu thật.
