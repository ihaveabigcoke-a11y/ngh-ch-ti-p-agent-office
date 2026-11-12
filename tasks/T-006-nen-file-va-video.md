# T-006: Tự nén file mới, video dưới 6 MB, để app đỡ tốn dung lượng

- **Repo / tầng:** hermes-clip, **sửa thẳng trong thư mục app chính** (tag `before-T-006`). **Tắt app trước khi sửa.** Làm **sau T-005**.
- **Người giao:** boss phụ viết, boss chính giao · **Worker:** codex, effort high · **Ngày:** 12/11/2026

## Mục tiêu
Người dùng muốn app đỡ tốn dung lượng: "mọi file đều phải nén, và video thì auto nén xuống dưới 6mb hoặc dưới nữa".

Người dùng đã quyết (12/11, trả lời trực tiếp):
- **Chỉ giữ bản nén.** File gốc mà người dùng thả vào Hộp nhận media: sau khi nhập **thành công**, chuyển vào **Thùng rác Windows** (khôi phục được), không xoá vĩnh viễn.
- **Chỉ nén file mới.** File đã có trong app từ trước để nguyên, không di trú, không đổi checksum cũ.

> Luật `AGENTS.md` ghi "giữ nguyên media gốc". Riêng file gốc trong Hộp nhận media, người dùng đã cho phép **chuyển vào Thùng rác** sau khi nhập xong. Mọi media khác **trong app** (`workspace/media`, `outputs`, receipt, job) vẫn **giữ nguyên**.

## Quyết định của người dùng (trả lời TRỰC TIẾP boss chính, 12/11 khoảng 18:30)
1. **File gốc trong Hộp nhận media:** đồng ý chuyển vào **Thùng rác Windows** (`shell.trashItem`) sau khi nhập và nén thành công. Chỉ áp cho file **mới**. Nén lỗi thì giữ gốc.
2. **Video dài:** "< 6 MB nhưng giữ sàn chất lượng".
   - Clip ≤ 15 giây (loại Flow/Gemini tạo ra) thì **luôn < 6 MB**.
   - Video dài hơn thì giữ tối thiểu khoảng **2 Mbps ở 720×1280**, có thể vượt 6 MB, và app ghi rõ trên take.
   - **Không** hạ dưới 720×1280 cho 9:16.
3. **Bản render tạm** `renders/<id>`: đồng ý **xoá** (không qua Thùng rác) **chỉ bản render mới**, sau khi đã nhập vào `media` và kiểm sha256 khớp. Render cũ không đụng.
4. (Đã quyết với boss phụ) File cũ: chỉ nén file mới, không đổi byte hay sha256 của asset cũ.

## Hiện trạng (boss phụ đọc code ở `adf48c9`)
- **Asset:** `/api/assets` (`app/api/assets/route.ts`) nhận video tối đa 25 MB và ảnh tối đa 8 MB. Lưu bất biến theo sha256 ở `workspace/media` qua `putImmutableMedia` (`desktop/src/storage-policy.mjs:35`, `desktop/local/server.mjs:55`). **Không nén.**
- **Hộp nhận media** (`desktop/src/manual-media.mjs`): giữ nguyên file gốc trong thư mục Hộp nhận, rồi tải **toàn bộ byte gốc** lên `/api/assets`. Mỗi video vì thế nằm **2 lần** trên đĩa. Chống trùng theo sha256 của **bản gốc** (`manual_receipts`).
- **Muse:** `saveDownload` vào `outputs`, rồi `shareVerifiedMedia` (hard link) sang `media`. Không nén. Muse đang tạm dừng.
- **Dựng video** (`renderClips`, `desktop/src/media.mjs:8`): `libx264` + `aac`, **không có CRF hay giới hạn bitrate**. Output nằm ở `renders/<id>/output.mp4` và còn được tải lên `media`, tức có bản thứ hai.
- **Gói prompt:** chép nguyên ảnh tham chiếu vào `exports/prompt-packs/...`.

