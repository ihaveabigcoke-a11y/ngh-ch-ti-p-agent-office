# T-036 — tự review, 15/11/2026

Một Codex thực hiện và tự review bằng hermes-night-review, Office mode; không reviewer độc lập. Đọc đề T-036, T-034 mục 6, diff từ before-T-036 và toàn bộ module/test mới.

| Mục | Kết luận | Bằng chứng |
| --- | --- | --- |
| Thẻ có trước video | Đạt local | muse.mjs giữ thứ tự lần đầu thấy placeholder, cập nhật clipCount từng poll 750ms; chỉ gọi nhận khi có video. Bỏ nhánh kết luận sau 15s; timeout riêng MUSE_BUNDLE_TIMEOUT. Fake clock 3/6/10s, 21s và hết hạn; Chromium DOM local kiểm 3/6/10s với Stop vắng. |
| Chặn gần trùng | Đạt local | worker giữ kiểm SHA nguồn/file, thêm FFmpeg khung duration/2, RGB 32×32, MAE chuẩn hóa. Bất kỳ cặp ≤0,025 bị MUSE_BUNDLE_SIMILAR; chưa ready/import cảnh nào. Test ngưỡng chính xác, cả cặp 2/3, MP4 khác SHA gần trùng, ba màu khác nhau, giữ byte nguồn/file lỗi. |
| Cờ ánh xạ | Đạt local | Chỉ UNMAPPED/DUPLICATE/SIMILAR đặt cờ. Mạng/timeout/từ chối không đổi cả hai trạng thái trước true/false. Khởi tạo worker xóa cờ cũ, giữ receipt, phanh hồ sơ, pacing và switch. Metadata sai chỉ làm lượt thất bại. |
| Log URL fallback | Đạt local | Category cố định ghi timings và note worker; không ghi raw exception/URL. Test HTTP, timeout, network, MP4 sai, quá dung lượng với token giả trong lỗi. |
| Ba test T-034 | Đạt local | t034-overhead: tải trực tiếp ngay khi có clip; encode trước import, cache theo nguồn/cắt/CTA. t036-bundle: từ chối dừng gửi riêng p, q vẫn được giữ, công tắc không đổi, không tự gửi lại. |
| Kiểm hồi quy | Đạt | typecheck; domain 278, API 29, desktop 544, Codex 8 = 859, 0 fail/skip. Focused 19 nằm trong desktop, không cộng trùng. |

Full desktop đầu 543/544 do biến môi trường REACH trỏ thư mục thay executable; sửa lệnh chạy sang .venv/Scripts/agent-reach.exe, chạy lại full 544/544. Không sửa assertion để bỏ qua lỗi công cụ. Test T-035 vẫn giữ kiểm không nhập, không ready, không xuất lẻ, discard, không tắt switch; assertion cờ đổi kỳ vọng riêng metadata sai theo T-036, thêm fixture frame và test FFmpeg thật cho lớp kiểm mới. Không xóa test hoặc nới ngưỡng kiểm media cũ.

Rủi ro: so một khung giữa có thể từ chối hai cảnh hợp lệ nhưng hình giữa giống nhau hoặc bỏ lọt thay đổi ở frame khác. Nó không chứng minh đúng thứ tự ngữ nghĩa/SKU/nội dung, không tự gán lại cảnh. Khởi động lại chỉ mở lại lựa chọn auto bundle; receipt chưa rõ và phanh profile vẫn chặn gửi.

Chưa kiểm Muse/Instagram thật, quyền video Chi, ba clip tài khoản thật sau sửa và chất lượng quảng cáo. Không cần người dùng chốt để hoàn tất T-036. Nếu kiểm dịch vụ sau này phải có phạm vi duyệt riêng; không gửi lại receipt chưa đối soát.

Review đọc giữ HEAD fa41fbcb033f70883f3fe2b8731c68a685afe96f, branch main, stash rỗng ở cả đầu/cuối. data/evidence/dependencies/lockfiles không đổi; không đọc AppData/DB/profile/credentials người dùng. Build, launcher và push chốt sau review tại STATUS.md.

Chốt sau review: source ab54f57, báo cáo 42bac14; local build 05:53:02 +07 trên cây sạch/app tắt. Launcher thật với QA riêng chặn external, 0 request ngoài/console error, 0 lượt mới; xác minh sau đóng app cờ đã reset nhưng receipt/profile stop/pacing/switch còn nguyên. Main 42bac14 và tag before-T-036 đã push thường, remote khớp. Không mở lại AppData thật để nghiệm thu; mở app bình thường là bước sử dụng tiếp của người dùng.
