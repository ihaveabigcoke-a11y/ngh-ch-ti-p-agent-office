# T-026 — các việc con và thứ tự nghiệm thu

Một main agent. Đề gốc: T-026-gon-app-ve-luong-ra-video.md. Mỗi phần tag riêng, test phù hợp + bốn lệnh full suite, ảnh 1366/1920, tự review Office mode, commit đúng path và push main khi toàn suite đạt. Build sau hai phần đạt và cuối. Hai vòng kiểm lỗi: checkpoint/revert phạm vi, ghi blocker, chuyển phần độc lập, thử lại cuối.

| Phần | Phạm vi / tiêu chí |
|---|---|
| a | 7 menu + Cài đặt; Tín hiệu mặc định; route cũ hoạt động; công tắc nâng cao |
| b | 6 nhóm màu/icon, thẻ ảnh lượt, lịch sử, cần xử lý trước, mất kết nối giữ dữ liệu |
| c | 3 sản phẩm hôm nay, phần ngày trước; ảnh, 5 chấm, làm tiếp, kéo thứ tự |
| d | thẻ ảnh ứng viên, giá/ship/null, verdict, So sánh; Chốt không bắt mã/hạng |
| e | dán nguồn hoặc chữ; form 6 ô; chi tiết 9 tab thu gọn; video đối thủ |
| f | 3 hàng timeline, một Làm video; Muse giả tới 3 MP4 ≤3 click, 3 kỹ thuật chung thân, fallback tay |
| g | cột tài khoản động, kéo thẻ, chia đều, tải MP4/caption UTM, lưu URL đăng tay |
| h | thumbnail và 3 số, nhập nhanh/nhập nhiều; luật 48 giờ và ngưỡng null; đổi hook chung thân |
| i | một nút chính, màu/icon, ≤40 từ phần nội dung mỗi màn thường, thời gian VN, Muse một câu, ảnh thật fixture |

Đo chữ cố định toàn trang trên fixture rỗng, có tính menu; chỉ loại sáu giá trị bộ đếm là dữ liệu. Giữ cả số thô để đối chiếu. Bỏ tiêu đề và chân trang trùng trên bảy màn theo yêu cầu ẩn phần thừa; không giấu dữ liệu để qua phép đo. Ảnh fixture đầy phải tải thành công và có kích thước thật; không lấy icon/placeholder làm thumbnail video. Nghiệm thu CLI/render tách tài khoản thật.
