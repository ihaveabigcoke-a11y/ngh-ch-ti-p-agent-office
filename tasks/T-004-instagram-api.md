# T-004: Chuyển Instagram sang API chính thức, kèm comment → DM

- **Repo:** hermes-clip, **sửa thẳng trong thư mục app chính** (tag `before-T-xxx`), không clone, không worktree · **Worker:** codex, effort high · **Ngày:** 12/11/2026
- **Làm sau T-002.** Chỉ 1 Codex chạy trên hermes-clip mỗi lúc.

## Mục tiêu
Muse (của Meta) đã khoá tài khoản. App hiện đăng bài và đọc số liệu Instagram bằng profile trình duyệt (`desktop/src/instagram-browser.mjs`), rất dễ bị Meta khoá dây chuyền. Cần chuyển sang **Instagram Graph API chính thức** (Instagram Login, tài khoản Business/Creator) và thêm tính năng **tự trả lời DM khi comment có từ khoá CTA**.

## Bối cảnh trong code
- Adapter T18 (đang tắt mặc định), `desktop/src/instagram-adapter.mjs`, `instagram-insights.mjs`, `instagram-metrics.mjs`.
- Đếm comment theo từ khoá (T16) và UTM (T17) đã có. Đọc `ops/night/out/CHANGES*.md`.
- Tham khảo cách làm, **không** chép mã nguyên văn và không cài thêm server: OpenReply (`diwenne/openreply`), insta-p8 (`ayuuxh2/insta-p8`). Ghi chú: OpenReply có lỗi đã biết là gửi link luôn khi API không trả về trạng thái follow. Đừng lặp lại lỗi này.

## Phạm vi
1. **Cấu hình API** trong Cài đặt → Instagram, cho từng tài khoản:
   - App ID, và access token lưu trong kho bí mật của OS (Windows Credential Manager hoặc safeStorage của Electron). **Không** lưu plaintext trong SQLite, không ghi log.
   - Nút **"Kiểm tra kết nối"** gọi `GET /me`, hiện handle và loại tài khoản. Token hết hạn thì báo rõ.
2. **Đăng Reel qua API:** tạo container rồi publish, kèm trạng thái và receipt (permalink lấy từ API). Giữ cơ chế chống đăng trùng có sẵn.
   - Mặc định **chế độ API**.
   - Chế độ trình duyệt cũ chỉ bật được khi người dùng tự tắt cảnh báo trong Cài đặt.
3. **Số liệu:** insights qua API (plays/views, likes, comments, shares, saves nếu API trả). Thiếu thì `null`, không đổi thành `0`.
4. **Comment → DM:**
   - Nhận comment qua webhook. Nếu app desktop không có URL công khai thì **poll** comment mỗi 2–5 phút khi app mở, và ghi rõ giới hạn này.
   - Khớp từ khoá CTA theo sản phẩm, có chịu sai chính tả nhẹ.
   - Gửi **private reply** (DM trả lời comment) theo mẫu có link landing + UTM theo tài khoản × hook (dùng lại T17).
   - Mỗi comment chỉ gửi **1 lần** (idempotent theo comment ID). Có giới hạn tốc độ. Có nút tắt khẩn cấp.
   - Ghi nhật ký: comment, từ khoá, DM đã gửi hay lỗi. Không lưu nội dung DM của khách ngoài phạm vi cần đo.
5. **Bảng theo sản phẩm:** gộp số liệu của 3 tài khoản cùng trỏ về 1 sản phẩm: comment CTA, DM đã gửi, share, click UTM. Không cộng trùng.
6. **Mở app KHÔNG tự khởi động Instagram bằng trình duyệt** (người dùng yêu cầu 12/11).
   - Hiện `desktop/src/main.mjs` gọi `instagram?.start()` ngay khi mở app. Bỏ việc tự khởi động này.
   - Worker Instagram trình duyệt **tắt mặc định**, giá trị lưu bền. Cài đặt cũ chưa có giá trị cũng tính là **tắt** (fail closed).
   - Chỉ bật được **bằng tay** trong Cài đặt → Instagram, qua hộp xác nhận có cảnh báo: "Instagram trình duyệt tự động có thể khiến Meta khoá tài khoản (kể cả dây chuyền). Nên dùng API chính thức. Bật?"
   - Khi tắt: không mở profile hay trình duyệt Instagram, không lên lịch đọc số liệu bằng trình duyệt. Dữ liệu, profile, job và số liệu cũ **giữ nguyên**.
   - Đường API (mục 1–5) không phụ thuộc công tắc này.
   - Có test: khởi động app (main/boot) với cài đặt mặc định thì **0 lần** mở trình duyệt Instagram; bật tay thì chạy như cũ.
7. **Sửa đường Codex CLI của T-003 cho kiểu đăng nhập trên máy người dùng.**
   - `desktop/src/codex-cli.mjs` đang ép `-c model_provider="openai"` và `-c forced_login_method="chatgpt"`, trong khi Codex trên máy người dùng dùng `model_provider = "session_gateway"` khai báo trong `~/.codex/config.toml`.
   - **Bỏ các cờ ép provider và đăng nhập.** `codex exec` phải dùng đúng cấu hình và đăng nhập của người dùng (config.toml, profile mặc định).
   - Giữ nguyên các thứ còn lại: không shell, prompt qua stdin, `--sandbox read-only`, `--ephemeral`, timeout, giới hạn byte.
   - Không xoá biến môi trường mà provider tuỳ biến có thể cần. Nếu vẫn cần bỏ `OPENAI_API_KEY`/`CODEX_API_KEY` thì ghi lý do và test.
   - Tuỳ chọn: ô "Codex profile" trong Cài đặt (rỗng = mặc định), truyền `--profile` khi có giá trị.
   - Có test bằng `codex` giả: (a) args **không** chứa `model_provider` hay `forced_login_method`; (b) `CODEX_HOME` và `HOME`/`USERPROFILE` được truyền nguyên; (c) có profile thì truyền `--profile <tên>`.
   - **Không** chạy `codex` thật trong test.

## Không làm
- Không tự động hoá web Instagram.
- Không tạo tài khoản hàng loạt.
- Không tự đăng khi chưa có nội dung và tài khoản được duyệt.
- Không đưa token vào Git hay báo cáo.

## Tiêu chí đạt
- [ ] Toàn bộ gọi API đi qua một module có test bằng fixture: container, publish, insights, private reply, lỗi token hết hạn, lỗi rate limit.
- [ ] Gửi DM idempotent: cùng một comment xử lý 2 lần chỉ ra 1 DM. Có test.
- [ ] Token không xuất hiện trong SQLite hay log. Có test quét.
- [ ] Mở app với cài đặt mặc định thì 0 lần mở trình duyệt Instagram. Bật tay thì phải qua hộp cảnh báo. Có test.
- [ ] `codex exec` không còn bị ép `model_provider` hay `forced_login_method`. Có test bằng `codex` giả.
- [ ] Toàn bộ lệnh kiểm đạt: `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop`, `pnpm local:build` (cần `ffmpeg` trong PATH). Có ảnh Cài đặt → Instagram và bảng sản phẩm ở 1366 px và 1920 px.

## Báo cáo (trong mô tả PR)
Ghi rõ: **chưa kiểm với tài khoản thật**, cho tới khi người dùng tạo Meta App và cấp quyền. Liệt kê các quyền cần xin: `instagram_business_basic`, `instagram_business_content_publish`, `instagram_business_manage_comments`, `instagram_business_manage_messages`, và các bước người dùng cần làm trên Meta Developer.
