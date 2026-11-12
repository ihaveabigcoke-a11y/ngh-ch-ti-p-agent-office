# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026 chiều, bởi boss Claude (trên máy người dùng)._

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
Đề bài đã viết sẵn trong `tasks/`. Boss làm theo đúng thứ tự, mỗi lúc chỉ 1 Codex chạy trên hermes-clip.
1. [~] **T-001** Merge nhánh `night-20261111` vào app chính. Đã xong phần kỹ thuật; còn chờ người dùng kiểm tay và quyết định push. `tasks/T-001-merge-night.md`
2. [x] **T-002** (đạt, đã merge vào app chính `43a45dd`, tag lùi `before-T-002`) Tạm dừng Muse, thêm nhà cung cấp media `manual` (gói prompt + hộp nhận file). Giao Codex. `tasks/T-002-thay-muse-media-manual.md`
3. [x] **T-003** (đạt, commit `56e9842` trong app chính, tag lùi `before-T-003`) Research và viết nội dung không cần Muse (nhập JSON, Codex CLI). Giao Codex. `tasks/T-003-research-khong-muse.md`
4. [x] **T-004** (đạt, commit `3e653a0` trong app chính) Instagram qua API chính thức, kèm comment → DM. Giao Codex. `tasks/T-004-instagram-api.md`
5. [ ] Kế hoạch boss dự phòng sau khi Claude Pro hết hạn (khoảng 19/11).

## 🔨 Đang làm
| Việc | Worker | Nhánh / PR | Ghi chú |
|---|---|---|---|
| T-002c: lỗi G (media kẹt "Cần đối soát") | **G xong:** commit `ab94531` do boss phụ sửa (10 file, +142/−17), boss chính đã kiểm: đúng 10 file, WIP T-004 (35 file) nguyên vẹn, không trùng | tag `before-T-002c` = `4d5e672`. **Lùi bằng `git revert ab94531`**, không `reset --hard` | Boss phụ chạy test riêng: production 32/32; desktop provider-routing + manual-media 37/37; api production 5/5; tsc 0. **Chưa:** chạy đủ bộ, build, Electron. Còn lại cho Codex sau T-004: worker.mjs chặn resume/recheck job cũ có providerId của cảnh đã bỏ qua (dữ liệu thật: 2 job đều không có providerId, nên đã được G phủ); H nhãn tiếng Việt; I bỏ polling 1,5 giây. Đề: `D:\hermes-wt\prompts\T-002c-head.md` |
| T-002c phần còn lại (worker chặn job cũ có providerId, H, I, bảng Instagram 1366, dòng Muse lạc chỗ) | Codex (`codex exec`, effort high) | sửa thẳng trong app chính, tag `before-T-002c2` = `3e653a0` | Đang chạy. Xong thì chạy đủ bộ, build `local-dist`, báo người dùng lúc mở app an toàn |

