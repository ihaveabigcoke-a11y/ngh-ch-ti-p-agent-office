# Review T-024b — 13/11/2026

CODEX-BOSS tự review theo `.claude/skills/hermes-night-review/SKILL.md`, Office mode. Một agent, không reviewer độc lập. App main `3c9b7486a8d0b2b0cf30dc67659d32d233317747`, range `before-T-024b..HEAD`. Đọc đề người dùng và bản mẫu, kiểm diff/test/ảnh; không chỉ dùng báo cáo.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| Phễu sáu nấc, đường 14 ngày, Bảng nhớ/sắp xếp | Đạt | visual-dashboard, fixture `[2,1,1,1,1,1]`, ba cột sort, IPC giữ Bảng sau reload; null/zero thật/khác tiền tệ |
| Mini-chart ba hook và ngưỡng, ma trận màu | Đạt | null không vỡ, không kết luận khi ngưỡng null; chỉ tô khi đủ dữ liệu và dẫn đầu duy nhất; ba trạng thái/chú giải |
| Bốn ô dịch vụ, timeline, hàng chờ | Đạt | bốn ca màu, 60→50 sự kiện, từ chối/giới hạn tách lỗi kỹ thuật; thao tác hiện có và receipt được giữ |
| Launcher thiếu build | Đạt | unit test thiếu trực tiếp/lồng nhau; Electron thật chạy nguyên main trong cây QA thiếu module nhận đúng thông báo và exit 0. Native dialog được capture để tự đóng |
| Đi tất cả menu | Đạt phạm vi QA | Launcher Windows/Electron thật; 20 menu, 0 console/pageerror/request ngoài, không tràn ngang 1366; workspace mới ngoài AppData |
| Mẫu và ảnh | Đạt, có khác biệt đã khai báo | 33 PNG app/mẫu/đối chiếu và 2 PNG trống. 1366/1920 cho năm màn yêu cầu; năm cặp ảnh 1366 trong báo cáo |
| Kiểm nguồn/build | Đạt | typecheck; 259 domain + 29 API + 489 desktop = 777 pass, 0 fail; 1 skip OpenMontage live tùy chọn. 37/37 script UI. Build 14:05:09 +07, cây sạch/app tắt |

Các nhóm sửa: `f0fafc9` guard; `41446e7` nháp khi Muse dừng/đối soát cùng mã; `6200748` form, điều hướng số liệu, cấu hình Instagram cũ; `2aad19f` bảng/biểu đồ/Tín hiệu/studio; `4d901fd` lớp che/nhãn; `b105956` deadlock ready; `d7f08f2` kiểm Electron; `69f809b` nhãn Việt/mã bài; `3c9b748` báo cáo/context. Các commit harness `c41615f`, `d9592ed`, `8c8def5` cập nhật nhãn và luồng sau T-020/T-024, giữ kiểm null/receipt/persist/navigation; không bỏ script đỏ.

Không thay đổi `data/`, `evidence/`, dependency/lockfile. Không sửa schema bắt buộc, cookie/key/token, prompt model, theme/font toàn app. Tài nguyên duy nhất lấy từ mẫu là studio.webp được người dùng cho phép. Các ảnh/báo cáo test lịch sử đã khôi phục byte; kết quả mới giữ dưới outputs. Không đọc AppData/DB/profile người dùng; không Muse/Meta/DM/dịch vụ trả phí; không push/merge.

Khác biệt thị giác: menu chính T-024 còn giữ, nguồn giao việc theo sản phẩm; hồ sơ và Khung content giữ các khối bằng chứng/duyệt thật nên dài hơn; không tạo dữ liệu của 12 video mẫu để lấp màn. Từng màn có lý do và ảnh đặt cạnh trong `ops/office/reports/T-024b.md`.

Chưa chứng minh: dữ liệu bản cài đầy đủ sau build; dịch vụ/tài khoản thật; hộp thoại native thao tác tay; trình đọc màn hình; chất lượng nội dung/SKU. Không coi fixture là dịch vụ thật. Một test OpenMontage live bị skip theo cấu hình.

Kết luận: **Đạt phạm vi T-024b local/fixture**. Không còn lỗi trong các ca đã kiểm. Build và cách chạy tiếp ở STATUS. Review chỉ viết tài liệu văn phòng; HEAD/main/stash app không đổi trong lượt review cuối.
