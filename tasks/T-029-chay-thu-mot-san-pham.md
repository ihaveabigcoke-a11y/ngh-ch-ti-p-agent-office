# T-029: Chạy thử trọn vẹn 1 sản phẩm, đo tốc độ và độ hoàn thiện

- **Repo:** hermes-clip, app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 14/11/2026
- **Người dùng yêu cầu trực tiếp (14/11):** "Chạy giúp tôi 1 sản phẩm xem sự hoàn thiện đến đâu, có nhanh không, tiến độ như nào". Chạy **sau T-028**, không chạy chung với Codex khác.

## Mục tiêu
Cho **một** sản phẩm đi hết luồng thật trong app, bấm đúng như người dùng sẽ bấm, **đồng hồ bấm từng bước**, để biết: app hoàn thiện tới đâu, chậm ở đâu, lỗi ở đâu. Đây là kiểm nghiệm, không sửa tính năng. Lỗi gặp phải thì ghi lại, chỉ sửa nếu là lỗi nhỏ chặn luồng (≤ 30 phút, một commit riêng).

## Quyền và phanh (người dùng đã cho phép dùng phiên Muse thật qua app, STATUS 14/11)
- Dùng **đường của app** (UI/IPC). Không đọc cookie, token, DB; không sửa SQLite trực tiếp.
- Muse: giữ công tắc **bật**, không tắt. Phanh: giãn ≥ 60 giây **mỗi hồ sơ**; hồ sơ nào bị từ chối, hạn chế vùng, hết phiên hay 2 lỗi liền thì **tạm ngưng hồ sơ đó**, bỏ qua sang đường tay cho cảnh còn lại, **không đổi hồ sơ khác để lách**. Trần **12 lượt** Muse cho cả lần chạy. Không gửi lại lượt chưa đối soát.
- **Không** đăng Instagram, **không** gửi DM, **không** dịch vụ trả phí, **không** tự động hoá web Flow/Gemini/Instagram.
- Chạy sau khi T-028 xong (kiểm `.git/office-locks/`, không còn `codex exec` khác, `git status` sạch). Tag `before-T-029`, ghi khoá `codex-T-029.txt`.

## Chọn sản phẩm
Sản phẩm người dùng xếp hạng 1 hôm nay; chưa xếp thì sản phẩm mới nhất có hồ sơ. Ghi tên và lý do chọn.

## Các bước phải chạy và đo (ghi giờ bắt đầu, giờ xong, số lần bấm, kết quả)
1. Mở app → màn mở đầu (Tín hiệu & Phòng chờ). Có dữ liệu hay trắng? Mất bao lâu tới khi dùng được?
2. Hồ sơ sản phẩm: có đủ giá vốn + ship, giá bán, link mua, từ khoá CTA chưa? Thiếu gì thì điền gợi ý (không bịa số).
3. **Làm video:** bấm nút chính một lần. Theo dõi từng chặng: dựng khung → gửi Muse → clip về → chọn đoạn → ghép → 3 MP4 (3 hook, 3 kỹ thuật khác nhau).
4. Ghi: số lượt Muse gửi, thành công, từ chối, lỗi; thời gian từ lúc gửi tới lúc clip về cho từng lượt.
5. Nếu Muse không ra clip: chuyển cảnh còn lại sang đường tay (gói prompt) và ghi rõ **dừng ở đâu**; không bịa MP4. Có thể dựng bằng clip có sẵn của sản phẩm để kiểm phần ghép, ghi rõ đó không phải clip mới.
6. Kết quả có MP4 thật: `ffprobe` (kích thước 720×1280, thời lượng, âm thanh), sha256, dung lượng (file nén có < 6 MB cho ≤ 15 giây không), có chữ đè không.
7. Đăng: kiểm màn Đăng có xếp được cột tài khoản, có nút Tải MP4 và Sao chép caption (kèm UTM) — **chỉ kiểm giao diện, không đăng**.
8. Kết quả: màn Kết quả có thẻ video, số "—" khi chưa có số (không 0 giả).

## Tiến độ xem trực tiếp
Ghi **ngay sau mỗi bước** vào `D:/hermes-wt/artifacts/T-029/progress.md` (thêm dòng, không ghi đè): `giờ | bước | kết quả | thời gian bước | ghi chú`. Người dùng sẽ mở file này để xem. Ghi cả chỗ bị kẹt.

## Báo cáo cuối (đầu STATUS.md, mục "T-029 — chạy thử 1 sản phẩm", ≤ 25 dòng)
- Bảng 8 bước: thời gian, số lần bấm, đạt / kẹt / lỗi.
- **Tổng thời gian** từ chọn sản phẩm tới có 3 MP4 (hoặc tới chỗ kẹt), và **chặng chậm nhất**.
- Muse: lượt gửi / thành công / từ chối / lỗi, thời gian trung bình một clip, trạng thái từng hồ sơ cuối lần chạy.
- 3 MP4: sha256, dung lượng, ffprobe.
- **Danh sách lỗi và chỗ chưa hoàn thiện**, xếp theo mức chặn việc (Nặng / Vừa / Nhỏ), mỗi mục kèm file nếu biết.
- **Đánh giá thẳng:** "mỗi ngày làm được bao nhiêu sản phẩm với tốc độ này" nếu có số liệu; không có thì ghi "chưa đủ dữ liệu".
- **Chưa kiểm** và **Cần anh chốt**. Push STATUS và các commit sửa lỗi nhỏ lên GitHub (không force) khi test xanh.

## Tiêu chí đạt
- [ ] `progress.md` có dòng giờ cho mọi bước đã chạy; báo cáo cuối có tổng thời gian và chặng chậm nhất.
- [ ] Không có số bịa: bước nào không chạy được thì ghi "không chạy được" kèm lý do.
- [ ] Không đăng, không DM, không vượt trần 12 lượt Muse; không đụng hồ sơ ngoài phạm vi.
- [ ] Full suite xanh nếu có commit sửa lỗi nhỏ; không hạ assertion.
