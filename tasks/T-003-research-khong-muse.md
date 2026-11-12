# T-003: Research và viết nội dung không cần Muse

- **Repo:** hermes-clip, **sửa thẳng trong thư mục app chính** (tag `before-T-xxx`), không clone, không worktree · **Worker:** codex, effort high · **Ngày:** 12/11/2026

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
3b. **Nhận kết quả của skill `hermes-product-check`.**
   - Nút "Nhập kết quả research" phải nhận được cả JSON một sản phẩm mà skill này xuất ra, với các trường: `name, supplierUrl, supplierCountry, listingStatus, cost, costCurrency, shipping, shippingCurrency, price, currency, minimumOrder, matchType, usRetail{low,high,currency,sources[]}, maxLandedForMarkup, visualPayoff, aiFidelityRisks, logisticsFlags, competition{…}, verdict, verdictReason, evidenceNotes`.
   - Ánh xạ các trường sang ứng viên. Trường app chưa có thì lưu nguyên trong phần ghi chú hoặc metadata, không bỏ.
   - `listingStatus` khác `single` thì `cost` và `shipping` bắt buộc là `null`.
   - Không quy đổi tiền tệ.
   - Hiện `verdict` (try / hold / reject) và `logisticsFlags` thành nhãn trên thẻ ứng viên.
4. **Content và landing:** làm tương tự (A) và (B) cho `contentResponse` và `landingResponse`, gắn vào đúng sản phẩm hoặc cảnh.

## Quy tắc tự chuyển Muse ↔ worker khác (áp dụng cho T-002 và T-003)
- **Muse sẵn sàng** khi: nút Muse đang **Bật**, có profile đã đăng nhập, và còn hạn mức. Đúng logic `ready` hiện có trong `lib/lab/muse-connection.ts`.
- Muse sẵn sàng thì app **mặc định dùng Muse** cho research, nội dung và media, y như trước.
- Muse **không** sẵn sàng (tạm dừng, chưa đăng nhập, hết hạn mức, lỗi phiên) thì app **tự quay về**:
  - research và nội dung đi qua Codex hoặc nhập JSON (T-003);
  - media đi qua nhà cung cấp `manual`, tức gói prompt cho Flow/Gemini (T-002).
- Mỗi tác vụ ghi rõ nó đã chạy bằng nhà cung cấp nào. Người dùng vẫn chọn tay được cho từng cảnh nếu muốn.
- Không tự gửi lại job Muse có kết quả chưa rõ sang nhà cung cấp khác; phải đối soát trước.

## Không làm
- Không gọi Muse.
- Không tự chấm điểm thị trường hay bịa doanh thu.
- Không tự chọn 3 trong 10 thay người dùng.

## Tiêu chí đạt
- [ ] Nhập JSON hợp lệ thì ra đúng số ứng viên, `null` giữ nguyên. JSON sai thì báo lỗi theo trường. Có test.
- [ ] Đường (B) có test với một file `codex` giả (fixture) và test timeout.
- [ ] Toàn bộ lệnh kiểm đạt: `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop`, `pnpm local:build` (cần `ffmpeg` trong PATH). Có ảnh màn **Nghiên cứu** ở 1366 px và 1920 px.

## Báo cáo (trong mô tả PR)
Như mẫu: tách rõ đã kiểm và chưa kiểm. Ghi rõ đã chạy `codex exec` thật hay chưa.
