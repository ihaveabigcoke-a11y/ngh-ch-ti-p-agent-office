# T-008: Phân tích video mẫu bằng rea-video, xuất shot/chữ đè vào công thức

- **Repo:** hermes-clip, sửa thẳng trong app chính (tag `before-T-008`) · **Worker:** codex, effort high · **Ngày:** 12/11/2026
- **Phụ thuộc:** T-007 (schema `shots[]`, `overlay[]`).

## Điều kiện trước khi chạy (boss chính kiểm)
- Làm **sau T-006**. Người dùng đã commit xong phần tự sửa (khoảng 31 file) hoặc nói rõ cho chạy; `git status --short` phải sạch. Không đụng file có WIP hay đang bị khoá trong `.git/office-locks/`.
- Đề viết khi đối chiếu bản `adf48c9`; app hiện ở `04732a4` trở lên (đã có T-005: tự tạo hồ sơ khi chọn 3 sản phẩm, nút Triển khai). Trước khi giao Codex, boss đọc lại các file nêu trong "Bối cảnh trong code" ở HEAD và sửa đường dẫn/tên hàm trong đề nếu đã đổi.
- Theo quy trình office: tắt app → `git tag before-T-008` → ghi khoá `codex-T-008.txt` → chạy Codex với **toàn văn đề** → boss phụ duyệt diff → full test → `pnpm local:build` khi app tắt → commit theo path → nhả khoá → ghi `STATUS.md` (đã kiểm / **chưa kiểm**).

