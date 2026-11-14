# T-036: Sửa 2 lỗi Vừa của "một tin 3 video" (không gửi Muse thật)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-035. Tag `before-T-036`, khoá `codex-T-036.txt`, tự xoá khi xong. **KHÔNG gửi Muse thật** (chỉ Muse giả/test). KHÔNG tắt công tắc hồ sơ/Muse.

## Lỗi từ review T-035
1. **Vừa** `desktop/src/muse.mjs:~151`: gói bị chặn (`MUSE_BUNDLE_UNMAPPED`) ngay khi một thẻ mới hiện mà `clipCount!==1`. Thẻ đang tạo (chưa có `<video>`) làm hỏng cả gói. Đúng: thẻ chưa có video thì **đợi** (poll 500–1000 ms) tới timeout cấu hình; chỉ lỗi khi hết hạn, hoặc thẻ có > 1 video, hoặc trùng hash. Test Muse giả: thẻ hiện trước, video 3–10 s sau → gói vẫn thành công.
2. **Vừa** gán thẻ→cảnh chỉ theo thứ tự: thêm kiểm rẻ tự động trước khi nhận (không gửi gì): 3 clip phải khác sha256 và khác nhau về hình (so khung giữa bằng hash cảm quan/độ lệch pixel, ngưỡng nêu rõ trong test); thẻ gần như giống nhau → từ chối cả gói, ghi lý do, không tự đoán.
3. **Nhỏ** `worker.mjs:~672`: `muse_bundle_order_failed=true` đặt cho mọi lỗi, kể cả lỗi mạng → chế độ "một tin" tắt vĩnh viễn. Đúng: chỉ lỗi thứ tự/ánh xạ mới đặt cờ; lỗi mạng/timeout chỉ làm lượt đó thất bại, cờ không đổi. Cờ có hạn (tự reset khi khởi động app hoặc sau 1 giờ).
4. **Nhỏ** `desktop/src/muse.mjs:~140-146`: `catch{bytes=null}` nuốt lỗi tải URL, ghi lý do vào log nhẹ (không token/URL ký).
5. Đủ 3 test đề T-034 mục 6 trong `t034-overhead.test.mjs`/test mới nếu đang thiếu (tải ngay khi thấy clip; dựng chồng chặng; hồ sơ từ chối không tắt công tắc).

## Tiêu chí đạt
- [ ] Test Muse giả cho 1–5, full suite xanh, không hạ assertion; typecheck sạch; push (không force).
- [ ] Không gửi Muse thật; công tắc không đổi.
- [ ] Báo cáo ≤ 12 dòng đầu STATUS.md mục "T-036": lỗi đã sửa (SHA), chưa kiểm, Cần anh chốt.
