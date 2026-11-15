# T-051: Hộp "Ghép" trong Thư viện + xem gốc–kết quả cạnh nhau

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn: khảo sát thật một công cụ khác (D:/hermes-wt/meosu-frames/chatgpt-phan-tich/), Opus chốt. **Chỉ học ý, không dùng mã/thương hiệu/văn bản của họ.**
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu; không gửi Muse thật (Muse giả); không đổi luồng 3 video ngoài phạm vi. Chạy sau việc trước (không Codex khác, không khoá, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh 1366/1920 nếu có giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx.
- Chạy sau T-050.
## Việc
1. Thư viện: chọn ≥ 2 clip video → hộp "Ghép": sắp ↑/↓/Bỏ, đặt tên file, quy về khung clip đầu (kích thước/tỉ lệ), clip không tiếng chèn im lặng, **giữ bản gốc** (bản ghép là media mới, cùng dự án, đánh dấu là bản ghép). Dùng ffmpeg đã có (module concat có sẵn trong `montage_bridge.py` hoặc `media.mjs`), không dịch vụ ngoài.
2. Xem **gốc–kết quả cạnh nhau** cho các video có liên kết tạo lại/remix (T-042 retryOf).
## Tiêu chí đạt
- [ ] ffprobe tổng thời lượng bản ghép = tổng clip ±0,1 s, giải mã đầy đủ exit 0, 720×1280 giữ; bản gốc nguyên hash; test + ảnh 1366/1920.
