# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026 17:30, bởi boss Claude (trên máy người dùng)._

## 📣 Báo cáo cho người dùng (12/11 17:30)
**Mở app được chưa?** **ĐƯỢC, an toàn** (bằng `START-HERMES-CLIP.cmd` như cũ), với điều kiện boss phụ và Codex không sửa app trong lúc bạn dùng (boss chính đã báo boss phụ ngừng).
- App ở commit `adf48c9` (cây sạch). `desktop/local-dist` build lúc 17:23:59 từ đúng commit đó. Không có Codex nào đang chạy.
- Lần đầu mở:
  - **Muse: Đang tạm dừng** (mặc định). Không có request nào tới Muse;
  - **Instagram trình duyệt: tắt.** Mở app không tự mở Instagram;
  - API Instagram chưa có token, nên không gọi Meta;
  - DM tự động: chưa gửi gì, vì quy tắc đòi follow mà poll không kiểm được follow;
  - Codex CLI: tắt (bật trong Cài đặt).
- **2 cảnh có job Muse cũ (08/11) chưa rõ kết quả** sẽ hiện "Cần đối soát" kèm nút **"Bỏ qua, không đối soát"**. Bấm thì cảnh đó dùng manual được; app không gửi lại Muse.

**Đã xong trong app chính (đã push lên GitHub `hermes-clip`, `main` = `adf48c9`):**

| Việc | Commit | Ghi chú |
|---|---|---|
| T-001 night | `86ecdc0` | Có T01–T24, T26, T27, F01–F03; T25 không tồn tại |
| T-002 media manual | `43a45dd` | |
| T-003 research không cần Muse | `56e9842` | |
| T-002b Muse Bật/Tạm dừng + tự chuyển | `4d5e672` | |
| G, lối ra cho cảnh kẹt | `ab94531` | boss phụ sửa |
| T-004 Instagram API | `3e653a0` | |
| Siết so khớp CTA | `d1b57b1` | boss phụ sửa |
| T-002c | `adf48c9` | |

**Bạn cần quyết hoặc tự làm:**
1. ~~Push và merge~~: **đã làm** lúc khoảng 17:40 theo lời người dùng nói trực tiếp ("push và merge"). Xem mục *Xong*.
2. Kiểm tay trên app thật:
   - dữ liệu cũ (dự án, Thư viện, bài Instagram) theo `MORNING.md`;
   - 2 cảnh "Cần đối soát";
   - thử xuất gói prompt và thả 1 file thật từ Flow vào Hộp nhận media.
3. Muốn DM thật: tạo Meta App và cấp 4 quyền (xem `REVIEW-T-004.md`).
4. Muốn Codex hiện trên màn theo dõi: mở `codex`, gõ `/hooks` và chấp nhận.

**Chưa kiểm:** Electron thật trên dữ liệu thật; tài khoản Meta thật; `codex exec` thật qua `session_gateway`; file tải thật từ Flow/Gemini.

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
Đề bài đã viết sẵn trong `tasks/`. Boss làm theo đúng thứ tự, mỗi lúc chỉ 1 Codex chạy trên hermes-clip.
1. [x] **T-001** (đã push) Merge nhánh `night-20261111` vào app chính. Đã xong phần kỹ thuật; còn chờ người dùng kiểm tay và quyết định push. `tasks/T-001-merge-night.md`
2. [x] **T-002** (đạt, đã merge vào app chính `43a45dd`, tag lùi `before-T-002`) Tạm dừng Muse, thêm nhà cung cấp media `manual` (gói prompt + hộp nhận file). Giao Codex. `tasks/T-002-thay-muse-media-manual.md`
3. [x] **T-003** (đạt, commit `56e9842` trong app chính, tag lùi `before-T-003`) Research và viết nội dung không cần Muse (nhập JSON, Codex CLI). Giao Codex. `tasks/T-003-research-khong-muse.md`
4. [x] **T-004** (đạt, commit `3e653a0` trong app chính) Instagram qua API chính thức, kèm comment → DM. Giao Codex. `tasks/T-004-instagram-api.md`
5. [ ] Kế hoạch boss dự phòng sau khi Claude Pro hết hạn (khoảng 19/11).

## 🔨 Đang làm
| Việc | Worker | Nhánh / PR | Ghi chú |
|---|---|---|---|
| _(trống: không có Codex nào đang chạy)_ | | | |

