# T-041 — tự review Office mode, 15/11/2026

Một Codex tự review, không reviewer/agent độc lập. Lượt đầu before-T-041=aebe4e4 → working diff; lượt cuối before-T-041 → b9d5dd5, gồm sửa mốc timing sau phép đo. Không commit/đổi nhánh/stash trong từng lượt review.

| Phần | Kết luận | Bằng chứng / giới hạn |
|---|---|---|
| Preflight khi mở Video | Đạt local | CompactVideo đã gọi warmMuseProfiles; worker nay mở sẵn /thread/new, giữ đúng tab, loại hồ sơ bị phanh/busy/deleting. Phiên/nháp/captcha/quota vẫn kiểm trước gửi. Không gửi trong warm-up. |
| URL tải độc lập | Đạt local | muse.fetch nhận blob đúng origin cho từng hồ sơ; đọc nguồn dù video ẩn/animation, không chờ Stop. URL hỏng dùng preview dự phòng một lần; lỗi không log URL ký. |
| Dựng chồng chặng | Đạt local | worker gọi speculative render từ byte đã qua normalize/decode trong khi kiểm theo request và nhập diễn ra. Chỉ take ready + plan/hash/revision khớp mới xuất. Ba clip giả tải đồng thời; mỗi encode khởi đầu trước nhập và kiểm request. |
| Chi phí media | Đạt local | validateMedia gộp full decode audio/video và blackdetect một lần, thêm xerror; giữ warning đoạn tối. Integrations cache tối đa 24 kiểm nguồn theo hash+duration+ratio sau writeSource kiểm byte. Sai hash/thời lượng bị từ chối. |
| FFmpeg/CPU/chất lượng | Đạt local | Giữ veryfast/CRF26, single-pass và cap 6 MiB; giới hạn media subprocess min(3,max(1,floor(cpu/2))), gồm bridge. Ba MP4 720×1280/15s, hash/hình hook khác, âm gốc còn tiếng, CTA có pixel chữ, A/V ≤0,1s; không remux bản dựng đạt cap. |
| Hồi quy | Đạt | Typecheck + 278 domain + 29 API + 572 desktop + 8 Codex = 887/887, 0 lỗi/skip. Muse giả, Chromium/FFmpeg/OpenMontage local thật. 31 kiểm tập trung cuối đạt. |
| Assertion/phạm vi | Đạt | Chỉ bổ sung url cho 6 fake page cũ, không bỏ/nới assertion. Test warm inject RAM cố định tránh phụ thuộc tải máy. Không sửa data/evidence/dependencies/theme/font/prompt/nhãn. |
| Build/launcher | Đạt | Source b9d5dd5, build 15:46:30 +07 sau full 887/887/typecheck; cây sạch/app tắt. Launcher QA thật 1366/1920, không request ngoài/console error, switch và dữ liệu fixture nguyên sau reload/đóng. |
| Đo thật/phạm vi | Đạt phép đo | Đúng 3 gửi Cho/Duc/Chim; 3 nguồn 8s + 3 MP4 15s/720×1280/≤6 MB/A-V/giải mã/hash đạt. VPN connected và switch bật, không từ chối/retry. Chi đã vắng trước task, không xóa/tạo lại, 0 gửi Chi. 134 record cũ nguyên hash, 84 job cũ đủ ID. |
| Mục tiêu thời gian | Đạt trên nhánh cuối, giới hạn một mẫu | App nhánh cuối 15,357s so với 20,478/22,439s (giảm 5,121/7,082s). Tổng mới 100,535s so với 85,344/87,132s, Muse nhánh cuối 85,178s; chưa dưới 60s, phụ thuộc Muse. Dựng thực 12,321–19,630s còn chậm hơn baseline; không nhận mọi hook/chặng đều nhanh hơn. |
| Lỗi mốc dựng | Đã sửa | Ready transition ghi đè earlyRenderStartedAt khi chạy sớm; b9d5dd5 merge timing đang lưu và thêm assertion. Phép đo giữ nguyên, dùng compose receipt createdAt/finishedAt; không dùng UI render_start để hạ số dựng. Sửa cuối kiểm fixture/full suite, không đo Muse lần hai. |

Lỗi full suite đầu: 6 mock thiếu page.url và 1 fixture phụ thuộc freemem; đã sửa fixture, chạy lại toàn bộ đạt. Log đầu được giữ desktop-first-failed.log. Không sửa production để né assertion.

Rủi ro còn lại: warm-up chỉ có thời hạn 120s và không vượt phanh; nếu màn mở quá lâu vẫn phải kiểm VPN lại. Cache nguồn chỉ trong tiến trình; renderer speculative không cho phép xuất trước nhập. Render chồng có thể cạnh tranh CPU với decode, được giới hạn ba subprocess trên máy 20 logical CPU, nhưng chưa có trace quy nguyên nhân dựng live chậm. Mẫu live chứng minh hook khác/chung thân/CTA tại 1/5,5/13,5s, không duyệt mọi frame/SKU/công dụng hoặc chất lượng cảm nhận toàn bộ. Một lần đo không bảo đảm giảm 5–10s ở mọi lần.

Người dùng cần xem MP4 thật trước khi dùng; task không có quyền đăng/DM. Không có việc cần hỏi để khép phần đã duyệt. Không đọc trực tiếp AppData/DB/cookie/token thật; live qua app API/IPC trong phạm vi ba gửi người dùng đã duyệt. App tự thêm ba job/bảy record, media/receipt cũ giữ; data/evidence/dependencies không đổi, chưa băm toàn bộ media cũ.

Bằng chứng: D:/hermes-wt/artifacts/T-041/progress.md, timings-derived.json, measurement-1.json, compose-receipts.json, verified-1.json, final-state.json, checks.json, build-timing-fix-result.json, launcher-timing-fix.log. Lỗi fixture launcher thiếu trường proxy được sửa a0e9716; wrapper build bị PowerShell nhận stderr như lỗi đã sửa cách chạy, build cuối exit0.

HEAD b9d5dd5, nhánh main và stash rỗng giữ nguyên từ đầu đến cuối lượt review cuối; lượt đầu HEAD aebe4e4 cũng không đổi. Không còn mục cần sửa để khép phạm vi, các giới hạn live đã ghi rõ.
