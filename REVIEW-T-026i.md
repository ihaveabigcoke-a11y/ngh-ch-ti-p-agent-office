# T-026i — đạt quy tắc UI và kiểm tổng

Một main agent Codex tự review theo hermes-night-review Office mode; không reviewer độc lập. Phạm vi before-T-026i..HEAD cộng diff i được đọc, không đổi HEAD/main/stash trong review (9431fea trước commit). Không sửa data/evidence, lockfile, dependency hoặc dữ liệu người dùng. Thêm script kiểm, không nới assertion; đổi assertion nhãn rỗng theo nhãn mới Chờ lượt. Giữ theme/font và view cũ.

Đã sửa: bỏ breadcrumb/chân trang lặp của bảy màn, không vẽ thước rỗng khi chưa có sản phẩm; giờ `HH:mm · dd/MM`, nhãn Tên tài khoản; trạng thái Muse cập nhật sau lượt. Hạng theo ba hook trong cùng sản phẩm/đợt, trung bình lượt xem mỗi bài có số, null không biến thành 0; hạng chỉ tham khảo khi khác tài khoản. Chọn sản phẩm từ deep link Đăng đúng sản phẩm. Brief/context T-026 đặt trước lịch sử.

| Màn | Từ cố định toàn trang, gồm menu | Thumbnail/media đầy tải được |
|---|---:|---:|
| Tín hiệu & Phòng chờ | 40 | 8 |
| Hôm nay | 28 | 5 |
| Săn sản phẩm | 34 | 3 |
| Sản phẩm | 30 | 5 |
| Video | 38 | 6 |
| Đăng | 33 | 8 |
| Kết quả | 31 | 5 |

Script `scripts/check-t026i-ui.mjs` đo text nhìn thấy trong document.body trên fixture rỗng (gồm menu); bỏ tooltip/details đóng và phần chỉ dành cho trình đọc màn hình; chỉ sáu giá trị đếm lượt là dữ liệu loại khỏi chữ cố định. JSON giữ số thô, số phần nội dung/menu để kiểm lại. Fixture đầy dùng MP4/PNG kỹ thuật mới của T-026f qua file/media local và thumbnail thật; không mock ảnh thumbnail bằng SVG. Tất cả media nhìn thấy đều tải được, không ảnh vỡ. 28 PNG ở outputs/T-026i-{empty,full}-ui: bảy màn × hai khổ × rỗng/đầy, một nút chính, không tràn ngang. Muse đang tạm dừng đúng một lần trên Video. Main agent đã xem ảnh để review bố cục, nhãn, thứ tự, null, cột và trạng thái.

Đã kiểm: typecheck; 267 domain + 29 API + 490 desktop = **786 đạt / 1 skip / 0 lỗi** (skip OpenMontage live tùy chọn). Bằng chứng cuối outputs/T-026i-final-verified-suite.json. Menu/20 URL/nâng cao, Tín hiệu mất kết nối giữ dữ liệu, Kết quả null/48 giờ/đổi hook đều có UI regression đạt. Unit mới chạy cả chuỗi đổi ba hook với body segments nguyên vẹn và retry không dựng thêm; rank/tie/null cũng đạt. Nghiệm thu T-026f: một click sau khi sản phẩm fixture đã chọn → ba MP4 qua Muse giả + OpenMontage local; không phải dịch vụ thật.

Cần anh chốt: hai ngưỡng 48 giờ vẫn null. Quy tắc hiện dùng khi anh nhập ngưỡng: đủ cả hai → Đẩy, dưới cả hai → Bỏ, còn lại → Đổi hook. Chưa đặt ngưỡng thì chỉ hạng, không kết luận. Tên/giá nguồn dán cần xác minh SKU trước sản xuất thật.

Chưa kiểm: Muse/Instagram/Insights/Meta/DM thật, dữ liệu/AppData/profile người dùng, nội dung/SKU video sản phẩm thật, NVDA/200%/high contrast. Test synthetic không chứng nhận nội dung hay tài khoản. Build/launcher QA và SHA push cuối ghi ở STATUS sau commit; app phải đóng và cây sạch khi build. Không có dịch vụ trả phí hoặc đăng bài trong T-026.

## Chốt sau commit i

App **8142ff33329d74089c02d4318eac2a8a8bc23535** đã push origin/main. `pnpm local:build` exit 0 lúc **2026-11-13T16:25:10.7718700+07:00**, cây sạch và Electron tắt. Receipt `outputs/T-026-final-build.json`. Các build sau mỗi hai phần đã đạt: b/c (15:14), d/e (15:27), g/h, a/f (16:06); a/f là hai phần quay lại sau revert đúng phạm vi.

`scripts/check-t026-desktop.mjs` chạy đúng `START-HERMES-CLIP.cmd`/Electron trên thư mục QA mới, có chặn request ngoài; 7 màn × 1366/1920 = 14 ảnh. Mặc định Tín hiệu, đúng 7 menu + Cài đặt, Muse dừng; không lỗi page/console/request ngoài và không tràn ngang. Đã đóng bằng CloseMainWindow; kiểm sau không còn Electron của app. Bằng chứng `outputs/T-026-desktop-ui/result.json`, ảnh cùng thư mục, log `outputs/T-026-final-desktop.log`. Không mở profile/DB/AppData thật.

Phép đo chữ/thumbnails: `outputs/T-026i-measure/measurement.json`; test cuối `outputs/T-026i-final-verified-suite.json`; fixture đầy/rỗng và 28 PNG ở `outputs/T-026i-full-ui`, `outputs/T-026i-empty-ui`. Một bấm được tính từ sản phẩm đã chọn trên Video tới ba MP4 (không tính nhập hồ sơ); Muse giả, OpenMontage local. Từng lượt test lỗi cũ vẫn giữ riêng; các kết quả đạt cuối được chỉ rõ, không cộng dồn test trùng.
