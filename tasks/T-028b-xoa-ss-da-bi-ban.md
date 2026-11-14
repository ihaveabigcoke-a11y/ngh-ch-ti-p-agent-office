# T-028b: Xoá hồ sơ Muse "ss" (người dùng xác nhận hồ sơ đã bị ban)

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 14/11/2026
- **Thay đổi so với T-028:** người dùng nói trực tiếp (14/11): "Hồ sơ đấy nó bị ban rồi". Hai lượt Muse còn treo trên `ss` (mã bắt đầu `fe1b4424` và `54df93df`, chưa rõ đã gửi) không còn lấy được kết quả vì tài khoản bị ban. **Được phép bỏ qua đối soát đúng hai lượt đó** để mở khoá xoá hồ sơ.

## Cách làm
1. Chạy **sau T-029**: không có Codex nào khác, `.git/office-locks/` không có khoá `codex-*.txt`, `git status` sạch.
2. Dùng **đường của app** (nút "Bỏ qua, không đối soát" cho lượt, rồi "Xóa hồ sơ" gõ đúng tên `ss`). Không sửa SQLite hay xoá thư mục profile trực tiếp, không đọc cookie/token/DB.
3. Chỉ bỏ qua **hai lượt gắn với `ss`** nêu trên. Lượt của hồ sơ khác: không đụng. Trước khi bỏ qua, ghi vào STATUS: mã hai lượt, trạng thái hiện tại, "bỏ qua theo xác nhận người dùng: hồ sơ bị ban". Không xoá lượt hay biên nhận, chỉ đánh dấu đã đối soát (bỏ qua).
4. Xoá `ss`. Kiểm: hồ sơ biến khỏi danh sách; số hồ sơ khác giảm 0; số clip, MP4, biên nhận trước và sau bằng nhau; công tắc Muse vẫn bật.
5. Không gửi lượt Muse nào, không tắt công tắc Muse, không đóng phiên hồ sơ khác.

## Tiêu chí đạt
- [ ] `ss` không còn; các hồ sơ khác nguyên vẹn.
- [ ] Hai lượt đã ghi "bỏ qua, không đối soát" kèm lý do; không lượt nào khác bị đổi trạng thái.
- [ ] Số clip, MP4, biên nhận không đổi.
- [ ] STATUS ghi giờ, kết quả, chưa kiểm. Push khi test liên quan xanh (không force).

## Cấm
Đăng bài, DM, dịch vụ trả phí, đọc AppData trực tiếp, `reset --hard`, đụng hồ sơ ngoài `ss`.
