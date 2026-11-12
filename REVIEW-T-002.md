# Duyệt T-002: tạm dừng Muse và nhà cung cấp media `manual`

Duyệt theo skill `hermes-night-review`, mục *Office mode*. Boss Claude, 12/11/2026.

| Task | Kết luận | Lý do (file + đoạn) | Việc cần sửa |
|---|---|---|---|
| T-002 | **Đạt** | Xem các mục dưới | Không có. Boss sửa 1 dòng trong script kiểm UI (xem *Ghi chú*) |

- **Phạm vi:** Codex làm trong worktree `D:\hermes-wt\T-002`, nhánh `codex/T-002-media-manual`, commit `7d8e022`. Merge vào `main` của app chính thành `43a45dd`. Mốc lùi là tag `before-T-002` (= `2661a5a`).
- **Quy mô:** 42 file, +935/−59. Không đổi `data/`, `evidence/`, lockfile hay `package.json`.

## Đối chiếu tiêu chí đạt
- [x] **Muse tạm dừng thì không có request nào tới Muse.**
  - `desktop/src/muse-pause.mjs` fail closed: mặc định `muse_paused = true`, kể cả với bản cài cũ.
  - `worker.mjs`, `muse-chat.mjs`, `research-runner.mjs` gọi `assertMuseAvailable` trước mọi lối vào. Thêm `context.route` để huỷ mọi request khi đang tạm dừng.
  - Test `desktop/test/muse-pause.test.mjs` dùng fixture đếm số lần gọi: `{browser:0, vpn:0, chat:0, network:0}` qua 17 hành động. Job, receipt và chat cũ đều còn nguyên.
- [x] **Gói prompt đúng cấu trúc.** Test `manual-media.test.mjs` kiểm:
  - đường dẫn `exports/prompt-packs/P1-20261112-1905`;
  - các file `README-VI.txt`, `<MÃ>.txt` (prompt tiếng Anh, 9:16, 8 seconds), `<MÃ>-ref-1.png` (đúng byte gốc).
- [x] **Hộp nhận media**, test bằng MP4 thật tạo bằng FFmpeg:
  - file vào đúng cảnh;
  - thả lại hoặc đổi tên vẫn không nhập trùng, kể cả sau khi khởi động lại;
  - file gốc giữ nguyên;
  - sai mã thì vào "Chưa gắn cảnh", có cảnh báo sai tỷ lệ 9:16 và gắn tay được;
  - file hỏng hoặc file đang ghi dở được xử lý an toàn; mất phản hồi receipt vẫn tự khớp lại.
- [x] **Lệnh kiểm**, boss chạy lại trong app chính sau merge:
  - typecheck exit 0;
  - test 196/196;
  - test:api 24/24;
  - test:desktop 328 pass, 1 skip (OpenMontage), 0 fail. Trước T-002 là 317 pass, nên có thêm 11 test;
  - `local:build` exit 0.
  - `pnpm build` không dùng được vì repo thiếu `run-framework.mjs`; đề bài đã sửa thành `local:build`.
- [x] **Ảnh màn Tạo video** 1366 và 1920: `D:\hermes-wt\artifacts\T-002\T-002-tao-video-{1366,1920}.png`.
  - Nút nằm trong khung nhìn, không cuộn ngang.
  - Nhà cung cấp mặc định là `manual`; muse, grok-cli và fal bị tắt (đã kiểm qua DOM).
  - Có đủ 4 trạng thái cảnh. Theme graphite–lime giữ nguyên, nhãn tiếng Việt có dấu.

## Kiểm test và dữ liệu
- Không xoá test nào. Có 1 assertion đổi nhãn `'Phân tích bằng Muse'` → `'Muse đang tạm dừng'` (`viral-formulas-ui.test.mjs`), cho khớp với mặc định mới. Assertion không bị nới lỏng; nút vẫn phải bị tắt và có 0 lần gọi.
- Chỉ có một chỗ `?? 0`: góc xoay video khi file không có tag xoay. Đây là giá trị đúng, không phải số liệu chưa biết.

## Ghi chú
- Sandbox của Codex (workspace-write trên Windows) chặn `git add` (`index.lock`), chặn `spawn` cho bộ test đầy đủ (`EPERM`) và chặn Chrome. Vì vậy boss tự chạy test bên ngoài sandbox và commit thay.
- Script `scripts/check-manual-media-ui.mjs` dòng 90 dùng `locator.isDisabled()`, mà hàm này trả `false` với `<option disabled>`. Boss đổi sang `evaluate(option => option.disabled)`. DOM xác nhận các option đều đã bị tắt.

## Rủi ro khi áp vào app chính
- `serviceWorkers: 'block'` được thêm vào profile Muse và có hiệu lực **cả khi Muse được bật lại**. Nếu sau này mở lại Muse mà trang lỗi, hãy xem chỗ này trước (`desktop/src/worker.mjs`, hàm `context`).
- Research queued cũ sẽ không tự chạy khi đang tạm dừng (có chủ ý); bật Muse lại thì chúng mới chạy.

## Việc người dùng phải tự kiểm trên giao diện thật
- Mở app bản Electron: Cài đặt → công tắc **Tạm dừng Muse** đang bật; chọn thư mục Hộp nhận media.
- Xuất một gói prompt thật, rồi tải một video thật từ Flow/Gemini, đặt tên chứa mã cảnh và thả vào hộp nhận.
- Kiểm DPI hoặc độ phóng to Windows của máy thật.
