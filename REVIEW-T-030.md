# Review T-030 — 15/11/2026 (+07)

Đọc skill hermes-night-review ở Office mode, yêu cầu T-030, diff `before-T-030..6e561c0`, ba commit/test riêng, log suite/build và receipt/IPC local. Quyền chạy Muse thật/push của người dùng trong T-030 áp dụng cho task này; quy tắc cũ chỉ fixture/read-only không ghi đè quyền mới.

| Phần | Kết luận | Căn cứ / còn thiếu |
|---|---|---|
| Một lượt Muse mới cho TIZE 112 | Đã thực hiện, không có clip | Chi 00:38:21.426 → 00:53:26.686; MUSE_NO_MEDIA; phản hồi mới nói PROMPT ONLY/quyền video theo vùng |
| Dừng thử gốc khi bị chặn | Đạt tại checkpoint gốc | Pause giao mới sau quan sát hạn chế, chờ receipt; 00:53:49 Chi tắt riêng, Muse vẫn bật, Cho/ss không dùng |
| Phanh xuyên suốt sau restart | Chưa đạt nghiệm thu | Một lượt phát sinh 01:05:39.391, bốn queued, Chi bật lại; chưa xác định nguồn thao tác; lượt mới cũng không có media |
| Ba MP4 mới / ba kỹ thuật / ba hash | Chưa làm theo điều kiện đề | Dừng ở bước 2 vì không có clip mới; không dựng giả từ clip cũ |
| Nhãn Muse | Đạt source/test; UI chưa khép | 20f572a: kết quả video mới nhất theo từng profile, giữ lỗi khi clip ảnh hoặc hồ sơ khác thành công; DOM thật có lý do, chưa ảnh sau restart |
| Duyệt lại theo revision | Đạt | 5e160a7: khóa board có scene revision; test sửa cảnh giữ receipt cũ, duyệt lại, retry không tạo dispatch thứ hai |
| Clip 10s/cảnh 8s | Đạt | 6e561c0: chặn như cũ, giải thích cắt/đổi cảnh; không tự sửa media, pending giữ nguyên, null/biên sai số kiểm riêng |
| Source/build/test | Đạt | 810 kiểm khác nhau đạt; typecheck chạy lại exit 0; build 00:58:27; ba lỗi ba commit riêng; báo cáo app d2b666b |
| Khóa task | Đạt | Đã xóa đúng codex-T-030.txt qua PowerShell và kiểm không còn; không xóa khóa khác |

Không assertion bị giảm, không xóa test, không đổi dependencies, data/evidence, theme/font. Source chỉ đổi năm file trước báo cáo. Không đọc trực tiếp AppData/DB/cookie/token; thao tác thật qua app được người dùng cho phép. Snapshot/ảnh/receipt mới chỉ local, STATUS chỉ công khai phần lý do được yêu cầu, không URL hội thoại/khóa/phiên.

Full suite: domain 275/275, API 29/29, desktop 505 pass/1 skip; OpenMontage local thật kiểm riêng 1/1. Log typecheck cũ có PowerShell NativeCommandError bao bọc dòng banner stderr; lệnh pnpm.cmd typecheck chạy lại xác nhận exit 0. Không gọi provider thật từ test tự động. Build có cảnh báo chunk lớn, không lỗi. Không chạy lại full suite sau thay báo cáo thuần văn bản.

Rủi ro khi áp vào app chính: nhãn phản ánh receipt đang có, không chứng minh quyền dịch vụ. Clip dài vẫn cần người dùng cắt/đổi thời lượng trước duyệt. Không thể khẳng định bảo toàn toàn bộ dữ liệu sau restart: trước build hash 75 record ngoài dự án/50 job cũ khớp; sau restart số đếm và hai bản ghi thay đổi. Không quy nguyên nhân cho app hoặc người dùng khi chưa có bằng chứng.

Lượt phát sinh: 01:05:39.391 → 01:20:42.238 (902,847s), `MUSE_NO_MEDIA`, nguyên văn receipt: “Want me to make a still image of that scene instead — the runner in the dark with the LED armband flashing on their wrist?Yes, make the still imageNo, just the prompt is fine”. Nội dung khác TIZE nên không nhận là clip của sản phẩm 112. Lúc 01:22:25 Muse bật, paused=true/active=0/stopped=true, Chi tắt riêng; jobs và hồ sơ Cho/ss giữ checksum trong thao tác cuối.

Việc chưa kiểm trên giao diện thật: ảnh sau build 1366/1920 (lệnh chụp vùng nhãn timeout), clip/SKU/ba hook mới, HTTP 403 hoặc việc Muse gọi công cụ video nội bộ. Không thể suy toàn bộ tài khoản bị hạn chế từ lời phản hồi một hồ sơ. Cần đối chiếu thao tác sau 01:04 trước khi nghiệm thu phanh; đã hỏi người dùng, chưa có câu trả lời lúc ghi báo cáo.

Hướng điều tra tiếp, không tự chạy: đọc `D:/hermes-wt/artifacts/T-030/{receipt1,restart-result,continuation-ipc,final-ipc,final-profiles}.json` và `progress.md`, đối chiếu thao tác UI/IPC sau 01:04; chỉ xác định nguồn sự kiện đối soát/bật hồ sơ/tạo job, không gửi/retry/đổi hồ sơ/reset ledger hay đọc cookie/token/DB. Chưa đủ căn cứ chỉ định một lỗi code cần sửa. Kết thúc bằng `=== BAO CAO T-030 ===` và `TRANG THAI`.

Review source chỉ đọc: HEAD `6e561c07cd3cc55b6b7f41bef8cfe8c8d6739db0`, nhánh main và stash rỗng khớp trước/sau review; commit báo cáo `d2b666b` được tạo sau khi review. Khóa đã nhả; WIP văn phòng cũ được giữ, không đưa vào commit T-030.
