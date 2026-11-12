# Duyệt T-004: Instagram API chính thức, comment → DM, tắt Instagram trình duyệt mặc định, Codex CLI theo cấu hình người dùng

Duyệt theo `hermes-night-review`, *Office mode*. Boss Claude, 12/11/2026.

| Task | Kết luận | Lý do | Việc cần sửa |
|---|---|---|---|
| T-004 | **Đạt** (1 vòng) | Xem dưới | 2 điểm giao diện nhỏ, đã chuyển sang T-002c |

- **Phạm vi:** commit `3e653a0` trên `main` cục bộ của app chính.
  - Tag `before-T-004` = `4d5e672`. Commit G của boss phụ (`ab94531`) nằm giữa, **không** thuộc T-004; diff duyệt là `ab94531..3e653a0`.
  - 36 file, +965/−146. Không xoá file nào, không đổi `data/`, `evidence/`, lockfile hay `package.json`.

## Đối chiếu tiêu chí
- [x] **Mọi lời gọi API đi qua một module, test bằng fixture `fetch`:** container, publish (một lần, không resumable upload, không trình duyệt), insights, private reply, GET `/me` + loại tài khoản, token hết hạn, rate limit đã được làm sạch.
- [x] **DM idempotent:** gửi trùng, gọi đồng thời hay khởi động lại thì vẫn chỉ ra 1 DM. Phản hồi không chắc chắn hoặc receipt `sending` sau khởi động lại thì **không thử lại**.
- [x] **Token không xuất hiện** trong file SQLite hay WAL, trạng thái công khai, log (cả khi thành công lẫn khi lỗi). Có test quét.
- [x] **Mở app với cài đặt mặc định:** 0 lần mở trình duyệt Instagram. `main.mjs` thay `instagram?.start()` bằng `bootInstagram()`, chỉ chạy timer của đường API.
  - Khoá `instagram_browser_enabled`: thiếu hoặc `null` thì tắt (fail closed), lưu bền.
  - Bật tay phải đúng câu cảnh báo.
- [x] **Codex CLI:**
  - args = `exec --json --ephemeral --skip-git-repo-check --sandbox read-only -` (không còn `model_provider` hay `forced_login_method`);
  - `CODEX_HOME`, `HOME`, `USERPROFILE` và token gateway được truyền nguyên;
  - có `--profile <tên>` khi đặt profile.
  - Test cũ khẳng định có `model_provider="openai"` đã được **thay** bằng test mới.
- [x] **Follow chưa xác minh thì KHÔNG gửi link** (tránh lỗi đã biết của OpenReply). Từ khoá CTA chịu được sai chính tả nhẹ, có test ranh giới.
- [x] **Tắt khẩn cấp,** giới hạn 20 DM/giờ/tài khoản, cách nhau ít nhất 10 giây; quy tắc chưa duyệt hoặc comment cũ thì chặn.
- [x] **Bảng sản phẩm** gộp 3 tài khoản không cộng trùng; UTM lấy bản đo mới nhất theo URL và cùng kỳ; số chưa biết giữ `null` (hiện —).
- [x] **Lệnh kiểm,** boss chạy ngoài sandbox:
  - typecheck 0;
  - test 204/204;
  - api 26/26;
  - desktop 396 pass, 1 skip, 0 fail (chạy 2 lần);
  - `local:build` vào `outputs` 0.
- [x] **4 ảnh** tại `D:\hermes-wt\artifacts\T-004\`: Cài đặt → Instagram và bảng sản phẩm, mỗi màn ở 1366 và 1920.

## Test bị xoá hoặc đổi
- "fake codex … API keys removed": thay bằng test mới cho args và env (xem trên).
- "Legacy profile defaults to browser…": thay bằng "New profile defaults to API…", theo đề ("Mặc định chế độ API").
  - Hệ quả: profile cũ chưa có `apiMode` giờ chạy ở chế độ API. Chưa nhập token thì đăng bài sẽ báo lỗi rõ ràng, **không** rơi về trình duyệt.

## Điểm nhỏ chuyển sang T-002c
- Ở 1366 px, bảng sản phẩm bị cắt cột bên phải. Cần ghim cột Sản phẩm và có vùng cuộn ngang rõ.
- Dòng "Muse đang tạm dừng…" hiện trên trang Instagram, không liên quan.

## Chưa kiểm
- **Tài khoản Meta thật** (chưa có Meta App). Một số endpoint/field ghi "chưa kiểm chứng" trong `docs/INSTAGRAM-API.md`.
- safeStorage trên Electron thật.
- Webhook: desktop không có URL công khai, nên **poll mỗi 3 phút khi app mở**; tắt app hoặc máy ngủ thì ngừng nhận comment.
- Click UTM hiện nhận bản đo analytics nhập tay.

## Việc người dùng cần làm trên Meta Developer (khi muốn dùng thật)
1. Tạo Meta App có sản phẩm **Instagram** (Instagram API with Instagram Login).
2. Thêm tài khoản Business/Creator làm tester. Cấu hình redirect URI, privacy policy URL, data deletion URL.
3. Xin các quyền: `instagram_business_basic`, `instagram_business_content_publish`, `instagram_business_manage_comments`, `instagram_business_manage_messages`. Đưa lên public cho người khác dùng thì cần App Review.
4. Nhập App ID và token trong Cài đặt → Instagram, rồi bấm "Kiểm tra kết nối".
