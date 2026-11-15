# Review T-043 — Đạt phần source/local (15/11/2026)

| Phạm vi | Kết luận | Bằng chứng |
| --- | --- | --- |
| Tất cả/Đang chạy/Lỗi/Xong, tìm và bộ đếm | Đạt | queue-view.ts và queue-board.tsx; thử 7 cảnh/9 lượt, prompt và #N, giữ gom lịch sử T-042 |
| Lý do lỗi một dòng | Đạt | queue-error.mjs; che trước cắt, tiêu đề cũng an toàn; nguyên receipt không đổi |
| Xem trước hồ sơ/thẻ | Đạt | video-preview.ts đọc profiles.dispatch; fixture Chi bật/dừng không có trong danh sách, 3→2 hồ sơ cập nhật |
| Ước lượng có căn cứ | Đạt | auto-video.ts đo lượt thành công mới, preferences lưu bền; cùng bộ hồ sơ/số thẻ; null/0/dựng lại không tạo số giả |
| Kiểm và giao diện | Đạt | 903 kiểm khác nhau, typecheck; 6 PNG 1366/1920, không tràn ngang; không đổi font/theme |

Diff được đọc trực tiếp so với before-T-043. Không giảm/xóa assertion cũ, không thay dependency/lockfile. MUSE_VIDEO_COMMAND không sửa. Không thay worker dispatch/phanh/công tắc; chỉ thêm số việc vào status. Không thay data/evidence và không truy cập AppData thật.

Rủi ro/giới hạn: số hồ sơ là trạng thái sẵn sàng tại lần polling gần nhất, worker vẫn kiểm lại trước gửi. Ước lượng có điều kiện, không bảo đảm tốc độ dịch vụ; chưa gửi Muse thật. Test dùng dữ liệu giả, OpenMontage là công cụ local thật với media tổng hợp. Không chứng minh kết nối VPN/phiên/hạn mức tài khoản thật.

Người dùng kiểm khi chạy thật: hồ sơ/quota hiện tại và chất lượng video; số đo mới xuất hiện sau lần tạo hợp lệ. Chạy tiếp bằng START-HERMES-CLIP.cmd sau build. Không có yêu cầu chốt thêm.

Review không thay HEAD/branch/stash: trước và sau e87c3d35902523d2b8669297797ded3488a2188c / main / stash rỗng. Commit/build/push tiếp theo là bước triển khai đã được người dùng yêu cầu, ngoài thao tác review chỉ đọc.
Hoàn tất triển khai: source 1464aff, tài liệu 49a267f. Build cuối cây sạch/app tắt đạt; launcher QA qua IPC, reload/CloseMainWindow/persistence giữ hash receipt gốc và các công tắc, 0 request ngoài. Có thêm 4 ảnh launcher; không Muse thật. Kết luận cuối: Đạt phạm vi T-043 local; chi tiết remote/build tại STATUS.