## 👀 Chờ người dùng duyệt
| Việc | PR | Boss đánh giá | Bằng chứng |
|---|---|---|---|
| T-001 merge night | Chưa push. Commit `86ecdc0` nằm trên nhánh cục bộ `merge-night-20261111`, app chính đang ở commit này | Đạt phần kỹ thuật. **Chưa kiểm:** app mở lại được và dữ liệu cũ còn nguyên (người dùng tự kiểm theo `E:\Hermes Night\hermes-night3\boss\MORNING.md`). Giữ F03 theo lựa chọn của người dùng | Sao lưu tại `D:\backup\hermes-20261112-1346`: AppData 2476 file / 361.792.710 byte, khớp nguồn; tar app 18145/18145 file. Merge không xung đột. Kết quả kiểm chạy trong app chính: typecheck exit 0; test 196/196; test:api 24/24; test:desktop 317 pass, 1 skip (OpenMontage), 0 fail; `local:build` exit 0 |
| T-002 media `manual` | Đã merge vào `main` cục bộ của app chính: `43a45dd` (commit việc `7d8e022`). Tag lùi `before-T-002`. Worktree `D:\hermes-wt\T-002` vẫn giữ | **Đạt.** Xem `REVIEW-T-002.md`. **Chưa kiểm:** Electron thật, file tải thật từ Flow/Gemini | Kiểm trong app sau merge: typecheck 0; test 196/196; api 24/24; desktop 328 pass, 1 skip, 0 fail; `local:build` 0. Ảnh `D:\hermes-wt\artifacts\T-002\T-002-tao-video-{1366,1920}.png` |
| T-003 research không Muse | Commit `56e9842` trên `main` cục bộ của app chính. Tag lùi `before-T-003` | **Đạt.** Có: nhập JSON hoặc file kiểm theo schema, báo lỗi từng trường; nhận JSON của skill `hermes-product-check`; Copy prompt research; Codex CLI tắt mặc định (không shell, timeout 180 giây, giới hạn 2 MB, test bằng `codex` giả); content và landing. **Chưa kiểm:** `codex exec` thật. App ép `model_provider=openai`, trong khi Codex trên máy dùng `session_gateway`, nên có thể phải chỉnh khi bật thật. Quy tắc tự chuyển Muse cho research và nội dung sẽ làm trong T-002b | Kiểm ngoài sandbox: typecheck 0; test 202/202; api 26/26; desktop 337 pass, 1 skip, 0 fail; build 0. Ảnh `D:\hermes-wt\artifacts\T-003\T-003-nghien-cuu-{1366,1920}.png`: 10 ứng viên `import:Claude`, null hiện "Chưa biết", CNY giữ nguyên, 0/3 chọn. `desktop/local-dist` đã build lại lúc 15:43:46 từ `56e9842` |
| T-002b Muse Bật/Tạm dừng + tự chuyển | Commit `4d5e672` trên `main` cục bộ của app. Tag lùi `before-T-002b` | **Đạt** sau 3 vòng (xem `REVIEW-T-002b.md`). Bật lại Muse không tự gửi job cũ (mặc định an toàn, người dùng có thể đổi) | typecheck 0; test 203/203; api 26/26; desktop 378 pass, 0 fail; build 0; 12 ảnh tại `D:\hermes-wt\artifacts\T-002b\` |
| T-004 Instagram API + comment→DM + tắt Instagram trình duyệt + Codex CLI session_gateway | Commit `3e653a0`. Tag lùi `before-T-004` (= `4d5e672`, trước cả commit G `ab94531`, nên lùi riêng T-004 thì dùng `git revert 3e653a0`) | **Đạt** (xem `REVIEW-T-004.md`). **Chưa kiểm:** tài khoản Meta thật, safeStorage trên Electron thật | typecheck 0; test 204/204; api 26/26; desktop 396 pass, 0 fail (2 lần); build 0; 4 ảnh tại `D:\hermes-wt\artifacts\T-004\` |
| T-002c: lối ra cho cảnh kẹt "Cần đối soát" (G) + chặn job Muse cũ + nhãn tiếng Việt + bỏ polling + bảng Instagram 1366 + xét lại `follow_unknown` | `ab94531` (G, boss phụ), `d1b57b1` (siết CTA, boss phụ), `adf48c9` (Codex, 2 vòng). Tag lùi `before-T-002c` / `before-T-004-cta` / `before-T-002c2`; lùi từng commit bằng `git revert` | **Đạt** (xem `REVIEW-T-002c.md`). Nhỏ còn lại: màn Tạo video lặp dòng "Muse đang tạm dừng…" 3 lần | Cây sạch: typecheck 0; test 204/204; api 26/26; desktop 418 pass, 1 skip, 0 fail; `local:build` thật 0 lúc **17:23:59** từ `adf48c9`. 10 ảnh tại `D:\hermes-wt\artifacts\T-002c\` |
| Dựng văn phòng (repo này) | nhánh `claude/multi-agent-office-setup-b4o3x9` | Đạt phần cấu hình. Chưa kiểm Codex thật trên máy người dùng | Ảnh chụp office chạy bản `v0.1.211` trong `docs/screenshots/` |

## ⛔ Bị chặn / cần người dùng
- Office trên Windows báo `spawn EINVAL` ở phần đọc hạn mức Claude. Lỗi này **vô hại**, chỉ mất thanh hạn mức. Xem `docs/SETUP-WINDOWS.md`.
- Codex trong office: lần đầu phải mở terminal của worker để duyệt `/hooks`. Xem `docs/SETUP-WINDOWS.md`.
- **Màn hình theo dõi NosytLabs (12/11 14:11):** đã chạy `START-OFFICE.ps1 -Setup`. Python có sẵn (3.15.2) nên không cài. Hook đã nối cho Claude (12 event) và Codex (10 event). Server `http://127.0.0.1:8113` trả 200. Ảnh `docs/screenshots/office-live.png`: **thấy phiên Claude boss** (`agent dbcb16`); **KHÔNG thấy Codex T-002**. Lý do:
  1. Tiến trình `codex exec` T-002 đã khởi động trước khi có hook.
  2. Hook Codex chưa được tin cậy. Bước `/hooks` cần người dùng bấm trong TUI của `codex`, boss không làm thay được (Codex không có lệnh tin cậy hook không tương tác).
  - Việc người dùng: mở `codex`, gõ `/hooks`, chấp nhận hook trỏ tới `D:\agent-office\tools\nosyt-agent-office\codex\hook.py`.
  - Sao lưu trước khi nối hook: `~/.claude/settings.json.bak-before-nosyt-*`. File `~/.codex/hooks.json` trước đó chưa có, `config.toml` không đổi.
