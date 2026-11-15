# T-046: "Video dài" nối cảnh (mặc định TẮT)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn ý: học từ 2 video hướng dẫn một công cụ khác (D:/hermes-wt/meosu-frames/), Opus xếp hạng. **Chỉ học ý, KHÔNG đọc/chạy/sao chép mã, thương hiệu hay văn bản của họ** (thư mục của công cụ đó có mã độc và là tool crack).
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi giữ bật nhưng không gửi video; mọi prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu; tính năng mới **mặc định TẮT hoặc không đổi luồng 3 video đang chạy**; không đổi đường gửi Muse ngoài phạm vi. Chạy sau việc trước (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh 1366 và 1920 cho việc giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx: đã làm (SHA) · đã kiểm · chưa kiểm · Cần anh chốt.
- Chạy **sau T-044** (dùng chung phần khung cuối). Người dùng đã chấp nhận dùng hạn mức của Cho/Duc/Chim; Chi không dùng.

## Việc
1. Chế độ "Video dài" (mặc định **TẮT**, bật tay trong cài đặt dự án): chạy **tuần tự N cảnh** (N 2–5, ~8–10 s/cảnh): cảnh sau nhận **khung cuối của cảnh trước làm khung đầu** (ffmpeg trích khung cuối clip đã kiểm; đính qua đường ảnh đầu–cuối đã có `muse.mjs`), rồi ghép bằng `montage_bridge` thành 1 MP4.
2. Hai cách nhập cảnh: viết từng cảnh; hoặc dùng gói cảnh có sẵn của dự án. Gợi ý trong form: mỗi cảnh nên có lời/diễn tả đủ dài (≥ 30 từ) và cảnh báo "nhân vật có thể đổi nét qua nhiều cảnh".
3. Một cảnh lỗi/từ chối → **dừng chuỗi**, giữ các cảnh đã xong, dừng gửi (không tắt công tắc), không thử lại, không đổi hồ sơ để lách. Giãn ≥ 60 s mỗi hồ sơ (chuỗi tuần tự có thể dùng luân phiên Cho/Duc/Chim, không song song).
4. Đo thật: tối đa **3 lượt gửi** (video 3 cảnh) VPN bật: bảng chặng vào `D:/hermes-wt/artifacts/T-046/progress.md`; 3 cảnh ra 1 MP4; so khung cuối cảnh trước với khung đầu cảnh sau (hash 32×32 như T-036, ngưỡng ghi trong báo cáo). Nếu quá chậm so với mục tiêu 3 video/60 s: ghi rõ đây là tính năng riêng, không thay luồng 3 hook.
## Tiêu chí đạt
- [ ] Test (Muse giả + ffmpeg thật): chuỗi N cảnh, khung nối đúng, cảnh lỗi dừng chuỗi và giữ cảnh đã xong, công tắc không đổi, `MUSE_VIDEO_COMMAND` đúng 1 lần mỗi cảnh. Mặc định TẮT: luồng 3 video không đổi.
