# T-042 — tự review Office mode

Review bởi một Codex trên main, range `before-T-042..0c9344e`; đọc diff và test, không chỉ dựa báo cáo. Script ảnh đang được hoàn thiện trong WIP riêng T-042 lúc review. Không sub-agent, không đọc mã Meosu.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| N lỗi/đã dừng → N việc mới có mã gốc | Đạt | Store.retryMany transaction + retryOf/retryRootId; test N=5, UI N=2; link gốc mở đúng lượt |
| Body chỉnh trên thẻ, command khóa đúng một lần | Đạt | QueueDetails + museMediaPrompt, payload strict chỉ id/body; unit và IPC/editor thật |
| Lượt chưa đối soát không gửi lại | Đạt | retryBlockedReason + ledger MuseNight + cha gói + skipped; chặn cả lô, replay không nhân đôi |
| Receipt/công tắc không đổi | Đạt | SHA-256 nguồn trước/sau, đóng/reload QA; không có setter công tắc trong đường retry |
| ≥60 giây/hồ sơ; không Chi hoặc hồ sơ dừng | Đạt bằng Muse giả | 3 gửi đúng profile hợp lệ; khoảng cách ≥60000ms; Chi bật, stopped và disabled 0 gửi; không reset lịch sử |
| UI 1366/1920, giữ font/theme | Đạt | Bốn PNG local; sửa wrap nút, kiểm bounds và xem ảnh trực tiếp; không console error/request ngoài |
| Regression/typecheck/build | Đạt | 891 kiểm khác nhau đã chạy đạt; OpenMontage skip đã được kiểm riêng; build sạch/app tắt |

Không assertion cũ bị xóa/hạ. Fixture có phản hồi hoặc lịch sử gửi nay phải đánh dấu đối soát trước retry; thêm assertion chặn và giữ kiểm cũ. Một lần OpenMontage sai đường dẫn CLI được sửa ở biến môi trường, giữ test gốc.

Rủi ro/giới hạn: retry cùng hồ sơ cũ có thể giữ nháp nếu hồ sơ đã xóa/dừng/Chi; không tự luân phiên để né hạn chế. Chọn theo cảnh và trang hiện tại; backend tối đa 30 mỗi thao tác, cap 500 local có sẵn. Việc có receipt chưa rõ vẫn cần đối soát. UI giữ bước duyệt gửi đang dùng.

Không kiểm Muse/VPN/phiên/quota/tài khoản thật hoặc dữ liệu người dùng sau build; không lấy fixture làm nghiệm thu dịch vụ. Người dùng mở Hàng đợi để dùng trên dữ liệu của mình khi muốn gửi. Không có blocker hoặc quyết định cần chốt để khép phạm vi local T-042.

Review không thay HEAD `0c9344e`, branch `main` hoặc stash (rỗng). Không đổi data/, evidence/; không truy cập AppData thật. STATUS có WIP lịch sử từ trước: chỉ thêm phần T-042 trên đầu, không commit/push toàn bộ WIP văn phòng.
