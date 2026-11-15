# T-049: Chặn clip cũ trùng byte giữa các tác vụ

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn: khảo sát thật một công cụ khác (D:/hermes-wt/meosu-frames/chatgpt-phan-tich/), Opus chốt. **Chỉ học ý, không dùng mã/thương hiệu/văn bản của họ.**
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu; không gửi Muse thật (Muse giả); không đổi luồng 3 video ngoài phạm vi. Chạy sau việc trước (không Codex khác, không khoá, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh 1366/1920 nếu có giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx.

## Vấn đề
Khảo sát thấy công cụ kia nhận lại clip cũ (trùng sha256 từng byte) như cảnh mới. Hermes mới chặn trùng **trong một gói 3 video** (`worker.mjs:~666`), chưa chặn **giữa các tác vụ**, luồng đơn, Video dài (T-046) hay tạo lại (T-042).
## Việc
1. Sổ sha256 mọi file Muse đã nhập (bảng/chỉ mục trong store, migration an toàn, không đụng dữ liệu cũ; dựng sổ từ take hiện có khi cần).
2. Tác vụ mới trả file có hash đã thấy ở **tác vụ/cảnh khác** → không nhập như clip mới: đánh dấu "Trùng clip cũ #N" (liên kết tới nguồn), giữ receipt, **không ghi đè**, **không tự gửi lại**; người dùng quyết (tạo lại/nhập tay).
3. Hai file của **cùng một tác vụ** (2 biến thể) gộp thành **1 ý tưởng** khi đếm/hiển thị.
4. Áp dụng cho luồng đơn, gói 3 video, tạo lại (T-042), Video dài (T-046; nếu chưa có mã thì chừa điểm gọi + test).
## Tiêu chí đạt
- [ ] Test (Muse giả trả lại file cũ): bị từ chối, không ghi đè, receipt giữ; hash mới thì nhập bình thường; không ảnh hưởng luồng 3 video hiện tại (chạy lại test T-041/T-048); công tắc không đổi.
