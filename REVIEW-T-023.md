# T-023 — tự review Office mode

Một main agent kiểm diff before-T-023, spec và test; không có reviewer độc lập.

| Phần | Kết luận | Bằng chứng |
|---|---|---|
| Gói Muse | Đạt fake/local | Revision, hash refs, số lượt trước gửi, job idempotent, không retry chưa rõ |
| Phanh đêm | Đạt fake | Đồng hồ giả, 12 lần submitting, giãn >=60s, restart giữ ledger, dừng refusal/2 errors |
| Tín hiệu/Cài đặt | Đạt fixture | 6 ảnh 1366/1920; nhóm Muse từ chối/giới hạn tách lỗi |
| Hồi quy pause | Đã sửa | Giữ callback đồng bộ khi ngoài đợt đêm; 36 test liên quan qua, không hạ assertion |
| M | Chưa chạy tại review code | Chạy sau build, chỉ worker/phiên được cho phép |

Giữ null chưa biết; số đếm gửi/remaining là dữ liệu ledger thực, không thay null nghiên cứu bằng 0. Không đụng data/, evidence/, credentials, AppData trong kiểm fixture. Không đổi theme/font/dependencies. Chế độ M không boot các tác vụ ngoài phạm vi. Full suite cuối và SHA ghi STATUS.

Rủi ro cần kiểm thật: dịch vụ chấp nhận thời lượng yêu cầu, đầu ra đúng sản phẩm, nhập và cắt clip thật. Không chờ duyệt lại; đã có quyền mục M. Review không thay HEAD/nhánh/stash; commit riêng sau review.