## Phạm vi
1. **Module nén dùng chung** `desktop/src/compress.mjs` (không shell, dùng `ffmpeg`/`ffprobe` sẵn có, có timeout):
   - **Video** (mp4/webm/mov) → MP4 H.264 + AAC, `-movflags +faststart`, giữ tỉ lệ khung và thời lượng. Cạnh dài tối đa 1280 (9:16 là 720×1280). **Mục tiêu < 6 MB** (`VIDEO_MAX_BYTES = 6*1024*1024`, có thể chỉnh trong Cài đặt nhưng không vượt 6 MB):
     - lượt 1: `-crf 26 -preset slow`, kèm `-maxrate`/`-bufsize` tính từ thời lượng (`ngân sách ≈ 0,92 × 6 MB × 8 / thời lượng`, trừ audio 96 kb/s);
     - còn ≥ 6 MB thì lượt 2 nén theo bitrate mục tiêu (2-pass), **không** hạ dưới 720×1280 (cạnh dài 1280 chỉ là trần khi nguồn lớn hơn, ví dụ 1080×1920 → 720×1280);
     - clip **≤ 15 giây** mà vẫn không đạt < 6 MB thì **báo lỗi rõ ràng**, không nhập và không xoá gốc;
     - clip **> 15 giây**: nhập bản ở sàn khoảng 2 Mbps (720×1280) dù vượt 6 MB, ghi trên take "Vượt 6 MB để giữ chất lượng (xx,x MB)", rồi đưa gốc vào Thùng rác như bình thường;
     - video gốc đã < 6 MB và đã là H.264/AAC/faststart thì vẫn remux với faststart, không nén lại.
   - **Ảnh** (png/jpg/webp) → WebP chất lượng 82, cạnh dài tối đa 2048. Bản nén không nhỏ hơn bản gốc thì giữ bản gốc.
   - **Văn bản lưu trữ** (raw research source, `reference-analysis.json`, `youtube-*.json`, log đã xoay vòng) → gzip (`.json.gz`/`.txt.gz`) khi ghi **mới**; mọi chỗ đọc phải đọc được cả bản gzip lẫn bản thường cũ.
   - **Không nén:** SQLite (`worker.sqlite`), profile trình duyệt, file cấu hình, khoá, receipt.
   - Kiểm bản nén bằng `validateMedia` hoặc `ffprobe` (đúng tỉ lệ, thời lượng sai lệch tối đa 0,2 giây, giải mã được) **trước khi** dùng.
2. **Gắn vào các đường nhập file mới:**
   - **Hộp nhận media:**
     - nén → kiểm → tải **bản nén** lên `/api/assets` → gắn take;
     - receipt ghi `sourceSha256` (gốc) + `sha256` (nén) + kích thước trước/sau;
     - **chống trùng theo `sourceSha256`**: thả lại đúng file gốc thì không nhập lại;
     - nhập thành công mới **chuyển file gốc vào Thùng rác Windows** (Electron `shell.trashItem`);
     - lỗi thì giữ nguyên gốc và hiện lỗi trong mục "File cần kiểm tra".
   - **Tải lên tay** qua `/api/assets` (video ≤ 25 MB, ảnh ≤ 8 MB): nén phía desktop trước khi lưu. Bản hosted không có ffmpeg thì giữ hành vi cũ.
   - **`renderClips`:** thêm CRF và giới hạn bitrate như trên, sao cho output < 6 MB; xong thì **xoá file tạm trong `renders/<id>`** sau khi đã nhập vào `media`. Bản render là sản phẩm của app nên xoá được, nhưng phải kiểm checksum đã nằm trong `media` rồi mới xoá.
   - **Muse:** khi bật lại, file tải về đã kiểm thì nén trước khi hard link sang `media`. **Không** đụng các file đã tải trước đây.
   - **Gói prompt:** ảnh tham chiếu trong gói dùng bản WebP nén (Flow/Gemini nhận WebP; nếu không chắc thì dùng JPEG q82).
3. **Hiển thị:** take mới ghi "Đã nén: 18,4 MB → 4,9 MB". Trong Cài đặt có một dòng "Tự nén file mới: bật (video < 6 MB)" kèm tổng dung lượng đã tiết kiệm.

**Không làm:**
- **không nén, di trú hay xoá file cũ**;
- không xoá vĩnh viễn bất kỳ file nào của người dùng (chỉ dùng Thùng rác);
- không đổi sha256 của asset đã có;
- không gọi dịch vụ nén trả phí hay online;
- không nén `worker.sqlite` hay profile.

## Tiêu chí đạt
- [ ] Test có MP4 thật tạo bằng FFmpeg:
  - 1080×1920, 12 giây, nặng (khoảng 15–25 MB) → bản nhập < 6 MB, 720×1280, 9:16, thời lượng ±0,2 giây, giải mã được;
  - 60 giây: bản nhập ở 720×1280, bitrate video ≥ khoảng 2 Mbps, take có ghi chú vượt 6 MB; đạt **sàn chất lượng** (xem mục *Quyết định của người dùng*), tức video ≥ 720×1280 và bitrate video ≥ khoảng 2 Mbps. Được phép > 6 MB; take ghi rõ "Giữ chất lượng: X MB";
  - 15 giây trở xuống thì luôn < 6 MB;
  - video không nén nổi thì báo lỗi, không nhập, gốc vẫn còn.
- [ ] Test Hộp nhận: nhập xong thì gốc được gọi `trashItem` đúng 1 lần (mock); thả lại cùng gốc thì không nhập lại; lỗi nén thì không gọi `trashItem`.
- [ ] Test ảnh PNG 4000×4000 → WebP cạnh ≤ 2048, nhỏ hơn gốc; ảnh đã nhỏ thì giữ nguyên.
- [ ] Test đọc ngược: raw research cũ (không gzip) và mới (gzip) đều đọc được.
- [ ] Asset cũ trong fixture: sha256 và byte không đổi sau khi chạy app.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop`, `pnpm local:build` đạt (app tắt). Có ảnh Cài đặt và một take "Đã nén" ở 1366 và 1920 px.

## Cách kiểm
```
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build
```

## Báo cáo
Đã thay đổi · Đã kiểm (lệnh, kết quả, kích thước trước và sau của từng file test, ảnh) · Chưa kiểm (video thật từ Flow/Gemini, Thùng rác Windows thật) · Cách chạy thử.
