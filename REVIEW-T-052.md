# Tự review T-052 — Office mode, 15/11/2026

Một Codex, đối chiếu đề tasks/T-052-tiep-tuc-hoi-thoai.md, tag before-T-052=1761fe8 và diff source. Skill: `.claude/skills/hermes-night-review/SKILL.md`. Không agent phụ, không đổi assertion/test cũ; data/evidence/dependency/theme/font không đổi. Các commit tiếp theo là công việc task được duyệt, tách khỏi bước review chỉ đọc.

| Hạng mục | Kết luận | Bằng chứng |
| --- | --- | --- |
| Nút/hộp/ảnh–video/reference/chip | Đạt local | 4 ảnh UI 1366/1920; source/API/Worker thật + Muse giả, nhập ảnh riêng, chip/reload/Hủy; launcher 2 ảnh và IPC thật |
| Thread/hồ sơ/quota/pacing/đối soát | Đạt Muse giả | 10 test T-052; đúng thread/profile, sai/xóa/dừng/Chi/VPN/link bị chặn; ≥60s; IPC lặp không gửi; lỗi và SHA không retry |
| Video cũ tải muộn | Đã sửa sau lượt thật | Submit/inspectResponse loại cả ID assistant cũ; test tái hiện mediaIds rỗng nhưng assistantIds có thẻ cũ; receipt cũ chưa rõ khóa tiếp tục |
| Prompt | Còn thiếu dịch trước gửi | Command đúng 1 lần ở đầu; chỉ dẫn Anh kèm mô tả gốc trích dẫn. Mô tả Việt chưa được dịch độc lập trước dispatch |
| Hồi quy/full suite | Đạt các ca | 974 kiểm khác nhau = 285 domain + 29 API + 652 desktop + 8 runner; typecheck. Full desktop cuối 651 pass/1 skip/0 fail, bù đúng ca OpenMontage với tool local đạt 1/1. Focused 67/67 và T-052 10/10 |
| Build/launcher | Đạt gói riêng | Build source 325427b, 22:19:00 +07, exit 0; launcher QA cuối đạt, không gửi ngoài, receipt/công tắc nguyên. 67 file bản cài chính nguyên SHA |
| Muse thật | Một lượt; chưa đạt clip mới | #90→#94, Chim/VPN connected/active=0. Adapter chọn thẻ cũ tải muộn; T-049 chặn SHA trùng. MP4 cũ 8s 720×1280/full decode đạt; không gửi lại. Muse còn tạo trong ảnh chẩn đoán, kết quả mới chưa đối soát |

Rủi ro khi áp chính: chưa áp build chính; gói thử nằm trong outputs/T-052-package, dữ liệu QA tách riêng. Phiên thử thật dùng app IPC/API, không đọc/xuất DB/cookie/token/proxy. App tự lưu đúng một việc và một cảnh mới; 93 job cũ/159 record khác/cảnh cũ nguyên hash. Bằng chứng thật mới không đưa vào Git. Giữ giới hạn một lượt thật; bản sửa sau đó chỉ được chứng minh bằng fixture.

Cần kiểm tiếp: đối soát lượt #94 đã gửi, không tạo lại/gửi tiếp trước khi rõ kết quả; chưa có clip mới/SKU/chất lượng nội dung. Cần chốt cơ chế dịch Việt→Anh trước gửi. Không có yêu cầu xin phép thêm từ skill; blocker dịch là chức năng còn thiếu theo task.

Prompt sửa phần còn thiếu: “Hoàn thiện riêng bước chuyển mô tả Việt sang prompt Anh trước dispatch T-052 bằng cơ chế dịch đã được duyệt; không thêm lượt Muse, không thay công tắc/thread/profile/reference/chip/phanh. Giữ mô tả gốc riêng, kiểm command đúng một lần và prompt thực gửi không chứa nguyên văn tiếng Việt; lỗi dịch không tạo job/gửi Muse. Không gọi thêm Codex worker, không dịch vụ trả phí chưa duyệt. Kết thúc bằng === BAO CAO T-052 === và TRANG THAI.”

Review cuối không đổi HEAD 325427b, main và stash rỗng; cập nhật report/STATUS sau đó thuộc phần bàn giao đã duyệt. Kết luận: đạt kiểm local/build/giới hạn một lượt thật, **chưa hoàn tất toàn bộ tiêu chí về prompt và clip mới**.
