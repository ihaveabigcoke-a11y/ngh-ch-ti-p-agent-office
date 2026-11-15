# Tự review T-047 — Office mode, 15/11/2026

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| S-2 và receipt 24 giờ | Đạt local | Cherry-pick `372a7e5` → `6336055`; worker chỉ thêm helper trong nhánh receipt. `t047.test.mjs` kiểm lỗi MUSE_NO_MEDIA/MUSE_REFUSED đi tới nhãn buildOfficeView, thời điểm và text đã làm sạch. |
| Không retry/giữ công tắc | Đạt fixture | Một lần submit, ledger một lượt Duc; phanh riêng Duc, Cho/Chi không bị dừng; toàn bộ profile so sánh chính xác (có cập nhật checkedAt/session theo preflight hiện hành), Muse vẫn bật. |
| Sao chép link | Đạt | UI gọi copyWorkbenchText, URL thật lưu sẵn, loại URL thiếu/sai/new/credentials/query/fragment; báo thành công và lỗi tiếng Việt. |
| Timeout và thư mục | Đạt local | Schema chung/UI/worker từ chối ngoài 60–1800, giữ cấu hình; thư mục cố định root/outputs, IPC không nhận đường dẫn từ renderer. Launcher thật/workspace QA/IPC/persistence đạt; shell.openPath double kiểm thành công/lỗi, chưa mở Explorer thật. |
| Bảo toàn/phạm vi | Đạt | muse.mjs/muse-bundle.mjs/theme/font/data/evidence không đổi; không AppData/DB/profile/phiên thật, không đăng/DM/gửi Muse. |
| Chất lượng | Đạt local/build/launcher | Source `580e112`, typecheck; 943 kiểm khác nhau đạt sau sửa đường executable Agent-Reach của harness và chạy riêng 1/1; tám PNG UI/launcher 1366/1920. Build 19:53:39 +07, launcher đóng êm, không lỗi console. Không assertion cũ bị hạ. |

Rủi ro khi áp vào app chính: guard saveAdapter cũ vẫn yêu cầu đóng hồ sơ trước khi lưu timeout. Nhãn +24 giờ là ước lượng, không xác nhận Muse mở lại quota. Chỉ receipt lỗi mới có text/ngày rõ; không sửa lịch sử người dùng.

Phần người dùng tự kiểm: dịch vụ/quota/VPN/tài khoản thật, clipboard/Explorer của phiên người dùng và nội dung trong hội thoại thật chưa được nghiệm thu trong T-047. Không có quyền gửi thật cho đợt này. Không có blocker source/build; SHA/push cuối nằm ở đầu STATUS.

Review dựa trên diff `before-T-047` và source hiện hành; HEAD `6336055`, branch `main`, stash rỗng giữ nguyên trong bước review. Không dùng quy trình runner đêm; cập nhật source thuộc nhiệm vụ T-047, không phải thao tác của bước review.
