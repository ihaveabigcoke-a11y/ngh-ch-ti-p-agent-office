# T-047: Sao chép link hội thoại, chỉnh timeout trên giao diện, nối nhãn lỗi 24 giờ

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn ý: học từ 2 video hướng dẫn một công cụ khác + kiểm bằng mã của Haiku (H-1). **Chỉ học ý, không đọc/chạy/sao chép mã, thương hiệu, văn bản của họ.**
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi giữ bật nhưng không gửi video; mọi prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu; **không đổi đường gửi Muse** (muse.mjs/muse-bundle.mjs chỉ đọc, trừ khi đề nói rõ). Chạy sau T-046 (không Codex khác, không khoá, `git status` sạch). Tag `before-T-047`, khoá `codex-T-047.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh 1366/1920; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-047.
- **Sonnet đã làm S-2 (nhánh `sonnet/s-2`, commit `372a7e5`):** nhãn "Muse giới hạn video 24 giờ…" trong `lib/lab/office-view.ts`. Boss sẽ gộp commit đó vào main trước hoặc sau T-047; Codex **kiểm trong `git log`/`git branch -a`**, nếu đã gộp thì chỉ nối dữ liệu còn thiếu, nếu chưa thì cherry-pick `372a7e5` rồi nối.

## Việc
1. **Nối lỗi 24 giờ:** khi Muse trả lỗi giới hạn video 24 giờ, worker lưu **text lỗi gốc rút gọn (không token/URL ký)** và giờ lỗi vào receipt để nhãn S-2 hiện đúng; **không tự thử lại**, chỉ dừng gửi riêng hồ sơ đó (không tắt công tắc). Đây là chỗ duy nhất được đụng `worker.mjs` (chỉ phần ghi receipt lỗi), không đổi logic gửi.
2. **Sao chép link hội thoại:** thẻ việc Muse có `providerUrl` dạng `muse.ai/thread/...` thì có nút "Sao chép link" (dùng `copyWorkbenchText`), thông báo "Đã sao chép link hội thoại"; không có link → ẩn nút, không số giả.
3. **Timeout trên giao diện:** hiện ô số "Thời gian chờ tối đa mỗi lượt (giây)" (60–1800, mặc định 900) trong Tài khoản Muse > Cấu hình, lưu qua đường cấu hình sẵn (không bắt gõ JSON), có kiểm hợp lệ và thông báo tiếng Việt.
4. **Thư mục xuất:** hiện đường dẫn thư mục xuất hiện tại và nút "Mở thư mục xuất" (dùng `shell.openPath` sẵn có); không thêm chọn thư mục.
## Tiêu chí đạt
- [ ] Test: lỗi 24 giờ → receipt có text rút gọn + nhãn tiếng Việt, không thử lại, công tắc không đổi; nút sao chép link chỉ hiện khi có link thật; timeout ngoài 60–1800 bị từ chối; không gửi Muse thật.
- [ ] Ảnh 1366/1920 của Tài khoản Muse và thẻ việc.
