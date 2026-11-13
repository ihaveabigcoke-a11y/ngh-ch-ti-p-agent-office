# T-026: Gọn app về luồng ra video — hình trước, một nút, ẩn phần thừa

- **Repo:** hermes-clip, sửa thẳng trong app chính (tag `before-T-026`) · **Worker:** Codex, mức cao nhất · **Ngày:** 13/11/2026
- **Thay cho T-024b và T-025.** Trước khi làm, đọc T-024 đã đổi gì ở HEAD và giữ phần đã đạt, không làm lại.

## Mục tiêu
Hermes dùng để **research → chốt sản phẩm → làm video → đăng nhiều tài khoản → đọc kết quả**. Một người dùng, mục tiêu vài video mỗi ngày. Hiện app có 16 màn, mỗi màn 94–695 chữ, không màn nào có video hay ảnh thật (đo trên `b13fe26`). Việc này **ẩn phần thừa** (không xoá code, không xoá dữ liệu) và dựng lại 7 màn theo nguyên tắc: hình trước, chữ sau, mỗi màn một nút chính.

## Quyết định của người dùng (13/11, không hỏi lại)
- **Tín hiệu & Phòng chờ đứng đầu menu** và là màn mở mặc định.
- **Muse là nguồn clip chính**, coi như không giới hạn lượt. Giữ phanh an toàn: giãn ≥ 60 giây, gặp từ chối hoặc 2 lỗi liền thì dừng và tự chuyển cảnh đó sang đường tay. Trần lượt mỗi phiên thành **ô chỉnh được trong Cài đặt** (mặc định 12).
- **Chạy organic bằng nhiều tài khoản, không chạy quảng cáo.** Số tài khoản không cố định là 3.
- **Hermes không quản lý bán hàng.** Mỗi sản phẩm chỉ giữ một ô "Link mua" (URL cửa hàng ngoài) để gắn UTM.
- Không có trường hay nhãn "AI" trong khung content, cảnh, bản xuất. Người dùng tự chọn lúc đăng.

## Menu mới (7 mục + Cài đặt)
```
Tín hiệu & Phòng chờ   ← đầu tiên, mặc định khi mở app
Hôm nay
Săn sản phẩm
Sản phẩm
Video
Đăng
Kết quả
──────
Cài đặt                 ← gồm Nhà cung cấp AI, Tài khoản Muse, tích hợp
```
**Ẩn khỏi menu, giữ `?view=` cũ chạy được:** Đối thủ & video (chuyển thành một khối trong Sản phẩm), Ma trận, Quyết định, Hướng dẫn, Chat Muse, Trang giới thiệu, Tổng quan cũ, Ý tưởng đã lưu, Thư viện (gộp vào Video), Tạo ảnh (công tắc trong Video). Thêm một dòng "Hiện màn nâng cao" trong Cài đặt để bật lại.

## Bảy màn

### 1. Tín hiệu & Phòng chờ
- Một hàng ô màu theo nhóm trạng thái, mỗi ô là con số lớn + icon: Hàng chờ · Đang tạo · Chờ file tay · Cần đối soát · Lỗi · Đã vào Thư viện.
- Dưới là **lưới thẻ lượt chạy có thumbnail** (khung đầu của clip; chưa có clip thì ảnh sản phẩm làm mờ). Mỗi thẻ: tên sản phẩm, nhóm trạng thái bằng màu, giờ của sự kiện cuối. Bấm thẻ mới mở lịch sử và lý do cần xử lý.
- Lượt cần xử lý nổi lên đầu, có **một** nút hành động (Đối soát / Chuyển sang đường tay / Thử lại).

### 2. Hôm nay
- Tối đa 3 thẻ sản phẩm của đợt hôm nay + hàng "Đang làm dở" từ các ngày trước. Thẻ: ảnh sản phẩm lớn, tên, thanh tiến độ 5 chấm (Chốt → Khung → Clip → MP4 → Đăng), **một nút "Làm tiếp"** dẫn thẳng tới bước kế.
- Không còn `productKey` và hạng bắt buộc. Thứ tự thẻ kéo-thả được; mã sản phẩm tự sinh từ tên, sửa được.

