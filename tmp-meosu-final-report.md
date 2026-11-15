# MeosuVideoQTshop v5.2 — kết quả khảo sát và thử thật, 15/11/2026

Đã đi **11/11 menu**, chụp màn hình và các hộp thoại/tab đã mở. Đã chạy thật **Tạo ảnh, Tạo video, Video dài, Remix**; đã ghép video trong **Thư viện**. Có file để xem và kiểm giải mã, không chỉ ảnh chụp trạng thái. **Không đồng nghĩa mọi nút hoặc mọi tổ hợp đã chạy thành công**: All Media vẫn báo hết phiên; Clone mới kiểm đầu vào/giao diện, chưa gọi Gemini API; các thao tác bị cấm được ghi rõ chưa bấm.

Thư mục bàn giao: `D:\hermes-wt\meosu-frames\chatgpt\`. Ảnh toàn màn hình/JSON điều khiển và dữ liệu REA chỉ lưu local, không đưa lên GitHub; ảnh có thể chứa thông báo Windows hoặc định danh hiển thị trong UI. Không sửa source Hermes trong khảo sát này.

## Mở kết quả trước

| Kết quả | File tương đối trong bộ bàn giao | Đã kiểm và hình dáng |
|---|---|---|
| Gốc → Remix, bản dễ so sánh nhất | [truoc-sau-remix.mp4](ket-qua-that/truoc-sau-remix.mp4) | 20,023s; 720×1280; 24fps; 3.740.462 byte. Nửa đầu táo/bàn gỗ, nửa sau táo/bàn đá trắng/nền xanh. App ghép đúng 2 clip, giải mã đủ exit 0. |
| Ảnh tạo thật | [anh-qua-tao.png](ket-qua-that/anh-qua-tao.png) | 1152×2048; táo đỏ có giọt nước, bàn gỗ/khăn vải, nền sáng mờ. Đã mở xem. |
| Video từ prompt | [qua-tao-1.mp4](ket-qua-that/qua-tao-1.mp4), [qua-tao-2.mp4](ket-qua-that/qua-tao-2.mp4) | 10s và 8s; cùng 720×1280/H.264/AAC. Táo đỏ trên bàn gỗ, bếp mờ, camera lùi dần. Hai file không được coi là hai ý tưởng độc lập. |
| Video dài hai cảnh | [video-dai-2-canh.mp4](ket-qua-that/video-dai-2-canh.mp4) | 20,023s, 5.215.054 byte; đã bấm Xem video trong Meosu, giải mã đủ. Cảnh 2 đổi góc quanh táo. **Cảnh 1 trùng từng byte clip gốc 10s**; chưa xác định nguyên nhân chọn lại media. |
| Remix | [remix-qua-tao-1.mp4](ket-qua-that/remix-qua-tao-1.mp4), [remix-qua-tao-2.mp4](ket-qua-that/remix-qua-tao-2.mp4) | 10s/8s; đổi thành bàn đá trắng vân xám và nền/vải xanh đúng prompt ở các khung đã xem. Giải mã đủ, hash khác clip gốc. |
| Ghép thử đầu tiên | [ghep-thu-3-clip.mp4](ket-qua-that/ghep-thu-3-clip.mp4) | Giữ lại bản 28s: helper đã chọn 3 clip thay vì 2. Không coi đây là lỗi ghép của app; sau đó chọn lại đúng hai clip và xuất tên khác. |

![Gốc và Remix ở các thời điểm](ket-qua-that/truoc-sau-contact.png)

Probe, SHA-256, decode exit nằm trong `ket-qua-that/verification.json` và `*-verification.json`. Tiếng có AAC, giải mã được; bản ghép đo mean −47,1dB / peak −27,5dB, khá nhỏ. **Chưa nghe và nhận xét nội dung tiếng**, chưa đánh giá lip-sync. Không chứng nhận chất lượng thương mại hoặc giữ đúng SKU.

## Bảng chức năng, đầu vào/đầu ra và mức kiểm

“Đã xem” nghĩa là mở giao diện, không phải đã dùng dịch vụ thành công. Giá trị ghi nhận là của phiên đang chạy; chỉ ghi “mặc định HTML” khi lấy từ thuộc tính HTML, không suy rộng sang cài mới.

| Menu | Tính năng / nhãn nguyên văn | Mô tả, cần gì → tạo ra gì | Đã bấm làm/chưa | Cần đăng nhập? |
|---|---|---|---|---|
| Chung | Dự án; Dự án mới | Tên → nhóm tác vụ/media riêng | Đã tạo dự án khảo sát | Không cho thao tác local |
| Chung | Mở thư mục kết quả; Thêm; Đổi tên dự án; Đánh lại số thứ tự | Quản lý nhóm và tên/số thứ tự | Xem nhãn; không đổi dữ liệu cũ | Không |
| Chung | Chạy tất cả; Dừng; Tạm dừng giao việc; Dừng tất cả | Điều khiển hàng đợi | Chạy riêng tác vụ thử; không dừng Muse | Có khi gửi |
| Chung | Xoá dự án; Xoá | Xoá dữ liệu | Không bấm | Không |
| Chung | Có bản mới 5.5 | Cập nhật phần mềm | Không bấm theo yêu cầu | Mạng |
| Chung | Nhật ký; Sao chép; Xoá | Nhật ký runtime | Quan sát nhật ký; không xoá | Không |
| Tạo ảnh | Tự do; Prompt | Mỗi dòng một prompt; đếm prompt/ký tự → ảnh | Đã tạo PNG thật | Muse |
| Tạo ảnh | Người mẫu | Ảnh người mẫu cố định + ảnh luân phiên, tên nhóm “bộ đồ” → ảnh biến thể | Đã mở; chưa dùng ảnh người | Muse khi chạy |
| Tạo ảnh | Ảnh tham chiếu; Thêm ảnh; Thư mục; Bỏ hết | Chọn/kéo thả ảnh hoặc thư mục | Đã xem; thử chọn file ở Nhân vật/Video dài | Không khi chọn |
| Tạo ảnh | Giữ nguyên nhân vật | Prompt nhắc tên/@tên → tự kèm ảnh đã lưu | Đã xem công tắc; chưa chứng minh độ nhất quán | Muse khi chạy |
| Tạo ảnh | 9:16; 16:9; 1:1; 4:3; 3:4 | Tỷ lệ; phiên đang chọn 9:16 | Đã xem, chạy 9:16 | Muse khi chạy |
| Tạo ảnh | Cài đặt nâng cao; Ký tự ngăn cách prompt nhiều dòng; Ghép cặp; Dùng chung | Ngăn cách trống, ví dụ ===; ghép ảnh-prompt hoặc dùng chung | Đã mở; chưa chạy mọi tổ hợp | Không khi chỉnh |
| Tạo ảnh | Mẫu prompt; Lưu prompt thành mẫu | Lưu/chọn mô tả dùng lại | Đã mở hộp mẫu/menu; chưa xác minh lưu và mở lại mẫu | Không |
| Tạo ảnh | Dán link hội thoại; Tiếp tục hội thoại từ link | URL mỗi dòng, đúng tài khoản sở hữu → tiếp tục hội thoại | Đã mở, để trống | Muse |
| Tạo ảnh | Viết bằng AI | Kịch bản video (phân cảnh) / Viết prompt từ ý tưởng / Phim ngắn (nhiều cảnh) | Đã mở cả ba tab; chưa gửi AI | Muse |
| Tạo ảnh | Tạo & chạy; Chỉ thêm vào hàng đợi | Tạo tác vụ rồi chạy, hoặc lưu chưa chạy | Đã dùng cả lưu local và chạy tác vụ riêng | Muse khi chạy |
| Tạo ảnh | Chỉnh sửa tác vụ; Lưu; Lưu & chạy lại; Tạo lại | Sửa prompt/tỷ lệ rồi lưu hoặc sinh lại | Đã mở hộp sửa; chưa gửi tạo lại | Muse khi chạy lại |
| Tạo ảnh | Chi tiết kết quả; Tải xuống; Thư mục; Sao chép; Xem lớn | Xem prompt, ảnh tham chiếu và từng file | Đã xem kết quả; app tự lưu PNG | Không với file đã lưu |
| Tạo ảnh | Tìm prompt hoặc số thứ tự…; Mới nhất; Cũ nhất; Theo trạng thái | Tìm/lọc/sắp xếp hàng đợi | Đã mở menu; chưa mọi bộ lọc có dữ liệu | Không |
| Tạo ảnh | Chọn & thao tác hàng loạt | Chọn hiện tại/lỗi/chưa chạy; Chạy/Dừng/Tạo lại lỗi/Xoá/Bỏ chọn | Đã chọn nhiều và xem menu; không xoá | Tùy hành động |
| Tạo video | Tự do | Prompt → clip; không thấy ô thời lượng video thường | Đã chạy riêng #002, hai MP4 10s/8s | Muse |
| Tạo video | Người mẫu | Ảnh cố định + luân phiên → video | Đã mở, chưa chạy | Muse |
| Tạo video | Ảnh đầu–cuối | Hai ảnh + chuyển động tùy chọn; một dòng một video | Đã mở; chưa chạy cặp khung | Muse |
| Tạo video | Đồng bộ giọng nói; Bật/tắt | Mô tả giọng + luật khớp miệng vào prompt; tooltip nói không có voice ID | Đã mở/bật để xem rồi trả trạng thái ban đầu; chưa kiểm tiếng | Muse khi chạy |
| Tạo video | Giọng mẫu / giọng đã lưu; Lưu giọng đang chọn; Xoá giọng đã lưu đang chọn | Giới tính/tuổi/vùng/cao độ/chất giọng/tốc độ/cảm xúc/kiểu nói → mô tả | Đã xem; không xoá giọng | Không khi sửa mô tả |
| Tạo video | Ghép; Lấy link; + Hội thoại; Chạy; Dừng; Xoá; Bỏ chọn | Thanh công cụ chọn nhiều | Đã mở; Ghép lúc chưa có video báo lỗi đúng | Tùy hành động |
| Tạo video | File 1; File 2; Phát | Chuyển file kết quả, phát trong viewer | Đã xem và phát MP4 | Không |
| Video dài | Ảnh gốc; Tự viết từng cảnh | Khung đầu + mỗi dòng một cảnh → chạy tuần tự rồi ghép | Đã chạy 2 cảnh, file 20,023s | Muse |
| Video dài | AI tách cảnh; Ý tưởng tổng; Số phân cảnh | Ý tưởng → Muse Chat chia cảnh; mặc định 5, HTML min 2/max 12 | Đã mở; chưa gửi AI tách cảnh | Muse |
| Video dài | Tên video; Dựng video dài; Xem video | Tên tùy chọn, theo dõi cảnh và mở MP4 cuối | Đã thử thiếu ảnh, sau đó hoàn tất có ảnh | Muse khi dựng |
| Video dài | Khung cuối cảnh trước → khung đầu cảnh sau | Luật nối trong mô tả UI; ~10s/cảnh, 5 cảnh ≈4–6 phút là ước lượng của app | Hai cảnh thực; chưa chứng minh tất cả continuity/nhân vật | Muse |
| All Media | Tài khoản Muse; Tải lại danh sách; Tìm cuộc trò chuyện… | Phiên → danh sách/tìm hội thoại | Đã mở; báo phiên hết | Có, đang bị chặn ở màn này |
| All Media | Cuộc trò chuyện mới; Mở trong Chrome; Tải lại cuộc trò chuyện | Mở/chọn/tiếp tục chat | Xem nhãn; không mở Chrome đăng nhập | Muse |
| All Media | Chat AI; Tạo ảnh; Tạo video; Tỷ lệ khung hình | Chế độ gửi, 9:16 Dọc đang chọn; Enter gửi/Shift+Enter xuống dòng | Đã xem; chưa gửi ở màn này | Muse |
| All Media | Đính kèm ảnh tham chiếu; Đính kèm video tham chiếu; Viết kịch bản / prompt bằng AI; Gửi | Prompt + file tùy chọn → phản hồi/media | Xem nhãn; chưa chạy | Muse |
| All Media | Chọn tất cả; Tất cả; Ảnh; Video; Tải xuống (n); Ghép (n) | Lọc/chọn media hội thoại → tải/ghép | Vùng rỗng 0; chưa kiểm dữ liệu live ở màn này | Muse để lấy media |
| All Media | Bắt khung hình từ video này; Tạo video từ ảnh này; Đổi khuôn mặt | Các hành động media được thấy trong mã frontend; có −/+1 giây, −/+1 khung, Bắt khung hình này | **Chỉ đọc tĩnh**, chưa xuất hiện với media hợp lệ trong UI khảo sát | Tùy hành động; đổi mặt/tạo video cần Muse |
| Nhân vật | Thêm nhân vật; Tên nhân vật; Ghi chú (tuỳ chọn) | Tên + ảnh → thẻ có @tên | Đã thêm SurveyApple bằng PNG ô đỏ giả | Không |
| Nhân vật | Giọng nói (cho video — tự chèn nguyên văn vào prompt khi nhắc tên) | Giọng mẫu và mô tả tay → prompt có giọng | Đã mở; chưa xác minh âm thanh | Muse khi sinh |
| Nhân vật | Ảnh nhân vật; Lưu nhân vật; Huỷ | Khuyến nghị 1–3 ảnh rõ mặt, không xác nhận giới hạn cứng | Thử thiếu ảnh báo lỗi, sau đó lưu thành công fixture không có người | Không |
| Nhân vật | Sửa; Xoá; @tên | Quản lý thẻ, gọi tên trong prompt | Xem nhãn; không sửa/xoá nhân vật cũ; chưa chạy @tên | Không/Muse khi sinh |
| Thư viện | Tất cả; Ảnh; Video; Mọi dự án | Lọc kết quả của dự án hoặc tất cả | Đã lọc, xem kết quả khảo sát; không bật mọi dự án | Không |
| Thư viện | Chọn tất cả ảnh; Chọn tất cả video; Bỏ chọn | Chọn nhiều media | Đã bấm với rỗng và có dữ liệu | Không |
| Thư viện | Ghép video đã chọn; ↑; ↓; Bỏ; Tên file kết quả; Ghép video | Nối clip; chuẩn hóa về khung clip đầu; có thể chèn im lặng | Đã ghép 3 clip rồi 2 clip thành công; giữ cả hai file | Không, ghép local |
| Thư viện | Xoá đã chọn; Mở thư mục | Xoá/mở nơi lưu | Không xoá; app tự lưu kết quả đã kiểm | Không |
| Tài khoản | Thêm tài khoản; Đăng nhập; Hiện cửa sổ Chrome; Xoá tài khoản | Quản lý phiên Chrome riêng | Chỉ xem; không tạo/xoá/đăng nhập mới | Có |
| Tài khoản | TK chạy đồng thời; Tổng luồng; Luân phiên; Lần lượt | Phiên khảo sát hiện 0 và 8; mỗi tài khoản 2 ảnh/2 video | Chỉ xem, không suy 0 là vô hạn | Muse khi chạy |
| Tài khoản | Dùng token bổ sung khi hết hạn mức tuần | Cơ chế token phụ | Không bật | Có/tiền, bị cấm trong khảo sát |
| Tài khoản | Hết hạn mức & token vẫn tạo tiếp (chậm hơn) | Chế độ sau quota | Chỉ xem, không đổi | Có |
| Tài khoản | Bật Touch VPN trong Chrome tài khoản; Mỗi tài khoản 1 nơi ngẫu nhiên ở Mỹ | Cấu hình VPN; tooltip nói proxy thì không dùng VPN | Đã mở danh sách, không đổi/cài | Mạng |
| Tài khoản | Kiểm tra hạn mức; Kiểm tra phiên; Làm mới phiên; Dừng | Kiểm/refresh phiên và quota | Quan sát trạng thái trước/sau người dùng nạp; không tự thêm tài khoản | Có |
| Tài khoản | Proxy; Kiểm tra proxy; Hạn mức; Làm mới | Cấu hình theo tài khoản | Chỉ xem; không thêm proxy, không chép thông tin tài khoản | Có |
| Hướng dẫn | Hướng dẫn sử dụng; Tải lại | Danh sách bài, video nhúng, ngày cập nhật | Đã mở đủ 5 mục; chưa xem hết thời lượng video | Mạng, không cần login để xem trang |
| Hướng dẫn | Tổng quan; Đăng ký Muse; Lỗi khu vực; Kiểm tra tài khoản; Ảnh đầu–cuối | Năm bài cụ thể giữ nguyên nhãn trong nhật ký bên dưới | Đã bấm từng bài/chụp; không làm theo bước đăng ký/VPN | Tùy bài |
| Cài đặt | Nơi lưu ảnh & video; Chọn…; Mặc định; Mở; Chuyển file cũ sang thư mục mới | Đường dẫn trống = outputs cạnh app | Xem toàn trang, không đổi/di chuyển | Không |
| Cài đặt | Số lần tự thử lại khi lỗi | Phiên =1; HTML 0–5 | Đã đọc, không sửa | Không |
| Cài đặt | Giới hạn thời gian tạo ảnh (giây) | Phiên =300; HTML min 60 | Đã đọc | Không |
| Cài đặt | Giới hạn thời gian tạo video (giây) | Phiên =1800; HTML min 120 | Đã đọc | Không |
| Cài đặt | Lưu cài đặt; Đổi key; License key; Hạn dùng; Mã máy | Lưu cấu hình/bản quyền | Không lưu/đổi key; không chép định danh | Tùy hành động |
| Cài đặt | Xem lại hướng dẫn; Bỏ qua; Quay lại; Tiếp | Tour 28 bước; bước có tay trỏ bắt bấm đúng vùng sáng | Đã xem 2 bước rồi Bỏ qua; chưa đủ 28 | Không đến bước tài khoản |
| Cài đặt | Gửi thống kê ẩn danh giúp cải thiện app | Công tắc đang chọn; UI nói chỉ số lượng ảnh/video theo ngày + phiên bản | Quan sát, không đổi; chưa kiểm payload | Mạng |
| Cài đặt | Tiếng Việt; English; Kiểm tra cập nhật | Ngôn ngữ; v5.2 có thông báo 5.5 | Tiếng Việt giữ nguyên; không cập nhật | Cập nhật cần mạng |
| Cài đặt | Cài vào Claude Desktop; Cài vào Claude Code; Cài vào Codex (ChatGPT); Copy cấu hình | Nhóm MCP có trong HTML | **Chỉ đọc tĩnh, không thấy trong trang đang hiển thị; không cài** | Chưa xác minh |
| Remix video | Video tham chiếu (mỗi video một tác vụ) | MP4/MOV/WEBM + prompt; trên 6MB app nói tự thu nhỏ | Đã chạy MP4 1,31MB; chưa thử nén >6MB | Muse |
| Remix video | Ảnh tham chiếu (tùy chọn · gửi kèm mọi video) | Ảnh kèm prompt/video | Xem nhãn; chưa chạy kèm ảnh | Muse |
| Remix video | Prompt; Tạo & chạy; Mẫu prompt; Giọng; Nhân vật; Tỷ lệ; Nâng cao | Dùng lại studio để đổi cảnh/nhân vật/phong cách/lời thoại | Đã đổi bàn/nền bằng prompt; 2 MP4 thật | Muse |
| Clone video | CẤU HÌNH API KEY; LẤY KEY TỪ GOOGLE AI STUDIO | Gemini API riêng, UI nói lưu local | Đã xem ô che kín; không đọc/thay/gọi key | Gemini API, không chỉ tài khoản Muse |
| Clone video | NGUỒN VIDEO | Kéo thả/chọn MP4/MOV/WEBM → xem video 8s | Đã chọn file quả táo thành công | Không khi xem local |
| Clone video | THỜI LƯỢNG MỖI PHÂN ĐOẠN (SEGMENT) | 6/8/5/4/10s hoặc tùy chỉnh | Đã mở menu, giữ 6s | Không khi chọn |
| Clone video | PHONG CÁCH ĐÍCH | Original Style + 8 phong cách + tùy chỉnh; nhãn đầy đủ bên dưới | Đã mở menu; giữ Original Style | Không khi chọn |
| Clone video | BẮT ĐẦU SAO CHÉP & PHÂN TÍCH (6S/ĐOẠN) | Video → phân tích/prompt JSON | Chưa gửi: API riêng, chưa xác minh quyền tính phí | Gemini API |
| Clone video | JSON PROMPT; TỐI ƯU PROMPT CHO VEO; Dán prompt khác; Dán prompt bất kỳ để tối ưu | JSON/text → prompt text một dòng/cảnh | Đã mở hai tab; chưa gọi tối ưu | Gemini API khi chạy |

Nhãn/giới hạn HTML đầy đủ: [NHAN-VA-GIOI-HAN.md](NHAN-VA-GIOI-HAN.md). Cột “vùng” của file đó là vùng HTML gần nhất, **không phải luôn là menu sở hữu**: các modal dùng chung sau Cài đặt bị ghi cùng vùng `v-settings`; bảng trên đã tách theo chức năng. Các `*-controls.json` ghi UI ở từng thời điểm; không dùng HTML ẩn làm bằng chứng đã bấm.

## Quy trình đã thử và phần còn thiếu

### Tạo ảnh
1. Chọn/tạo dự án khảo sát → Tạo ảnh → Tự do.
2. Nhập `a red apple on a table`, 9:16.
3. Mũi tên cạnh Tạo & chạy → Chỉ thêm vào hàng đợi, kiểm tác vụ Chưa chạy; chọn riêng tác vụ và Chạy khi được người dùng cho phép thử thật.
4. Chờ Hoàn tất → xem kết quả/Thư viện. Kết quả: PNG táo đỏ 1152×2048.

### Tạo video
1. Tạo video → Tự do → prompt quả táo → 9:16.
2. Chỉ thêm vào hàng đợi; chọn riêng tác vụ quả táo, Chạy. Tác vụ khối xanh chỉ là nháp, không cần chạy tất cả để khảo sát.
3. Chờ Hoàn tất → File 1/File 2 → Phát. Meosu lưu hai MP4 10s/8s, không có lựa chọn thời lượng ở studio thường đã xem.

### Video dài
1. Video dài → chọn ảnh gốc `qua-tao-1-frame.png` từ kết quả thử.
2. Tự viết từng cảnh: dòng 1 camera nhẹ trên cùng bàn; dòng 2 tiếp khung trước, camera đi quanh táo. Hai dòng =2 cảnh; 9:16; tên “ChatGPT apple two scenes”.
3. Dựng video dài → app tạo dự án riêng → theo dõi cảnh 0/2 và nhật ký gửi #1/#2.
4. Chờ “Xong! Video dài (20 giây)” → Xem video. File thực 20,023s. Cảnh 1 trùng file gốc; cảnh 2 khác, không khẳng định hai cảnh đều nội dung sinh mới.
5. Nhánh AI tách cảnh đã xem giới hạn 2–12/mặc định 5, **chưa gửi chạy**. Không lấy số 4–6 phút UI làm thời gian đo thực.

### Nhân vật
1. Nhân vật → Thêm nhân vật → tên SurveyApple, ghi chú thử; không dùng người thật.
2. Lưu khi thiếu ảnh cho lỗi “Cần ít nhất 1 ảnh nhân vật”. Chọn PNG ô đỏ 128×128 → Lưu nhân vật thành công, thấy @tên và thumbnail.
3. Cách dùng do UI mô tả: bật Giữ nguyên nhân vật, nhắc tên/@tên trong prompt thì tự kèm ảnh; phần giọng được chèn nguyên văn. **Chưa chạy sinh có @SurveyApple**, chưa chứng minh giữ nhân vật/giọng.

### Remix
1. Remix video → chọn `qua-tao-2.mp4` (8s), nhập prompt tiếng Anh giữ táo/chuyển động nhưng đổi mặt bàn đá trắng/nền xanh.
2. Tạo & chạy → hàng đợi → chờ file lưu; chuyển màn rồi quay lại thấy Hoàn tất.
3. Xem hai MP4 10s/8s, kiểm các khung thấy bàn/nền đã đổi. Không gửi ảnh người hoặc video cá nhân.
4. Thư viện → chọn đúng clip gốc 10s và Remix 10s → Ghép video đã chọn → kiểm thứ tự → tên mới → Ghép video. Ra `truoc-sau-remix.mp4`, 20,023s.

### Clone
1. Clone video mở studio prompt riêng trong iframe local.
2. Chọn MP4 quả táo → player nhận 8s; xem danh sách segment và phong cách; mở JSON PROMPT và TỐI ƯU PROMPT CHO VEO.
3. Bước tiếp theo theo UI là BẮT ĐẦU SAO CHÉP & PHÂN TÍCH bằng Gemini API; **chưa thực hiện** vì không xác minh quyền gọi API có phí ngoài Muse. Không mở AI Studio/đăng nhập hoặc lấy key.
4. Kết quả dự kiến là prompt JSON/text, không trực tiếp MP4. Chưa có kết quả phân tích thật để mô tả chất lượng; không lấy nhãn “AI SẴN SÀNG” làm xác thực.

## Tất cả lỗi, cảnh báo và giới hạn quan sát

| Quan sát | Bằng chứng / kết luận |
|---|---|
| “Không mở được Muse của Tài khoản 2: Phiên đăng nhập Muse đã hết” | 04 và 04-live-01. Vẫn hiển thị ở All Media sau khi studio sinh được clip. Không kết luận toàn bộ Muse hỏng; chưa xác định lỗi cache/phiên riêng. Không đăng nhập mới để vượt bước. |
| “Chưa có ảnh gốc” | 03b: bấm dựng khi thiếu ảnh; có kiểm đầu vào. |
| “Cần ít nhất 1 ảnh nhân vật” | 05d: lưu thiếu ảnh; sau chọn fixture thì lưu được. |
| “Chọn ít nhất 2 video (đã có kết quả) để ghép” | 02k/06b: đúng khi chọn tác vụ chưa có file/thư viện rỗng. |
| “Thêm ít nhất 1 ảnh người mẫu.” | Nhánh Người mẫu thiếu ảnh; chưa dùng ảnh người thật. |
| “Thêm ít nhất 1 video tham chiếu. Video nặng hơn 6 MB được tự thu nhỏ khi gửi.” | Remix trước nhập; đã thử dưới 6MB, chưa chứng minh nén lớn. |
| UI Remix còn Đang chạy trong khi header Đang nghỉ/file đã lưu | 10f; sau chuyển màn rồi quay lại 10g hiện Hoàn tất. Không bấm gửi lại để chữa trạng thái. |
| Cảnh 1 Video dài lặp byte clip tạo trước | SHA-256 giống nhau trong verification.json; chưa xác định phía nào tái dùng. |
| “Qua nhiều cảnh nhân vật có thể hơi đổi nét.” | Cảnh báo Video dài; chưa thử chuỗi dài/nhân vật người. |
| “Muse không có voice ID…” | Tooltip Đồng bộ giọng; app dùng mô tả prompt, chưa chứng minh đồng nhất âm thanh. |
| “Có bản mới 5.5” khi app v5.2 | Không cập nhật. |
| Clone: <3.000 ký tự, biến tấu lời thoại 10–20%, “HỆ THỐNG AI SẴN SÀNG” | Tuyên bố UI, không phải kết quả kiểm; không bảo đảm quyền tác giả hay key hợp lệ. |
| Hộp chọn file WebView có PID khác Meosu | Helper kiểm owner ban đầu từ chối; đã xác minh chuỗi cha là WebView con Meosu rồi chọn file. Đây là vấn đề helper, không phải lỗi app. |
| Tour bước 2 không có tour-next | Tour yêu cầu bấm vùng sáng. Helper đã dừng tìm Tiếp và dùng Bỏ qua; không coi là lỗi app. |
| Ghép lượt đầu còn 3 clip do tọa độ đổi khi modal co lại | Đã giữ file 28s và sửa thao tác ở lượt sau; hai clip cuối đã kiểm thứ tự trước xuất. |
| REA recover_javascript_sources: capability_unavailable / unsupported_provider | Thiếu Wakaru Linux x64; không giả vờ đã phục hồi toàn backend. Chi tiết _rea/recovery-result.json. |

Chưa thử: API Clone, All Media có dữ liệu đăng nhập hợp lệ, AI tách cảnh/Viết bằng AI/Làm phim tự động, ảnh đầu–cuối thật, giữ nhân vật/giọng thật, nén Remix >6MB, media khác khung/mất tiếng, mọi tỷ lệ và giới hạn cực trị, Tạo lại/Lưu & chạy lại gửi lại, 28 bước onboarding đầy đủ. Các nút mua/cập nhật/token phụ/đăng bài/gửi DM/tạo tài khoản/proxy/xoá được chủ động không bấm. Không xuất hiện yêu cầu UAC/tường lửa/cài thêm trong lượt tiếp tục này.

## Kết nối ra ngoài và phạm vi xác minh

- Quan sát qua UI: app gửi tác vụ tới **Muse**, hiển thị mẫu `muse.ai/thread/…`; nhật ký ghi gửi/nhận và có MP4 thật. Không chép URL hội thoại riêng/token/cookie vào báo cáo.
- Hướng dẫn tải iframe **youtube-nocookie.com**, có liên kết **youtube.com** và **docs.google.com**. Đây là nội dung nhúng đã thấy; không bấm đăng nhập trang ngoài.
- Clone chạy trang local **http://127.0.0.1:5680/tao-prompt.html**, hiển thị link **aistudio.google.com/app/apikey**. Chưa gọi phân tích Gemini và chưa mở link đó.
- Đọc tĩnh frontend thấy các host **cdn.tailwindcss.com**, **esm.sh**, **fonts.googleapis.com**, **unpkg.com**, **muse.ai**, **aistudio.google.com**. Có tên host trong mã **không chứng minh đã kết nối thành công** tới từng host.
- Socket TCP đã quan sát của Meosu và tiến trình con: một remote **[2a0d:5600:140:21::2]:443**, cùng kết nối loopback 127.0.0.1 (gồm port 5680 và các port runtime khác). Bản đầy đủ: NETWORK-OBSERVED.json. Không đoán domain của IP; chỉ là ảnh chụp tại một thời điểm, không phải toàn bộ lịch sử mạng/UDP.
- UI Cài đặt nói gửi thống kê ảnh/video theo ngày và phiên bản; checkbox đang bật từ trước. Chưa bắt payload hoặc xác minh tuyên bố “không gửi prompt/media”. Không đổi công tắc.
- Có Chrome Muse tồn tại trước khảo sát (PROCESS-BEFORE.json). Không tạo tài khoản/đổi key hoặc yêu cầu đăng nhập mới; không đóng/tắt Muse bằng công tắc. Kết quả đóng Meosu được ghi riêng cuối báo cáo.

## REA đã dùng ở mức nào

Đã dùng **rea-agents 6.9.0**, package khai báo repository `https://github.com/morluto/rea`. `_rea/meosu-artifact.json` ghi inventory/inspect PE và SHA-256 của file exe; `_rea/frontend-summary.json` ghi REA analyze_javascript_application, coverage 122/122 **trong view phân tích đó**, không có nghĩa toàn app được phục hồi.