- T-001: người dùng mở app, kiểm dữ liệu cũ, rồi nói "push" thì boss mới đẩy `86ecdc0` lên `main` trên GitHub.

## 🔎 Kiểm "app đang chạy có phải bản cũ không" (12/11, khoảng 16:00)
1. **Commit night trong app chính** (`git log origin/main..86ecdc0`, 55 commit):
   - Có đủ **T01–T24, T26, T27, F01, F02, F03**.
   - **T25 không tồn tại**: không có đề bài, log hay commit nào trong gói đêm. `ops/night/out/T20.md` của đêm cũng ghi "không thấy đặc tả/báo cáo/commit T25". Đây là số bị bỏ qua, không phải task bị mất.
   - T12 từng bị revert (`6942d89`) rồi được nạp lại sau (`c66140b`).
2. **Bản build app chạy:**
   - `START-HERMES-CLIP.cmd` nằm ở `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` (dòng `cd /d "%~dp0"`). Nó chạy `desktop\setup-local.mjs` rồi `npm start` (Electron trong `desktop\`).
   - Electron nạp giao diện và server từ `desktop\local-dist`.
   - `local-dist/ui` và `local-dist/server` được build lúc **12/11 15:21:39**, tức **sau** khi app lên `86ecdc0` (13:52:11) và sau merge T-002 (15:20:45). Bản build này chạy từ commit sạch `43a45dd`. Không cần build lại.
   - Không tìm thấy shortcut hay bản cài Hermes Clip nào khác trên máy.
3. **Ảnh tính năng night** (`docs/screenshots/`):
   - `night-T16-dem-comment-tu-khoa-1366.png` và `night-T16-chi-tiet-1366.png`: cột "Từ khóa CTA";
   - `night-T17-link-utm-1366.png`: "Link UTM cho DM";
   - `night-T23-kiem-san-pham-1366.png`: hộp "Kiểm sản phẩm".
   - Cách chụp: chạy nguyên văn các script UI của đêm (`scripts/check-{keyword-comments,utm,product-check}-ui.mjs` ở `HEAD`) trên **bản sao giống hệt** `desktop/local-dist` (đã `diff -rq` khớp), dùng dữ liệu giả, 0 request ra ngoài, trong `D:\hermes-wt\evidence`.
   - T16 và T17 đạt toàn bộ script. T23 chụp xong màn kiểm, rồi timeout ở bước form phụ phía sau.
   - **Phát hiện:** người dùng đã mở app lúc **15:32:55** (`START-HERMES-CLIP.cmd`, Electron PID 15088). Lúc đó Codex T-003 đang sửa dở `desktop/src/main.mjs` (Codex xong 15:40, commit 15:43). Bản đang chạy có night + T-002 (UI build 15:21), tức **không phải bản cũ**, nhưng tiến trình chính đã nạp code T-003 còn dở, và khi mở app tự gọi `instagram?.start()`. Boss đã **đóng êm** cửa sổ app (CloseMainWindow, không kill) lúc khoảng 15:45, trước khi làm T-002b. **Người dùng đừng mở app trong lúc Codex đang sửa**; boss sẽ báo khi an toàn.
   - **Chưa kiểm:** mở Electron thật trên dữ liệu thật. Lưu ý: mở app là tự khởi động worker Instagram bằng trình duyệt. Boss **không mở** app lúc này vì Codex T-003 đang sửa `desktop/src/main.mjs` trong cùng thư mục; mở app sẽ chạy code dở dang trên dữ liệu thật. Sẽ mở và chụp sau khi T-003 được duyệt, commit và build lại.
   - Lưu ý cho boss sau: `D:\hermes-wt\evidence\node_modules` và `desktop\node_modules` là **junction** trỏ vào node_modules thật. Muốn gỡ thì dùng `cmd /c rmdir`, **không** dùng `rm -rf`.

## 🗣️ Góp ý boss phụ (12/11/2026, duyệt CHỈ ĐỌC theo `hermes-night-review` Office mode)
Phạm vi: `git diff before-T-002..before-T-003` (T-002, 42 file +935/−59) và `before-T-003..56e9842` (T-003, 25 file +821/−19) trong app chính. Chỉ duyệt phần **đã commit**. Cây làm việc đang có thay đổi chưa commit của T-002b (boss chính), boss phụ không đụng. Không chạy lại test: đang có Codex sửa cùng thư mục.

| Việc | Boss phụ kết luận | Lý do chính |
|---|---|---|
| T-002 | **Cần sửa (đúng ra không nên ghi "Đạt" trọn vẹn)**. Phần manual media đạt; phần công tắc Muse chưa đạt đề | Xem mục 1–4 dưới. Đa số đã nằm trong đề T-002b, nhưng `REVIEW-T-002.md` nên ghi rõ là chưa đạt Phạm vi 1 |
| T-003 | **Đạt có điều kiện**. Đường (A) nhập JSON đạt; đường (B) Codex CLI gần như chắc **không chạy được trên máy này** | Xem mục 5–9 |

**T-002**
1. **Công tắc Muse chưa đúng đề (Phạm vi 1).** Chỉ có **một** checkbox "Tạm dừng Muse" trong `ManualMediaSettings` (`components/lab/manual-media.tsx:26`, gắn ở Cài đặt qua `app.tsx:68`). Thiếu: nút ở đầu màn **Tài khoản Muse**; **hộp xác nhận** khi bật ("Muse chạy bằng trình duyệt tự động; tài khoản có thể bị khoá. Bật?"). Hiện bỏ tick là Muse bật ngay, **một cú bấm, không cảnh báo**. Với tài khoản vừa bị khoá, đây là rủi ro thật. T-002b có ghi việc này, đề nghị T-002b có test: bỏ tick, rồi bấm Huỷ trong hộp xác nhận, thì `setMusePaused` được gọi 0 lần.
2. **Tạm dừng đang huỷ job chạy dở** (`desktop/src/worker.mjs`, `setMusePaused`): đóng mọi context. Thêm `checkpoint()` gọi `assertMuseAvailable`, và route `abort` mọi request. Job đang submit hoặc đang tải sẽ chết giữa chừng. Đề bài ghi rõ "Job đang chạy dở **không bị huỷ**". Boss chính đã thấy (T-002b). Khi sửa, nhớ kiểm cả 3 chỗ: đóng context, `checkpoint`, route `abort`. Sửa một chỗ thì job vẫn chết.
3. **"Bật lại chạy y như trước" chưa chắc đúng.** Mỗi context Muse giờ luôn có `context.route('**/*', …)` và `serviceWorkers:'block'`, **kể cả khi Muse đang bật**. Playwright tắt HTTP cache khi bật route, nên trang Muse sẽ tải chậm hơn và tốn băng thông qua VPN/proxy hơn trước T-002. Test không phát hiện được vì fixture không có `route` (`if (context.route)`). Đề nghị T-002b: chỉ gắn route khi đang tạm dừng (hoặc gỡ route bằng `unroute` khi bật lại), và ghi rõ trong báo cáo.
4. **Test chiều "bật lại".** `desktop/test/muse-pause.test.mjs` chỉ chứng minh bật lại thì context mở và route `continue`. Không có test nào đi Tạm dừng → Bật → gọi đúng `adapter.submit` / `chat.send` / research như cũ (tiêu chí 1 đòi "test cho cả hai chiều, fixture đếm số lần gọi"). Các test Muse cũ chỉ chạy với `store.set('muse_paused',false)` từ đầu, nên chỉ chứng minh **gián tiếp**. Nên thêm một test chuyển trạng thái thật.
- Đã kiểm, ổn: không xoá file Muse nào (`--diff-filter=D` rỗng); không đụng `data/`, `evidence/`, lockfile, `package.json`; hộp nhận không xoá file gốc (chỉ `unlink` bản snapshot/tạm); chống trùng theo sha256 cả trong `applyProduction('manual_result')`.

**T-003**

5. **Codex CLI (B) ép `-c model_provider="openai"`** (`desktop/src/codex-cli.mjs:64`). `~/.codex/config.toml` của máy này dùng `model_provider = "session_gateway"`, nên lượt chạy thật nhiều khả năng lỗi đăng nhập hoặc định tuyến. Test fixture lại **khẳng định đúng tham số này** (`desktop/test/codex-cli.test.mjs`), nên khi sửa phải đổi test. Đề nghị: không ép `model_provider` (để Codex dùng config của người dùng), giữ `--sandbox read-only` và `--ephemeral`. Tên provider không phải bí mật, nhưng đừng chép khối `[model_providers.session_gateway]` vào app.
6. **Sự kiện `type:"error"` bị coi là thất bại cả lượt** (`codex-cli.mjs:51`). Nếu `codex exec --json` phát `error` tạm thời (ví dụ khi kết nối lại stream) rồi vẫn hoàn tất, app sẽ báo lỗi và bỏ kết quả. **Chưa kiểm** với Codex thật; cần kiểm khi chạy thật lần đầu. Nếu đúng vậy, chỉ nên coi `turn.failed`, hoặc `error` không có `agent_message` cuối, là thất bại.
7. **Landing nhập vào không ghi nguồn.** Content có `notes:'Nguồn: import:'+tool`, còn landing thì không (`components/lab/operations.tsx`, `landingForm(parseTextExchange('landing',…))`). Quy tắc "mỗi tác vụ ghi rõ nhà cung cấp" chưa đủ cho landing. Lỗi nhỏ, có thể gộp vào T-002b.
8. **Nhập trùng hết thì vẫn báo "Đã nhận kết quả research."** `mergeTextResearch` trả batch cũ khi mọi ứng viên trùng, và UI không nói là 0 ứng viên mới. Nên báo "Đã nhận N ứng viên mới, bỏ M trùng". Lỗi nhỏ.
9. **Nới schema lõi.** `candidateSchema.supplierUrl` đổi từ `sourceLink` sang `optionalLink` (`lib/lab/operations.ts:60`). Ràng buộc chỉ còn ở `researchBatchSchema.superRefine`. Hiện an toàn vì mọi đường lưu đều qua batch, nhưng chỗ nào dùng `candidateSchema` riêng (form sửa ứng viên, `productFromCandidate`) giờ nhận được URL rỗng. Nên có test: sửa tay một ứng viên `single` mà xoá URL thì bị chặn.
- Đã kiểm, ổn: `null` giữ nguyên (cờ logistics không có thì là `null`, không phải `false`); `listingStatus≠single` thì `cost` và `shipping` phải `null` (chặn ở cả parse lẫn batch); không quy đổi tiền tệ (CNY giữ nguyên); payload không giả mạo được `source`, `listingCheck` hay receipt YouTube; Muse response bị gỡ `source` và `importMetadata`; không tự chọn 3/10; không xoá hay nới test cũ (0 dòng `test(`/`assert` bị xoá); xoá `OPENAI_API_KEY`/`CODEX_API_KEY` khỏi env con; không shell, timeout 180 giây, giới hạn 2 MB. Báo cáo Codex trong commit khớp diff. Codex tự ghi trung thực rằng nó chạy test **không đạt** trong sandbox, boss chạy lại bên ngoài.

**Rủi ro khi người dùng mở app** (bản build 15:43 từ `56e9842`): công tắc Muse bật được bằng một cú bấm không xác nhận (mục 1); bật Muse rồi tạm dừng lại sẽ giết job đang chạy (mục 2); `instagram?.start()` vẫn tự chạy khi mở app (T-004 đã ghi).

**Người dùng phải tự kiểm trên giao diện thật:** Codex CLI thật (sau khi sửa mục 5); nhập một JSON thật từ skill `hermes-product-check`; xuất gói prompt rồi thả file thật từ Flow vào hộp nhận.

**Tự soi lại và đối chiếu bản T-002b đang sửa (chưa commit, đọc bằng `git diff` lúc khoảng 17:00):**
- Mục 1 (hộp xác nhận): đang được sửa. Có `components/lab/muse-switch.tsx`, dùng ở `desktop-console.tsx` và `manual-media.tsx`, có câu "tài khoản có thể bị khoá. Bật?".
- Mục 2 và 3 (huỷ job, route, `serviceWorkers`): đã gỡ. Giờ dùng `runMuseTask` (AsyncLocalStorage) để job đã nhận trước khi tạm dừng chạy được đến hết. Research tạm dừng thì chuyển `partial`, không kẹt `running`.
- Mục 5 (`model_provider="openai"`): **chưa sửa** trong T-002b. Commit `05747f9` xếp việc này vào T-004.
- **Lỗi mới trong T-002b** (gửi boss chính):
  - **A.** `CodexTextService.execute` (`desktop/src/codex-cli.mjs`) coi **mọi** `research_runs` là Muse chưa đối soát. Không lọc theo đợt hay scope, không có cờ `reconciled`, và điều kiện lọc `filter(row=>kind==='research')` không lọc gì cả. Nếu còn một lượt research cũ ở `needs_attention` (rất có thể, từ hôm tài khoản bị khoá), Codex research sẽ bị chặn **vĩnh viễn** ("Cần đối soát"). Mà muốn đối soát thì `resume()` lại đòi Muse đang bật, nên bị kẹt vòng tròn. **Chưa kiểm** trên dữ liệu thật, vì boss phụ không đọc SQLite người dùng.
  - **B.** `setMusePaused({paused:false})` gọi `this.tick()`, mà tạm dừng không còn xoá `approvedIds`. Nên **bật lại Muse là tự gửi ngay** các job đã duyệt từ trước khi tạm dừng, người dùng không bấm Chạy lần nữa. Với rủi ro khoá tài khoản, đây là quyết định của người dùng, cần hỏi.
  - **C.** AsyncLocalStorage truyền sang cả timer và listener được tạo trong job đã nhận. Callback nào chạy sau khi tạm dừng mà chỉ gọi `assertMuseAvailable` sẽ lọt qua chốt chặn. Cần một test: tạm dừng giữa job, rồi gọi `context()` hoặc `measureQuota()` từ một `setTimeout` tạo bên trong job, thì phải ra `MUSE_PAUSED`.

### Boss phụ vòng 2 (12/11, khoảng 17:05): T-002b commit `4d5e672` (`git diff 56e9842..4d5e672`: 51 file, +1220/−179)
| Việc | Kết luận | Lý do |
|---|---|---|
| T-002b | **Cần sửa** (1 lỗi Nặng, 2 Nhỏ) | A–E đã sửa đúng trong code. Còn kẹt đối soát ở phía **media** |

**Lỗi vòng trước, kiểm lại trong code:**
- **A: Đã sửa.** `provider-routing.mjs` dùng `textProviderReceipts` lọc theo `taskScope`/`batchId`, tôn trọng `reconciled`. Có `researchSkipReconciliation` và `museChatSkipReconciliation` (lưu bền, `resume`/`run` từ chối run đã bỏ qua).
- **B: Đã sửa.** `setMusePaused(true)` gọi `pause()`, hàm này xoá `approvedIds`. Bật lại thì chỉ tăng `dispatchVersion`, không `tick()`. Có test `T-002b B`/`D`.
- **C: Đã sửa.** `runMuseTask` gắn `jobId`+`profileId`; `task.active=false` khi xong; `assertMuseAvailable` chỉ cho qua khi khớp đúng id. Có test `T-002b C`.
- **D (`model_provider="openai"`, `codex-cli.mjs:66`): Chưa sửa.** Đã xếp vào T-004.
- **E: Đã sửa** theo báo cáo Codex (landing ghi `import:<tool>`, báo số mới/trùng). Chưa đọc kỹ UI.
- Test bị xoá hay sửa đều có lý do: test route cũ (hành vi đã bỏ có chủ ý) được thay bằng "pause persists without closing contexts…"; test công tắc cũ được thay bằng 3 test `MuseSwitch`; `instagram-ai-label.test.mjs` bỏ timeout 180 ms và `setDefaultTimeout(1500)` (mục F, chống chập chờn, assertion giữ nguyên, nằm ngoài phạm vi nhưng chấp nhận được).
- Bằng chứng test là của boss chính chạy ngoài sandbox: typecheck 0; test 203/203; api 26/26; desktop 378 pass/1 skip; build 0. Boss phụ **không chạy lại**.

**Lỗi mới:**
- **G (Nặng): media kẹt "Cần đối soát" mà không có lối ra khi Muse bị khoá.**
  - `ManualMedia.route()` (`desktop/src/manual-media.mjs`) và guard `manual_result` (`app/api/production/route.ts:14-20`) đưa **mọi** job Muse của cảnh vào `previous`. Đưa vào không kèm `reconciled`, cùng mọi `attempt.status==='unknown'`.
  - Cảnh nào có một job Muse ở `needs_attention` (hoặc attempt `unknown`) thì bị chặn vĩnh viễn: không xuất được gói prompt, hộp nhận không gắn file, gắn tay cũng lỗi 422.
  - Muốn đối soát thì cần `resume`/`recheckResult`, mà hai lệnh này đòi Muse bật, trong khi tài khoản Muse đã bị khoá. **Không có** `skipReconciliation` cho job media (chỉ có cho research và chat).
  - Tái hiện: một job `needs_attention` có `request.projectId=P, sceneId=S` → `manualMedia.exportPack({projectId:P})` trả "Duyệt ít nhất một cảnh manual…", và `status()` ghi trạng thái cảnh là "Cần đối soát".
  - **Chưa kiểm** dữ liệu thật có job như vậy không (boss phụ không đọc SQLite), nhưng rất có thể có, từ hôm tài khoản bị khoá.
- **H (Nhỏ):** `components/lab/text-exchange.tsx:70` hiện id thô "Mặc định: import:json / codex / muse" cho người dùng. Nên dùng nhãn tiếng Việt: "Nhập JSON", "Codex CLI", "Muse".
- **I (Nhỏ):** mỗi `TextExchange` gọi IPC `museChatList` (×2) và `researchStatus` mỗi 1,5 giây (`setInterval(read,1500)`), dù đã nghe sẵn `workspace-changed`. Nên chỉ đọc lại khi có sự kiện, hoặc giãn ra ≥ 10 giây.
- Tự phản biện:
  - Đã bỏ nghi vấn "auto → manual lệch giữa `production.ts` và resolver", vì guard ở `route.ts` chạy trước và chặn đúng.
  - Đã bỏ nghi vấn "MUSE_STATUS không có", vì `desktop/local/server.mjs:33` có cung cấp kèm `jobs`.

### Boss phụ sửa lỗi G (12/11, khoảng 17:00): commit `ab94531` trong app chính, tag lùi `before-T-002c` (= `4d5e672`)
- **Ai làm và vì sao:** người dùng yêu cầu tốc độ, bảo boss phụ tự sửa G. Boss chính đồng ý, kèm điều kiện: chỉ đụng file không nằm trong WIP T-004 (Codex T-004 đang chạy cùng thư mục), commit bằng `git commit -- <paths>`, chạy riêng test của mình.
- **Cách sửa:**
  - action production `skip_reconciliation {sceneId}` lưu `scene.museReconciledAt` (mốc chỉ tiến lên);
  - `mediaProviderReceipts()` trong `desktop/src/provider-routing.mjs` được dùng chung ở `manual-media.mjs`, `route.ts`, `production-desk.tsx`, `manual-media.tsx`;
  - `route.ts` trả 422 khi job Muse của cảnh đang chạy, hoặc khi không có gì chưa rõ;
  - màn Tạo video có nút "Bỏ qua, không đối soát" kèm hộp xác nhận. Job, attempt, take, receipt đều giữ nguyên.
- **Đã kiểm (chạy RIÊNG):** `tests/production.test.mjs` 32/32; desktop `provider-routing` + `manual-media` + `manual-media-ui` 37/37 (3 test G mới, tái hiện đúng dữ liệu thật: job `needs_attention`, không providerId); api `production-api` 5/5; `tsc --noEmit` 0 lỗi. Không xoá hay nới test cũ.
- **Chưa kiểm:** full suite, `local:build`, Electron thật, 2 job thật từ 08/11.
- **Còn lại:**
  - H và I để Codex làm sau T-004;
  - chặn hẳn `worker.resume` với job **có** providerId sau khi bỏ qua: để boss chính quyết (worker.mjs).
- **Lùi lại:** `git revert ab94531`. **Không** `reset --hard`, vì sẽ xoá WIP T-004.

### Boss phụ vòng 3 (12/11, khoảng 17:10): T-004 `3e653a0`, chạy song song với Codex T-002c
| Việc | Kết luận | Lý do |
|---|---|---|
| T-004 | **Đạt về code**, kèm 1 bản sửa của boss phụ (`d1b57b1`) và 1 câu hỏi cho người dùng | Codex CLI không còn bị ép provider; Instagram trình duyệt tắt mặc định (fail closed), bật phải qua cảnh báo; DM idempotent, có giới hạn tốc độ, có nút dừng khẩn cấp; follow chưa rõ thì không gửi link |
- **Đã tự sửa (Vừa):**
  - **Lỗi:** `matchCta` quá lỏng. LINK khớp pink, line, ink; SHOP khớp stop, show, ship; WANT khớp went. Khách sẽ bị DM nhầm.
  - **Sửa:** từ khoá 4–5 chữ chỉ nhận đúng từ, s/es, hoặc đảo 2 chữ liền nhau; từ khoá ≥ 6 chữ mới nhận 1 lần sửa chữ. Test cũ đổi thành chặt hơn (có chủ ý).
  - **Kiểm (chạy riêng):** `instagram-official` 12/12; tsc 0 lỗi. Tag lùi `before-T-004-cta`.
- **Người dùng đã quyết (12/11):** **giữ** "chỉ gửi khi đã follow" ("Giữ, an toàn hơn"). Polling không kiểm được follow, nên hiện **không DM nào được gửi**, cho tới khi có cách kiểm follow. Người dùng cũng trả lời trực tiếp boss chính: **có xét lại** các comment `follow_unknown` còn trong hạn 7 ngày khi đổi quy tắc, mỗi comment tối đa 1 DM. Việc này giao cho T-002c vòng 2 (file `instagram-comments.mjs` và test đã vào khoá Codex).
- **Chưa kiểm:** full suite, `local:build` (boss chính chạy sau T-002c), tài khoản Meta thật, ảnh 1366/1920.

### Boss phụ vòng 4 (12/11, khoảng 17:30): T-002c `adf48c9`: **ĐẠT**
- **Chặn job Muse cũ đã bỏ qua đối soát:** `worker.assertJobNotSkipped` được gọi trước run, resume, recheck và retry, khớp mốc `museReconciledAt`, thiếu dữ liệu thì chặn (fail closed).
- **Comment `follow_unknown`:** được xét lại theo `rule.revision`, mỗi comment tối đa 1 DM.
- **TextExchange:** bỏ polling 1,5 giây; nhãn tiếng Việt.
- **Bằng chứng (của boss chính):** test 204/204, api 26/26, desktop 418/1/0; `local:build` lúc 17:23:59 từ cây sạch.
- **Ghi chú nhỏ (vòng sau):**
  - job Muse của cảnh đã xoá, hoặc chạy chế độ `--hosted`, sẽ không resume được (fail closed); thông báo lỗi nên có hướng dẫn;
  - "Muse đang tạm dừng…" lặp 3 lần ở màn Tạo video.
- **Từ giờ app đã build đúng HEAD, nên người dùng mở app được.** Boss phụ tạm ngừng sửa app, chỉ đọc.

### Push và merge: chờ người dùng xác nhận trực tiếp với boss chính
- Người dùng nhắn boss phụ "Xong thì push và merge nhé", nhưng trước đó đã nói trực tiếp với boss chính "Hỏi tôi trước khi push hoặc merge" và "cấm push". Boss chính giữ lời nói trực tiếp, nên **chưa push, chưa merge**. Boss phụ cũng không làm thay.
- **Việc của người dùng khi về:** nhắn thẳng vào phiên boss chính câu "push và merge". Boss chính đã chuẩn bị sẵn (cây sạch, test và build đạt, danh sách sha).

**Chứng minh chỉ đọc:** app chính trước và sau khi duyệt đều là HEAD `56e9842`, nhánh `main`, `git stash list` rỗng, tag `before-T-002/002b/003` không đổi. Boss phụ không chạy Codex, không build, không mở app. `D:\agent-office\tools` chỉ có `nosyt-agent-office` ở `df6551d`, sạch, không liên quan T-002/T-003.

## ✅ Xong
- 12/11 khoảng 17:40, **push và merge** theo lời người dùng nói trực tiếp với boss chính:
  - **App:** `git push origin main` lên `ihaveabigcoke-a11y/hermes-clip`, `0e15716..adf48c9` (64 commit, gồm night T-001 `86ecdc0` tới T-002c). Fast-forward, không force. Không push tag hay nhánh phụ (`merge-night-20261111`, `codex/T-002-media-manual` vẫn chỉ ở máy). Trước khi push đã quét diff tìm key/token: không có.
  - **Văn phòng:** merge `claude/boss-phu-review-t002-t003-b4fdf6` (11 commit: `.claude/agents/boss-phu.md`, mục "Hai boss song song" trong CLAUDE.md, STATUS) vào `main`, không xung đột. Rồi push `main` văn phòng.
- 12/11 khoảng 17:05: boss phụ sửa so khớp CTA quá lỏng ở T-004 ("pink" khớp LINK), commit `d1b57b1`, tag lùi `before-T-004-cta` = `3e653a0`. Boss chính đã kiểm: 2 file, ngoài khoá. **Người dùng quyết:**
  - giữ `requireFollow` mặc định true. Vì app chỉ poll comment, **DM sẽ không gửi** cho tới khi có cách kiểm follow (webhook hoặc API messaging), hoặc người dùng tự bỏ tick ở từng quy tắc;
  - CÓ xét lại comment `follow_unknown` khi đổi quy tắc (trong 7 ngày, tối đa 1 DM mỗi comment). Phần này đưa vào T-002c vòng 2. (Boss phụ từng ghi "không xét lại", nhưng đã xác nhận đó là tự suy ra, không phải lời người dùng; đã sửa.)
- 12/11: pull luật mới (sửa thẳng trên app, kèm tag lùi lại). Chép 3 skill Hermes bản mới (có *Office mode*) vào app chính, commit `2661a5a`. Repo app có danh tính git local, chép từ clone night.
- 12/11: sửa `C:\Users\ADMIN\.claude\settings.json`: thêm dấu phẩy thiếu ở dòng 8, bản sao lưu là `settings.json.bak-20261112`. Cài FFmpeg 9.0.2 bằng winget.
- 12/11: app chính `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` giờ là repo git (remote `hermes-clip`), đang ở `86ecdc0`. Các thư mục cục bộ (backup, `local-dist`, `.integrations`, `tools`) vẫn giữ nguyên và được git bỏ qua (ignored).
- Ghi chú cho boss sau: lệnh build đúng là `pnpm local:build` (`pnpm build` lỗi vì repo không có `scripts/run-framework.mjs`). Các test cần `ffmpeg` trong PATH.
- 12/11: thêm NosytLabs (ghim `df6551d`) làm màn hình theo dõi, kèm script `scripts/START-OFFICE.ps1`.
- 12/11: chọn Agent Office (AgentSystemLabs) và ghim `v0.1.211`. Đã cài trên máy người dùng: thư mục dự án `D:\agent-office`, `gh` đã đăng nhập.
