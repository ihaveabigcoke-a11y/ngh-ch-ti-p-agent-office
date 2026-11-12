# T-003: Research và viết nội dung không cần Muse

- **Repo:** hermes-clip (bản đã merge T-001) · **Worker:** codex, effort high · **Ngày:** 12/11/2026

## Mục tiêu
Trước đây research sản phẩm và viết hook/kịch bản đi qua Muse. Giờ cần hai đường thay thế, đều **miễn phí**:
- **(A)** nhập file JSON do Codex, Claude hoặc Gemini Deep Research làm ra;
- **(B)** app tự gọi Codex CLI trên máy, dùng gói Codex không giới hạn của người dùng.

## Bối cảnh trong code
- Schema research và content đã có trong `lib/lab/muse-workflows.ts`: `researchResponse`, `contentResponse`, `landingResponse`, và prompt `museTaskPrompt`. **Tái dùng**, không viết lại.
- `lib/lab/codex-exchange.ts` và `scripts/run-codex.mjs` đã có đường trao đổi với Codex. Đọc trước, mở rộng thay vì làm song song.
- Skill `hermes-product-check` (`.claude/skills/`) định nghĩa checklist kiểm sản phẩm.

## Phạm vi
1. **Nhập JSON (A).**
   - Màn **Nghiên cứu** có nút **"Nhập kết quả research"**: dán JSON hoặc chọn file.
   - JSON được kiểm theo schema `researchResponse`. Sai thì hiện lỗi rõ ràng từng trường.
   - Ứng viên nhập vào giữ nguyên `null` cho số chưa biết, có nguồn, và ghi `source: "import:<tên công cụ>"`.
2. **Xuất prompt research.** Nút **"Copy prompt research"** tạo prompt từ `museTaskPrompt('research', …)`, đổi chữ "Muse" thành trung lập, để người dùng dán vào Gemini Deep Research hoặc ChatGPT rồi nhập kết quả về qua (A).
3. **Codex CLI (B), tuỳ chọn, mặc định tắt.**
   - Bật trong Cài đặt thì app chạy `codex exec` với prompt trên, có giới hạn thời gian và kích thước đầu ra, không dùng shell.
   - Lấy JSON cuối cùng, kiểm schema, rồi nhập như (A).
   - Không tìm thấy `codex` thì báo hướng dẫn.
4. **Content và landing:** làm tương tự (A) và (B) cho `contentResponse` và `landingResponse`, gắn vào đúng sản phẩm hoặc cảnh.

## Không làm
- Không gọi Muse.
- Không tự chấm điểm thị trường hay bịa doanh thu.
- Không tự chọn 3 trong 10 thay người dùng.

## Tiêu chí đạt
- [ ] Nhập JSON hợp lệ thì ra đúng số ứng viên, `null` giữ nguyên. JSON sai thì báo lỗi theo trường. Có test.
- [ ] Đường (B) có test với một file `codex` giả (fixture) và test timeout.
- [ ] Toàn bộ lệnh kiểm đạt. Có ảnh màn **Nghiên cứu** ở 1366 px và 1920 px.

## Báo cáo (trong mô tả PR)
Như mẫu: tách rõ đã kiểm và chưa kiểm. Ghi rõ đã chạy `codex exec` thật hay chưa.
