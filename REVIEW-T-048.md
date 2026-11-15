# Review T-048 — Office mode, một Codex tự review

Phạm vi: source main từ `before-T-048=6d20dee`, diff gồm 13 file source/test/script và báo cáo. HEAD/main/stash không thay trong lượt review; không runner/sub-agent. Dữ liệu bản cài chỉ qua status IPC, không đọc DB/cookie/token/profile trực tiếp.

| Tiêu chí | Kết luận | Bằng chứng và giới hạn |
| --- | --- | --- |
| Trace từng bước, không Muse thật | Đạt local | 3 vòng trước/sau, đầy slot_wait/ffprobe/decode/bridge/FFmpeg/API; clip T-041 và T-038 đã có. Chọn đoạn có polling 750ms. |
| Dựng ≤11s, chọn ≤1,7s, ba hook | Đạt local | Sau 4,380–4,768s và 0,800–0,827s. Trước 5,141–5,402s và 0,803–0,818s. Không tái hiện regression live, không chứng minh nguyên nhân do slot. |
| Compose không bị probe/validate chiếm slot | Đạt | Pool riêng, mọi pool hữu hạn; kiểm bão hòa giữ 3 pool khác mà compose vẫn chạy. Full decode/hash/duration/ratio không hạ. |
| Threads/order/giữ kết quả | Đạt | Thử0/2/3 ×2; validate-first vs overlap; default3 máy≥6 CPU, 2 máy nhỏ. Cùng body/timeline/CTA, 720×1280,15s,A/V≤0,1s,3hash khác,1,61–1,71MB. |
| Blob dở | Đạt fixture | Browser local thật, blob truncation rồi URL mới; stream/Content-Length thiếu byte, URL exact-source. MP4 atoms gate trước save; full decode sau save vẫn bắt buộc; 3 lần đọc hữu hạn, không gửi lại Muse. |
| Race earlyRenderError | Đạt fixture | SQL json_set một trường; 2 kết nối SQLite fixture qua worker_threads, snapshot validating đến sau ready vẫn giữ output/history/importedAt. Không sửa SQLite thật. |
| Tab ấm | Đạt fixture | Chỉ bỏ map sau chọn/đã đóng, lỗi dispatch/return đóng tab; đóng lỗi giữ map nhưng bỏ thời hạn warm. Có case tab hết hạn warm. |
| Chi chỉ đọc | Đạt | IPC2 lần giống nhau, Chi không còn; enabled không áp dụng. Muse và VPN/profile flags giữ bật. Không kiểm phiên/VPN kết nối thực. |
| Test/typecheck/build/push | Xem STATUS cuối | 278 domain +29 API +581 desktop +8 runner giả =896. Full đầu lỗi2 fixture, giữ log gốc; mock được bổ sung shape/retry, assertion cũ giữ nguyên. Desktop cuối kiểm thêm tab hết hạn; build/push ghi sau hoàn tất. |

Rủi ro khi áp: nhiều pool làm tăng số tiến trình tối đa, mỗi pool vẫn bị chặn theo CPU và encoder bounded; chưa đo khi browser Muse thực cùng hoạt động. `HERMES_COMPOSE_THREADS=0` chỉ dùng phép đo, không là mặc định. MP4 box check không thay kiểm full decode. Mở app bằng launcher không tự gửi; Muse-only được dùng riêng lúc đọc status. Không thay công tắc/hồ sơ, không đặt nhãn, không đổi null thành0.

Đã đọc diff, đối chiếu assertion cũ, quét path bảo vệ: data/evidence/dependencies/lockfiles không đổi. Source mới không có cookie/token/DB thật hoặc snapshot media mới. Baseline module, fixture SQLite, trace và media chỉ ở artifacts/outputs bị bỏ qua. Ảnh mẫu có ba hook khác, cùng Vs…/Comment GLOW; âm thanh được giải mã và volume đo. Không nhận việc xem ba frame là duyệt toàn bộ nội dung/SKU.

Người dùng tự kiểm khi quyết định chạy thật: phiên/quota/quyền video Muse, tốc độ toàn luồng có browser/mạng, chất lượng nội dung. Không cần gửi Muse mới để khép T-048 local. Không có fix prompt còn treo.

Kết thúc: source2bea405, main dc9c43b/tag đã push thường, remote khớp, cây app sạch; build cuối16:30:04+07 đạt. Typecheck+896/896,0fail/skip; desktop-final581/581 bao gồm tab hết hạn. Launcher thật QA1366/1920/đóng-reload,0console/request ngoài, giữ receipt. Khóa đã nhả; WIP văn phòng cũ giữ nguyên, không commit/push kèm. HEAD/main/stash giữ6d20dee/main/rỗng trong bước review trước commit; các commit sau review là source và báo cáo nêu trên.
