# T-025: Giao diện trực quan (bớt chữ) và chạy Muse thật cho 1 sản phẩm

- **Repo:** hermes-clip, sửa thẳng trong app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` (tag `before-T-025`) · **Worker:** Codex (CODEX-BOSS) · **Ngày:** 13/11/2026
- **Làm sau T-024 và T-024b.** Việc nào còn dở thì làm xong trước (đề trong `D:/agent-office/ngh-ch-ti-p-agent-office/.claude/worktrees/boss-phu-review-t002-t003-b4fdf6/tasks/`).
- **Luật:** mục "Luật cho cả đêm" trong `C:/Users/ADMIN/Downloads/CODEX-LAM-HET.md`. Cấm push, đăng bài, DM, dịch vụ trả phí.

## Mục tiêu
Người dùng nói, nguyên văn: "LÀM CHO NÓ ĐẸP NÓ VISUAL LÊN, CHỖ NÀO CŨNG CHỮ NHÌN CÓ CHÁN KO" và "MUSE HẾT BỊ KHÓA RỒI". Hai phần:
- **A.** Toàn app chuyển từ chữ sang hình.
- **B.** Chạy Muse thật để có clip mới cho 1 sản phẩm.

## A. Trực quan hoá toàn app (giữ theme graphite–lime và font chính)
**Nguyên tắc bắt buộc cho mọi màn:**
1. **Hình trước, chữ sau.** Mỗi thẻ, mỗi dòng có một yếu tố hình: ảnh sản phẩm, thumbnail clip (khung đầu), icon trạng thái, vòng tiến độ hoặc mini-chart.
2. **Ngân sách chữ:**
   - thẻ tối đa 2 dòng chữ phụ;
   - bỏ mọi câu hướng dẫn lặp lại dưới tiêu đề màn; chuyển thành tooltip hoặc nút "?";
   - không có đoạn văn nào dài quá 120 ký tự trên màn chính.
3. **Trạng thái bằng màu và icon**, thống nhất toàn app: xanh lime = xong/hoạt động, vàng = chờ, đỏ = lỗi, xám = chưa có. Có chú giải ở một nơi.
4. **Số to, nhãn nhỏ:** số chính 24–32 px, nhãn 12 px mờ. Không dùng font mono cho chữ thường.
5. **Trạng thái trống có hình:** icon lớn, 1 câu, 1 nút. Không để form trống chiếm màn hình.

**Áp vào từng màn** (mỗi màn một commit):
- **Hôm nay:** hàng thẻ số có icon; phễu; danh sách việc có ảnh sản phẩm và vòng tiến độ.
- **Săn sản phẩm:** ứng viên dạng thẻ có ảnh lớn, giá và hệ số là chip màu; bảng so sánh là chế độ phụ.
- **Sản phẩm / Hồ sơ:** đầu hồ sơ là ảnh + 4 chỉ số lớn (vốn + ship, giá, hệ số, bước). Tab dùng icon + chữ.
- **Làm video (Khung content, Tạo media, chọn đoạn):**
  - bảng shot thành **dải storyboard ngang**, mỗi shot một ô có thumbnail (hoặc ô màu theo beat), thời lượng, chữ đè;
  - timeline chữ đè vẽ thành thanh;
  - take hiện thumbnail có nút phát.
- **Thư viện:** lưới thumbnail, lọc bằng chip.
- **Đăng bài / Ma trận:** ô có thumbnail MP4 và màu trạng thái.
- **Số liệu, Tín hiệu:** theo T-024b; rà lại cho thống nhất.
- **Cài đặt:** nhóm thành thẻ có icon; công tắc thay cho checkbox.

**Tiêu chí đạt (A):**
- [ ] Script đo trên 8 màn chính ở 1366×768: mỗi màn có ≥ 1 yếu tố hình (img/svg/canvas có kích thước ≥ 48 px) trong khung nhìn đầu; số ký tự chữ thấy được trong khung nhìn đầu **giảm ≥ 30%** so với `before-T-025` (đo cùng fixture, ghi bảng trước/sau vào báo cáo).
- [ ] Không còn đoạn chữ > 120 ký tự trên màn chính (test).
- [ ] Màu trạng thái thống nhất: một map dùng chung, có test.
- [ ] Ảnh 1366 và 1920 **trước và sau** cho 8 màn, lưu `outputs/T-025-ui/`.
- [ ] Full suite xanh; không hạ assertion; `?view=` cũ vẫn chạy.

## B. Muse thật cho 1 sản phẩm (người dùng báo Muse đã hết bị khoá)
- Làm **sau** phần A của màn Làm video (để dùng luôn giao diện mới), hoặc ngay nếu phần A kẹt.
- Bật công tắc Muse. Kiểm một profile bằng lượt kiểm hạn mức trước; **nếu vẫn bị từ chối hoặc hạn chế vùng thì dừng ngay, bật Tạm dừng, ghi STATUS, không thử lại.**
- Muse chạy được: chọn sản phẩm người dùng xếp hạng 1 (chưa xếp thì sản phẩm mới nhất) → Khung content v2 → gửi các lượt tạo qua Muse.
- **Phanh:**
  - giãn ≥ 60 giây giữa hai lượt;
  - tối đa **12 lượt** trong phiên này;
  - gặp dấu hiệu bị chặn thì dừng hẳn (captcha, đăng xuất, cảnh báo tài khoản, từ chối, 2 lỗi liên tiếp);
  - không gửi lại lượt chưa đối soát.
- Có clip thật: chọn đoạn → xuất MP4 thật → 3 hook → 3 bài nháp. **Không đăng.**
- **Tiêu chí đạt (B):** STATUS ghi số lượt gửi / thành công / lỗi, sha256 từng clip và MP4 thật, trạng thái tài khoản Muse cuối phiên. Không có clip thì ghi rõ lý do; không bịa.

## Không làm
Không thêm tính năng kinh doanh mới. Không đổi schema ngoài trường optional. Không có nhãn "AI". Không đăng bài, không DM.

## Báo cáo
STATUS văn phòng mục "T-025": bảng trước/sau số ký tự từng màn, link ảnh, kết quả Muse, SHA, giờ `pnpm local:build`. Tin nhắn cuối là báo cáo ngắn bằng tiếng Việt.

## BẢN MẪU GIAO DIỆN CỦA NGƯỜI DÙNG (bắt buộc đọc trước khi sửa giao diện)
Người dùng đưa bản mẫu tĩnh "Văn phòng Hermes Clip · bản mẫu phòng ban", đã giải nén ở `D:/hermes-wt/mockups/van-phong-phong-ban/` (HTML/CSS/JS tĩnh, dữ liệu mẫu). **Đây là đích thị giác: app phải nhìn giống bản mẫu này**, ưu tiên hơn các mô tả chữ ở trên khi hai bên khác nhau.
- **Cách đọc:** đọc `styles.css`, `shell.css`, `pages.css`, `signals.css` và các trang `index.html` (Tổng quan: bản đồ studio `assets/studio.webp` với 5 trạm theo luồng việc + bảng "Cần xử lý" + thanh tiến độ sản phẩm), `department.html`, `product.html` (hồ sơ 9 tab), `script.html` + `storyboard-v2.js` (khung shot / chữ đè / lượt tạo), `references.html` (video mẫu), `signals.html` (tín hiệu). Mở bằng trình duyệt headless để chụp ảnh đối chiếu ở 1366 và 1920.
- **Chỉ tham khảo, không chép nguyên file vào repo** và không chạy script của bản mẫu trong app. Viết lại bằng component React và CSS của app. Được dùng lại: bảng màu (`--page #111217`, `--panel #191b22`, `--line #343640`, `--ink #f4f3ef`, `--muted #b4b5c0`, `--accent #d4ff3a`, `--studio #f2e7d9`, `--amber #f6cc84`, `--green #9ae1b1`, `--violet #d9c8fc`), bố cục, khoảng cách, kiểu thẻ, kiểu chip, và ảnh `assets/studio.webp` (chép vào thư mục tài nguyên giao diện của app). Font: giữ font app đang dùng; nếu app chưa có Be Vietnam Pro thì không thêm.
- **Dữ liệu:** bản mẫu dùng dữ liệu giả. Trong app phải nối dữ liệu thật; chưa có thì "—", không bịa.
- **Tiêu chí thêm:** báo cáo có ảnh đặt cạnh nhau (bản mẫu | app) cho Tổng quan, Hồ sơ sản phẩm, Khung content, Video mẫu, Tín hiệu ở 1366 px; nêu rõ chỗ nào chưa giống và vì sao.