## 👀 Chờ người dùng duyệt
| Việc | PR | Boss đánh giá | Bằng chứng |
|---|---|---|---|
| T-001 merge night | Chưa push. Commit `86ecdc0` nằm trên nhánh cục bộ `merge-night-20261111`, app chính đang ở commit này | Đạt phần kỹ thuật. **Chưa kiểm:** app mở lại được và dữ liệu cũ còn nguyên (người dùng tự kiểm theo `E:\Hermes Night\hermes-night3\boss\MORNING.md`). Giữ F03 theo lựa chọn của người dùng | Sao lưu tại `D:\backup\hermes-20261112-1346`: AppData 2476 file / 361.792.710 byte, khớp nguồn; tar app 18145/18145 file. Merge không xung đột. Kết quả kiểm chạy trong app chính: typecheck exit 0; test 196/196; test:api 24/24; test:desktop 317 pass, 1 skip (OpenMontage), 0 fail; `local:build` exit 0 |
| T-002 media `manual` | Đã merge vào `main` cục bộ của app chính: `43a45dd` (commit việc `7d8e022`). Tag lùi `before-T-002`. Worktree `D:\hermes-wt\T-002` vẫn giữ | **Đạt.** Xem `REVIEW-T-002.md`. **Chưa kiểm:** Electron thật, file tải thật từ Flow/Gemini | Kiểm trong app sau merge: typecheck 0; test 196/196; api 24/24; desktop 328 pass, 1 skip, 0 fail; `local:build` 0. Ảnh `D:\hermes-wtrtifacts\T-002\T-002-tao-video-{1366,1920}.png` |
| T-003 research không Muse | Commit `56e9842` trên `main` cục bộ của app chính. Tag lùi `before-T-003` | **Đạt.** Có: nhập JSON hoặc file kiểm theo schema, báo lỗi từng trường; nhận JSON của skill `hermes-product-check`; Copy prompt research; Codex CLI tắt mặc định (không shell, timeout 180 giây, giới hạn 2 MB, test bằng `codex` giả); content và landing. **Chưa kiểm:** `codex exec` thật. App ép `model_provider=openai`, trong khi Codex trên máy dùng `session_gateway`, nên có thể phải chỉnh khi bật thật. Quy tắc tự chuyển Muse cho research và nội dung sẽ làm trong T-002b | Kiểm ngoài sandbox: typecheck 0; test 202/202; api 26/26; desktop 337 pass, 1 skip, 0 fail; build 0. Ảnh `D:\hermes-wtrtifacts\T-003\T-003-nghien-cuu-{1366,1920}.png`: 10 ứng viên `import:Claude`, null hiện "Chưa biết", CNY giữ nguyên, 0/3 chọn. `desktop/local-dist` đã build lại lúc 15:43:46 từ `56e9842` |
| T-002b Muse Bật/Tạm dừng + tự chuyển | Commit `4d5e672` trên `main` cục bộ của app. Tag lùi `before-T-002b` | **Đạt** sau 3 vòng (xem `REVIEW-T-002b.md`). Bật lại Muse không tự gửi job cũ (mặc định an toàn, người dùng có thể đổi) | typecheck 0; test 203/203; api 26/26; desktop 378 pass, 0 fail; build 0; 12 ảnh tại `D:\hermes-wt\artifacts\T-002b\` |
| T-004 Instagram API + comment→DM + tắt Instagram trình duyệt + Codex CLI session_gateway | Commit `3e653a0`. Tag lùi `before-T-004` (= `4d5e672`, trước cả commit G `ab94531`, nên lùi riêng T-004 thì dùng `git revert 3e653a0`) | **Đạt** (xem `REVIEW-T-004.md`). **Chưa kiểm:** tài khoản Meta thật, safeStorage trên Electron thật | typecheck 0; test 204/204; api 26/26; desktop 396 pass, 0 fail (2 lần); build 0; 4 ảnh tại `D:\hermes-wt\artifacts\T-004\` |
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

## ✅ Xong
- 12/11: pull luật mới (sửa thẳng trên app, kèm tag lùi lại). Chép 3 skill Hermes bản mới (có *Office mode*) vào app chính, commit `2661a5a`. Repo app có danh tính git local, chép từ clone night.
- 12/11: sửa `C:\Users\ADMIN\.claude\settings.json`: thêm dấu phẩy thiếu ở dòng 8, bản sao lưu là `settings.json.bak-20261112`. Cài FFmpeg 9.0.2 bằng winget.
- 12/11: app chính `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` giờ là repo git (remote `hermes-clip`), đang ở `86ecdc0`. Các thư mục cục bộ (backup, `local-dist`, `.integrations`, `tools`) vẫn giữ nguyên và được git bỏ qua (ignored).
- Ghi chú cho boss sau: lệnh build đúng là `pnpm local:build` (`pnpm build` lỗi vì repo không có `scripts/run-framework.mjs`). Các test cần `ffmpeg` trong PATH.
- 12/11: thêm NosytLabs (ghim `df6551d`) làm màn hình theo dõi, kèm script `scripts/START-OFFICE.ps1`.
- 12/11: chọn Agent Office (AgentSystemLabs) và ghim `v0.1.211`. Đã cài trên máy người dùng: thư mục dự án `D:\agent-office`, `gh` đã đăng nhập.
