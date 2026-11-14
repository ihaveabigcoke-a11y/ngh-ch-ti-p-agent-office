# M-20261114-video-type — phân biệt clip video và ảnh xem trước tài liệu

Tiếp nối yêu cầu sửa Muse và kiểm thật. Hai lượt thật đã có receipt nhưng Hermes không tải được. Đối chiếu URL qua UI xác nhận đúng hội thoại; Muse trả Markdown/gói prompt, không MP4. Công tắc vẫn bật. Không gửi lại hai lượt đó.

Phạm vi: desktop/src/muse.mjs và test. Job video chỉ nhận thẻ chứa video; job ảnh giữ đường ảnh. Receipt cũ trỏ tài liệu có badge MD/PDF/TXT... phải trả NO_MEDIA với phản hồi thật, không chờ nút tải video. Giữ tất cả dữ liệu/receipt, không đổi vùng/quota hay tắt Muse.

Tiêu chí: kiểm DOM thật tài liệu/ảnh/video; không tải tài liệu như MP4; full suite đạt; build sạch/app không active; nạp lại giữ Muse bật; đối soát hai receipt cũ qua app, không gửi prompt mới. Push đúng phạm vi, ảnh 1366/1920, tự review Office mode.

Kết quả: app 92307c6 đã push, 807 kiểm khác nhau đạt, build 23:29:59 +07. Hai receipt thật được kiểm không gửi mới, cùng trả MUSE_NO_MEDIA; Muse bật, dữ liệu cũ giữ checksum. 8 ảnh fixture + 4 ảnh app thật 1366/1920. Tiêu chí sửa adapter đạt; chưa có clip Muse mới/3 MP4 mới. Chi tiết phần đã kiểm/chưa đạt tại STATUS và REVIEW-M-20261114-video-type.md. App để mở, không tắt Muse.