### 3. Săn sản phẩm
- Kết quả research là **lưới thẻ ảnh**: ảnh, tên, giá vốn + ship, giá bán gợi ý, một nhãn màu (Đáng thử / Cân nhắc / Bỏ). Bảng so sánh chi tiết nằm sau nút "So sánh".
- Nút "Chốt" đưa thẳng vào Hôm nay.

### 4. Sản phẩm
- **Một ô dán link nguồn hàng** → tự điền tên, ảnh, giá vốn (dùng đường đọc web đã có: Agent Reach hoặc `hermes-product-check`; không có thì cho dán chữ). Người dùng sửa lại được.
- Form còn **6 ô**: Tên · Ảnh · Giá vốn + ship · Giá bán · Link mua · Từ khoá CTA. Hồ sơ 9 tab thu vào "Chi tiết" (đóng mặc định).
- Khối **Video đối thủ**: dán link, hiện thành thẻ có nền tảng và ghi chú. Link đã phân tích bằng rea-video thì có nút "Dùng nhịp video này".

### 5. Video (gộp Khung content, Tạo media, Thư viện, Ghép & xuất)
- Trên cùng: chọn sản phẩm. Dưới là **ba hàng trên cùng thước giây: Shot / Chữ đè / Lượt tạo**, mỗi shot là một ô có thumbnail khi đã có clip.
- **Nút chính "Làm video"** chạy cả chuỗi, mỗi bước hiện tiến độ ngay trên hàng Lượt tạo:
  1. dựng khung từ công thức hợp với sản phẩm (mặc định Vấn đề → Vs → Kết quả);
  2. gửi các lượt tạo qua Muse (đường tay nếu Muse dừng);
  3. clip về thì **tự chọn đoạn** theo mốc shot dự kiến;
  4. ghép, đè chữ, giữ tiếng gốc, xuất **3 MP4 với 3 hook**.
  Người dùng chỉ dừng lại ở cuối để xem 3 video và sửa đoạn nếu muốn. Từ lúc chọn sản phẩm tới lúc có 3 MP4: **≤ 3 lần bấm** khi mọi thứ suôn sẻ.
- **Ba hook lấy từ ba kỹ thuật khác nhau**, không phải ba câu na ná: (a) phóng đại vấn đề, (b) cách thay thế ngớ ngẩn (tự chế dở), (c) gây tò mò / gây sốc. Kỹ thuật ghi vào metadata của biến thể.
- **Tên tự đặt** cho mọi bản xuất và bài đăng: `<MÃ-SP>_H<1-3>-<kỹ thuật>_<tài khoản>_<YYMMDD>`. Dùng làm tên file, `utm_content` và nhãn trên thẻ.
- Thư viện là lưới thumbnail phát được khi rê chuột; lọc theo sản phẩm.

### 6. Đăng
- Lịch theo **cột là tài khoản** (số cột = số tài khoản đã thêm), ô là thẻ video có thumbnail. Kéo video vào cột để xếp.
- Nút "Chia đều": mỗi tài khoản nhận một hook khác nhau của cùng sản phẩm; cùng CTA, cùng giá, cùng Link mua.
- Mỗi thẻ có nút **Tải MP4** và **Sao chép caption** (caption có link UTM). Đăng xong dán URL bài vào thẻ. Không tự động hoá web Instagram.

### 7. Kết quả
- **Lưới video có thumbnail**, mỗi thẻ đúng **3 con số**: Lượt xem · Comment đúng từ khoá · Click link. Chưa có số thì "—".
- Bấm thẻ mở ô nhập nhanh (dán số từ Insights). Form 11 ô và CSV chuyển vào "Nhập nhiều".
- **Luật 48 giờ:** sau 48 giờ từ lúc đăng, thẻ hiện nhãn màu theo ngưỡng người dùng đặt trong Cài đặt (Lượt xem tối thiểu, Comment từ khoá tối thiểu): **Đẩy** / **Đổi hook** / **Bỏ**. Chưa đặt ngưỡng thì chỉ xếp hạng 3 hook của cùng sản phẩm, không kết luận.
- "Đổi hook" có nút tạo ngay 3 hook mới trên **cùng thân video**.

