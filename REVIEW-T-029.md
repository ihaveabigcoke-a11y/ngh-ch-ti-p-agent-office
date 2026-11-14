# REVIEW-T-029 — Office mode

Task kiểm nghiệm UI/IPC thật, source `before-T-029..HEAD` rỗng ở `92307c6`. Không commit sửa code, không build/full suite; không hạ assertion. Tài liệu và bằng chứng file được kiểm riêng.

| Phần | Kết luận | Bằng chứng / giới hạn |
|---|---|---|
| An toàn và bảo toàn | Đạt phạm vi lượt thử | 0 gửi Muse mới/0 đăng/0 DM/0 paid; switch bật, worker dừng; job/ledger/profile nguyên. Không trực tiếp đọc/ghi AppData; app tự dùng dữ liệu qua UI/IPC. |
| Một sản phẩm qua luồng | Chưa đạt trọn vẹn | Đúng sản phẩm hạng1; tạo clip Muse mới dừng do lỗi/quyền dịch vụ có trước; 3fileghép cùng clip cũ/hash. |
| Đồng hồ / file thật | Đạt có giới hạn | 395.157s từ bắt đầu chọn tới export3;291.341s đường tay;16.859s render;3 ffprobe/hash,1 decode vì bytesgiốngnhau. Không có latency Muse. |
| Duyệt lại sau sửa cảnh | Cần sửa | `lib/lab/auto-video.ts:49,57`: commandId board theo sceneId cố định, receipt cũ làm bỏ duyệt lại revision mới; tái hiện UI, workaround duyệt từng cảnh. |
| Mở Chi tiết | Cần sửa nhẹ | `components/lab/production.tsx:59` xử lý lại new_product còn trong URL và bật hộp tạo dự án; đã Hủy, không tạo dự án ngoài ý muốn. |
| Thumbnail đen | Cần điều tra | API trả200,320px; file thật decodeđược/CTAđọcđược. `desktop/local/thumbnails.mjs`; chưa chốt nguyên nhân, không kết luận media hỏng. |
| Đăng / Kết quả | Chưa kiểm đầy | Chưa tài khoản/landing/draft nên không cột,tải-copy-UTM hay thẻ số; không điền dữ liệu giả. |

## Rủi ro khi dùng app chính

Nhãn Muse sẵn sàng chỉ phản ánh công tắc/cấu hình. IPC night.stopped=false khác bàn giao trong khi worker.paused=true, lịch sử lỗi cũ còn nguyên; không thử dispatch để chẩn đoán. Không có bằng chứng phiên/quota dịch vụ mới. Không coi3 tên file đồng nghĩa3 hook khác nhau hoặc duyệt đăng.

## Prompt sửa sau lượt kiểm (chưa thực hiện)

- Chỉ sửa `lib/lab/auto-video.ts` và test auto-video liên quan: sau tạo khung, sửa một cảnh làm tăng revision, gắn take phù hợp rồi bấm Làm video; kiểm tự duyệt đúng revision, giữ receipt/phiên bản cũ, không gửi trùng, không nới gate media. Dùng commandId gắn revision hoặc điều kiện hiện hành bền vững. Chạy focused→full suite→build theo luật app tắt/cây sạch. Kết thúc bằng `=== BAO CAO T-029 ===` và `TRANG THAI`.
- Chỉ sửa việc `new_product` bị xử lý lại giữa `compact-video.tsx`/`production.tsx`: mở Video từ Sản phẩm, tạo/tiếp tục dự án, mở Chi tiết phải giữ đúng dự án và không tự mở hộp tạo mới. Test điều hướng này; giữ đường tạo dự án chủ động. Kết thúc bằng `=== BAO CAO T-029 ===` và `TRANG THAI`.
- Điều tra `desktop/local/thumbnails.mjs` bằng clip mở đầu đen và clip bình thường; xác định chọn frame hay lỗi cache trước khi sửa. Giữ nguồn/hash/receipt; không dùng ảnh giả lấp lỗi. Kết thúc bằng `=== BAO CAO T-029 ===` và `TRANG THAI`.

HEAD app và nhánh main không đổi trong review; không thao tác stash. `data/`, `evidence/`, theme/font/source nguyên. App tự thêm CTA/dự án/asset qua đường được người dùng cho phép; bằng chứng nhạy cảm mới không vào Git. STATUS có WIP T-028 có trước sẽ được giữ nguyên ngoài commit T-029.
