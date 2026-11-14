# Review T-034 — Office mode, 15/11/2026

Một Codex, đọc diff từ before-T-034 (`b06e485`) tới `b95ca63`, task và artifacts thật. HEAD b95ca63/main/stash rỗng không đổi trong bước review đọc; commit/build nằm ngoài review. Dùng skill `.claude/skills/hermes-night-review/SKILL.md` trong app.

| Tiêu chí | Kết luận và bằng chứng |
| --- | --- |
| Tải khi có clip | Đạt: muse.mjs poll 750 ms; không đợi chat kết thúc; tải URL HTTP nếu có, hoặc mở đúng preview bỏ chờ animation. Thật giảm 4,731–7,691 → 1,199–3,002s. Muse thật dùng blob, nhánh HTTP chỉ fixture. |
| Dựng chồng nhập | Đạt: worker gọi EarlyVideoRender trên output ready đã kiểm; import tiếp độc lập. Cả sáu lần earlyRenderStartedAt < importedAt. Cache chỉ nhận khi hash/cut/CTA khớp final plan; stale product không chạy. |
| Dựng nhanh/giữ chuẩn | Đạt: một lần seek/cắt/encode, veryfast, không remux/giải mã lại thừa. Giữ validate + audio/size/duration guard. Sáu MP4 720×1280, 15s, ≤6MiB, audio đồng bộ; tone/CTA fixture đạt. |
| Phanh riêng/hồ sơ giữ bật | Đạt: không gửi Chi, không reset/refusal bypass, Cho/Duc gửi các hook mới; pacing nhỏ nhất 74,920s. Công tắc cả ba và Muse vẫn bật. Không tái thử job H2 T-033. |
| Kiểm quyền rẻ | Chưa kiểm entitlement: app chỉ có phiên/VPN/quota, không có API quyền video đã xác thực. Báo rõ, không dùng quota chứng nhận quyền. |
| Một tin ba video | Đã thử đúng 1 lần Duc, hai dòng prefix đúng. 3 thẻ video, đầu tiên 56,701s; thiếu nhãn, chốt needs_attention 72,541s. Không gọi là ba file đã kiểm, không đổi mặc định sang bundle. |
| Giới hạn gửi | Đạt 6 riêng +1 gói; hai hồ sơ hoạt động nên 2+1 mỗi phép đo, không đạt ba profile gửi đồng thời. Không đăng/DM. |
| Mục tiêu thời gian | Chưa đạt: đủ ba MP4 150,052s/155,191s. Muse 56,647–63,507s; ngoài Muse bỏ đợi hồ sơ còn 14,683–17,451s lần 2. Không chứng minh overhead tối thiểu tuyệt đối. |
| Dữ liệu cũ | 91 record/62 job nguyên qua API; 44 asset cũ hash khớp. Không truy cập trực tiếp DB/cookie/credentials, không thay data/evidence/theme/font/lockfiles. |
| Test/nhãn | Typecheck +842/842, 0 fail/skip; full desktop cuối 527/527. Poll assertion đổi chính xác 2000→750ms, không hạ assertion. UI 1366/1920 không tràn. |

Rủi ro còn lại: URL HTTP mới fixture; thực tế preview blob còn mất 1,2–3s. Không bỏ kiểm nguồn/giải mã để chạy nhanh. MP4 kỹ thuật đạt không chứng minh SKU/công dụng/sáng tạo. Preview gói chưa ánh xạ, không được retry/gán theo thứ tự DOM.

Không cần người dùng chốt để giữ sửa. Muốn sử dụng ba preview gói cần xem hội thoại cũ và duyệt cảnh; không phải điều kiện để khép thử nghiệm T-034. Chi cần quyền video thực tế trước bất kỳ lượt gửi mới trên hồ sơ đó.

=== BAO CAO T-034 ===
TRANG THAI: ĐẠT TỐI ƯU CÓ SỐ ĐO VÀ HAI BỘ BA MP4; CHƯA ĐẠT 60S; GIỮ ĐỐI SOÁT GÓI MỘT TIN.
