# T-041: Cắt phần app trong luồng 3 video / 1 sản phẩm (người dùng chốt "làm đi", 15/11)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-040 (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-041`, khoá `codex-T-041.txt`, tự xoá khi xong.
- **Luật:** VPN **giữ bật** cho mọi hồ sơ (người dùng chốt). KHÔNG tắt/bật công tắc hồ sơ hay Muse. Chi giữ bật nhưng không gửi video. Prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND`. Không cookie/token/DB, không đăng/DM, không nhãn "AI".

## Số liệu T-038 (3 hồ sơ Cho/Duc/Chim song song, bấm→3 MP4 = 85,3 / 87,1 s)
Chờ Muse 54–65 s (ngoài app). Phần app sau đó: bấm→gửi 2,4–5,1 s; kết quả→tải 2,5–5,6 s; tải 2,8–5,6 s; kiểm+nhập 0,5–1,5 s; chọn đoạn 0,9–1,7 s; dựng 6,5–11,1 s (lần 2 chậm hơn lần 1).

## Mục tiêu đo được
Giảm tổng phần app (bấm→gửi + kết quả→MP4 xong) **thêm ≥ 5–10 s** so với T-038, không làm chất lượng/độ khác nhau của 3 MP4 xấu đi. Không bịa số: đo lại.

## Việc
1. **Bấm→gửi (2–5 s):** làm nóng sẵn preflight/phiên của các hồ sơ gửi được khi mở màn Video (không gửi gì), để lúc bấm chỉ còn gửi.
2. **Kết quả→tải + tải (5–11 s):** tải ngay khi URL clip xuất hiện, tải song song 3 clip; không đợi animation/trạng thái chat; dùng đường URL trực tiếp (đã có từ T-034) cho mọi hồ sơ, nút tải chỉ là dự phòng.
3. **Dựng (6,5–11 s):** bắt đầu dựng hook ngay khi tải xong clip của hook đó, chồng với kiểm+nhập+lưu; chọn đoạn tự động không chờ UI; ffmpeg một lần cắt/ghép/đè chữ (preset nhanh `veryfast`/`superfast` nếu vẫn ≤ 6 MB, 720×1280, giữ tiếng gốc, đủ CTA); tránh mã hoá lại thừa; kiểm giải mã nhanh (không remux thêm). Giới hạn số ffmpeg song song theo số nhân CPU.
4. Test (Muse giả + ffmpeg thật): tải song song, dựng chồng chặng, kết quả 3 MP4 đúng kích thước/dung lượng/mã băm khác nhau; công tắc không đổi. Full suite xanh, không hạ assertion; typecheck; build; push (không force).
5. **Đo thật 1 lần**: tối đa **3 lượt gửi** (Cho, Duc, Chim song song, 1 cảnh mỗi hồ sơ, VPN bật) trên cùng sản phẩm; ghi bảng chặng vào `D:/hermes-wt/artifacts/T-041/progress.md` (cùng cột với T-038) và so với T-038. Hồ sơ nào bị từ chối: dừng gửi riêng hồ sơ đó, chép nguyên văn, không thử lại, không đổi hồ sơ để lách.
6. Kết luận một câu: tổng bấm→3 MP4 mới so với 85–87 s; còn bao nhiêu giây app so với chờ Muse; có dưới 60 s không (nếu không: "phụ thuộc Muse", kèm số).

## Báo cáo (đầu STATUS.md, mục "T-041", ≤ 15 dòng)
Bảng chặng trước/sau · tổng bấm→3 MP4 · 3 sha256 · lỗi/chưa kiểm · lỗi đã sửa (SHA) · Cần anh chốt.
