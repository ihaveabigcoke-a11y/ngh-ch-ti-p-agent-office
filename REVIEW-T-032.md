# Review T-032 (Office mode)

Đối chiếu đề `tasks/T-032-muse-5-canh-3-hook.md`, source hiện hành, receipt qua IPC và media thật. Báo cáo không thay chứng cứ.

| Tiêu chí | Kết luận | Bằng chứng và giới hạn |
| --- | --- | --- |
| Một worker, tag, khóa, đúng checkout | Đạt | Tag before-T-032 tại 49467c6; app chạy checkout chính; không sub-agent. |
| Thử lô 2–3, giữ prompt và prefix | Đạt | Dùng hằng số MUSE_VIDEO_COMMAND, đúng dòng yêu cầu hai video riêng; body mô tả không đổi. Hai file thật đã giải mã. |
| Hai clip đúng cảnh và khoảng 8 giây | Cần sửa | Hai ý tưởng riêng, nhưng cảnh 2 raw dài 10s. Không nới guard; giữ raw và bản cắt 8,021s, đều pending. |
| Trần 4, giãn 60s, không Chi, phanh | Đạt | 2/4 lượt, giãn 254,697s; hai lỗi rồi Cho disabled, Muse bật, worker dừng. Job 2 needs_attention giữ nguyên. |
| Đủ 5 clip và tự nhập nhiều clip | Chưa làm | Cảnh 4–5 chỉ có thẻ video trong ảnh, chưa có byte. Cảnh 2–3 qua app upload/attach; không giả receipt tự nhập. |
| Ba MP4 dự phòng từ clip thật | Đạt | Ba hash khác, 720×1280, video 15s, <6 MB; CTA đã xem; tiếng nguồn chín đoạn r≥0,984. Không có nguồn 12/11. |
| Giữ dữ liệu và lịch sử | Đạt | 57 job cũ nguyên hash; chỉ project mục tiêu thay trong record cũ; exports/variants cũ giữ; take mới pending. |
| Phân biệt đã kiểm/chưa kiểm | Đạt | 831 test fixture/công cụ local đạt; dịch vụ thật hai lượt riêng; chưa chứng nhận SKU hoặc hiệu quả hook. |

Rủi ro khi áp app chính: không có source chức năng mới để áp. Adapter vẫn xử lý một kết quả; receipt thiếu raw cause nên chưa kết luận nguyên nhân lượt 2. Preview không thay bộ production exports cũ, dùng thân tái dựng từ cảnh 2–3, màu sản phẩm chưa đồng nhất. Không chạm `data/`, `evidence/` hoặc DB/cookie/token. Những thay đổi dữ liệu đã được người dùng cho phép đi qua IPC/API của app; không chỉnh thẳng AppData.

Người dùng cần xem ba preview và kiểm đúng SKU, màu, công dụng; quyết định có mở lại Cho để lấy kết quả cũ sau phanh hay không. Không yêu cầu gửi lại.

Prompt sửa tiếp khi được giao:

> Chỉ đối soát lượt T-032 cảnh 4–5 đã gửi. Trước hết giữ phanh và thu thập nguyên nhân qua đường đọc của app. Nếu người dùng cho phép mở lại Cho, chỉ lấy file cũ, không gửi mới hoặc dùng Chi. Thiết kế ánh xạ nhiều kết quả và lưu raw error trong desktop/src/muse.mjs, worker.mjs, contracts cùng tests; nguồn 10s vẫn không được gọi là 8s, giữ raw và bản cắt riêng. Sửa source, test/build và kiểm file thật; không đánh dấu năm cảnh đạt từ thumbnail. Kết thúc bằng === BAO CAO T-032 === và TRANG THAI.

Review không thay HEAD/branch/stash: trước=sau `49467c6617ff8f6636393aead0056ad7d3444396`, `main`, stash rỗng. Chỉ ghi tài liệu review; commit/push được thực hiện sau review theo quyền T-032.
