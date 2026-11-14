# T-030: Chạy lại Muse thật cho sản phẩm TIZE TC213 (mã 112), đo clip về

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- **Người dùng yêu cầu trực tiếp (15/11):** "Muse sẵn sàng mà, hồ sơ nào lúc nào phải có quyền tạo video chứ". T-029 không gửi Muse vì dựa vào **receipt cũ** (12–13/11) báo hạn chế video; chưa có lượt gửi mới nào để chứng minh còn bị hạn chế. Việc này **gửi lượt thật để có bằng chứng mới**.

## Mục tiêu
Cho dự án 5 cảnh của sản phẩm **TIZE TC213 (mã 112)** chạy bằng **Muse thật**, lấy clip mới về, rồi dựng 3 hook thật khác nhau. Chốt bằng số liệu: Muse trả clip được hay không, mất bao lâu.

## Quyền và phanh
- Dùng **đường của app** (UI/IPC), phiên Muse hiện có. Công tắc Muse **giữ bật**, không tắt. Không đọc cookie/token/DB.
- Chạy **sau T-028b**: không còn Codex nào khác, `.git/office-locks/` không có khoá `codex-*.txt`, `git status` sạch. Tag `before-T-030`, ghi khoá `codex-T-030.txt`. **Cuối việc phải tự nhả khoá** (xoá file khoá); nếu bị chặn thì ghi rõ vào STATUS.
- Chỉ dùng hồ sơ app báo **sẵn sàng** (đang là `Cho`, `Chi`; **không** dùng `ss`, đã bị ban). App tự chia lượt giữa các hồ sơ sẵn sàng. Giãn **≥ 60 giây trên mỗi hồ sơ**.
- **Trần 6 lượt gửi** cho lần chạy này (5 cảnh + 1 dự phòng). Không gửi lại lượt chưa đối soát.
- **Gặp dấu hiệu bị chặn thì dừng ngay:** từ chối, hạn chế vùng/quyền video, captcha, đăng xuất, cảnh báo tài khoản, hoặc 2 lỗi liền. Khi đó **chép nguyên văn thông báo/lý do trong receipt** (không chứa token/cookie) vào STATUS, tạm ngưng riêng hồ sơ bị chặn, **không thử lại, không đổi hồ sơ khác để lách**.
- Không đăng, không DM, không dịch vụ trả phí.

## Các bước (ghi giờ từng bước vào `D:/hermes-wt/artifacts/T-030/progress.md`, thêm dòng, không ghi đè)
1. Kiểm trạng thái hồ sơ qua IPC: hồ sơ nào ready, quota, công tắc. Ghi nguyên văn.
2. Gửi **một** lượt thử cho cảnh 1 bằng Muse thật. Đợi kết quả (tới timeout cấu hình). Ghi: giờ gửi, giờ về hoặc lý do lỗi.
3. **Chỉ nếu lượt 1 ra clip hợp lệ** (giãn ≥ 60 giây rồi mới gửi tiếp): gửi 4 cảnh còn lại, lần lượt theo phanh. Clip về thì kiểm `ffprobe`, sha256, dung lượng.
4. Có đủ clip mới: chọn đoạn, ghép, ra **3 MP4 với 3 hook khác nhau** (3 kỹ thuật khác nhau), tên đúng mẫu `112_H<n>-<kỹ thuật>_...`. Kiểm: 3 hash **khác nhau**, 720×1280, có chữ CTA, dung lượng hợp lý (≤ 15 giây thì < 6 MB).
5. Không ra clip: dừng ở bước nào thì ghi bước đó, **không** dựng MP4 giả từ clip cũ.

## Sửa nhỏ kèm theo (chỉ sau khi xong phần Muse, mỗi lỗi một commit, test riêng)
- Nhãn "Muse sẵn sàng": chỉ giữ chữ "sẵn sàng" khi hồ sơ **không** có receipt hạn chế video gần nhất; ngược lại hiện lý do ngắn bằng tiếng Việt. **Chỉ làm nếu lượt thử thật bị từ chối**; nếu Muse trả clip được thì **không đổi nhãn**.
- Tự duyệt lại bị bỏ qua vì khoá receipt không gồm revision (`lib/lab/auto-video.ts` quanh dòng 49–57).
- Clip 10 giây không vào cảnh 8 giây (`lib/lab/production.ts` quanh dòng 218): không chấp nhận âm thầm, báo rõ hoặc cắt theo mốc cảnh.

## Báo cáo (đầu STATUS.md, mục "T-030 — Muse thật lại", ≤ 20 dòng)
- Bảng: hồ sơ nào gửi, giờ gửi, giờ về hoặc lý do, thời gian mỗi clip, số gửi / thành công / từ chối / lỗi.
- **Kết luận một câu:** Muse hiện có tạo được video không (có bằng chứng).
- 3 MP4 mới (nếu có): sha256 khác nhau, ffprobe, dung lượng.
- Lỗi đã sửa (SHA), **chưa kiểm**, **Cần anh chốt**. Push STATUS và commit sửa lỗi khi test xanh (không force).

## Tiêu chí đạt
- [ ] `progress.md` có giờ cho từng lượt; STATUS có nguyên văn lý do nếu bị từ chối.
- [ ] Không vượt trần 6 lượt; không đổi hồ sơ để lách; không đụng `ss`.
- [ ] Nếu có clip mới: 3 MP4 có 3 hash khác nhau.
- [ ] Khoá `codex-T-030.txt` được nhả hoặc ghi rõ vì sao không nhả được.
