# T-024b: Bảng, biểu đồ, màn Tín hiệu trực quan, và sửa lỗi còn lại

- **Repo:** hermes-clip, sửa thẳng trong app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` (tag `before-T-024b`) · **Worker:** Codex (CODEX-BOSS) · **Ngày:** 13/11/2026
- **Làm ngay sau T-024.** Nếu T-024 còn dở (file chưa commit, khoá `codex-T-024.txt`), làm xong T-024 trước theo `D:/agent-office/ngh-ch-ti-p-agent-office/.claude/worktrees/boss-phu-review-t002-t003-b4fdf6/tasks/T-024-man-dau-so-lieu-toc-do.md`.
- **Luật:** như T-024 (mục "Luật cho cả đêm" trong `C:/Users/ADMIN/Downloads/CODEX-LAM-HET.md`). Muse giữ Tạm dừng. Cấm push, đăng bài, DM, dịch vụ trả phí.

## Mục tiêu
Người dùng nói, nguyên văn: "nó phải có bảng phải có visual chứ, và cả cái tín hiệu nữa" và "bảo codex sửa lỗi". App phải **nhìn vào là thấy tình hình**: bảng và biểu đồ thay cho chữ và form. Không thêm tính năng kinh doanh mới.

## Phạm vi
1. **Bảng và biểu đồ** (SVG tự vẽ, không thêm thư viện, giữ theme graphite–lime):
   - **Hôm nay:** phễu ngang 6 nấc đếm sản phẩm theo bước (Đã chọn → Có khung content → Có clip → Có MP4 → Có bài nháp → Đã đăng). Thêm biểu đồ đường "lượt xem theo ngày, 14 ngày" khi có ≥ 2 điểm đo; chưa đủ thì hiện khung trống ghi "Cần ít nhất 2 lần đo".
   - **Sản phẩm:** thêm chế độ **Bảng** bên cạnh Thẻ (nút chuyển, nhớ lựa chọn). Cột: Sản phẩm, Bước hiện tại, Vốn + ship, Giá bán, Hệ số, Clip, MP4, Bài đăng, Lượt xem, Bước tiếp (nút). Sắp xếp theo cột. Chưa biết thì hiện "—".
   - **Số liệu:** mỗi sản phẩm một hàng mini-chart 3 cột so 3 hook. Bảng có tô đậm hook dẫn đầu **chỉ khi** người dùng đã đặt ngưỡng; chưa đặt thì không kết luận.
   - **Ma trận** (hook × tài khoản): ô có màu nền theo trạng thái (nháp, đã đăng, có số), kèm chú giải.
2. **Màn Tín hiệu trực quan:**
   - Trên cùng là 4 ô trạng thái lớn: Muse, Hộp nhận media, Render, Instagram API. Mỗi ô một màu (xanh hoạt động, vàng tạm dừng/chờ, đỏ lỗi, xám chưa cấu hình), kèm 1 dòng lý do bằng tiếng Việt và thời điểm tín hiệu gần nhất.
   - Dưới là **dòng thời gian** 50 sự kiện gần nhất (job, nhập file, render, lỗi), mỗi dòng có icon, màu, thời gian tương đối; lọc theo loại. Tách rõ "Muse từ chối/giới hạn vùng" với "lỗi kỹ thuật".
   - Hàng chờ: bảng job đang chờ hoặc cần đối soát, có nút hành động (Bỏ qua đối soát, Mở cảnh).
3. **Sửa lỗi:**
   - Mở app thật (`START-HERMES-CLIP.cmd`) và đi qua **từng mục menu**. Ghi lại mọi lỗi console, màn trắng, nút không phản hồi, chữ tràn hay bị cắt ở 1366 px, nhãn còn tiếng Anh, chuỗi id thô (ví dụ `beat_2`, `import:json`). Lập danh sách trong `ops/office/reports/T-024b.md`, rồi sửa hết; mỗi nhóm lỗi một commit.
   - Chạy mọi `scripts/check-*-ui.mjs`; script nào đỏ thì sửa nguyên nhân (không hạ assertion).
   - Lỗi đã biết: `desktop/src/main.mjs` import module trong `local-dist` nên app vỡ khi build cũ hơn code. Thêm kiểm tra lúc khởi động: thiếu module build thì hiện hộp thoại tiếng Việt "Bản build cũ hơn code. Chạy pnpm local:build" thay cho lỗi JavaScript thô.

## Không làm
Không thêm tính năng ngoài 3 mục trên. Không bịa số; chưa biết là "—". Không có nhãn "AI". Không gửi Muse, không đăng bài.

## Tiêu chí đạt
- [ ] Fixture có dữ liệu: phễu 6 nấc đúng số; bảng Sản phẩm sắp xếp được theo ≥ 3 cột; mini-chart 3 hook render với null không vỡ (test).
- [ ] Fixture trống: mọi biểu đồ hiện khung trống có chú thích, không có số 0 giả.
- [ ] Tín hiệu: 4 ô trạng thái đúng màu cho 4 ca fixture (hoạt động, tạm dừng, lỗi, chưa cấu hình); dòng thời gian tách "từ chối/giới hạn" với "lỗi" (test).
- [ ] Báo cáo `T-024b.md` liệt kê lỗi tìm thấy khi đi hết menu, mỗi lỗi có trạng thái Đã sửa (SHA) hoặc Chưa sửa (lý do). 0 lỗi console khi mở từng màn (script).
- [ ] Thiếu module build thì app hiện hộp thoại tiếng Việt, không văng lỗi thô (test).
- [ ] Full suite xanh; `pnpm local:build` đạt; ảnh 1366 và 1920 cho Hôm nay, Sản phẩm (Bảng), Số liệu, Ma trận, Tín hiệu.

## Báo cáo
Cập nhật STATUS văn phòng mục "T-024b": đã thay đổi · đã kiểm · chưa kiểm · SHA · giờ build. Tin nhắn cuối là báo cáo ngắn bằng tiếng Việt.

## BẢN MẪU GIAO DIỆN CỦA NGƯỜI DÙNG (bắt buộc đọc trước khi sửa giao diện)
Người dùng đưa bản mẫu tĩnh "Văn phòng Hermes Clip · bản mẫu phòng ban", đã giải nén ở `D:/hermes-wt/mockups/van-phong-phong-ban/` (HTML/CSS/JS tĩnh, dữ liệu mẫu). **Đây là đích thị giác: app phải nhìn giống bản mẫu này**, ưu tiên hơn các mô tả chữ ở trên khi hai bên khác nhau.
- **Cách đọc:** đọc `styles.css`, `shell.css`, `pages.css`, `signals.css` và các trang `index.html` (Tổng quan: bản đồ studio `assets/studio.webp` với 5 trạm theo luồng việc + bảng "Cần xử lý" + thanh tiến độ sản phẩm), `department.html`, `product.html` (hồ sơ 9 tab), `script.html` + `storyboard-v2.js` (khung shot / chữ đè / lượt tạo), `references.html` (video mẫu), `signals.html` (tín hiệu). Mở bằng trình duyệt headless để chụp ảnh đối chiếu ở 1366 và 1920.
- **Chỉ tham khảo, không chép nguyên file vào repo** và không chạy script của bản mẫu trong app. Viết lại bằng component React và CSS của app. Được dùng lại: bảng màu (`--page #111217`, `--panel #191b22`, `--line #343640`, `--ink #f4f3ef`, `--muted #b4b5c0`, `--accent #d4ff3a`, `--studio #f2e7d9`, `--amber #f6cc84`, `--green #9ae1b1`, `--violet #d9c8fc`), bố cục, khoảng cách, kiểu thẻ, kiểu chip, và ảnh `assets/studio.webp` (chép vào thư mục tài nguyên giao diện của app). Font: giữ font app đang dùng; nếu app chưa có Be Vietnam Pro thì không thêm.
- **Dữ liệu:** bản mẫu dùng dữ liệu giả. Trong app phải nối dữ liệu thật; chưa có thì "—", không bịa.
- **Tiêu chí thêm:** báo cáo có ảnh đặt cạnh nhau (bản mẫu | app) cho Tổng quan, Hồ sơ sản phẩm, Khung content, Video mẫu, Tín hiệu ở 1366 px; nêu rõ chỗ nào chưa giống và vì sao.