`recover_javascript_sources` không chạy được vì thiếu provider Wakaru. Phần giải chuỗi/AST tiếp theo là helper riêng (`static-decode.cjs`, kết quả `_rea/app.decoded.js`, `_rea/function-inventory.json`), **không gắn nhãn sai là REA đã decompile backend**. Không sửa executable, gỡ license hay giả key; không chạy script ship kèm Meosu. Mã/HTML đọc tĩnh dùng đối chiếu chức năng; kết quả thật được kiểm riêng bằng UI/file.

## Gợi ý thiết kế cho Hermes từ điều đã thấy

1. Ba cột nhập → hàng đợi → chi tiết cho tác vụ hàng loạt; tách rõ lưu nháp và chạy. Sau thực thi phải cập nhật cùng trạng thái giữa header/thẻ/file.
2. Nối cảnh hiển thị cảnh đang xử lý, khung đầu/cuối và link file; kiểm hash tránh nhận clip cũ làm cảnh mới mà không báo.
3. Remix nhận clip nguồn + yêu cầu thay đổi, cho xem gốc/kết quả cạnh nhau; ghi rõ các bản 8s/10s thay vì đếm thành nhiều ý tưởng.
4. Thư viện cho chọn clip theo thứ tự, xác nhận số clip/thời lượng rồi ghép; tên file mới và giữ bản gốc.
5. Nhân vật/giọng là tham chiếu/prompt, nên mô tả đúng mức bảo đảm. Clone nên được gọi là phân tích video thành prompt, ghi rõ provider/chi phí riêng.

Đây là đề xuất từ hành vi quan sát, chưa phải kế hoạch triển khai hoặc yêu cầu chép mã/tài sản của phần mềm.

---

## Nhật ký theo thời điểm — giữ bằng chứng lịch sử

Các dòng “chưa chạy/chưa có file/đang khảo sát” bên dưới mô tả thời điểm trước khi được phép thử thật hoặc trước khi job kết thúc. **Tổng kết ở trên là trạng thái cuối**, không dùng checkpoint cũ để phủ nhận file đã kiểm.

