# T-032: Hoàn tất 5 cảnh TIZE TC213 bằng Muse thật, dựng 3 hook khác nhau

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- **Người dùng yêu cầu trực tiếp (15/11):** "TIẾP ĐI". Nối tiếp T-031: Muse đã tạo được clip thật cho cảnh 1 (MP4 720×1280, 8 giây, sha256 `b81dfaf8…6f405`, hồ sơ `Cho`, 63,5 giây). Chạy **sau T-031** (không còn Codex khác, không còn khoá `codex-*.txt`, `git status` sạch). Tag `before-T-032`, khoá `codex-T-032.txt`, **tự xoá khoá khi xong**.

## Mục tiêu
Có đủ clip thật cho **5 cảnh** của dự án TIZE TC213 (mã 112), rồi dựng **3 MP4 với 3 hook khác nhau** bằng clip Muse thật. Đo thời gian để biết gửi theo lô nhanh hơn bao nhiêu.

## Quyền và phanh (người dùng đã cho phép dùng phiên Muse thật qua app)
- Dùng **đường của app**. Không đọc cookie/token/DB. Công tắc Muse **giữ bật**. Chỉ hồ sơ app báo sẵn sàng: dùng `Cho`; `Chi` đang tạm ngưng, **không** dùng; không dùng hồ sơ đã bị ban hay đã xoá.
- **Trần 4 lượt gửi** cho cả việc này. Giãn **≥ 60 giây mỗi hồ sơ**. Không gửi lại lượt chưa đối soát.
- Gặp dấu hiệu bị chặn (từ chối, hạn chế vùng/quyền video, captcha, đăng xuất, cảnh báo tài khoản, hoặc 2 lỗi liền): **dừng ngay**, chép **nguyên văn lý do** vào STATUS, tạm ngưng riêng hồ sơ đó, không thử lại, không đổi hồ sơ để lách.
- Mọi prompt tạo video vẫn bắt đầu bằng hằng số khoá `MUSE_VIDEO_COMMAND` (`You create a video for me.`). Không đổi hằng số này, không thêm nhãn "AI". Không đăng, không DM, không dịch vụ trả phí.

## Các bước (ghi giờ từng bước vào `D:/hermes-wt/artifacts/T-032/progress.md`, thêm dòng)
1. **Thử gửi theo lô, đúng 1 lượt:** một tin cho cảnh 2 và cảnh 3, dòng đầu là câu lệnh khoá, dòng sau nói rõ "Make 2 separate videos, one per scene below." rồi mô tả hai cảnh, đã duyệt, giữ nguyên nội dung. Đợi tới timeout cấu hình. Ghi: Muse trả **mấy clip**, mỗi clip hợp lệ không (ffprobe, sha256, thời lượng), thời gian.
   - Trả đủ 2 clip đúng cảnh: **dùng cách lô** cho các cảnh còn lại (tối đa 1 lượt cho cảnh 4 và 5 cùng nhau).
   - Trả 1 clip hoặc lẫn cảnh: **không** nhận clip lẫn; quay về **mỗi cảnh một lượt**, giãn ≥ 60 giây; ghi kết quả thử lô vào STATUS.
2. Hoàn tất cảnh 4 và 5 theo kết quả bước 1, trong trần 4 lượt tổng cộng.
3. Mỗi clip về: kiểm `ffprobe` (720×1280, thời lượng ~8 giây), giải mã, sha256, dung lượng; nhập đúng cảnh qua đường tự nhập của app; trạng thái chờ duyệt.
4. Đủ clip: **chọn đoạn theo mốc shot dự kiến, ghép, đè chữ CTA, giữ tiếng gốc**, xuất **3 MP4 với 3 hook khác nhau** (ba kỹ thuật hook khác nhau, đúng mẫu tên `112_H<n>-<kỹ thuật>_…`). Kiểm: **3 mã băm khác nhau**, 720×1280, có chữ CTA, ≤ 15 giây thì < 6 MB, giữ tiếng gốc.
5. Thiếu clip (không đủ 5): dựng bằng các clip **thật đã có**, ghi rõ cảnh nào thiếu; **không** dựng giả từ clip cũ ngày 12/11.

## Báo cáo (đầu STATUS.md, mục "T-032", ≤ 20 dòng)
- Bảng: lượt nào, cảnh nào, giờ gửi, giờ về, số clip trả về, hợp lệ hay không, lý do nếu lỗi.
- **Kết luận một câu:** gửi theo lô có hiệu quả không (số clip trả về mỗi tin, thời gian so với gửi lẻ).
- 3 MP4: tên, sha256 (khác nhau), ffprobe, dung lượng.
- Tổng thời gian từ cảnh 2 tới có 3 MP4. Chưa kiểm. Cần anh chốt. Push STATUS và commit (không force) khi test xanh.

## Tiêu chí đạt
- [ ] `progress.md` có giờ cho từng lượt; STATUS có nguyên văn lý do nếu bị chặn.
- [ ] Không vượt trần 4 lượt; không dùng `Chi`; không đổi hồ sơ để lách.
- [ ] Nếu đủ clip: 3 MP4 có 3 mã băm khác nhau; không có clip giả.
- [ ] Khoá `codex-T-032.txt` đã xoá hoặc ghi rõ vì sao không xoá được.
