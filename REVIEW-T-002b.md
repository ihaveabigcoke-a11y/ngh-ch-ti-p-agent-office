# Duyệt T-002b: Muse Bật/Tạm dừng và tự chuyển Muse ↔ worker khác

Duyệt theo skill `hermes-night-review`, *Office mode*. Boss Claude, 12/11/2026.

| Task | Kết luận | Lý do | Việc cần sửa |
|---|---|---|---|
| T-002b | **Đạt** (sau 3 vòng) | Xem dưới | Không |

- **Phạm vi:** commit `4d5e672` trên `main` cục bộ của app chính. Mốc lùi `before-T-002b` (= `56e9842`). 49 file, không xoá file nào, không đổi `data/`, `evidence/`, lockfile hay `package.json`.
- **Vòng 1:** làm phần chính, gồm công tắc đồng bộ, hộp xác nhận, tạm dừng không huỷ job đang chạy (đã bỏ đóng context, `route` chặn request và `serviceWorkers:'block'`), resolver dùng chung, "Cần đối soát".
- **Vòng 2:** sửa các lỗi A–F mà boss phụ phát hiện. Boss chính đã đọc code và xác nhận từng lỗi.
  - **A:** Codex research bị chặn vĩnh viễn bởi run Muse cũ ở đợt khác. Giờ chỉ chặn trong đúng scope hoặc cảnh, có nút "Bỏ qua, không đối soát" lưu bền.
  - **B:** bật lại Muse từng tự gửi job đã duyệt trước đó. Giờ tạm dừng thì xoá quyền duyệt; bật lại phải bấm Chạy. Đây là mặc định an toàn do boss chọn, người dùng có thể đổi.
  - **C:** quyền tiếp tục của `AsyncLocalStorage` lan sang timer hay listener. Giờ quyền gắn với đúng job và profile; timer gọi profile khác ra `MUSE_PAUSED`.
  - **D:** test tạm dừng → bật → start: `adapter.submit` được gọi đúng 1 lần.
  - **E:** landing nhập từ JSON ghi `import:<tool>`; nhập 0 ứng viên mới thì báo đúng số trùng.
  - **F:** test `instagram-ai-label` chập chờn khi chạy cả bộ. Chỉ nâng timeout của test lên đúng ngân sách 3 giây của app, assertion giữ nguyên.
- **Vòng 3:** sửa giao diện. Công tắc thành thẻ có khung, nút gạt lime giống thẻ hồ sơ, thấy ngay ở 1366×768; bỏ 3 dòng chú thích lặp.

## Đối chiếu tiêu chí T-002 (bản cập nhật)
- [x] **Tạm dừng thì 0 request tới Muse; bật lại thì luồng cũ chạy.** Có test hai chiều, đếm bằng fixture.
- [x] **Không xoá file, bảng hay màn hình Muse.** `git diff --diff-filter=D` rỗng.
- [x] **Gói prompt, hộp nhận media, MP4 thật:** test T-002 vẫn đạt.
- [x] **Lệnh kiểm**, boss chạy ngoài sandbox:
  - typecheck 0;
  - test 203/203;
  - api 26/26;
  - desktop 378 pass, 1 skip, 0 fail (vòng 2 chạy 2 lần đều 0 fail);
  - `local:build` vào `outputs` 0.
- [x] **12 ảnh** tại `D:\hermes-wt\artifacts\T-002b\`: (Tài khoản Muse, Cài đặt, Tạo video) × (1366, 1920) × (Tạm dừng, Bật).

## Test bị xoá hoặc đổi (đã kiểm)
- Bỏ "pause … closes existing contexts and blocks later requests through an installed route", vì đề mới yêu cầu không huỷ job đang chạy. Thay bằng "pause persists without closing contexts or changing legacy browser options".
- Bỏ "desktop settings show the pause switch on…". Thay bằng "desktop settings show Muse off and paused…".
- Ở vòng 3, các assertion đổi nhãn chuyển sang nhãn mới ("Muse: Đang tạm dừng", `switch.isChecked()`), không bị nới lỏng.

## Dữ liệu thật (đọc chỉ đọc, `worker.sqlite`)
- `research_runs`: 1 (`done`).
- Job Muse: 25 (17 ready, 6 failed, **2 needs_attention**). Hai job `needs_attention` sẽ hiện "Cần đối soát" ở đúng cảnh của chúng, và không chặn cảnh khác.
- Chưa có khoá `muse_paused`, nên lần đầu mở app sẽ là **Tạm dừng** (fail closed).

## Rủi ro và việc người dùng tự kiểm
- Đặt lần lượt Bật → Tạm dừng → Bật trên Electron thật, với một hồ sơ Muse không quan trọng. Muse đã khoá tài khoản ngày 12/11, nên **không nên bật** nếu không thật cần.
- Hai job `needs_attention` cũ: mở và chọn đối soát hoặc "Bỏ qua".
- Lần duyệt boss phụ đề cập nằm ở nhánh `claude/boss-phu-review-t002-t003-b4fdf6` (chưa push, boss chính chưa mở nhánh đó).
