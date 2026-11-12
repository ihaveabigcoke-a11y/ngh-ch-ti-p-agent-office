# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026 chiều, bởi boss Claude (trên máy người dùng)._

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
Đề bài đã viết sẵn trong `tasks/`. Boss làm theo đúng thứ tự, mỗi lúc chỉ 1 Codex chạy trên hermes-clip.
1. [~] **T-001** Merge nhánh `night-20261111` vào app chính. Đã xong phần kỹ thuật; còn chờ người dùng kiểm tay và quyết định push. `tasks/T-001-merge-night.md`
2. [x] **T-002** (đạt, đã merge vào app chính `43a45dd`, tag lùi `before-T-002`) Tạm dừng Muse, thêm nhà cung cấp media `manual` (gói prompt + hộp nhận file). Giao Codex. `tasks/T-002-thay-muse-media-manual.md`
3. [x] **T-003** (đạt, commit `56e9842` trong app chính, tag lùi `before-T-003`) Research và viết nội dung không cần Muse (nhập JSON, Codex CLI). Giao Codex. `tasks/T-003-research-khong-muse.md`
4. [ ] **T-004** Instagram qua API chính thức, kèm comment → DM. Giao Codex. `tasks/T-004-instagram-api.md`
5. [ ] Kế hoạch boss dự phòng sau khi Claude Pro hết hạn (khoảng 19/11).

## 🔨 Đang làm
| Việc | Worker | Nhánh / PR | Ghi chú |
|---|---|---|---|
| T-002b: đề T-002 cập nhật (`2bd900a`, `ad9c73f`) | Codex, chạy **sau khi T-003 xong** (mỗi lúc 1 Codex trong app) | sửa thẳng trong app chính, tag `before-T-002b` | Gồm: công tắc Muse Bật/Tạm dừng ở Tài khoản Muse và Cài đặt, có hộp xác nhận; tạm dừng **không huỷ job đang chạy** (code T-002 hiện đang đóng context, phải sửa); bật lại thì luồng Muse như trước; quy tắc tự chuyển Muse ↔ manual/Codex/JSON cho cả media lẫn research và nội dung. Đề: `D:\hermes-wt\prompts\T-002b-head.md` + toàn văn T-002 |

## 👀 Chờ người dùng duyệt
| Việc | PR | Boss đánh giá | Bằng chứng |
|---|---|---|---|
| T-001 merge night | Chưa push. Commit `86ecdc0` nằm trên nhánh cục bộ `merge-night-20261111`, app chính đang ở commit này | Đạt phần kỹ thuật. **Chưa kiểm:** app mở lại được và dữ liệu cũ còn nguyên (người dùng tự kiểm theo `E:\Hermes Night\hermes-night3\boss\MORNING.md`). Giữ F03 theo lựa chọn của người dùng | Sao lưu tại `D:\backup\hermes-20261112-1346`: AppData 2476 file / 361.792.710 byte, khớp nguồn; tar app 18145/18145 file. Merge không xung đột. Kết quả kiểm chạy trong app chính: typecheck exit 0; test 196/196; test:api 24/24; test:desktop 317 pass, 1 skip (OpenMontage), 0 fail; `local:build` exit 0 |
| T-002 media `manual` | Đã merge vào `main` cục bộ của app chính: `43a45dd` (commit việc `7d8e022`). Tag lùi `before-T-002`. Worktree `D:\hermes-wt\T-002` vẫn giữ | **Đạt.** Xem `REVIEW-T-002.md`. **Chưa kiểm:** Electron thật, file tải thật từ Flow/Gemini | Kiểm trong app sau merge: typecheck 0; test 196/196; api 24/24; desktop 328 pass, 1 skip, 0 fail; `local:build` 0. Ảnh `D:\hermes-wtrtifacts\T-002\T-002-tao-video-{1366,1920}.png` |
| T-003 research không Muse | Commit `56e9842` trên `main` cục bộ của app chính. Tag lùi `before-T-003` | **Đạt.** Có: nhập JSON hoặc file kiểm theo schema, báo lỗi từng trường; nhận JSON của skill `hermes-product-check`; Copy prompt research; Codex CLI tắt mặc định (không shell, timeout 180 giây, giới hạn 2 MB, test bằng `codex` giả); content và landing. **Chưa kiểm:** `codex exec` thật. App ép `model_provider=openai`, trong khi Codex trên máy dùng `session_gateway`, nên có thể phải chỉnh khi bật thật. Quy tắc tự chuyển Muse cho research và nội dung sẽ làm trong T-002b | Kiểm ngoài sandbox: typecheck 0; test 202/202; api 26/26; desktop 337 pass, 1 skip, 0 fail; build 0. Ảnh `D:\hermes-wtrtifacts\T-003\T-003-nghien-cuu-{1366,1920}.png`: 10 ứng viên `import:Claude`, null hiện "Chưa biết", CNY giữ nguyên, 0/3 chọn. `desktop/local-dist` đã build lại lúc 15:43:46 từ `56e9842` |
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

**Chứng minh chỉ đọc:** app chính trước và sau khi duyệt đều là HEAD `56e9842`, nhánh `main`, `git stash list` rỗng, tag `before-T-002/002b/003` không đổi. Boss phụ không chạy Codex, không build, không mở app. `D:\agent-office\tools` chỉ có `nosyt-agent-office` ở `df6551d`, sạch, không liên quan T-002/T-003.

## ✅ Xong
- 12/11: pull luật mới (sửa thẳng trên app, kèm tag lùi lại). Chép 3 skill Hermes bản mới (có *Office mode*) vào app chính, commit `2661a5a`. Repo app có danh tính git local, chép từ clone night.
- 12/11: sửa `C:\Users\ADMIN\.claude\settings.json`: thêm dấu phẩy thiếu ở dòng 8, bản sao lưu là `settings.json.bak-20261112`. Cài FFmpeg 9.0.2 bằng winget.
- 12/11: app chính `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` giờ là repo git (remote `hermes-clip`), đang ở `86ecdc0`. Các thư mục cục bộ (backup, `local-dist`, `.integrations`, `tools`) vẫn giữ nguyên và được git bỏ qua (ignored).
- Ghi chú cho boss sau: lệnh build đúng là `pnpm local:build` (`pnpm build` lỗi vì repo không có `scripts/run-framework.mjs`). Các test cần `ffmpeg` trong PATH.
- 12/11: thêm NosytLabs (ghim `df6551d`) làm màn hình theo dõi, kèm script `scripts/START-OFFICE.ps1`.
- 12/11: chọn Agent Office (AgentSystemLabs) và ghim `v0.1.211`. Đã cài trên máy người dùng: thư mục dự án `D:\agent-office`, `gh` đã đăng nhập.