## Mục tiêu
Thay bước phân tích video mẫu bằng tay (T21/T22, skill `viral-formula-analyzer`) bằng [JuneYaooo/rea-video](https://github.com/JuneYaooo/rea-video): tách shot chính xác, OCR chữ đè có mốc 0,1 giây, tách nhạc/giọng, đo BPM, dòng narrative, và prompt tái tạo từng shot. Kết quả 12 mẫu đã chạy nằm trong `rea-video-12-mau.zip` người dùng giữ; boss hỏi đường dẫn rồi giải nén vào thư mục fixture của test (chỉ `breakdown.json`, `review_answers.json`, `packaging/timeline.json`, `packaging/overlays.ass`; không commit MP4). Người dùng muốn **cả ba đường đọc ảnh** (Codex CLI, Gemini API, nhập tay) và **ít bước tay nhất**: mặc định chạy tự động bằng Codex CLI.

## Bối cảnh
- rea-video là CLI Python (≥ 3.10, cần ffmpeg). Cài: `pip install "rea-video[ocr] @ git+https://github.com/JuneYaooo/rea-video"`. Lần đầu tải model tách stem ~220 MB. ~90 giây/video trên CPU.
- Đầu ra mỗi video: `VIDEO.md` + `video/timeline.md` (một dòng/shot) + `video/packaging.md` và `packaging/timeline.json` (chữ đè, mốc, kiểu) + `video/sound.md` (BPM, nguồn nhạc) + `video/remake.md` (generation unit, prompt từng shot) + `breakdown.json`.
- **Không có VLM thì công cụ phán "thực quay / AI" sai nhiều** (video tải từ nền tảng bị nén lại). Mọi mẫu của người dùng đều là video AI; Hermes **không dùng** cột made~ của công cụ, chỉ dùng shot, chữ đè, âm thanh, narrative.
- Hermes đã có `desktop/src/runtime-tools.mjs` và `integrations.mjs` cho công cụ ngoài (OpenMontage, Agent Reach). Làm tương tự, ghim revision trong `desktop/integrations-lock.json`.

## Phạm vi
1. **Tích hợp CLI theo đúng mẫu OpenMontage.**
   - `desktop/integrations-lock.json` thêm `reaVideo: {repository: "https://github.com/JuneYaooo/rea-video.git", commit: "2f50ab340ab09da334c0dbffc55244ddbaa52e44", license: "Apache-2.0"}`.
   - `desktop/SETUP-INTEGRATIONS.ps1` cài vào venv riêng (Python 3.10–3.14, `pip install ".[ocr]"` từ checkout đã ghim), đúng cách đang cài Agent Reach/OpenMontage.
   - Viết `desktop/src/rea_bridge.py` giống `montage_bridge.py`: nhận JSON qua stdin, kiểm commit checkout, gọi `rea_video` bằng `python -m rea_video decompose …` (không shell), đọc `breakdown.json`, trả **một** đối tượng `{ok:true, …}` rút gọn qua stdout để `runJson` hiện có đọc được. Lỗi trả `{ok:false,error:{hint}}`.
   - `runJson` giới hạn 4 MB stdout: bridge chỉ trả phần cần (shot, overlay, audio, narrative, prompt, đường dẫn frame), không trả cả `breakdown.json`.
2. **Gắn vào luồng Video mẫu đã có, không làm màn mới.** Hiện `desktop/src/reference-structure.mjs` (`analyzeLocalStructure`) đếm cắt cảnh + contact sheet bằng FFmpeg, rồi `lib/lab/formula-analysis.ts` nhận phân tích. Khi rea-video sẵn sàng: dùng nó thay `analyzeLocalStructure`; không có thì giữ đường FFmpeg cũ. Timeout 10 phút, log vào Nhật ký. Lưu asset gốc bất biến + sha256 theo `docs/VIRAL-FORMULAS.md`. Output rea-video lưu dưới thư mục dữ liệu app theo `storage-policy.mjs`, không xoá.
3. **Nhập kết quả vào `ReferenceVideo` v2:** đọc `breakdown.json` → `shots[] {start,end,camera}`, `overlays[] {text,fromSec,toSec,style}`, `audio {bpm, hasVoice}`, `narrative[] {shotRange, role}`, `remakePrompts[]`. Bỏ qua `made~`. Chữ OCR rác (độ tin cậy thấp, < 3 ký tự) lọc ra nhưng giữ trong metadata.
4. **Đề xuất công thức mới** từ nhiều mẫu: gom theo `hookType` (người dùng gán tay), tính trung vị độ dài, số shot, mốc CTA; sinh bản nháp công thức **version mới** để người dùng duyệt. Không tự ghi thành bản thư viện chọn mới nhất (giữ quy tắc T05).
5. **Bước "đọc ảnh" (VLM) — bắt buộc phải có một đường, vì không có nó rea-video không ra narrative và không ra prompt từng shot** (đã thử: V08 không VLM thì `content.md` trống, `remake.md` ghi "Shots #1–#3 have no prompt"). Làm cả ba đường. Cài đặt có ô chọn **"Đọc ảnh video mẫu bằng"**: `Codex CLI` (mặc định) / `Gemini API` / `Nhập tay`. Đường nào lỗi hoặc chưa cấu hình thì tự rơi xuống **Nhập tay**, không chặn phân tích (shot, chữ đè, âm thanh vẫn có).
   - **(c) Codex CLI — mặc định, tự động.** Người dùng có gói Codex không giới hạn. Luồng: `rea-video decompose` → `rea-video review <out>` ra `review_tasks.json` + ảnh `shots/shot_XXX.jpg` → app gọi **một** `codex exec` cho cả video với `--image` đính các ảnh shot (lặp cờ hoặc ngăn bằng dấu phẩy), `-s read-only`, `--ephemeral`, `--output-schema` (schema của `review_answers.json`), prompt tiếng Anh gồm `instructions` + danh sách shot trong `review_tasks.json` → kiểm JSON bằng Zod → ghi `review_answers.json` → `rea-video apply-review <out> --by codex`.
     - **Tái dùng** runner Codex an toàn đã có (`desktop/src/codex-cli.mjs`: không shell, timeout, giới hạn đầu ra, xoá `OPENAI_API_KEY`/`CODEX_API_KEY` khỏi env con, dùng cấu hình `session_gateway` của người dùng, không ép `model_provider`). Chỉ thêm tham số ảnh; không viết runner thứ hai.
     - Kiểm cờ trên máy trước: `codex exec --help` phải có `--image` và `--output-schema`. Thiếu cờ nào thì báo rõ trong Cài đặt và rơi xuống Nhập tay.
     - Quá 20 ảnh thì chia lượt theo nhóm shot liền nhau, gộp kết quả.
   - **(a) Gemini API.** Endpoint tương thích OpenAI: `REA_VLM_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/`, model chọn trong ô (gợi ý dòng Flash), key **lấy ở Google AI Studio** — gói Gemini Pro trên web **không** phải API key; ghi rõ câu này trong Cài đặt. Key lưu safeStorage, không in, ghi `--env-file` tạm (quyền chỉ người dùng) rồi xoá sau khi chạy; chạy `decompose --vlm`. Trước lần đầu bật: hiện câu "Gemini API có hạn mức miễn phí và có thể tính phí khi vượt; kiểm tại AI Studio" và cần người dùng bấm xác nhận. Mặc định tắt.
   - **(b) Nhập tay — luôn có.** Nút "Xuất gói đọc ảnh" chạy `rea-video review` và mở thư mục chứa `review_tasks.json` + ảnh. Người dùng **tự** dán vào Claude/Gemini/ChatGPT rồi lưu `review_answers.json`; nút "Nhập kết quả đọc ảnh" kiểm schema rồi chạy `apply-review`. App **không** tự mở hay điều khiển trình duyệt/web app nào (luật cứng office).
   - Ghi rõ đường đã dùng vào kết quả (`readBy: codex | gemini-api | manual`). Không dùng cột made~ (thực quay / AI) dù VLM trả về.
6. **Đầu ra rea-video cho các bước sau** (để T-007 dùng):
   - `remake.md`/`breakdown.json` → prompt từng shot + khung đầu/cuối tham chiếu → đưa vào **gói prompt manual** (Flow/Gemini) theo generation unit.
   - `packaging/overlays.ass` + `timeline.json` → mẫu chữ đè (vị trí, cỡ, viền, vào/ra). Bước Ghép & xuất đốt chữ đè bằng FFmpeg `ass=` với chữ của sản phẩm mình (thay text, giữ kiểu và mốc).

## Không làm
- Không gọi mạng ngoài trong test; test dùng `breakdown.json` fixture từ 12 mẫu.
- Không đụng Muse, Instagram, dữ liệu người dùng.
- Không thêm trường hay nhãn "AI" vào công thức, cảnh, kịch bản. Cột made~ của rea-video không nhập vào app.
- Không tự xoá thư mục output của rea-video.

## Bố cục giao diện
- Trong màn **Video mẫu / Công thức video** hiện có (không thêm màn mới): danh sách mẫu đã phân tích: tên file, độ dài, số shot, BPM, trạng thái (Đang chạy / Xong / Lỗi), nút "Xem timeline" mở bảng shot + chữ đè, nút "Dùng làm mẫu cho công thức…".
- Nhãn tiếng Việt có dấu, giữ theme. Chụp 1366 px và 1920 px.

## Tiêu chí đạt
- [ ] Nhập 12 `breakdown.json` fixture ra 12 `ReferenceVideo` với tổng số shot = 116 và mỗi mẫu có ≥ 1 overlay có mốc.
- [ ] Chạy thật trên máy 1 MP4 (boss kiểm): có log, có file output, Nhật ký ghi thời gian.
- [ ] Thiếu rea-video: nút hiện hướng dẫn cài, app không lỗi.
- [ ] Codex: test bằng `codex` giả (như test T-003) chứng minh argv có `--image` cho từng ảnh shot, `-s read-only`, `--output-schema`, không có shell, không có `model_provider`; JSON sai schema thì không ghi `review_answers.json`.
- [ ] Gemini: test chứng minh key không xuất hiện trong log, argv hay file còn lại sau khi chạy; chưa xác nhận thì không chạy.
- [ ] Đường đọc ảnh lỗi → kết quả vẫn có shot/chữ đè/âm thanh, trạng thái "Chờ đọc ảnh", nút Nhập tay hiện ra.
- [ ] Sau khi đọc ảnh (bất kỳ đường nào), mỗi shot của fixture có `narrative.role` và prompt tái tạo không rỗng.
- [ ] Mọi IPC mới sửa cả `desktop/src/main.mjs` và `preload.cjs` (điểm hay va nhau); boss kiểm khoá trước khi giao.
- [ ] Bản nháp công thức sinh ra là version mới, chưa được chọn làm mới nhất cho tới khi người dùng duyệt.
- [ ] Test cũ vẫn đạt; test mới cho parser và quy tắc version.

## Cách kiểm
```
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build
```

## Báo cáo (worker điền vào mô tả PR)
- Đã thay đổi:
- Đã kiểm, kèm bằng chứng:
- Chưa kiểm hoặc còn rủi ro:
- Cách chạy thử:
