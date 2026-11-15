# T-049 — Đạt source và kiểm local

Tự review một Codex theo hermes-night-review, Office mode; đề tasks/T-049-chan-clip-cu-trung-byte.md. Không sub-agent.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| Migration/sổ hash, giữ lịch sử | Đạt | muse-clip-ledger.mjs thêm bảng/index; seed chỉ đọc job/take, không dùng giới hạn UI 500; test migration/restart/backfill bảo toàn JSON cũ. |
| Chặn clip cũ và giữ receipt | Đạt | worker nhận trước ready/import; raw/normalized hash; source link; không gửi lại; giao dịch giữ chủ nhập. |
| Đủ luồng | Đạt | worker output/importReady + import-worker + long-video; bộ 3 thẻ chặn trước nhập; gói tuần tự chưa đọc giữ needs_attention. |
| Biến thể cùng tác vụ | Đạt | mediaIdeas theo project/scene/requestId; một thẻ/count, mọi take còn trong bộ chọn. |
| Hồi quy | Đạt | 948 kiểm khác nhau; 626 desktop xanh, 26 focused cuối gồm T-041/T-048; typecheck. |
| Dữ liệu/phạm vi | Đạt | Không data/evidence/AppData thật, không CSS/font/prompt command/khóa dependency. Fixture cũ đổi dữ liệu giả riêng từng job; assertion giữ hoặc tăng. |

Ảnh UI 1366/1920: nguồn mở/phát đúng, hai biến thể một ý tưởng. Nhãn tổng ý tưởng ở đầu Thư viện để không phụ thuộc phần thông tin thẻ đang bị ảnh phủ của giao diện cũ; không sửa CSS/theme.
Rủi ro: chỉ trùng byte, không so tương đồng nội dung; hàng chờ nhập sau crash giữ cho đúng chủ job; không thử migration trên DB thật. Muse/VPN/quota/tài khoản thật chưa kiểm, 0 gửi.
Build và launcher fixture thực tế, SHA/push cuối: cập nhật trong STATUS.md khi hoàn tất.
HEAD đầu/cuối review a77c05449b839a8cd585dd3ee5bf91faba4e74b8, main, stash rỗng không đổi. Review không tự commit; commit/build là bước triển khai sau review.

Triển khai sau review: source/runtime 7a4005c; bàn giao f3e3573 và tag đã push, remote main khớp; build 20:15:47 +07, launcher QA thật/IPC đạt và đóng êm, 8 PNG, 0 gửi. Khóa T-049 đã nhả. STATUS/review local; không commit WIP văn phòng cũ.
