# T-037: Kiểm hồ sơ Chi (người dùng yêu cầu trực tiếp 15/11: "Kiểm Chi")

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-036 (không còn Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-037`, khoá `codex-T-037.txt`, tự xoá khi xong.
- **Luật:** KHÔNG tắt/bật lại công tắc hồ sơ hay Muse ngoài việc đưa Chi về trạng thái "gửi được" bằng đường của app (nếu phanh gửi của Chi đang dừng, gỡ phanh đó theo ý người dùng, không đụng công tắc). Không cookie/token/DB. Không đăng, không DM.

## Bối cảnh
Chi bị Muse trả: "Video generation still isn't available here, as a lasting restriction". Hai lần kiểm lại chỉ đọc đều "Kết quả Muse đang thay đổi", `reconciled=false`. App không có đường đọc quyền video riêng. Người dùng nói hồ sơ nào cũng tạo được, nên cần một phép thử trực tiếp.

## Việc
1. Đọc nguyên văn mọi receipt của Chi qua IPC (không token/cookie); đối soát hai lượt chưa đối soát bằng UI/IPC (không gửi lại lượt cũ).
2. Phanh gửi của Chi đang dừng: gỡ phanh theo đường của app, ghi rõ đã làm.
3. **Đúng 1 lượt gửi thật bằng Chi**: prompt video 1 cảnh ngắn đã duyệt (cảnh 1 của dự án hiện có), bắt đầu bằng `MUSE_VIDEO_COMMAND`, chờ tới timeout cấu hình. Ghi nguyên văn kết quả, thời gian, clip (ffprobe, sha256) nếu có.
4. Kết quả:
   - **Ra clip hợp lệ:** Chi đủ quyền. Ghi vào STATUS; bật Chi vào nhóm gửi song song (≥3 hồ sơ) mặc định.
   - **Từ chối/chữ/403:** dừng gửi trên Chi (không tắt công tắc), chép nguyên văn, không thử lại, không đổi hồ sơ để lách; "Cần anh chốt: Chi bị hạn chế quyền video phía Muse (kiểm trên web bằng tay)".
5. Test không đổi/bắt buộc nếu không sửa mã; nếu sửa mã thì full suite xanh. Push (không force).

## Báo cáo (đầu STATUS.md mục "T-037", ≤ 10 dòng)
Receipt nguyên văn · kết quả lượt thật (giờ gửi/về, clip) · kết luận quyền video của Chi · chưa kiểm · Cần anh chốt.