## Luật giao diện cho mọi màn
- Hình trước: mọi lượt, take, bản xuất, bài đăng đều có thumbnail (dùng lại bộ tạo thumbnail của Thư viện).
- Không có đoạn giải thích trên màn. Chú thích đưa vào tooltip dấu "?".
- Một nút chính (nền xanh chanh) mỗi màn. Nút phụ là viền.
- Trạng thái bằng màu + icon, bảng màu thống nhất toàn app: xám = chờ, lam = đang chạy, hổ phách = cần người, đỏ = lỗi, xanh lá = xong.
- Chữ cố định (không tính dữ liệu) **≤ 40 từ** mỗi màn ở trạng thái thường.
- Một câu trạng thái Muse **chỉ hiện một lần** (thanh trên cùng), không lặp trong từng khối.
- Thời gian hiện kiểu "13:05 · 13/11", không hiện chuỗi ISO. Không còn chữ tiếng Anh lẫn trong nhãn ("acquisition").
- Giữ theme graphite–lime và font. Được dùng khối dựng sẵn của **Tremor** (Apache-2.0) hoặc **shadcn/ui** cho thẻ KPI, lưới, biểu đồ nếu hợp bản Tailwind của app; kiểm trước, không hợp thì tự dựng theo cùng kiểu. Không thêm thư viện nào khác.

## Không làm
- Không xoá code, record, media, biên nhận. Chỉ ẩn khỏi menu.
- Không dựng cửa hàng, giỏ hàng, thanh toán.
- Không tự động hoá web app; không đăng bài, không DM, không dịch vụ trả phí.
- Không đọc AppData hay dữ liệu thật; test bằng fixture cùng hình dạng. Lượt Muse thật chỉ chạy khi người dùng bảo trong phiên.

## Tiêu chí đạt
- [ ] Mở app vào Tín hiệu & Phòng chờ. Menu đúng 7 mục + Cài đặt, đúng thứ tự.
- [ ] Mọi `?view=` cũ vẫn mở được màn tương ứng.
- [ ] Script đo: mỗi màn trong 7 màn có chữ cố định ≤ 40 từ với fixture rỗng; với fixture đầy, mỗi màn có ≥ 1 thumbnail thật (`img`/`video`).
- [ ] Fixture: từ chọn sản phẩm tới 3 MP4 qua nút "Làm video" với Muse giả: ≤ 3 lần bấm; 3 biến thể có 3 kỹ thuật hook khác nhau, cùng danh sách đoạn thân; tên đúng mẫu.
- [ ] Muse giả từ chối → cảnh tự chuyển đường tay, chuỗi không treo, Tín hiệu hiện "Chờ file tay".
- [ ] Đăng: 5 tài khoản fixture ra 5 cột; "Chia đều" không gán trùng hook cho một tài khoản trong cùng lượt.
- [ ] Kết quả: thẻ chưa có số hiện "—"; quá 48 giờ + có ngưỡng thì ra đúng nhãn; chưa có ngưỡng thì không có nhãn kết luận.
- [ ] Câu "Muse đang tạm dừng" xuất hiện đúng 1 lần trên màn Video.
- [ ] Ảnh 1366 và 1920 cho cả 7 màn, trạng thái rỗng và đầy. Full suite đạt, không hạ assertion.

## Cách kiểm
```
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build
```

## Báo cáo
- Đã thay đổi:
- Đã kiểm, kèm bằng chứng (số chữ từng màn, số lần bấm, ảnh):
- Chưa kiểm hoặc còn rủi ro:
