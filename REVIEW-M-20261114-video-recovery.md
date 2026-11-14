# Tự review M-20261114-video-recovery

Chính main Codex review theo hermes-night-review Office mode; không reviewer độc lập.

| Tiêu chí | Kết luận | Bằng chứng |
|---|---|---|
| Xuất cùng phút, giữ gói trước | Đạt | manual-media.test: prompt/ảnh cũ bất biến, bốn path riêng; UI kiểm hai dự án cùng sản phẩm |
| Clip và render cũ đúng sản phẩm | Đạt | productVideoLibrary, test thuần + UI 5 clip/3 MP4 phát; không tự attach clip vào cảnh mới |
| Lý do/bước tiếp theo | Đạt | videoRecovery tách NO_MEDIA/unknown và revision; UI giữ sau reload |
| Bảo toàn record/receipt, không gửi lại | Đạt | UI deepEqual record trước/sau, flow test refusal/unknown; 0 gửi Muse |
| Typecheck/full suite | Đạt | 270 domain + 29 API + 498 desktop; OpenMontage skip chạy riêng 1/1, tổng 798 kiểm khác nhau |
| 1366/1920 | Đạt | outputs/M-20261114-video-recovery-ui, đã mở xem cả hai ảnh; không tràn ngang |
| Build/launcher | Đạt | 2b1a1cb, build 12:08:02 +07 cây sạch/app tắt; START-HERMES-CLIP.cmd + QA riêng, IPC export lặp/reload và 2 ảnh đạt, 0 lỗi/ngoài, đóng êm |

Không hạ assertion: đổi kiểm lỗi “gói trong phút này” thành hợp đồng path mới/byte cũ nguyên vẹn. Không sửa data/, evidence/, schema lưu trữ, lockfile, dependency, theme/font. Không đọc trực tiếp AppData/DB/profile hay sửa hạn mức dịch vụ.

Rủi ro còn lại: thư viện hiển thị clip cũ với tên dự án, không chứng nhận clip phù hợp cảnh mới. MUSE_NO_MEDIA nghĩa là dịch vụ chưa trả file, sửa UI không cấp quyền tạo video. Chưa kiểm video mới/SKU bằng dịch vụ thật; không có quyết định cần hỏi trong phần sửa app.

Review chỉ đọc source: HEAD trước/sau 9d160c4, main, stash rỗng; commit thực hiện sau review. Bằng chứng là fixture và công cụ local, không dùng báo cáo cũ làm chứng nhận dịch vụ.
