# Prompt dán vào ChatGPT (chế độ điều khiển máy tính / Codex Desktop): khảo sát đủ chức năng MeosuVideoQTshop

Dán nguyên khối dưới đây:

---

Bạn giúp tôi khảo sát MỘT phần mềm Windows tôi đã mua từ tác giả: **MeosuVideoQTshop** (thư mục `C:\Users\ADMIN\Downloads\MeosuVideoQTshop-latest (1)\MeosuVideoQTshop-v5.2`, file chạy `MeosuVideoQTshop.exe`). Mục tiêu: **liệt kê TẤT CẢ chức năng của TẤT CẢ 11 menu bên trái** để tôi học ý tưởng cho app riêng của tôi (Hermes Clip). Chỉ quan sát và ghi lại, và dùng nó để làm việc thật.

## Luật an toàn (bắt buộc, dừng và hỏi tôi nếu không chắc)
2.  không bấm "cập nhật", không bấm mua/thanh toán, không bật "token bổ sung", không đăng bài, không gửi tin nhắn, không tạo tài khoản mới, không thêm proxy.
3. Không cho nó mở trình duyệt Chrome đăng nhập trang ngoài; nếu nó tự mở cửa sổ trình duyệt đòi đăng nhập thì **đóng lại** và ghi "yêu cầu đăng nhập".
4. Không sửa, xoá, di chuyển file ngoài thư mục của nó; không chạy file `.ps1/.bat/.py` trong thư mục; chỉ mở đúng `MeosuVideoQTshop.exe`. Nếu hiện hộp thoại quyền quản trị (UAC), tường lửa, hay yêu cầu cài thêm: **từ chối và dừng**, báo tôi.
5. Dùng dữ liệu giả (prompt thử như "a red apple on a table"); không dùng ảnh người thật.

## Việc cần làm
Đi **lần lượt từng menu** theo thanh bên trái: Tạo ảnh · Tạo video · Video dài · All Media · Nhân vật · Thư viện · Tài khoản · Hướng dẫn · Cài đặt · Remix video · Clone video. Với mỗi menu:
- Chụp màn hình toàn màn hình (đặt tên `01-Tao-anh.png`, `02-Tao-video.png`…); chụp thêm từng hộp thoại/menu xổ/tab con khi bấm vào.
- Ghi **nhãn nguyên văn** từng nút, tab, ô nhập, công tắc, giá trị mặc định, giới hạn (số ảnh, độ dài, tỉ lệ, số ký tự), thứ tự thao tác, thông báo lỗi, mẹo hiển thị.
- Bấm thử **mọi nút không gây hại** (mở menu xổ, tab lọc, hộp "Mẫu prompt", "Dán link hội thoại" (để trống, chỉ xem), "Chỉnh sửa tác vụ", "Tạo lại", chọn nhiều → thanh công cụ…). Với thao tác cần tài khoản/Internet: ghi "cần đăng nhập" và dừng, không cố vượt qua.
- Đặc biệt ghi kỹ (tôi chưa thấy nội dung): **Video dài** (cách nối cảnh, khung cuối thành khung đầu, "AI tách cảnh", tự viết từng cảnh, số cảnh, thời lượng mỗi cảnh), **All Media**, **Remix video**, **Clone video**, **Nhân vật** (thêm nhân vật, @tên, "Giữ nguyên nhân vật"), **Tạo & chạy** (menu xổ mũi tên), **Hướng dẫn** (từng mục), **Cài đặt** (từng ô).
- Với mỗi tính năng, cho biết nó cần gì (ảnh, văn bản, tài khoản), tạo ra gì, và bạn làm thật thì nó ra kết quả như nào hình dáng ra sao.

## Kết quả cuối (ghi vào `D:\hermes-wt\meosu-frames\chatgpt\KET-QUA.md`, kèm ảnh cùng thư mục)
1. Bảng: **Menu → tính năng → mô tả → đã bấm làm/chưa → cần đăng nhập?**
2. Quy trình từng bước cho: tạo ảnh, tạo video, Video dài, Nhân vật, Remix, Clone.
3. Danh sách **tất cả lỗi/cảnh báo**
4. Cuối cùng: **mọi thứ bạn thấy app tự kết nối ra ngoài** (hộp thoại mạng, địa chỉ nếu hiện)
5. Đóng app sạch sẽ khi xong. Đừng giữ app chạy nền.

Làm chậm, từng menu một, xong menu nào ghi menu đó ngay. Nếu bị chặn ở đâu thì ghi lại và đi tiếp menu sau.

---

Sau khi ChatGPT xong, đưa thư mục `D:\hermes-wt\meosu-frames\chatgpt\` (ảnh + KET-QUA.md) cho Claude: các agent Sonnet xem ảnh, Opus gộp vào kế hoạch, rồi Codex làm.
