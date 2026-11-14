# T-031: Vì sao app gửi Muse chỉ ra "PROMPT ONLY / 403 video_not_available", sửa đường tạo video

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- **Người dùng nói trực tiếp (15/11):** "hồ sơ nào cũng tạo được" video trên Muse (đã tự thử trên web). Nhưng T-030 gửi lượt thật bằng hồ sơ `Chi` lúc 00:38 và nhận lại lúc 00:44: **"PROMPT ONLY — no video was generated … 403 video_not_available"**. Hai điều này mâu thuẫn, nên nghi **đường gửi của app** (chế độ/công cụ tạo video không được bật), không phải quyền tài khoản.

## Mục tiêu
Tìm ra **vì sao** worker Muse của app chỉ gửi prompt chữ mà không kích hoạt tạo video, và sửa cho đúng. Có bằng chứng bằng một lượt thật.

## Cách làm
1. **Chạy sau T-028b lần 2** (không còn Codex khác, không còn khoá `codex-*.txt`, cây sạch). Tag `before-T-031`, ghi khoá `codex-T-031.txt` và **tự xoá khoá khi xong** (hoặc ghi vào STATUS nếu bị chặn).
2. **Đọc code, không đọc dữ liệu thật:** `desktop/src/muse.mjs` (adapter: chọn chế độ, gắn tham chiếu, bấm gửi, nhận file), `muse-chat.mjs`, `worker.mjs`, cấu hình `adapter` (đường dẫn/URL bắt đầu, các bộ chọn giao diện). Trả lời bằng chứng bằng chữ, kèm số dòng:
   - Adapter có **chọn chế độ "tạo video"** (nút, tab, model hay lệnh) trước khi gửi không? Bằng cách nào?
   - Receipt lượt T-030 hồ sơ `Chi`: lấy **qua IPC của app**; chép nguyên văn **lý do và mã** (không token/cookie), phân biệt "Muse trả lời chữ" với "Muse từ chối quyền video".
   - So sánh với lần Muse từng ra clip (receipt cũ có `providerId` và `output`): giữa hai lần, bộ chọn giao diện, URL hay luồng gửi có khác nhau không?
3. **Hỏi người dùng đúng một câu nếu thiếu thông tin:** ghi vào STATUS "Cần anh chốt" câu: *"Trên web Muse, anh bấm gì để tạo video (nút nào, chọn model nào, có cần tải ảnh đầu vào không)?"*. Đây là chỗ đoán dễ sai nhất; **không đoán** giao diện web.
4. **Sửa trong code** nếu chỉ ra được nguyên nhân (ví dụ thiếu bước chọn chế độ video, bộ chọn đã đổi, gửi vào chat thường thay cho màn tạo video). Có **test với Muse giả** chứng minh adapter đi đúng luồng video, và test ca từ chối `403 video_not_available` hiện lý do rõ, không báo "sẵn sàng".
5. **Chỉ khi đã sửa và test xanh:** gửi **đúng 1 lượt thật** bằng hồ sơ `Cho` (hồ sơ `Chi` đang tạm dừng, giữ nguyên; **không** dùng `ss`). Đợi tối đa timeout cấu hình. Ghi kết quả vào `D:/hermes-wt/artifacts/T-031/progress.md`.
   - Clip về hợp lệ: ffprobe, sha256, ghi thời gian. **Không** gửi thêm các cảnh khác trong việc này; việc dựng 3 hook là việc sau.
   - Vẫn `403`/chỉ prompt: **dừng, không thử lại, không đổi hồ sơ**, chép nguyên văn lý do vào STATUS.

## Phanh
Tối đa **1 lượt Muse** cho cả việc này. Công tắc Muse giữ bật; không tắt. Không đọc cookie/token/DB. Không đăng, không DM, không dịch vụ trả phí.

## Tiêu chí đạt
- [ ] Báo cáo nêu nguyên nhân có bằng chứng (số dòng code hoặc receipt), hoặc nói rõ "chưa xác định" kèm thiếu gì.
- [ ] Nếu sửa code: test Muse giả đạt cho cả luồng đúng và ca 403; full suite xanh; không hạ assertion.
- [ ] Đúng ≤ 1 lượt Muse thật; kết quả (clip hợp lệ hoặc lý do) ghi nguyên văn.
- [ ] Khoá `codex-T-031.txt` được nhả. Push khi test xanh (không force).

## Báo cáo (đầu STATUS.md, mục "T-031", ≤ 15 dòng)
Nguyên nhân · đã sửa gì (SHA) · kết quả lượt thật · chưa kiểm · Cần anh chốt.
