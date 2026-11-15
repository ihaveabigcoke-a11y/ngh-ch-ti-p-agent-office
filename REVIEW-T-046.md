# Review T-046 — Video dài nối cảnh

Một Codex, Office mode, so `before-T-046=6f5aa3b` đến `7f0f1fc`; source chính `ca12345`. Đối chiếu yêu cầu T-046, diff và bằng chứng local; không dùng kết quả fixture để chứng nhận Muse thật.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| Mặc định tắt, không đổi luồng ba hook | Đạt local | `lib/lab/long-video.ts` optional/default false; `long_video_settings` chỉ cập nhật cấu hình; test giữ nguyên scenes/variants/exports và record cũ. |
| Hai cách nhập, 2–5 cảnh, lời nhắc | Đạt local | `components/lab/long-video.tsx`: viết từng cảnh/gói đã duyệt, từ 30 từ, cảnh báo nhân vật đổi nét; 6 PNG UI 1366/1920. |
| Chạy tuần tự, nối đúng khung | Đạt local | `desktop/src/long-video.mjs`: một job tại một thời điểm; chỉ clip giải mã/hash đạt mới trích PNG khung cuối; cảnh sau đính `first_frame`. Test FFmpeg giải mã toàn clip độc lập so byte. |
| Ghép một MP4 | Đạt local | `Integrations.compose` → `montage_bridge`, asset/hash/receipt riêng. Kiểm 2/3/4/5 cảnh với Muse giả và FFmpeg/OpenMontage thật. |
| Lỗi dừng, không retry/đổi hồ sơ | Đạt local | `LongVideo.stop`, phanh start/retry/retryMany; giữ outputs đã xong và receipt, restart không gửi. Có kiểm lỗi/từ chối/captcha/checksum/RAM/race. |
| Công tắc, Chi và giãn nhịp | Đạt local | Chỉ Cho/Duc/Chim đủ điều kiện; giữ `MuseNight` và ≥60s/hồ sơ; `pause()` chỉ dừng dispatch. Fixture Chi bật và 0 gửi, công tắc trước/sau bằng nhau. |
| Command đúng một lần | Đạt local | Dùng `museMediaPrompt`; adapter thật với Muse giả kiểm một `MUSE_VIDEO_COMMAND` đầu mỗi prompt. Không sửa `muse.mjs`/`muse-chat.mjs`. |
| Test/typecheck/build/launcher | Đạt | 285 domain + 29 API + 612 desktop + 8 runner = 934 kiểm khác nhau, 0 skip/fail. Typecheck exit 0 kiểm lại. Build chính 19:20:30 +07; launcher thật với QA riêng, IPC/persistence và 2 PNG đạt. |

Không xoá/hạ assertion, không thay dependency/lockfile, theme/font hoặc dữ liệu `data/`/`evidence/`. Không đọc trực tiếp AppData/DB/cookie/token. Dữ liệu thật chỉ đi qua chức năng/API/IPC của app trong phạm vi đo đã duyệt. Không đọc/chạy/sao chép công cụ tham khảo.

## Rủi ro và phần người dùng cần xem

Ảnh tham chiếu đúng không bảo đảm Muse giữ nguyên bố cục/nhân vật. Ngưỡng chênh pixel RGB 32×32 là 12%, xác định trước lượt đo; hash không thay duyệt nội dung. Chuỗi tuần tự là tính năng riêng, thời gian chờ tăng theo số cảnh; không thay luồng ba hook. Chi vắng trong baseline thật, không tự tạo lại hoặc thay công tắc.

## Kết quả đo thật — đạt kỹ thuật

Đúng 3 lượt tuần tự Duc → Chim → Cho, VPN connected, không Chi/không retry. Ba MP4 8 giây ghép thành một MP4 24 giây/720×1280/H.264 + AAC, 1.667.245 byte, giải mã và phát lại trong app đạt. Tổng 306,281 giây, vượt 60 giây; tính năng riêng, không thay luồng ba hook.

Hai PNG khung cuối giải mã toàn clip độc lập khớp checksum reference cảnh sau. Chênh pixel RGB 32×32: 0,89% và 0,92%, cùng dưới 12%; đã xem hai ảnh so cạnh nhau. Không thay duyệt toàn clip/nhân vật/SKU/âm thanh. 148 record cũ và request/providerId/output/history của 90 job cũ nguyên hash. Muse/hồ sơ/VPN giữ bật; active=0/budget=0. Chi vắng baseline thật; không kiểm được công tắc Chi thật.

Bằng chứng local `D:/hermes-wt/artifacts/T-046/progress.md`, `measurement.json`, `verified.json`, `send-audit.json`, `playback.json` và 2 PNG app thật 1366/1920. Chưa thử Muse thật 2/4/5 cảnh/gói có sẵn; đã kiểm các nhánh đó bằng fixture. Không có mục source cần sửa sau review. Đã dùng đủ ba lượt, đo thêm cần quyền cho lượt mới; không tự gửi tiếp.

HEAD `7f0f1fc`, nhánh `main`, stash rỗng ở cuối kiểm source, không thay source/nhánh/stash trong phần đối chiếu này. Các cập nhật báo cáo sau review được ghi riêng.
