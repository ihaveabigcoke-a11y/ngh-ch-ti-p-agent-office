# T-024 — tự review Office mode
Codex duy nhất tự review theo `.claude/skills/hermes-night-review/SKILL.md`; không có reviewer độc lập. Đề: tasks/T-024-hom-nay-va-luong-nhanh.md và yêu cầu người dùng trong phiên. Tag before-T-024 = b13fe26616c170343c17e2d50be088d7480697d4.

| Phần | Kết luận | Bằng chứng |
| --- | --- | --- |
| A — Hôm nay | Đạt UI và fixture; đọc giới hạn 7 ngày bên dưới | lib/lab/today.ts; components/lab/today.tsx; default React + desktop/src/main.mjs. 8 số đúng 3/4/3/1/2/2000/20/5; 3 bước 8/2/1; 2 kết quả. Empty 1 CTA, không số đo 0 giả. |
| B — Số liệu | Đạt | metrics-table.tsx, hook-analytics.tsx, metric-import.tsx, metric-time.ts. 11 cột sortable, latest/source/account, chart 3 hook gồm null, form thu gọn/CSV cùng hàng; datetime-local VN qua ranh giới UTC và ngày không hợp lệ. |
| C — Thẻ | Đạt | app.tsx + t024.css. Bỏ chuỗi độn và art hộp, ảnh/chữ đầu tên; một badge, giá, thiếu, hành động. UI đo 6 thẻ (3×2) với đáy hàng cuối y=709,53 trong 768px. Không đổi token/font. |
| D — Luồng/menu | Đạt | quick-video.tsx / lib helper. 2 click tới nút Xuất gói prompt; cảnh v2 chưa duyệt, attempts rỗng; 0 request Muse. Reuse dự án; mất response rồi thử lại cùng receipt không thêm trùng, giữ cảnh cũ. Đã kiểm lớp che đóng và menu bấm được. 9 menu chính; 20 URL/title cũ. |

Kiểm: typecheck; domain 253, API 29, desktop 488 đạt/1 skip/0 fail; 770 đạt tổng. Sáu test thêm vào operations suite, không bỏ/hạ assertion có sẵn. Focused operations 119/119; syntax main.mjs. Script UI chặn mọi request ngoài, workspace/Chrome fixture trong outputs; 10 PNG tại outputs/T-024-ui và outputs/T-024-empty-ui. Test/build cuối và SHA theo STATUS. Không coi các kiểm này là bằng chứng dịch vụ thật.

Rủi ro/giới hạn: các ô 7 ngày cộng số lũy kế của bản đo mới nhất có observedAt trong cửa sổ 7 ngày, chú thích ngay cạnh số; chưa có dữ liệu kỳ đo/baseline để khẳng định tăng trưởng riêng trong kỳ. Mới lưu null không lấy số cũ lấp; không cộng các snapshot cùng bài. Quick video chỉ soạn nháp, nút Xuất gói prompt có thể chưa bật cho đến khi người dùng xem/duyệt cảnh và có bridge desktop. Không bỏ gate duyệt.

Đã xem diff và các file mới: không thay schema/dependency/lockfile/theme/font; không sửa data/evidence hoặc đọc/ghi AppData/DB/profile; Muse không được gửi hoặc bật. Giữ lịch sử scene/take/export/receipt. Không commit binary hay dữ liệu người dùng. Chỉ URL khởi động Electron đổi, không sửa worker/đăng/DM.

Người dùng kiểm tiếp: mở START-HERMES-CLIP.cmd sau build, đối chiếu Hôm nay với workspace thật; chọn sản phẩm → modal → duyệt khung trước xuất prompt; nhập số thật có nguồn. Chưa nghiệm thu Electron với dữ liệu người dùng, Muse/Meta/DM, xuất prompt thật hoặc chất lượng SKU.

Trong lần tự review, HEAD b13fe266, nhánh main và stash rỗng giữ nguyên; commit và build là bước giao hàng sau review. WIP văn phòng cũ được giữ nguyên, chỉ thêm task/review và cập nhật STATUS của T-024.

Giao hàng sau review: app commit `d95f16e09e7634936988b1f4e4c50d4bf8d591bb`, local:build exit 0 tại `2026-11-13T12:42:32.8072866+07:00`, cây sạch/app tắt. UI cuối gồm kiểm nhãn mẫu và menu còn dùng được sau modal.
