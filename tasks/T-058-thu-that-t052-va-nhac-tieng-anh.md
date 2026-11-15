# T-058: Thử THẬT đúng 1 lượt "Tiếp tục hội thoại" để xác nhận bản sửa T-052 + dòng nhắc tiếng Anh + test t057

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- **Đại ca duyệt đúng 1 lượt Muse thật (15/11 22:35: "Thử 1 lượt")** để kiểm bản sửa T-052 (`325427b`: loại clip cũ tải muộn). Chạy sau T-052 (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-058`, khoá `codex-T-058.txt`, tự xoá khi xong.
- **Luật:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi không gửi; `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu. **Tối đa 1 lượt gửi Muse cho cả việc này.** Không thử lại, không đổi hồ sơ để lách, không reset.

## Việc
1. **Lượt thật (đúng 1):** qua launcher/IPC của app (Hermes đang tắt, Codex mở), chọn **một việc Muse đã `ready` có `providerUrl` hợp lệ** của hồ sơ **còn sẵn sàng** (Cho, Duc hoặc Chim; VPN connected, signed_in, quota available; **khác hồ sơ đã dùng cho lượt T-052 gần nhất** hoặc cách lượt đó ≥ 60 s), bấm "Tiếp tục hội thoại này" với mô tả **tiếng Anh ngắn** (vd. "continue the same scene, change the camera to a slow push-in"), chọn **Video**. Chỉ gửi nếu `active=0` và việc gốc đã đối soát. Ghi thời gian từng chặng vào `D:/hermes-wt/artifacts/T-058/progress.md`.
2. **Kiểm kết quả:** nhận được **clip MỚI** không (ffprobe, sha256, **khác** mọi clip cũ trong sổ sha256 T-049, đúng 1 tin user mới, không nhận clip cũ tải muộn)? Nếu Muse trả clip cũ/từ chối/hạn chế/captcha: **dừng**, chép nguyên văn, không thử lại, không đổi hồ sơ. Ghi rõ: bản sửa T-052 **xác nhận** / **chưa xác nhận** và vì sao.
3. **Receipt #94** (lượt T-052 trước, "Trùng clip cũ #90"): chỉ **đọc** receipt qua app (không gửi lại), ghi tình trạng đối soát vào STATUS ("cần người dùng đối soát tay: có/không"); không tự bỏ qua/xoá.
4. **Dòng nhắc trong hộp** "Tiếp tục hội thoại": thêm dưới ô mô tả: "Nên gõ tiếng Anh để Muse hiểu chính xác (tiếng Việt vẫn được, Muse tự chuyển ý)." Không đổi đường gửi/prompt; không font/theme; test + ảnh 1366/1920.
5. **Test t057 chập chờn** `desktop/test/t057-lifecycle-cache.test.mjs:~64`: ghi đè cùng size trong cùng mili giây → chèn `utimes` (đặt mtime khác) hoặc chờ ngắn để mtime/ctime đổi trước khi kiểm; chạy riêng file 10 lần liên tiếp, 0 hỏng; không hạ assertion.
6. Full suite xanh; typecheck; push (không force). **Cuối việc**, nếu Hermes thật đang tắt và cây sạch: chạy `pnpm local:build` (KHÔNG đặt `HERMES_LOCAL_BUILD_DIR`), ghi giờ build vào STATUS; nếu app đang mở (không phải do Codex mở để QA): không build, ghi "chưa áp build chính".
## Báo cáo (đầu STATUS.md mục "T-058", ≤ 12 dòng)
Hồ sơ/việc dùng · giờ gửi/về · clip mới có không (sha256, ffprobe) · kết luận bản sửa T-052 · receipt #94 · đã làm (SHA) · build chính (giờ) · chưa kiểm · Cần anh chốt.
