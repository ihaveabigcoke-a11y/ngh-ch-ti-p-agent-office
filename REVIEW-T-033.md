# Review T-033 — Office mode, 15/11/2026

Review source, yêu cầu T-033 và chứng cứ thật; không lấy báo cáo thay bằng chứng. Lượt review ban đầu HEAD ca4f74c/main/stash rỗng; lượt bổ sung HEAD e956c66/main/stash rỗng trước và sau đọc. Commit/build nằm ngoài bước review đọc.

| Tiêu chí | Kết luận và căn cứ |
| --- | --- |
| Hồ sơ/Muse không tự tắt | Đạt. Cho/Chi bật lại qua IPC; Duc bật. Fake refusal/captcha/login/2 errors giữ switches, hồ sơ khác chạy. Live Chi từ chối cũng giữ cả ba bật. |
| Phanh và giãn 60s/profile | Đạt. Admission per-profile, cap chung nguyên tử, giữ chặn duplicate/unresolved; stop riêng Chi. Ledger cũ được giữ. |
| Gửi và render song song | Đạt. Live gửi ba profile trong 1,115s; render H3/H1 có đoạn chồng nhau. Fixture peakRenders=3. |
| <3 ready → một tin ba cảnh | Đã triển khai, chỉ fixture. Nhãn cảnh bắt buộc, thiếu/lẫn không tự nhập hoặc gửi lại; fallback cho gói mới. Chưa chứng minh Muse thật chịu giữ nhãn. |
| 3 MP4 trong 60s | Chưa đạt. 2 MP4 mới: H3 78,409s/H1 84,456s; H2 không có video. Mốc ba = null. |
| Muse vs app | Cho chờ Muse 53,463s, Duc 63,565s; phần ngoài chờ gồm UI/tải/app 24,946s/20,891s. Không gọi toàn bộ phần này là CPU app. |
| Không vượt quota task | 3/6 gửi, không lần 2 theo điều kiện >50s. Không đăng/DM/paid API, không ss, không retry chưa đối soát. |
| Dữ liệu cũ | 84 record nguyên vẹn; các trường đã chụp của 59 job (state/provider/history/request/import) nguyên vẹn qua API. Không quét/copy DB/phiên. |
| Kiểm thuật/chất lượng | Hai MP4 giải mã/hash/A-V đạt, đã xem CTA/contact sheet. Thân tái dùng T-032, không gọi 5 cảnh mới; chưa nghiệm thu SKU/công dụng/hiệu quả hook. |
| Lỗi T-032 trong scope | Giữ raw failureCode/detail; ánh xạ nhiều media bằng nhãn; không nới duration. Cảnh cũ 4–5 vẫn cần đối soát, không tự chạy lại. |
| UI đến không theo thứ tự | Đã sửa sort và timeline theo hook, test H3 tới trước rồi H1/H2 vẫn đúng thứ tự; 1366/1920 đã xem. |

Không thay data/evidence/dependencies/theme/font. Assertions không hạ. Full suite lần đầu 840 đạt; sau sửa UI đã chạy lại domain/API/Codex và typecheck đạt. Desktop lần bổ sung có 1 test giả phụ thuộc RAM máy, giữ failure log, sửa fixture inject memory 8GiB qua dependency đã có, không đổi guard 1,5GiB production. Đã chạy lại đủ desktop: 525/525, 0 fail/skip; tổng cuối 840/840. Typecheck và UI mới đạt.

Kiểm bổ sung cũ check-t026i-ui báo Video 42 từ >40; T-033 không thêm chữ cố định, không hạ assertion, không gọi kiểm này đạt. Không chặn nghiệm thu cơ chế song song, nhưng giới hạn 40 từ chưa đạt và ghi rõ.

Chi nguyên văn: “Video generation still isn't available here, as a lasting restriction, so I can't make the 8-second video — no video was made.” Câu 403 video_not_available là phản hồi Muse, không phải HTTP trace đã xác minh. Công tắc vẫn bật; dispatch stopped=true riêng Chi. Không cần anh chốt để giữ source sửa; cần quyết định riêng khi muốn tiếp tục H2/cảnh cũ ngoài lần đo đã dừng.

=== BAO CAO T-033 ===
TRANG THAI: ĐẠT GIỮ CÔNG TẮC VÀ SONG SONG; CHƯA ĐẠT 3 MP4/60S; DỪNG 3/6.

Bổ sung source/UI 2912210; build local 04:18 +07. Báo cáo số đo thật áp e956c66, bản bổ sung chỉ sửa thứ tự hiển thị và fixture. Không gửi thêm để kiểm lại.

Nghiệm thu sau build 2912210: launcher mở lại đúng checkout, 91 record/62 job và các trường đã chụp khớp trước restart; 1366/1920 không tràn; H1/H3 đúng thứ tự; hai MP4 phát thật; 0 pageerror. Ba công tắc và Muse vẫn bật, riêng Chi chặn dispatch, tổng gửi giữ 3/6. App đã push origin/main b06e485, remote khớp.
