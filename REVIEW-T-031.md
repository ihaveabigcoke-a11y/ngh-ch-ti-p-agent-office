# REVIEW-T-031 — 15/11/2026

## Review bổ sung sau lượt Cho thật — ĐẠT

Kết thúc: source nhãn `4cedacb`, build 02:48:51 +07; sau restart 02:51:06 toàn bộ 57 job/78 record khớp hash trước đóng, clip đúng cảnh, tổng gửi vẫn 1, Muse bật/worker dừng/Chi tắt. UI thật 1366/1920, 0 page error quan sát. App đã push `49467c6`, remote khớp, cây sạch. Khóa T-031 đã nhả. Bằng chứng cuối ở `D:/hermes-wt/artifacts/T-031/REPORT.md` và `after-reopen.json`; không công khai media/hội thoại mới. Phần “còn lại” trong review trước lượt thật bên dưới đã hoàn tất, giữ như lịch sử.

- Đã kiểm diff `2cab2bf..working tree`: chỉ `store.retry` xóa failureCode/errorKind trên lượt mới và `museVideoLabel` ưu tiên video ready có output; hai test ngược giữ nguyên receipt cũ và không báo ready khi thiếu output. Không di trú hoặc viết lại receipt đã gửi.
- Typecheck; domain 276, API 29, desktop 518, Codex 8: **831 đạt/0 lỗi/0 skip**. Full desktop lần đầu có 1 lỗi do biến môi trường REACH trỏ thư mục; chạy lại với executable từ cấu hình tích hợp đạt toàn bộ, không sửa assertion.
- Lượt Cho duy nhất đã trả video 720×1280/8 giây, ffprobe/hash/giải mã đạt; nhập đúng cảnh. App còn đúng 57 job, 78 record; 56 job cũ nguyên checksum; chỉ dự án mục tiêu đổi và thêm asset. Công tắc Muse bật, worker dừng, Chi tắt. Media/receipt mới chỉ ở bằng chứng local.
- Nguyên nhân dịch vụ T-030 chưa chứng minh duy nhất: prompt cũ đã có lệnh tạo video; thiếu prefix cố định, thứ tự scope, mất message từ chối và mã lỗi kế thừa là các lỗi source đã xác định. Không kết luận quyền video/HTTP 403 của Chi từ phản hồi chat.
- Review này không thay HEAD `2cab2bf1d7087c8a8faff76b8bfaa69bbd72af25`, nhánh main, stash rỗng; giữ data/evidence/dependency/lockfile. Build/restart bản nhãn cuối và push được thực hiện sau review.

Phần dưới là review trước lượt thật, giữ làm lịch sử.

| Task | Kết luận | Bằng chứng | Còn lại |
|---|---|---|---|
| T-031 source/UI | Đạt kiểm local, đủ điều kiện build | Một hằng số; chuẩn hóa lưu/import/builder/enqueue/retry/adapter; UI chỉ đọc; 403 và gợi ý tiếp theo cùng receipt; 821 test chính + 8 Codex đạt | Một lượt Cho thật sau build |

Tự review theo `.claude/skills/hermes-night-review/SKILL.md`, Office mode. Đọc diff từ HEAD 15b0f79; tag before-T-031 trỏ checkpoint d2b666b, giữa hai mốc có T-028b đã được người dùng duyệt. Không gộp thay đổi T-028b thành T-031.

- Prefix dùng chung trong source, UI và adapter; chỉ video nhận prefix. Đoạn mô tả không đổi, ảnh/chat chữ giữ đường riêng. +26 ký tự cho một câu và newline; adapter chuyển ghi chú phạm vi công cụ xuống sau mô tả.
- Dedupe bỏ riêng câu lệnh trước khi hash, giữ hash kiểu cũ và fallback reference-role. Không migrate scene/job/receipt đã gửi; retry chỉ chuẩn hóa bản job mới. Luồng deployment vẫn kiểm toàn bộ mô tả và revision, không coi prefix tự thêm là người dùng sửa cảnh. Gate tỷ lệ mô tả không đếm câu lệnh như dòng mô tả.
- Refusal regex nhận đúng `is unavailable`, `video_not_available`, `PROMPT ONLY — no video was generated`; giữ phản hồi nhiều message thay vì mất lý do bởi câu gợi ý cuối. Mã app vẫn MUSE_NO_MEDIA, không biến nội dung trả lời thành bằng chứng HTTP 403. Đối soát nhận receipt cũ và mới, vẫn chặn hội thoại đổi/đang chạy/nhiều kết quả.
- Không hạ assertion: test mở đầu cũ đổi thành bắt buộc câu mới + mô tả, vẫn kiểm media scope; API snapshot yêu cầu chính xác prefix + body. Test khác giữ nguyên; thêm 6 test và 4 ảnh UI, kiểm xóa/dán trùng/chuyển ảnh/lưu/dự án cũ.
- Typecheck; domain 275/275, API 29/29, desktop 517/517 (OpenMontage local có chạy), Codex 8/8. Không lỗi/skip. Các lần fail trước khi hoàn tất được giữ trong log; không lấy chúng làm kết quả cuối.
- Ảnh fixture 1366/1920 cho composer/editor, giữ theme/font. Fixture không chứng minh tài khoản Muse tạo video. App thật đang Muse bật, worker dừng, Chi tắt/Cho bật; receipt T-030 cảnh 1 đã đối soát failed, cho phép tạo lượt mới theo chỉ đạo người dùng.

Review không thay HEAD 15b0f794db9b968d2bb93493f0c454360616f7cb, branch main, stash rỗng. `data/`, `evidence/`, dependency và lockfile không thay. Chỉ đọc dữ liệu cần thiết qua app IPC/API; không đọc trực tiếp DB/cookie/token/profile. Bằng chứng mới chỉ local, không đưa vào public repo.

Rủi ro/chưa kiểm: nguyên nhân dịch vụ T-030 vẫn chưa xác định; receipt không lưu cấu hình selector lịch sử. Cần nghiệm thu đúng một lượt cảnh 1 bằng Cho, không tự mở rộng sang cảnh khác.
