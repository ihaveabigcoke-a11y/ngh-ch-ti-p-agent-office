# T-028: Xoá hồ sơ Muse "ss" qua app

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 14/11/2026
- **Người dùng yêu cầu trực tiếp (14/11):** "Giao task cho codex xóa giúp tôi khi mà nó xong task hiện tại". Hồ sơ cần xoá: tên **`ss`** (thẻ hiển thị "ss · 11", "Đã gửi 0 lượt trong đợt", công tắc đang tắt, "Còn 56% tuần", Touch VPN đã đóng).

## Mục tiêu
Xoá đúng **một** hồ sơ Muse tên `ss` bằng chức năng xoá hồ sơ **của app**. Không đụng hồ sơ nào khác.

## Cách làm (bắt buộc)
1. Chỉ làm khi **không còn Codex nào khác** đang chạy và `.git/office-locks/` không có khoá `codex-*.txt`. Đã có WIP của việc khác thì đợi, không sửa đè.
2. Dùng **đường của app**: IPC `removeProfile` / nút "Xóa hồ sơ" trong màn Tài khoản Muse (`desktop/src/profile-removal.mjs`, `desktop-console.tsx`), kèm nhập đúng tên `ss`. **Không** xoá thư mục profile hay sửa SQLite trực tiếp, **không** đọc cookie, token hay DB.
3. Trước khi xoá, đọc `profile.deleteBlockedReason` của hồ sơ `ss`:
   - **Không bị chặn:** xoá, rồi kiểm hồ sơ biến khỏi danh sách và các hồ sơ khác còn nguyên (số hồ sơ giảm đúng 1).
   - **Bị chặn vì lượt chờ hoặc cần đối soát:** chỉ được dùng "Bỏ qua, không đối soát" cho các lượt **chưa từng gửi** (không có `providerId`, trạng thái chưa gửi) gắn với `ss`. Lượt **đã gửi** hoặc có kết quả chưa lấy thì **không** bỏ qua: dừng, ghi lý do vào STATUS "Cần anh chốt", để hồ sơ nguyên.
   - **Bị chặn vì trình duyệt/VPN đang mở:** đóng êm bằng chính nút của app rồi thử lại; không kill tiến trình.
4. **Không** gửi thêm lượt Muse, **không** tắt công tắc Muse, **không** đóng phiên Muse của hồ sơ khác.
5. Không xoá video, ảnh tham chiếu, lịch sử, biên nhận. App đã giữ chúng khi xoá hồ sơ; kiểm lại số clip và biên nhận **không đổi**.

## Tiêu chí đạt
- [ ] Hồ sơ `ss` không còn trong danh sách; các hồ sơ khác nguyên vẹn và vẫn "sẵn sàng".
- [ ] Số clip, MP4, biên nhận trước và sau xoá bằng nhau.
- [ ] Không có thay đổi code app. Nếu lỗi do code (ví dụ nút vẫn mờ dù không còn lý do), ghi vào STATUS và làm việc sửa riêng, không gộp.
- [ ] STATUS ghi: giờ làm, lý do bị chặn (nếu có), kết quả, **chưa kiểm** gì.

## Cấm
Push khi người dùng chưa nói; đăng bài, DM; đọc AppData trực tiếp; `reset --hard`; thao tác với hồ sơ khác ngoài `ss`.
