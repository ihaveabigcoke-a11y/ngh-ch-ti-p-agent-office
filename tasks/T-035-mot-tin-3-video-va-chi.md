# T-035: "Một tin 3 video" dùng được + tìm ra vì sao Chi từ chối

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-034 (không còn Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-035`, khoá `codex-T-035.txt`, tự xoá khi xong.
- **Luật:** KHÔNG tắt công tắc hồ sơ/Muse (phanh = dừng GỬI). Prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND`. Không đăng, không DM. Không đọc cookie/token/DB.

## Số liệu T-034 (review)
Chờ Muse 56,6–63,5 s. Chỉ 2 hồ sơ gửi được (Chi bị chặn) nên 3 cảnh cần 2 đợt cách ≥60 s mỗi hồ sơ → bấm→3 MP4 = 150–155 s. Lượt "một tin 3 video" (Duc): Muse trả 3 thẻ video, clip đầu có sau 56,7 s, nhưng thẻ không có nhãn SCENE nên app không tải/gán; chưa biết lúc đủ 3 clip.

## Việc
1. **Chi:** lấy qua IPC của app **nguyên văn** lý do từ chối/chặn của Chi (không token/cookie), phân biệt "Muse từ chối quyền video" với "lỗi app". Có cách hợp lệ qua app để thử lại đúng 1 lượt không? Nếu nguyên nhân là code (prompt/đường gửi riêng cho Chi), sửa. Nếu là quyền tài khoản: ghi "Cần anh chốt" (người dùng nói hồ sơ nào cũng tạo được, nên kiểm kỹ phía app trước).
2. **Một tin 3 video:** nhận cả 3 thẻ video theo **thứ tự xuất hiện** (thẻ 1,2,3 → cảnh 1,2,3 như thứ tự đã nêu trong prompt, mô tả cảnh đánh số rõ "Scene 1:", "Scene 2:", "Scene 3:"). Tải cả 3 song song ngay khi thấy từng thẻ, kiểm ffprobe 720×1280/≥~8 s và hash khác nhau; nếu thẻ trùng hash hoặc thiếu thì **không nhận** và báo. Dựng 3 hook song song ngay khi có clip tương ứng.
3. **Đo:** tối đa **4 lượt gửi** (2 lần "một tin 3 video" trên 2 hồ sơ khác nhau song song, giãn ≥60 s mỗi hồ sơ; + tối đa 2 lượt cho việc Chi nếu bước 1 cho phép). Ghi bảng chặng từng lần vào `D:/hermes-wt/artifacts/T-035/progress.md`: bấm→đủ 3 clip→3 MP4; so với T-034 (150 s).
4. Nếu "một tin" ra đủ 3 clip đúng: đặt làm chế độ mặc định khi có < 3 hồ sơ gửi được; giữ song song theo hồ sơ khi có ≥ 3 hồ sơ gửi được.
5. Test (Muse giả): gán thẻ theo thứ tự, thẻ trùng/thiếu bị từ chối, công tắc không tắt; full suite xanh, không hạ assertion; push (không force).
6. **Kết luận bắt buộc:** nếu chờ Muse một mình ≥ 56 s thì ghi trong STATUS mục "T-035": bấm→3 MP4 tối thiểu khả thi = chờ Muse + tải + dựng, kèm số đo, và "mục tiêu <60 s phụ thuộc Muse". Không bịa số.

## Báo cáo (đầu STATUS.md, mục "T-035", ≤ 20 dòng)
Lý do Chi từ chối (nguyên văn) · bảng chặng · số clip/thẻ trả về mỗi tin · tổng bấm→3 MP4 · lỗi đã sửa (SHA) · chưa kiểm · Cần anh chốt.
