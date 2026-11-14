# T-033: 3 video cho 1 sản phẩm trong dưới 60 giây, và không bao giờ tắt hồ sơ Muse

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- **Người dùng chốt trực tiếp (15/11):** mục tiêu là **tạo 3 video cho 1 sản phẩm trong dưới 60 giây** (từ lúc bấm "Làm video" tới lúc cả 3 video nằm trong Thư viện / xuất xong). Và: *"tôi không hiểu sao bạn cứ tắt profile Muse"*. Chạy **sau T-032** (không còn Codex khác, không còn khoá `codex-*.txt`, `git status` sạch). Tag `before-T-033`, khoá `codex-T-033.txt`, **tự xoá khoá khi xong**.

## A. Luật mới: KHÔNG tắt hồ sơ, KHÔNG tắt Muse
- **Tuyệt đối không** gạt công tắc tắt bất kỳ hồ sơ Muse nào hay công tắc Muse chung trong app, kể cả khi gặp lỗi hay từ chối. Phanh an toàn chỉ có nghĩa: **dừng GỬI thêm lượt** trên hồ sơ đó, ghi nguyên văn lý do vào STATUS và báo. Công tắc do người dùng quyết.
- **Việc đầu tiên:** hồ sơ `Cho` đã bị tắt lúc 03:22 trong T-032 và `Chi` đang tạm ngưng từ T-030. Người dùng **không muốn vậy**. Bật lại **cả hai** bằng đường của app (IPC/nút), kiểm trạng thái sẵn sàng của từng hồ sơ (`ready`, quota), ghi vào STATUS. Hồ sơ mới người dùng vừa thêm cũng kiểm và để bật. **Không** đụng hồ sơ đã bị ban hay đã xoá (`ss`).
- Sửa **mã** nếu chính app/worker tự tắt hồ sơ sau lỗi (tìm trong `worker.mjs`, `muse-chat.mjs`, `auto-video.ts`, `desktop-console.tsx`): lỗi một lượt chỉ được đổi trạng thái của **lượt đó**, không đổi công tắc hồ sơ/Muse. Có test (Muse giả): sau lượt lỗi/từ chối, công tắc hồ sơ và công tắc Muse **vẫn bật**; lượt kế vẫn gửi được trên hồ sơ khác.

## B. Mục tiêu tốc độ: 3 video / 1 sản phẩm / < 60 giây
Đo **tổng thời gian từ lúc bấm "Làm video" tới khi có đủ 3 MP4 hook (3 hook, 3 mã băm khác nhau)**. Bấm đồng hồ từng chặng và ghi vào `D:/hermes-wt/artifacts/T-033/progress.md`: mở hồ sơ/preflight, VPN, gửi, chờ Muse, tải, nhập Thư viện, chọn đoạn, ghép từng MP4.
- **Số liệu đã biết (T-031, 1 clip):** 63,5 giây gồm preflight/VPN ~6 giây, **chờ Muse ~53 giây**, tải ~4 giây, nhập ~4 giây. Muốn 3 video trong 60 giây thì **phải tạo song song**, không tuần tự.
- **Cách làm (chọn tự động theo số hồ sơ sẵn sàng):**
  1. **≥ 3 hồ sơ sẵn sàng:** gửi **song song**, mỗi hồ sơ **1** lượt (giãn ≥ 60 giây là *trên mỗi hồ sơ*, nên 3 hồ sơ gửi cùng lúc là hợp lệ).
  2. **< 3 hồ sơ sẵn sàng:** gửi **1 tin** yêu cầu 3 video: dòng đầu là câu khoá `You create a video for me.`, dòng sau `Make 3 separate videos, one per scene below.` rồi 3 mô tả cảnh. Kiểm Muse trả mấy clip. Trả đủ 3 thì dùng cách này; trả thiếu/lẫn thì ghi vào STATUS và quay về song song theo số hồ sơ có.
  3. **Làm nóng:** vào màn Video là mở sẵn (preflight + VPN) các hồ sơ sẵn sàng, để lúc bấm không mất thời gian mở lại.
  4. **Ghép song song:** 3 MP4 hook dựng đồng thời (FFmpeg/OpenMontage), không đợi nhau; chọn đoạn tự động theo mốc shot; bắt đầu ghép **ngay khi đủ clip cần cho hook đó**, không đợi cả 5 cảnh.
  5. Giảm chờ thừa: polling dày hơn khi đang chờ clip (ví dụ 2–3 giây), tải xong là nhập ngay, không mở lại hồ sơ mỗi lượt.
- **Phanh giữ nguyên:** giãn ≥ 60 giây **trên mỗi hồ sơ**; gặp từ chối/hạn chế vùng/captcha/đăng xuất/2 lỗi liền thì **dừng gửi** (không tắt hồ sơ, xem mục A), chép nguyên văn lý do; không gửi lại lượt chưa đối soát; không đăng, không DM, không dịch vụ trả phí; mọi prompt tạo video vẫn bắt đầu bằng hằng số khoá `MUSE_VIDEO_COMMAND`.
- **Người dùng xác nhận (15/11):** cả **3 hồ sơ** (`Cho`, `Chi`, hồ sơ mới) đều có hạn mức Muse rất lớn ("31 tỷ token, dùng tới năm sau cũng không hết"), **không phải tiết kiệm lượt**. Nên **mặc định gửi song song 3 hồ sơ, mỗi hồ sơ 1 lượt**; chỉ dùng "một tin yêu cầu 3 video" khi có ít hơn 3 hồ sơ sẵn sàng. Quota không còn là lý do để giới hạn; **chỉ còn phanh an toàn tài khoản** (giãn ≥ 60 giây trên mỗi hồ sơ, dừng gửi khi bị chặn).
- **Đo thật:** tối đa **12 lượt gửi** cho cả việc này (4 lần đo × 3 clip), mỗi lần đo cách nhau ≥ 60 giây trên từng hồ sơ. Mỗi lần đo ghi tổng thời gian và bảng chặng.
- **Nếu chờ Muse một mình đã > 50 giây:** dừng ở mức tốt nhất đạt được, **chứng minh bằng số** (chặng Muse vs chặng app) trong STATUS, không bịa số, không bỏ phanh để ép đạt.

## C. Sửa lỗi còn lại từ T-032
Đọc kết luận review/STATUS của T-032 (lỗi Nặng/Vừa), sửa trong phạm vi này nếu nhỏ; lớn thì ghi "Cần anh chốt".

## Tiêu chí đạt
- [ ] `Cho`, `Chi` và hồ sơ mới đều **bật** sau việc này; test chứng minh lỗi một lượt không tắt công tắc.
- [ ] `progress.md` có bảng chặng cho từng lần đo; tổng thời gian bấm → 3 MP4 (3 mã băm khác nhau) được ghi; nếu chưa < 60 giây thì có phân tích chặng Muse vs app.
- [ ] Không vượt 12 lượt gửi; không đăng/DM; không đụng hồ sơ ban/xoá.
- [ ] Full suite xanh, không hạ assertion; push (không force); khoá `codex-T-033.txt` được xoá.

## Báo cáo (đầu STATUS.md, mục "T-033", ≤ 20 dòng)
Hồ sơ đã bật lại (tên, trạng thái) · bảng chặng và tổng thời gian · cách gửi đã dùng (song song / một tin) · lỗi đã sửa (SHA) · chưa kiểm · Cần anh chốt.
