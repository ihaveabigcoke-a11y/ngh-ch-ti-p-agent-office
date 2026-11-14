# T-033 — công tắc giữ bật; 2/3 MP4, chưa đạt 60s (15/11/2026, +07)

- **Hồ sơ:** 03:39 bật lại Cho/Chi qua IPC; Duc mới đã bật. Cả ba ready, VPN connected trước gửi. Quota weekly còn cuối phép đo Duc 98%, Chi 88%, Cho 85%; nguồn Muse Settings · Usage. ready là phiên, không bảo đảm quyền video.
- **Luôn bật:** Cho/Chi/Duc enabled=true, Muse musePaused=false; Chi chỉ dispatch stopped=true sau từ chối. Không chạm ss, không tắt công tắc; worker paused/active=0 sau đo.
- **Đo thật:** một click, gửi song song 3 hồ sơ/mỗi hồ sơ 1 lượt, cách nhau tổng 1,115s; **3/6 gửi**. Thân chuẩn bị trước từ T-032 cảnh 3 [4,8] + cảnh 2 [3,10]; chỉ tạo ba hook mới, không gọi năm cảnh mới.
- **Click → MP4:** H3 **78,409s**, H1 **84,456s**; H2 không có clip. Tổng đủ ba MP4 **null/chưa đạt**. Phanh báo tại 94,998s. Đồng hồ từ trước lệnh click; event nội bộ flow bắt đầu sau 61ms.
- **Muse vs phần còn lại:** Cho chờ Muse 53,463s + còn lại 24,946s; Duc 63,565s +20,891s. Preflight→gửi 2,172–3,286s; VPN trong click 0ms; tải 3,831–4,967s; kiểm/nhập 0,604–0,928s; chọn đoạn 0,526–1,003s; dựng 7,857–8,252s; nhập/lưu MP4 0,048–0,084s. Có thêm 4,731–7,691s chờ UI/nút tải. Dừng ở kết quả tốt nhất vì Muse >50s, không lần đo 2.
- **Lý do nguyên văn Chi:** “Video generation still isn't available here, as a lasting restriction, so I can't make the 8-second video — no video was made.” Phản hồi còn ghi “Video generation is unavailable for this account in this country/region (lasting restriction, 403 video_not_available)”; đây là lời Muse, chưa kiểm HTTP backend. Không đổi hồ sơ để gửi lại H2.
- **Đã sửa:** e956c66 pacing/phanh theo hồ sơ, warm, gói song song/một tin ba cảnh có nhãn, polling 2s, ghép sớm và đồng thời, giữ raw cause T-032; 2912210 giữ H1/H2/H3 khi clip tới đảo thứ tự. Không nới guard thời lượng/receipt.
- **Bằng chứng:** D:/hermes-wt/artifacts/T-033/progress.md, timing-summary.json, measurement-1.json; 2 MP4/hash khác trong Thư viện đã ffprobe/giải mã/A-V đạt (720×1280, ~15,067s), contact sheet/CTA đã xem. Ba MP4 song song chỉ đạt ở Muse giả + FFmpeg thật, peakRenders=3.
- **Kiểm:** typecheck + **840 test đạt/0 lỗi/0 skip** (278 domain/29 API/525 desktop/8 Codex); UI 1366/1920 đạt, retry không nhân output. Lần desktop giữa có 1 lỗi fixture phụ thuộc RAM thật, đã inject bộ nhớ vào test, giữ guard/assertion và chạy lại đủ xanh. Kiểm phụ cũ số chữ Video vẫn 42/40, không gọi đạt.
- **Build/dữ liệu:** 2912210 build 04:18 +07 cây sạch/app đóng êm; kiểm launcher/restart ở after-build.json. 84 record cũ và trạng thái/lịch sử đã chụp của 59 job cũ nguyên vẹn; cấu hình limit trả null. Không đọc DB/cookie/credentials; không đăng/DM/paid API.
- **Chưa kiểm:** một tin ba clip trên Muse thật, đủ ba MP4 thật, <60s, HTTP 403 backend, chất lượng/SKU/công dụng; chưa đối soát/lấy file cảnh 4–5 T-032.
- **Cần anh chốt/chạy tiếp:** không cần để giữ bản sửa. H2 giữ cần đối soát; xem phản hồi Chi, chỉ tiếp sau kiểm quyền video hoặc chủ động chọn nhập tay. Lấy cảnh 4–5 cũ T-032/đợt gửi mới cần phạm vi riêng; không tự thử thêm.
- **Git/khóa:** app origin/main b06e485 đã push, remote khớp/cây sạch; build hành vi 2912210, launcher/restart đã kiểm. Khóa codex-T-033.txt đã xóa và kiểm không còn lúc 04:20:05 15/11/2026 +07. [Review](REVIEW-T-033.md); source ops/office/reports/T-033.md.

---

# T-032 — 3 MP4 dự phòng đã kiểm; chưa đủ 5 cảnh (15/11/2026, +07)

| Lượt | Cảnh | Gửi (+07) | Kết quả/dừng (+07) | Trả về và kiểm |
| --- | --- | --- | --- | --- |
| 1 | 2+3 | 03:16:04.421 | 03:17:03.307; kiểm lỗi 03:17:11.087 | 2 video riêng: cảnh 2 720×1280/10s, sai yêu cầu 8s; cảnh 3 720×1280/8s đạt. Cả hai giải mã/hash đạt; không clip lẫn. |
| 2 | 4+5 | 03:20:19.118 | 03:22:00.779 | 2 thẻ video trong ảnh chẩn đoán, 0 file đã tải/ffprobe; needs_attention, chưa rõ kết quả. |
- **Dừng nguyên văn:** “Hai lượt lỗi Muse liên tiếp. Kiểm tra Muse trước khi bật lại.” Receipt lượt 1: “File không đạt tỷ lệ/thời lượng hoặc không giải mã được. Giữ file trên máy để xem lại.” Lượt 2: “Tác vụ dừng. Xem bước cuối và ảnh lỗi trên máy; chưa tự gửi lại.” Không suy thành bị ban/hạn chế vùng.
- **Phanh:** 2/4 lượt, giãn 254,697s; Cho tạm ngưng riêng lúc 03:22:08, Chi không dùng, Muse vẫn bật, worker paused/active=0. Không gửi lại, không đổi hồ sơ, không đăng/DM/paid API.
- **Kết luận lô:** Muse hiển thị 2 video/tin, nhưng chưa hiệu quả trọn luồng app: lô đầu có mã kết quả sau 58,886s so với gửi lẻ T-031 52,889s (lẻ tới nhập 63,544s), lô sau dừng sau 101,661s; chưa đủ bằng chứng kết luận nhanh hơn cho MP4 hợp lệ.
- **Nguồn/dựng:** chỉ cảnh 1 T-031 và 2–3 vừa tạo; thiếu file đã kiểm của 4–5. Cảnh 2 giữ raw10s + bản cắt 8,021s; nhập 2–3 qua upload/attach của app (chưa đạt tự nhập nhiều clip), tất cả take mới pending. Ba preview dùng hook 0–4s khác nhau, chung thân dự phòng 4+7s từ cảnh 3/2 và CTA; không dùng clip 12/11, không ghi đè exports cũ.

| MP4 trong D:/hermes-wt/artifacts/T-032/ | SHA-256 | Byte | ffprobe |
| --- | --- | ---: | --- |
| 112_H1-problem_T032_partial_261115.mp4 | `7852b3db43de4cddbc1ef2cd8475f8b4643174b9d403c1c16bdd583e1391e857` | 4410594 | H.264/AAC; 720×1280; video 15s, container 15,033s |
| 112_H2-absurd_T032_partial_261115.mp4 | `3cd6914559168dd0adcbc7ba18cecb70316c905725aa7231325ba3c1d7cc9799` | 4390019 | H.264/AAC; 720×1280; video 15s, container 15,033s |
| 112_H3-curiosity_T032_partial_261115.mp4 | `246824e4e0d5c63b2d16b8bac1a71028faf382381f2418b1b0aca07f043b5326` | 5070969 | H.264/AAC; 720×1280; video 15s, container 15,033s |
- **Kiểm/thời gian:** 9 phút 15,312s từ gửi cảnh 2 tới đủ ba MP4 (03:25:19.733); 3 hash khác, mỗi file <6.000.000 byte, giải mã toàn bộ, CTA “Comment GLOW” 12–15s đã xem; tiếng gốc đối chiếu 9 đoạn r=0,984–0,996, lệch hình ≤52ms. Typecheck + **831 test đạt/0 lỗi/0 skip**; fixture không thay kiểm dịch vụ thật.
- **Chưa kiểm/cần anh chốt:** chưa lấy/đối soát 4–5, chưa xác minh đúng SKU/công dụng/độ hiệu quả hook. Ba file là preview chờ xem; app Library có ba asset, chưa duyệt take để thay bộ exports cũ. Muốn tiếp tục cần cho phép mở lại Cho để lấy kết quả cũ; chưa gửi mới. Bằng chứng/progress chỉ local; báo cáo app ops/office/reports/T-032.md, REVIEW-T-032.md. Không sửa source hành vi/build T-031.
- **Git/khóa:** app origin/main ca4f74c đã push, remote khớp/cây sạch; tag before-T-032 tại 49467c6. Khóa codex-T-032.txt đã xóa lúc 03:32:58 +07 và kiểm không còn; chỉ commit phần T-032 của STATUS/REVIEW, giữ WIP văn phòng có trước.

---

# T-028b — ĐẠT, xóa ss qua UI, 15/11/2026 01:58 +07

- Đã Xóa hồ sơ → nhập đúng ss → xác nhận; reload chỉ còn Cho/Chi, không lỗi dọn hồ sơ. Hai hồ sơ khác nguyên hash/trạng thái; không đóng phiên khác.
- fe1b4424-2493-4ec4-8b4a-d8efd276bb5c và 54df93df-1f89-4f2e-9b68-9ea018b25ee3: raw needs_attention/receipt giữ nguyên; app đã lưu dấu bỏ qua 15/11 00:17:59.214 / 00:18:30.448 +07 từ lần 1, sau checkpoint. Lần 2 không bấm lại/không thêm receipt. Lý do: **bỏ qua theo xác nhận người dùng: hồ sơ bị ban**. Không lượt nào khác đổi trạng thái.
- Trước → sau: hồ sơ 3→2 (khác ss 2→2); record 77→77; asset/MP4 31/23→31/23; take/video 34/32→34/32; bản xuất 6→6; job/receipt 56→56; receipt lệnh 277→277; tích hợp/compose 13/7→13/7. Toàn bộ record/job/integration và hai hồ sơ khác khớp hash.
- Muse luôn bật (musePaused=false), worker paused=true/active=0; ledger và bộ đếm nguyên hash; **0 gửi mới**. Không đọc AppData/DB/cookie/token trực tiếp, không đăng/DM/paid API.
- Sửa guard xóa không xét dấu bỏ qua đã lưu: source e4cc292; chỉ reader đồng bộ/đúng cảnh, giữ chặn job mới/đang chạy/thiếu bằng chứng. Typecheck và **815 test đạt/0 lỗi/0 skip** (275 domain + 29 API + 511 desktop, có OpenMontage local). Không hạ assertion.
- Build local 01:56:09 +07 cây sạch/app tắt; launcher chính mở lại đúng checkout; UI 1366/1920 + reload đạt, 0 console error/alert quan sát. Bằng chứng local: D:/hermes-wt/artifacts/T-028b/run2-*; [Review](REVIEW-T-028b.md).
- **Chưa kiểm:** phiên/quota/quyền video Muse thật; byte/giải mã toàn bộ media. Đối chiếu dữ liệu qua app, không quét ổ. **Chạy tiếp:** T-028b đã xong; không cần quyết định thêm, không tự chạy T-031 hay tiếp tục Muse. App đã push origin/main 15b0f79 (code e4cc292), remote khớp; khóa codex-T-028b.txt đã xóa và kiểm không còn lúc 02:00:15 +07.

---

# T-028b — lần 2, checkpoint 15/11/2026 01:49 +07

- Main d2b666b sạch, sau T-029/T-030; chỉ Codex exec 29864, không khóa Codex khác. Tag before-T-028b-run2; khóa codex-T-028b.txt thuộc phiên này. App đúng checkout, mở chế độ Muse-only để không boot hàng chờ ngoài phạm vi; Muse bật, worker paused=true/active=0, không gửi.
- Đối chiếu mới qua app: ss a7338c4e-16f4-45e6-a741-629962e42a37. fe1b4424-2493-4ec4-8b4a-d8efd276bb5c và 54df93df-1f89-4f2e-9b68-9ea018b25ee3 vẫn needs_attention; mỗi cảnh chỉ có đúng một job ss.
- Khác ghi chú lần 2: app đã có museReconciledAt tương ứng 15/11 00:17:59.214 và 00:18:30.448 +07 (sau checkpoint lần 1). Hai lượt đã được bỏ qua theo chính sách app; không bấm lại, không thêm receipt. Lý do giữ nguyên: **bỏ qua theo xác nhận người dùng: hồ sơ bị ban**.
- Blocker source: profileRemovalBlocker chỉ xét raw state, không đọc dấu bỏ qua của cảnh nên Xóa hồ sơ còn mờ. Sẽ sửa đúng guard, giữ chặn job mới/đang chạy/khác cảnh/thiếu bằng chứng; không sửa DB hoặc job thật trực tiếp.
- Baseline lần 2: 3 hồ sơ, 77 record, 31 asset/23 MP4, 34 take/32 video, 6 bản xuất, 56 job/receipt, 277 receipt lệnh, 13 receipt tích hợp/7 compose. Hash/metadata chỉ local tại D:/hermes-wt/artifacts/T-028b/run2-baseline.json. Chưa xóa ss.

---

# T-030 — Muse thật lại (15/11/2026, +07)

- Main/tag trước chạy 92307c6, cây sạch/một worker theo checkpoint; T-028b hết worker nhưng chỉ có checkpoint. IPC: Muse bật; Chi/Cho ready, quota available (trạng thái lưu); nhịp 60s, timeout 900s.

| Hồ sơ / lượt | Gửi → kết thúc (+07) | Thời gian chờ / clip | Gửi / thành công / từ chối / lỗi |
|---|---|---|---|
| Chi, TIZE 112, app tự chọn | 00:38:21.426 → 00:53:26.686 | 905,260s / không có clip | 1 / 0 / 1 qua UI / 0 khác; cùng lượt có mã MUSE_NO_MEDIA |
| Chi, phát sinh sau restart, chưa rõ nguồn | 01:05:39.391 → 01:20:42.238 | 902,847s / không có clip | 1 / 0 / chưa xác định / 1 MUSE_NO_MEDIA |

- Nguyên văn receipt T-030: “Want me to make a still image of that scene instead — the adult crouching and peering around in the fenced garden at dusk, with the dog plainly beside them?Yes, make the still image of the garden sceneNo, just the prompt is fine”; note: “Muse đã trả lời nhưng chưa tạo file. Mở hội thoại để xem phản hồi.”
- Nguyên văn UI mới: “Status: PROMPT ONLY — no video was generated here. Video generation is unavailable for this account in this country/region (lasting restriction, 403 video_not_available)”. Đây là nội dung phản hồi, chưa xác minh một HTTP 403/công cụ video được gọi lại.
- **Kết luận:** lượt Muse thật mới của TIZE 112 qua Chi không tạo được video; chưa đủ bằng chứng kết luận cho mọi hồ sơ Muse.
- Dừng T-030 ở bước 2; không dựng MP4 từ clip cũ. Tổng quan sát sau baseline 2/6 gửi, 0 clip; bốn job mới còn queued. Một lượt sau phanh chưa rõ nguồn nên chưa nghiệm thu phanh xuyên suốt; không dùng Cho để lách/không thao tác ss.
- Cuối 01:22:25 IPC: Muse vẫn bật, worker paused=true/active=0, ledger stopped=true; Chi đã tạm ngưng riêng (enabled=false), Cho/ss nguyên trạng. Jobs và hai hồ sơ khác nguyên checksum trong thao tác này.
- **Đã sửa/push:** 20f572a nhãn theo receipt video, 5e160a7 duyệt theo revision, 6e561c0 báo rõ clip lệch thời lượng; mỗi lỗi một commit/test riêng 9/10/37 đạt; báo cáo app d2b666b.
- **Đã kiểm:** typecheck (chạy lại exit 0), domain 275/API 29/desktop 505 + OpenMontage chạy riêng 1 = 810 kiểm khác nhau đạt. Full desktop có 1 skip đã kiểm riêng; provider tự động là fixture, không thay bằng chứng Muse thật.
- Build source hoàn thành 00:58:27, cây sạch/app đóng êm; mở lại launcher đúng checkout. DOM nhãn “Chi: Muse chưa trả video”; ảnh sau restart timeout, chưa nghiệm thu UI 1366/1920. Không có MP4 mới để đo hash/ffprobe/dung lượng.
- **Chưa kiểm:** SKU/3 hook/video mới, quyền video/HTTP 403 độc lập, bảo toàn toàn bộ dữ liệu sau restart. Trước build 75 record ngoài dự án + 50 job cũ nguyên hash; sau restart 77 record/56 job khác baseline, chưa quy nguồn. Không đọc trực tiếp DB/cookie/token.
- **Cần anh chốt:** nguồn thao tác bật lại Chi/đối soát/tạo thêm job sau 01:04 (đã hỏi); giữ phanh và receipt, không tự gửi lại hay đổi hồ sơ trước khi xử lý nguyên nhân không trả video.
- **Khóa đã nhả:** .git/office-locks/codex-T-030.txt đã xóa và kiểm không còn. Nhật ký append-only: D:/hermes-wt/artifacts/T-030/progress.md; bằng chứng mới chỉ local. [Review](REVIEW-T-030.md).

---

Chế độ: CODEX-BOSS

# T-029 — chạy thử 1 sản phẩm (14/11/2026, +07)

- Source/app thật `92307c6`, tag `before-T-029`; không sửa code/build (build có sẵn 23:29:59). Chọn TIZE TC213, mã 112: hạng 1 ngày 14/11. Bằng chứng local: `D:/hermes-wt/artifacts/T-029/`; review `REVIEW-T-029.md`.

| Bước | Bắt đầu → xong (+07) | Thời gian | Bấm | Kết quả |
|---|---|---:|---:|---|
| 1. Tín hiệu | 23:49:11.576 → 11.660 | 0,084s | 2 | Có dữ liệu; đo chuyển màn ấm, lần đo đầu lỗi công cụ; chưa đo khởi động lạnh. |
| 2. Chọn + hồ sơ | 23:49:27.032 → 23:50:35.023 | 67,991s | 4 | Vốn 2,55 USD/giá dự kiến 12,99 có sẵn; thiếu ship/link mua/ảnh; thêm CTA gợi ý GLOW, không bịa số. |
| 3. Làm video | 23:50:35.024 → 53.988; ghép 23:55:45.330 → 23:56:02.189 | chặn 18,964s; ghép 16,859s | 4 | Không gửi Muse; 3 bấm chính với clip cũ: lỗi 10s/8s, lỗi duyệt lại, rồi 3 MP4 cùng nội dung. |
| 4. Muse | 23:50:53.988 | không có lượt mới | 0 | 0 gửi/0 thành công/0 từ chối mới/0 lỗi mới; thời gian mỗi clip và trung bình: chưa có. |
| 5. Đường tay | 23:50:53.989 → 23:55:45.330 | 291,341s | 57 | Gói 5 cảnh xuất sau 27,767s; dùng 1 clip cũ 12/11, sửa thời lượng/duyệt lại qua UI để kiểm ghép. |
| 6. MP4 | 23:56:23.921 → 56.719 | 32,798s | 0 | 3 tên file, 1 nội dung/hash; ffprobe/giải mã đạt; chữ Comment GLOW đọc được. |
| 7. Đăng | 23:56:56.719 → 56.869 | 0,150s | 1 | Khay 3 MP4; chưa tài khoản nên không cột/draft/nút tải-copy; thiếu landing nên chưa kiểm UTM. Không đăng. |
| 8. Kết quả | 23:56:56.870 → 57.006 | 0,136s | 1 | Trống do chưa có draft; không 0 giả, chưa kiểm dấu — trên thẻ đúng sản phẩm. |

- **Tổng:** chọn → kẹt Muse 86,956s; → 3 MP4 kỹ thuật 395,157s (6p35s), chưa đạt 3 hook khác nhau. Chậm nhất đã đo: đường tay/khắc phục 4p51s, có thời gian quan sát/công cụ; ghép mỗi file 5,44–5,60s. 70 bấm cả lần cuối về Video, 13 chọn danh sách, 11 lần điền ô. Năng suất/ngày: **chưa đủ dữ liệu**.
- **Muse/phanh:** giữ bật, nhịp 60s, worker paused=true/active=0; không gửi mới/đổi hồ sơ/reset. Ledger nền 3 gửi/3 lỗi giữ nguyên; stopped=false khác bàn giao nên không thử dispatch sau phản hồi hạn chế video đã có. 50 job/receipt và 3 hồ sơ nguyên checksum; không coi health là xác minh phiên/quota mới.
- **Hồ sơ cuối theo IPC:** ss tắt/connection_error/đóng; Chi bật/ready/đang mở nhưng không giao việc sau lỗi; Cho bật/ready/đóng, không dùng thay. Chưa tắt riêng Chi; phanh có hiệu lực trong lượt là worker đang dừng. Không đổi hồ sơ khác.
- **3 MP4 thử:** `112_H1-problem_draft_261114.mp4`, `112_H2-absurd_draft_261114.mp4`, `112_H3-curiosity_draft_261114.mp4`; mỗi file 2.250.669 byte (<6 MB), H264 720×1280/video15,000s; AAC stereo48kHz/audio15,021s; container15,033s. Chỉ clip cũ, không ba kỹ thuật mới.
- **SHA-256 cả ba:** `fe8bfc5c178b85656c40650dd38f37773315cf0c96ec153d0622997cab95b98c`. `ffprobe.json`, `decode.json`, `export-manifest.json` local; chỉ +CTA GLOW, +1 dự án, +1 asset; 73 record cũ khác giữ nguyên.
- **Nặng:** tạo video mới còn kẹt quyền video/tài khoản theo receipt cũ; chưa thử lại dịch vụ. Không có căn cứ nhận 3 hook/đúng SKU; nhãn Muse sẵn sàng chưa phản ánh khả năng trả clip (`compact-video.tsx`, `worker.mjs`).
- **Vừa:** tự duyệt lại bị bỏ qua do khóa receipt không gồm revision (`lib/lab/auto-video.ts:49,57`), phải duyệt tay; clip10s không vào cảnh8s (`production.ts:218`); thiếu tài khoản/landing chặn nghiệm thu Đăng/Kết quả (`compact-publish.tsx`, `compact-results.tsx`). Có đường đi qua UI nên không sửa source.
- **Nhẹ:** mở Chi tiết từ new_product bật thêm hộp tạo dự án (`components/lab/production.tsx:59`); thumbnail MP4 trả200 nhưng đen (`desktop/local/thumbnails.mjs`, chưa chốt nguyên nhân). Prompt gói còn lẫn tiếng Việt từ problem; thiếu ảnh chuẩn kiểm SKU.
- **Đã kiểm/chưa kiểm:** UI/IPC thật, tải/ffprobe/hash/decode đạt; tài liệu được kiểm trước commit, không chạy full suite/build vì không sửa code. Chưa cold-start, Muse clip mới/latency, nghe toàn bộ audio, SKU, 3 hook khác nhau, cột tài khoản/tải-copy-UTM và thẻ số thật; không Instagram/DM/paid API. Ảnh/media/receipt mới chỉ local.
- **Cần anh chốt/chạy tiếp:** quyền tạo video của hồ sơ hiện tại hoặc cung cấp clip tay đúng 5 cảnh; báo giá ship đúng SKU, link landing và tài khoản sẽ dùng. Tiếp tục qua gói tay trong app; MP4 T-029 chỉ thử kỹ thuật, chưa duyệt đăng. [Review](REVIEW-T-029.md); nhật ký local `progress.md` và báo cáo chi tiết `REPORT.md`. Khóa `.git/office-locks/codex-T-029.txt` chưa nhả: công cụ chặn xóa (`blocked by policy`); cần người dùng xóa đúng khóa này sau khi worker kết thúc.

---

# M-20261114-video-type — đã sửa và kiểm phiên thật, đọc trước

- **Giữ Muse bật.** App đang mở ở Video; musePaused=false, generationReady=true. Không thao tác tắt công tắc hoặc đóng Muse trong lượt tiếp tục này.
- App main **92307c6 đã push origin/main**, remote đã đối chiếu đúng. Tag before-M-20261114-video-type = 5293561. Cây app sạch; khóa phiên đã nhả sau bàn giao. Không force-push/merge.
- Sửa nhận thumbnail Markdown/PDF thành video ở submit/inspect/fetch. Phản hồi tài liệu ổn định/kết thúc báo MUSE_NO_MEDIA; không chờ nút tải video không tồn tại. Clip tới muộn vẫn nhận, không gửi lặp.
- **Đã kiểm:** typecheck, 272 domain + 29 API + 505 desktop; 1 OpenMontage skip do thiếu env chạy riêng 1/1 đạt = **807 kiểm khác nhau đạt**, không lỗi còn lại. Không hạ assertion.
- UI fixture: 8 PNG 1366/1920, Muse giả + OpenMontage local, 1 click → 3 MP4; bấm lại không nhân đôi, lỗi không tự chuyển manual hoặc tắt Muse. Ảnh `outputs/M-20261114-video-type-ui` trong app.
- Build **14/11/2026 23:29:59 +07**, exit 0, cây sạch và không có Electron trước build. Sau đó mở launcher với phiên thật đã được người dùng cho phép qua app/IPC; không đọc trực tiếp DB/profile/cookie.
- **Đã kiểm thật:** đối soát hai receipt có sẵn; cả hai trả MUSE_NO_MEDIA, phản hồi có nói không tạo được video và nhắc tài khoản/khu vực. **0 gửi mới trong đối soát**, tổng lượt kiểm trước đó vẫn 2; giữ receipt. 73 record ngoài dự án và 45 job có trước lượt kiểm giữ checksum.
- **Kẹt ở dịch vụ:** dự án mới vẫn 0 clip/0 MP4. Công tắc Muse bật nhưng bộ điều tiết đang chặn gửi thêm sau hai lỗi; ba nháp còn trong hàng chờ. Không đặt lại ledger/quota, không đổi vùng/tài khoản, không coi công tắc bật là đã tạo video.
- 4 ảnh app thật ở `outputs/M-20261114-video-type-live` (Video + riêng công tắc, 1366/1920); kết quả số đếm/hash ở `capture-result.json`. Bằng chứng phiên thật chỉ lưu local, không push. Để app mở; source/ảnh QA tách dữ liệu thật.
- **Chưa kiểm/đạt:** Muse tạo clip mới, 3 MP4 từ clip mới, đúng SKU/chất lượng nội dung. Không hứa chạy đủ luồng ngày mai khi Muse chưa trả video. Nhãn “Muse sẵn sàng” trên Video hiện chỉ phản ánh công tắc; lý do chặn hàng chờ nằm trong Tài khoản Muse.
- **Cần anh chốt:** không có quyết định để tiếp tục phần code này. Review: REVIEW-M-20261114-video-type.md. Giữ nguyên WIP văn phòng có trước.

---

# M-20261114-muse-flow — đã sửa/push, đang kiểm phiên thật

- Chỉ đạo mới nhất: **không tắt Muse**. Không thao tác tắt công tắc, không đóng phiên Muse của người dùng. Lỗi một lượt không tự đổi công tắc toàn bộ Muse; giữ kiểm quota/phiên/receipt và chống gửi trùng.
- App main **5293561 đã push origin/main**, remote đối chiếu đúng; code **cec3004**, tag before-M-20261114-muse-flow = 2b1a1cb. Source sạch, nhả khóa chính phiên; không spawn/force-push/merge.
- Đã sửa: Làm video tiếp tục dự án/nháp cũ bằng Muse; không tự chuyển nhập tay; chờ media tới timeout cấu hình; nhận kết quả cũ không gửi mới. Lỗi giữ công tắc bật, có nút tiếp tục sau đối soát.
- Typecheck + **272 domain + 29 API + 504 desktop = 805 đạt, 0 lỗi/0 skip**. UI đạt 8 ảnh 1366/1920, fixture 1 click → 3 MP4 thật local, không nhân đôi.
- Build **14/11/2026 23:02:01 +07**, cây sạch/app chưa chạy, exit 0. Đã tự review REVIEW-M-20261114-muse-flow.md. Không tắt app/Muse trong phiên tiếp tục này.
- Launcher Electron thật/QA riêng đạt: IPC giữ Muse bật, receipt/submissions nguyên qua reload/đóng QA, 4 ảnh; 0 lỗi JS/console/request ngoài. Chỉ đóng QA, không đóng phiên thật. Tổng 12 PNG tại app outputs/M-20261114-muse-flow*-ui.
- **Quyền mới:** người dùng đã trả lời “Cho phép dùng phiên thật qua app để kiểm Muse”, cấp ngoại lệ cho app tự dùng AppData/phiên hiện có qua UI/IPC. Tiếp tục kiểm thật, giữ Muse bật; không đọc trực tiếp DB/profile/cookie.
- App thật đã mở bằng launcher; kiểm qua IPC thấy Muse bật, generationReady=true, hồ sơ đang dùng ready/quota available, limit=null. Đã bấm Làm video một lần cho đúng dự án 5 cảnh trong ảnh; đang theo dõi, không gửi lặp hoặc tắt Muse.
- **Chưa kiểm tại checkpoint:** Muse thật/clip mới/SKU thật; không coi 3 MP4 fixture là nghiệm thu Muse thật. Cần anh chốt: không có, đang thực hiện theo xác nhận mới.

---

# M-20261114-video-recovery — đã sửa màn Video, 14/11/2026

- App main **2b1a1cb** cục bộ, chưa push. Tag before-M-20261114-video-recovery = 9d160c4. Build **12:08:02 +07**, exit 0, app tắt/cây sạch; source sạch sau build.
- Sửa lỗi xuất gói cùng phút bằng path riêng, giữ gói cũ. Thư viện hiện clip/bản xuất của mọi dự án trong sản phẩm, ghi dự án nguồn; không coi clip cũ là clip mới. MUSE_NO_MEDIA/unknown có lý do và bước tiếp theo; path gói còn sau reload.
- Đã kiểm: typecheck, **270 domain + 29 API + 498 desktop**; 1 OpenMontage bị skip trong full suite đã chạy riêng 1/1 đạt = **798 kiểm khác nhau đạt, không lỗi còn lại**. Focused 6+16 đã nằm trong tổng này, không cộng trùng.
- UI fixture: 4 gói cùng phút/hai dự án, byte gói cũ giữ nguyên; 5 clip + 3 MP4 cũ phát được; record cũ nguyên trạng, reload/đổi sản phẩm đạt, 0 gửi Muse/request ngoài. 4 PNG 1366/1920 tại app outputs/M-20261114-video-recovery-ui.
- Launcher thật với QA riêng: IPC export lặp + reload đạt, 2 PNG tại outputs/M-20261114-video-recovery-desktop-ui, 0 lỗi console/request ngoài, đóng êm bằng CloseMainWindow. Không mở DB/profile thật để kiểm.
- Đã mở lại cửa sổ app cho người dùng; giữ chế độ Muse-only của phiên trước để không tự boot hàng chờ research/đăng/manual ngoài phạm vi. Chưa nghiệm thu nhập file thật qua watcher trong phiên hạn chế này; launcher bình thường khởi động watcher theo cấu hình sẵn có.
- **Chưa kiểm:** tạo clip Muse mới/quyền video/khu vực, chất lượng nội dung/SKU. Không gửi lại Muse, không đổi công tắc/ledger/receipt thật trong việc này. MUSE_NO_MEDIA không được báo thành công.
- **Cần anh chốt:** không có. Tự review [REVIEW-M-20261114-video-recovery](REVIEW-M-20261114-video-recovery.md). Nhả khóa chính phiên; giữ toàn bộ WIP văn phòng có trước. Không push/merge.

---

# M-20261114-enable — Muse đã bật, 14/11/2026 09:48 +07

- Đã bật qua UI app người dùng: musePaused=false, generationReady=true, stopped=false; bỏ trần 12 lượt nội bộ (limit/remaining=null), giữ nhịp 60 giây. **40 job/receipt cũ nguyên trạng**, 3 lượt ledger giữ nguyên, 0 lượt gửi mới, active=0.
- App main **9d160c4** (sửa Muse 012bdc0, các commit sau sửa harness QA), local/chưa push. Tag before-M-20261114-enable = 02d509e. Build **09:46:40 +07**, exit 0, cây sạch/app tắt trước build. Source sạch sau nghiệm thu.
- Đã kiểm: 21 Muse riêng; typecheck + 268 domain + 29 API + 498 desktop đạt. Một OpenMontage skip đã chạy riêng 1/1 đạt; **796 kiểm khác nhau đạt, 0 lỗi còn lại**, không hạ assertion.
- UI fixture: 10 PNG 1366/1920, bật/tắt, stop tới muộn, bật lại, null giữ qua reload, 0 gửi/browser. Electron launcher QA: IPC thật, 4 PNG, receipt giữ sau đóng/đọc lại, 0 lỗi console/request ngoài. Chạy bằng scripts/check-muse-resume-desktop.ps1.
- Ảnh/bằng chứng trong app outputs/M-20261114-enable-ui, M-20261114-enable-desktop-ui và M-20261114-enable-live/result.json; ảnh thật chỉ chụp công tắc, không xuất thông tin tài khoản. Đã xem công tắc “Muse: Đang bật”.
- Giữ audit bật lại/submissions/outcomes, chống trùng và kiểm quota/captcha/login của dịch vụ. App thật đang mở Tài khoản Muse (PID 38952 khi bàn giao), phiên Muse-only để không tự boot các hàng chờ ngoài phạm vi; CDP chỉ 127.0.0.1:9238.
- Chưa kiểm: tạo clip Muse mới/quyền video theo vùng sau sửa; bật công tắc không chứng minh dịch vụ cấp quyền. Không gửi lại lượt cũ, không đổi vùng/tài khoản, không đọc trực tiếp DB/profile/AppData.
- Cần anh chốt: **không có**. Review REVIEW-M-20261114-enable.md; nhả khóa chính phiên, giữ WIP văn phòng có trước. Không push/merge.

---

# M-20261114-toggle — đã sửa hộp Bật Muse

- App main **02d509e**, commit local/chưa push; tag before-M-20261114-toggle. Sửa mã lỗi dừng phiên thành thông báo rõ, lỗi nằm trong modal, lý do dừng cạnh công tắc + link đối soát. Thay cảnh báo khóa tài khoản chung bằng mô tả hành vi bật Muse.
- Đã kiểm: 17/17 riêng; typecheck + **267 domain + 29 API + 495 desktop = 791 đạt / 0 lỗi / 0 skip**. UI Worker fixture bật/tạm dừng, dừng trước/sau mở modal, giữ receipt, 0 gửi/0 browser; 6 PNG 1366/1920 tại outputs/M-20261114-toggle-ui.
- Build **14/11/2026 01:58:14 +07**, cây sạch/app tắt, exit 0. Launcher Electron thật trên workspace QA riêng đạt bật/tắt qua IPC, 0 job/0 request ngoài/0 console error; 2 PNG outputs/M-20261114-toggle-desktop-ui. Đã đóng QA êm, source sạch, nhả khóa chính phiên.
- Chưa kiểm: bật lại tài khoản Muse người dùng hoặc gửi video mới. Giữ phanh dừng, không reset hạn mức/receipt; sửa này không đổi quyền video/khu vực của dịch vụ. Không đọc dữ liệu thật, không push/merge.
- Cần anh chốt: không có. Mở lại START-HERMES-CLIP.cmd để dùng bản mới. Review REVIEW-M-20261114-toggle.md; báo cáo app ops/office/reports/M-20261114-toggle.md.

---

# M-20261114 — kiểm Muse thật: kẹt quyền video theo vùng

- Người dùng cho phép kiểm thật sâu; đã gửi 1 lượt mới, 0 clip mới. Ledger 2 lượt gồm 1 cũ; không cộng nhầm thành 2 lượt mới. Muse trả lời video không khả dụng cho tài khoản ở khu vực hiện tại; đã tạm dừng, không thử lại/reset/lách vùng.
- Phát hiện thẻ gợi ý Muse bị nhận nhầm thành kết quả media. Đã sửa + tự review Office mode; app main **b05d591**, commit cục bộ, chưa push (quyền push T-026 không suy rộng sang đợt Muse/dữ liệu mới).
- Đã kiểm thật: hàng chờ/receipt giữ qua restart; Tín hiệu phản ánh gửi/chờ; bấm lại không thêm job/lượt; 67 record cũ nguyên checksum. Ảnh 1366/1920 và phản hồi provider chỉ lưu outputs/M-20261114, không đưa Git.
- Đã kiểm source: 52/52 Muse; typecheck, 267 domain + 29 API + 492 desktop đạt, 0 lỗi; 1 OpenMontage skip ban đầu đã chạy riêng 1/1 đạt. Tổng 789 đạt. Không hạ assertion.
- Build **14/11/2026 01:20:19 +07**, cây sạch/app tắt, exit 0; Launcher sau build đạt: Muse tạm dừng, active 0, chặn gửi, receipt giữ nguyên, 67/67 record cũ nguyên hash; ảnh final-history/final-signals 1366/1920. Đã đóng app êm.
- Chưa kiểm/không đạt: clip Muse mới, hash/decode/phát/ba MP4 từ clip mới; bản sửa chưa gửi lại dịch vụ sau từ chối. Thumbnail một số lượt lịch sử bị hỏng; giữ media cũ. Instagram/Meta/DM/Insights, nội dung/SKU không thuộc đợt này.
- Cần anh chốt: không có cho phần sửa/local. Clip mới vẫn kẹt quyền tạo video của tài khoản theo phản hồi Muse; không tự đổi tài khoản, mua gói hay đổi vùng.
- Ledger lỗi 1 là số có sẵn trước kiểm; phản hồi từ chối mới được ghi bằng chứng riêng, không sửa giả lịch sử. Lượt mới hiện Cần đối soát sau restart, chưa được phân loại lại bằng dịch vụ; không khẳng định bản sửa đã nghiệm thu live.
- Đề tasks/M-20261114-muse-that-kiem-sau.md; review REVIEW-M-20261114.md; báo cáo app ops/office/reports/M-20261114.md.

---

# T-026 — đọc cái này trước

App main **22e66a4**, đã push origin/main; build **14/11/2026 00:40:20 +07**, cây sạch/app tắt. T-024 xong; T-026 thay T-024b/T-025. Một main agent tự làm/review.

| Việc | Kết quả · từ cố định toàn trang (gồm menu) | SHA đã push |
| --- | --- | --- |
| [x] T-026a · Menu | Xong; 7 mục + Cài đặt, 20 URL cũ | 3ba68eb |
| [x] T-026b · Tín hiệu & Phòng chờ | Xong · 40 từ | 4542dbd |
| [x] T-026c · Hôm nay | Xong · 28 từ | f8b013a |
| [x] T-026d · Săn sản phẩm | Xong · 34 từ | 2f99eba |
| [x] T-026e · Sản phẩm | Xong · 30 từ | ed92662 |
| [x] T-026f · Video / Làm video | Xong · 38 từ | 9431fea |
| [x] T-026g · Đăng | Xong · 33 từ | 13f043d |
| [x] T-026h · Kết quả | Xong · 31 từ | 9180769 |
| [x] T-026i · Luật UI / đo chữ và thumbnail | Xong; ≤40 từ, thumbnail tải được | 8142ff3 |
| [x] T-026j · Khép kiểm local | Xong; 28 axe/0 lỗi, 200%/tương phản cao, đổi hook | 7b8fd40 → 22e66a4 |
Đã kiểm: typecheck, **787 đạt/0 bỏ qua/0 lỗi**; **1 bấm → 3 MP4** sau chọn sản phẩm, đổi hook thêm 1 bấm → 3 MP4 mới, giữ thân/lịch sử (Muse giả + OpenMontage local). Ảnh 1366/1920: [chuẩn](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026i-full-ui), [200%](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026j-full-ui), [tương phản](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026j-contrast-full-ui), [launcher](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026-desktop-ui).
Cần anh chốt: **không có**. Hai ngưỡng 48 giờ giữ null; app vẫn làm video bình thường. Giá/link thiếu giữ null, SKU phải xác minh trước dùng thật.
Chưa kiểm: Muse/Instagram/Insights/Meta/DM thật, AppData/dữ liệu/phiên người dùng, chất lượng/SKU thật, người dùng NVDA và chế độ tương phản Windows. Đã kiểm phóng to/tương phản trên Chrome QA; không chứng nhận WCAG. [Review T-026j](REVIEW-T-026j.md).

---
# T-024b — hoàn tất 13/11/2026, 14:05 +07
Chế độ: CODEX-BOSS · một agent · app main **3c9b7486a8d0b2b0cf30dc67659d32d233317747** · `pnpm local:build` đạt **2026-11-13T14:05:09.5442409+07:00**, cây sạch/Electron tắt lúc build. Tag lùi `before-T-024b`. Không push/merge.
- **Đã thay đổi:** studio năm trạm, phễu sáu nấc, đường 14 ngày; Sản phẩm Thẻ/Bảng nhớ lựa chọn/sắp xếp; mini-chart ba hook với ngưỡng người dùng và null; ma trận màu/chú giải. Tín hiệu bốn dịch vụ, dòng 50 sự kiện, từ chối/giới hạn tách lỗi, hàng chờ đối soát. Khung content/video mẫu/hồ sơ chỉnh theo mẫu được duyệt. Sửa form tràn, điều hướng nhập số, nháp khi Muse dừng, đối soát cùng mã, lựa chọn Instagram cũ, nhãn/mã thô, module build thiếu và deadlock Electron ready.
- **Đã kiểm:** typecheck; **777 pass / 1 skip / 0 fail** (259 domain + 29 API + 489 desktop; skip OpenMontage live tùy chọn). **37/37 script UI**. Launcher `START-HERMES-CLIP.cmd` + Electron thật với workspace QA riêng: **20 menu, 0 lỗi console/pageerror, 0 request ngoài, không tràn ngang 1366**, lựa chọn Bảng còn sau reload; Muse luôn Tạm dừng. Guard kiểm bằng Electron nguyên main trong cây thiếu module: đúng hộp thoại tiếng Việt, exit 0, không lỗi module thô/deadlock; native dialog capture để tự đóng.
- **Ảnh:** 33 PNG ở app `outputs/T-024b-ui/`, 2 PNG trống ở `outputs/T-024b-empty-ui/`, 20 ảnh menu ở `outputs/T-024b-desktop-ui/`. Hôm nay/Sản phẩm Bảng/Số liệu/Ma trận/Tín hiệu có 1366/1920; năm ảnh bản mẫu | app ở 1366 trong [báo cáo T-024b](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/ops/office/reports/T-024b.md). Khác biệt thị giác và lý do được nêu riêng.
- **SHA:** `2aad19f` giao diện trực quan; `f0fafc9` guard; `41446e7`, `6200748`, `4d901fd` nhóm lỗi; `b105956` deadlock; `d7f08f2` kiểm Electron; `69f809b` nhãn cuối; `3c9b748` báo cáo/context và build cuối. [Review T-024b](REVIEW-T-024b.md).
- **Bằng chứng cuối:** app `outputs/T-024b-final-verified-suite.json`, `outputs/T-024b-all-ui/results.json`, `outputs/T-024b-ui/result.json`, `outputs/T-024b-desktop-ui/result.json`, `outputs/T-024b-startup/result.json`, `outputs/T-024b-build-result.json`. Log cũ đỏ được giữ; kết quả này là mốc hiện hành. Snapshot test lịch sử khôi phục đúng byte; protected paths/data/evidence/dependencies không đổi.
- **Chưa kiểm:** dữ liệu đầy đủ của bản cài trong AppData; Muse/Instagram/Meta/DM thật; hộp thoại native bằng tay; chất lượng nội dung/SKU và trình đọc màn hình. Fixture/QA không chứng nhận tài khoản thật. Không truy cập trực tiếp AppData/DB/profile. Menu và một số khối app chưa giống từng pixel mẫu, đã có giải thích/ảnh.
- **Chạy tiếp:** `START-HERMES-CLIP.cmd` → Hôm nay, Sản phẩm → Bảng, Số liệu; Đăng bài → sản phẩm → Ma trận; Khác → Tín hiệu & Phòng chờ. Muse giữ **Tạm dừng**, ngưỡng do người dùng đặt. Khóa Codex T-024b được nhả sau nghiệm thu; khóa/WIP khác giữ nguyên.
---
# T-024 — hoàn tất 13/11/2026, 12:42 +07
Chế độ: CODEX-BOSS · app main **d95f16e09e7634936988b1f4e4c50d4bf8d591bb** · `pnpm local:build` đạt **2026-11-13T12:42:32.8072866+07:00**, cây sạch/app tắt. Không push. Tag lùi `before-T-024` = b13fe266.
- **Đã thay đổi:** Hôm nay mặc định cả Electron/React: 8 số từ record, việc theo 10 bước, kết quả gần nhất, trống 1 CTA. Số liệu có bảng 11 cột sortable/biểu đồ SVG, form thu gọn/datetime-local giờ Việt Nam và CSV trực tiếp. Thẻ 3 cột gọn, ảnh/chữ đầu tên và thiếu đúng dữ liệu. Modal video 4 ô có gợi ý → dự án/khung v2 → prompt. Menu chính 9, giữ 20 view cũ. Giữ theme/font/schema và dữ liệu cũ.
- **Đã kiểm:** typecheck; **770 đạt / 1 skip / 0 lỗi** = domain 253 + API 29 + desktop 488 (skip OpenMontage live tùy chọn); focused operations 119/119, syntax main.mjs. Sáu test T-024 mới, không bỏ/hạ assertion cũ. UI fixture 8 số **3/4/3/1/2/2000/20/5**, 3 việc/2 kết quả; 6 thẻ trọn 1366×768 (đáy 709,53px); **2 click** tới Xuất gói prompt; **0 request Muse/ngoài**; reuse dự án/thử lại mất response giữ receipt, không nhân đôi; modal/lớp che đóng và menu vẫn bấm. Null/nguồn/account/timezone/sort/CSV/chart/20 view/demo banner đều kiểm.
- **Ảnh:** 10 PNG, hai khổ 1366×768 và 1920×1080, tại app `outputs/T-024-ui/` và `outputs/T-024-empty-ui/` (Hôm nay có dữ liệu/trống, Số liệu, Sản phẩm, modal video). Hai result.json passed=true, errors/external rỗng. Log full suite và build: outputs/T-024-*.log; receipt build outputs/T-024-build-result.json.
- **Review:** chính Codex, theo hermes-night-review Office mode; [REVIEW-T-024](REVIEW-T-024.md). Báo cáo app ops/office/reports/T-024.md. Protected paths data/evidence/lockfile/dependency không đổi; không AppData/DB/profile; WIP văn phòng cũ giữ nguyên. Đã nhả khóa codex-T-024 chính phiên.
- **Giới hạn số 7 ngày:** tổng lũy kế của bản đo mới nhất từng bài quan sát trong 7 ngày, có chú thích trên Hôm nay; chưa phải tăng trưởng riêng trong kỳ vì schema không có baseline/kỳ đo đó. Thiếu số hiện —, không điền 0.
- **Chưa kiểm:** mở lại Electron với dữ liệu người dùng; Muse/Instagram/Meta/DM thật; xuất prompt/file thật và chất lượng nội dung/SKU. Đây là fixture local và công cụ local, không chứng nhận dịch vụ/tài khoản thật. Không tự duyệt cảnh hay gửi job. Muse giữ **Tạm dừng**.
- **Chạy tiếp:** mở START-HERMES-CLIP.cmd → Hôm nay; chọn CTA hoặc Sản phẩm → Làm video cho sản phẩm này → sửa/Dùng gợi ý → xem/duyệt cảnh trước xuất prompt. Nhập số thật có nguồn qua Nhập số liệu/Dán CSV. Không bật Muse trong T-024.
---
# Claude xác nhận sáng 13/11 (khoảng 06:00)
- Claude chạy lại full suite trên app `25a1407`, cây sạch: typecheck 0; test 247/247; api 29/29; desktop 488 pass / 1 skip / 0 fail. **Khớp đúng** số Codex báo (764/1/0).
- Quét diff `a473b72..HEAD` (107 file): không có key, token hay email; không có file nhị phân.
- **Đã push app** lên GitHub: `8b7d88f..b13fe26 main`, không force. `b13fe26` là merge `-s ours` để nối lịch sử PR #1 (cây trùng hệt `17cb38c` có sẵn ở máy), nội dung không đổi.
- **Đã push văn phòng** `main` theo cách tương tự (cây remote trùng `cdf25c8`), kèm báo cáo sáng này của Codex.
- Chưa kiểm thêm ngoài phần Codex đã ghi "Chưa kiểm" bên dưới. Muse đang **Tạm dừng** (hạn chế vùng).

# Sáng 13/11 — đọc cái này trước
Chế độ: CODEX-BOSS · main **25a1407** · local:build đạt **05:43:37 +07** trên cây sạch/app tắt; không push/merge.

| Việc | Kết quả | SHA |
| --- | --- | --- |
| Mục 0 | Xong: Electron chạy, đóng êm; không đổi bảo mật | checkpoint 04:00 |
| T-012 / T-023 | Xong phần app: render / Muse chính và phanh | e29dec7 / ea5d1ea |
| M: clip Muse mới | **Kẹt hạn chế vùng; không thử lại** | f098843 |
| T-017 | Xong: ma trận, ba draft thật chưa đăng | 6c09a9f / 8a8755b |
| T-013 / T-014 / T-015 | Xong: Khung content, chín tab, menu | fb7829a / dbf3b55 / c307a96 |
| T-018 / T-019 / T-020 | Xong: so hook, CSV, mười bước tiếp | 04ddc1f / 3b4d68b / 47bb61a |
| T-021 | Xong: Hướng dẫn và 13 link | c5be1da |
| T-022 | Xong review/build/báo cáo; ba sửa receipt/MP4/null | 8a2753d / c9546a4 / a38a226 / 25a1407 |
| T-022a / b / c | Xong: test rủi ro, nhãn/trống, bàn phím | c0474fb / c5958fd / 8ec2aa5 |

- Kiểm cuối: **764 đạt / 1 bỏ qua / 0 lỗi**, typecheck đạt (247 domain + 29 API + 488 desktop); skip montage-live tùy chọn. Axe 6 trạng thái/0 violation, 18 focus; không chứng nhận WCAG toàn app.
- Muse: **1 gửi / 0 clip mới / 2 lỗi** (một trước gửi). Cuối đêm **Tạm dừng**, phản hồi còn hoạt động nhưng video hạn chế theo vùng; lượt chưa rõ giữ needs_attention.
- Clip thật là nguồn Muse **cũ 12/11**, SHA256 `42921bd4f8c8792d4e71008e300121c09ca027d5bcad0556fd904ac835e073e1`; chưa xác minh SKU/công dụng, không gọi là clip mới đêm nay.
- MP4 thật `outputs/M-20261113/m20261113_three_0.mp4`: SHA256 `6f86cb78aeef7b24076e0b95b73674153046100c6156c83696f643f21e20304a`.
- MP4 thật `outputs/M-20261113/m20261113_three_1.mp4`: SHA256 `88ca19f52987f0aa57d1cf785f04e8feabfe591e3ab7494e14b9cb2e7cd0d82d`.
- MP4 thật `outputs/M-20261113/m20261113_three_2.mp4`: SHA256 `a411a727a18689f37a40166df4c47b6dabff8e3cf997f582ef406920110ea35f`.
- Cả ba 720×1280, 6,033333s, lệch âm/hình 0,021333s, chung thân. Có ba draft thật; **chưa đăng**, thiếu tài khoản/landing/UTM. [Báo cáo và hash](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/docs/context/2026-11-13-OFFICE-MORNING.md).
- Ảnh 1366/1920: [chọn đoạn](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-012-ui), [Electron thật](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/M-20261113), [trạng thái trống](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-022b-ui), [bàn phím/axe](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-022c-ui).
- **Cần anh chốt:** ngưỡng tín hiệu đang null; quyền video Muse/khu vực; tài khoản/landing và duyệt nội dung trước đăng. **Smart App Control đã tắt, Electron chạy; không cần chỉnh thêm.**
- **Chưa kiểm:** Muse mới, Meta/DM, Flow mới, Thùng rác, toàn luồng dữ liệu thật sau build cuối, NVDA/200%/high contrast; axe incomplete đã ghi. **Chạy tiếp:** START-HERMES-CLIP.cmd → Hướng dẫn/Bước tiếp theo; Muse giữ dừng, dùng manual cho clip mới.

---

## Lịch sử checkpoint — không dùng thay trạng thái sáng ở trên

# Sáng 13/11 — checkpoint đang làm

Chế độ: CODEX-BOSS. Một main agent; tiếp tục WIP T-012 rồi M/T-023 và danh sách người dùng 04:00.

- Mục 0: Electron 45.2.2 chạy được; không còn spawn UNKNOWN. Launcher một lần với QA_USER_DATA riêng, chưa đọc AppData thật. App báo ERR_MODULE_NOT_FOUND: desktop/local-dist/server/lib/lab/render-plan.mjs do WIP T-012 chưa build.
- CloseMainWindow đóng hộp lỗi nhưng tiến trình lỗi không thoát; đã gọi app.quit qua inspector của chính tiến trình kiểm, không kill. Electron đã tắt. Log outputs/T-000-electron.
- Muse đêm này: 0 gửi / 0 thành công / 0 lỗi; chưa đánh giá phiên. Chỉ worker app được dùng phiên hiện có.
- T-012 **e29dec7**; báo cáo app ops/office/reports/T-012.md và REVIEW-T-012.md. 723 test đạt/1 skip/0 lỗi. 3 MP4 fixture qua OpenMontage thật; ảnh outputs/T-012-ui (1366/1920). Chưa Muse thật; build sau T-023 theo lịch hai task. Đã nhả khóa T-012.
- T-023 **ea5d1ea**, typecheck, domain 215, API 28, desktop 485 đạt/1 skip/0 lỗi (tổng 728 đạt). Nút gói, interval 60s, ledger12/đêm, stop refusal/2 lỗi, UI 6 ảnh outputs/T-023-ui. local:build đạt 04:13 trên cây sạch. M đang bắt đầu; chưa gửi thật tại checkpoint này.

- T-013 **fb7829a**: nhãn Khung content, video đối thủ HTTPS/rea/link. 735 đạt/1 skip/0 lỗi; typecheck; 4 ảnh outputs/T-013-ui. Tự review Đạt, nhả khóa; tiếp T-014.

- T-014 **dbf3b55**: chín tab/URL/phím/checklist chung. 738 đạt/1 skip/0 lỗi, 9 PNG outputs/T-014-ui; T-013 UI hồi quy đạt. Nhả khóa; build sau hai việc T-013/T-014.

- T-015 **c307a96**: menu phòng ban, 17 view cũ, lọc ngày; 738 đạt/1 skip/0 lỗi, 4 ảnh. Build T-014 dbf3b55 đạt. Nhả khóa, tiếp T-018.

- T-018 **04ddc1f**: so hook/latest/null, ngưỡng người dùng, lịch sử quyết định. 741 đạt/1 skip/0 lỗi, 5 ảnh. Nhả khóa, build sau T-015/T-018 rồi T-019.

# Bảng tiến độ

## M — checkpoint 04:22 13/11/2026
- Muse đã tự Tạm dừng, không thử lại đêm này: 1 gửi / 0 thành công / 2 lỗi (một lỗi ảnh trước gửi; một phản hồi không tạo media, needs_attention).
- 3 job chưa gửi đã hủy nháp qua app, giữ lịch sử; 4 cảnh đã xuất gói manual. Lượt đã gửi giữ needs_attention. Muse phản hồi tính năng video không khả dụng cho tài khoản tại quốc gia/khu vực hiện tại và thử lại không giúp; không suy rộng thành khóa toàn bộ tài khoản.
- Clip Muse hợp lệ cũ ngày 12/11 của sản phẩm mới nhất được kiểm riêng để tiếp tục nghiệm thu dựng; không gọi là clip mới đêm nay. Không đăng/DM/Meta.
- Đã dựng 3 MP4 từ clip cũ bằng OpenMontage, 720×1280, 6,033333s, âm/hình lệch 0,021333s; 3 hash và plan chung thân tại app outputs/M-20261113/result.json. Phát được trong Electron, ảnh 1366/1920; chỉ duyệt kỹ thuật cho draft nội bộ. Tài khoản cuối: còn trả lời, video bị hạn chế vùng; Muse Tạm dừng. Đã đóng app bằng CloseMainWindow.
- M full suite 728 đạt/1 skip/0 lỗi, typecheck đạt. T-017 bắt đầu, đề đã viết, khóa đúng path; tiếp tục một main agent, không gửi dịch vụ ngoài.
- M report commit **f098843**; T-017 code **6c09a9f**, 733 test đạt/1 skip/0 lỗi, typecheck đạt. 5 ảnh outputs/T-017-ui, 9 ô fixture/CTA drift/link đúng render. local:build đạt 04:44 cây sạch/app tắt sau M + T-017. Đang tạo ba draft thật từ ba render cũ; Muse giữ Tạm dừng, Meta/DM tắt.
- T-017 thật đạt 04:45: 3 draft gắn 3 render, PAWS/giá hồ sơ 5,99 USD cùng nhau; chưa tài khoản/landing nên chưa UTM. Không đăng. Evidence outputs/M-20261113/three-real-drafts.json + drafts-real-{1366,1920}.png. App đóng êm; Muse ledger vẫn 1/0/2, dừng hết đêm. Tiếp T-013.

## Trạng thái hiện hành — 02:40 13/11/2026 (Asia/Saigon)

Chế độ: CODEX-BOSS

**Chỉ đạo mới 03:36 13/11:** bước 0 a–d đã thử, Electron vẫn bị Smart App Control chặn; tiếp tục T-012 → T-015 bằng một main agent. Chỉ đạo này thay mốc dừng cũ bên dưới.

- Chữ ký: electron.exe và 5 DLL NotSigned; d3dcompiler_47.dll Valid (Microsoft). Bản chính thức có cùng hash với bản cũ.
- Lockfile Electron 45.2.2 x64. ZIP chính thức khớp SHASUMS256.txt: `a234388419ccbcb18dd2feec856e4ae1832499e200837f23f8e653bd51ff3be5`. Đã thay dist và giữ bản cũ trong outputs/SAC-20261113/dist-before-official-reinstall.
- Unblock-File 73 file trong dist; Zone.Identifier trước/sau đều 0, hash nội dung không đổi.
- START-HERMES-CLIP.cmd với dữ liệu kiểm riêng báo `spawn UNKNOWN`. Code Integrity 3077 lúc 03:35:51 +07: policy `VerifiedAndReputableDesktop`, status `0xc0e90002`, electron.exe 45.2.2.0. Không có cửa sổ Electron; đã đóng launcher kiểm.
- Ghi chú theo yêu cầu người dùng: **“Chỉ còn cách người dùng tắt Smart App Control”**. Bằng chứng xác nhận a–d chưa gỡ chặn bản hiện tại; chưa xác minh đây là phương án duy nhất của Windows. Agent không tắt SAC/Defender, không sửa registry bảo mật, không ký binary.
- Bằng chứng local tại app `outputs/SAC-20261113`: signatures-before.json, signatures-official.json, download-verification.json, reinstall-unblock.json, launcher.stderr.log, codeintegrity-events.json. Không mở dữ liệu/profile thật.

**Đạt mốc nghiệm thu 1 của T-010/T-011 trong Hermes Clip; dừng trước T-012.** Một main agent làm và tự review, không spawn/worker phụ. Không push/merge.

- App nhánh hiện tại main, HEAD **a473b72** (báo cáo/context); code T-010 **4f759c3**, T-011 **7007d08**. Cây sạch, Electron tắt, khóa T-011 chính phiên đã nhả. Build pnpm local:build exit 0 lúc **2026-11-13T02:39:54.3315458+07:00**, đúng HEAD a473b72. Có thể mở START-HERMES-CLIP.cmd.
- Đã áp patch chế độ văn phòng bằng git am: **564ccc6**; đã đọc CHE-DO-VAN-PHONG và BACKLOG, giữ CODEX-BOSS. Cài brief app bằng **cce6b4e**, đúng hai file AGENTS.md và CLAUDE.md. CLAUDE.md đã cập nhật hướng mới trong T-010/T-011.
- Chỉ đạo mới nhất được áp dụng: hai màn nằm trong app; buildOfficeView thuần qua route local đã xác thực. Không dùng/clone production-office, không áp patch phòng ban vào repo nào; patch chỉ tham khảo bố cục. Không ghi live/snapshot.json.
- **Fixture:** 3 sản phẩm hôm nay + 1 khác hôm qua còn việc → **Hôm nay 3/3 · Đang triển khai 4**. Bộ đếm sidebar, mã/hạng tự nhập, lọc ngày/tên/mã, lọc lượt theo sản phẩm + trạng thái, lịch sử và nhãn kết nối đạt. Giữ theme/font.
- **Pipeline local thật:** MP4 kỹ thuật mới 720×1280, 1 giây qua ManualMedia trên DB/profile kiểm riêng: unmatched → received; màn Tín hiệu tự đổi attention → library sau **4937 ms**. Giữ ID/hash lượt và SHA-256 nguồn, có asset/take, giờ sự kiện cuối. Không dịch vụ hay tài khoản thật; không gọi Thùng rác.
- **Đã kiểm:** typecheck exit 0; domain **213/213**, API **28/28**, desktop **477 pass / 1 skip OpenMontage / 0 fail** trên cây sạch 7007d08. Sau đó chỉ thêm báo cáo/context rồi build đúng HEAD cuối. T-010 UI kiểm lại 4 PNG; T-011 13 PNG ở 1366/1920, 0 lỗi trang/request ngoài; main agent đã đọc ảnh. Không cộng dồn các bộ test có phần trùng.
- **Chưa kiểm:** Electron với dữ liệu/AppData/phiên thật; Muse, Codex/Gemini VLM, Meta/DM thật; file Flow/Gemini mới; Thùng rác Windows thật. OpenMontage thật thiếu cấu hình. MP4 kiểm là file kỹ thuật mới sinh bằng FFmpeg, không phải media sản phẩm thật.

| Việc | Kết luận | Phạm vi còn lại |
| --- | --- | --- |
| T-010 | Đạt — ngày VN, mã/hạng, n/3, giao dịch chọn, view thuần | Không mở dữ liệu thật để kiểm |
| T-011 | Đạt — hai màn, bộ lọc, lịch sử, dữ liệu cũ/mất kết nối/mô phỏng; MP4 local đổi nhóm | Các kiểm thật nêu trên chưa làm |
| T-012 trở đi | Chưa bắt đầu | Đã dừng tại mốc 1 theo yêu cầu |

Báo cáo: [REVIEW-T-010](REVIEW-T-010.md), [REVIEW-T-011](REVIEW-T-011.md), [đề T-010](tasks/T-010-dot-chon-va-office-snapshot.md), [đề T-011](tasks/T-011-tin-hieu-phong-san-xuat-trong-app.md).
Bằng chứng app: [T-011 report](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/ops/office/reports/T-011.md), [result.json](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-011-acceptance/result.json), [build-result.json](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-011-acceptance/build-result.json), [ảnh Phòng sản xuất](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-011-acceptance/production-today-1366.png).

Các trạng thái dưới đây giữ làm lịch sử; không dùng quy trình/SHA/build cũ để ghi đè trạng thái hiện hành.

---

## Lịch sử T-009 — 01:13:47 13/11/2026 (Asia/Saigon)

Chế độ: CODEX-BOSS  <!-- người dùng đổi thành CLAUDE-BOSS khi muốn Claude làm boss; xem CHE-DO-VAN-PHONG.md -->

**Một main agent Codex đã tiếp quản và hoàn tất T-009.** Không spawn, không worker phụ, không chạy orchestrator.

- App `main`: **17cb38c**; cây sạch. Code sửa T-009: `e47b51d`. Build `pnpm local:build` đạt lúc **2026-11-13T01:11:29.4096762+07:00**, đúng HEAD. Có thể mở bằng `START-HERMES-CLIP.cmd`; lượt này không mở Electron trên DB thật.
- Kiểm sau sửa: TypeScript đạt; domain **213/213**; API **28/28**; desktop **465 pass / 1 skip OpenMontage / 0 fail**; Python bridge **2/2**. Không cộng dồn các bộ kiểm có test trùng.
- T-008 đã bổ sung nghiệm thu công cụ thật: rea-video ghim revision, Python 3.12.14 riêng, model local; một MP4 snapshot 10 giây xử lý 62504 ms, 1 shot, OCR có mốc, SHA-256 gốc không đổi. Xuất review, main agent đọc contact sheet rồi nhập qua CLI: **complete, 1 narrative + 1 prompt**. DB riêng là fixture.
- UI T-008: 4 PNG ở 1366/1920, 0 lỗi trang, 0 request ngoài fixture. Giữ theme/font.
- App có cấu hình cũ nay nhận đường dẫn rea-video thiếu; giữ đường dẫn riêng đã chọn. Cache model dùng chung cạnh checkout, không tải lại cho từng job.
- T-001–T-008 đã có code; **kế hoạch boss dự phòng đã xong bằng HANDOVER một main agent**. Không có job code nào đang chạy.
- **Chưa kiểm:** Electron trên dữ liệu thật, Codex/Gemini VLM thật, Meta/DM thật, file mới từ Flow/Gemini, Thùng rác Windows thật. OCR có thể nhận chữ in trên sản phẩm là overlay; cần kiểm mắt. Không chọn lại sản phẩm cũ làm pilot.
- Không push/merge trong phiên này. Bảng này đã cập nhật local; điện thoại/GitHub chưa nhận các commit mới cho tới lần push được yêu cầu rõ.

Đọc [HANDOVER.md](HANDOVER.md), [T-009](tasks/T-009-codex-mot-main-agent.md), [REVIEW-T-009.md](REVIEW-T-009.md). Bằng chứng local: [FINAL.md](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/office-20261113/FINAL.md). Không đọc AppData/SQLite/profile thật để xác minh.

### Hộp thư hiện hành

| Việc | Kết luận | Phần còn lại |
| --- | --- | --- |
| T-001–T-005 | Đã triển khai trước khi tiếp quản; hồi quy hiện tại đạt | Những lượt kiểm tài khoản/dữ liệu thật nêu trên |
| T-006 | Code/FFmpeg fixture đạt trong bộ kiểm hiện tại | Thùng rác và file Flow/Gemini mới chưa kiểm |
| T-007 | Kịch bản v2, test đạt | Chất lượng video tạo mới chưa nghiệm thu |
| T-008 | Code, CLI trên MP4 và nhập tay thật đạt; UI fixture đạt | VLM Codex/Gemini thật chưa kiểm |
| T-009 / boss dự phòng | **Xong** — một main agent, tài liệu và build đồng bộ | Không cần chờ Claude Pro |

Các mục dưới giữ làm lịch sử ngày 12/11; không dùng SHA/build/WIP hay quy trình hai boss cũ để ghi đè trạng thái hiện hành.

---

## Lịch sử trước T-009 (giữ nguyên để đối chiếu)

# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026 17:30, bởi boss Claude (trên máy người dùng)._

## 📣 Báo cáo cho người dùng (12/11 17:30)
**Mở app được chưa?** **ĐƯỢC, an toàn** (bằng `START-HERMES-CLIP.cmd` như cũ), với điều kiện boss phụ và Codex không sửa app trong lúc bạn dùng (boss chính đã báo boss phụ ngừng).
- App ở commit `adf48c9` (cây sạch). `desktop/local-dist` build lúc 17:23:59 từ đúng commit đó. Không có Codex nào đang chạy.
- Lần đầu mở:
  - **Muse: Đang tạm dừng** (mặc định). Không có request nào tới Muse;
  - **Instagram trình duyệt: tắt.** Mở app không tự mở Instagram;
  - API Instagram chưa có token, nên không gọi Meta;
  - DM tự động: chưa gửi gì, vì quy tắc đòi follow mà poll không kiểm được follow;
  - Codex CLI: tắt (bật trong Cài đặt).
- **2 cảnh có job Muse cũ (08/11) chưa rõ kết quả** sẽ hiện "Cần đối soát" kèm nút **"Bỏ qua, không đối soát"**. Bấm thì cảnh đó dùng manual được; app không gửi lại Muse.

**Đã xong trong app chính (đã push lên GitHub `hermes-clip`, `main` = `adf48c9`):**

| Việc | Commit | Ghi chú |
|---|---|---|
| T-001 night | `86ecdc0` | Có T01–T24, T26, T27, F01–F03; T25 không tồn tại |
| T-002 media manual | `43a45dd` | |
| T-003 research không cần Muse | `56e9842` | |
| T-002b Muse Bật/Tạm dừng + tự chuyển | `4d5e672` | |
| G, lối ra cho cảnh kẹt | `ab94531` | boss phụ sửa |
| T-004 Instagram API | `3e653a0` | |
| Siết so khớp CTA | `d1b57b1` | boss phụ sửa |
| T-002c | `adf48c9` | |

**Bạn cần quyết hoặc tự làm:**
1. ~~Push và merge~~: **đã làm** lúc khoảng 17:40 theo lời người dùng nói trực tiếp ("push và merge"). Xem mục *Xong*.
2. Kiểm tay trên app thật:
   - dữ liệu cũ (dự án, Thư viện, bài Instagram) theo `MORNING.md`;
   - 2 cảnh "Cần đối soát";
   - thử xuất gói prompt và thả 1 file thật từ Flow vào Hộp nhận media.
3. Muốn DM thật: tạo Meta App và cấp 4 quyền (xem `REVIEW-T-004.md`).
4. Muốn Codex hiện trên màn theo dõi: mở `codex`, gõ `/hooks` và chấp nhận.

**Chưa kiểm:** Electron thật trên dữ liệu thật; tài khoản Meta thật; `codex exec` thật qua `session_gateway`; file tải thật từ Flow/Gemini.

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
Đề bài đã viết sẵn trong `tasks/`. Boss làm theo đúng thứ tự, mỗi lúc chỉ 1 Codex chạy trên hermes-clip.
1. [x] **T-001** (đã push) Merge nhánh `night-20261111` vào app chính. Đã xong phần kỹ thuật; còn chờ người dùng kiểm tay và quyết định push. `tasks/T-001-merge-night.md`
2. [x] **T-002** (đạt, đã merge vào app chính `43a45dd`, tag lùi `before-T-002`) Tạm dừng Muse, thêm nhà cung cấp media `manual` (gói prompt + hộp nhận file). Giao Codex. `tasks/T-002-thay-muse-media-manual.md`
3. [x] **T-003** (đạt, commit `56e9842` trong app chính, tag lùi `before-T-003`) Research và viết nội dung không cần Muse (nhập JSON, Codex CLI). Giao Codex. `tasks/T-003-research-khong-muse.md`
4. [x] **T-004** (đạt, commit `3e653a0` trong app chính) Instagram qua API chính thức, kèm comment → DM. Giao Codex. `tasks/T-004-instagram-api.md`
5. [x] **T-005** (đạt, commit `04732a4`, build 18:42:29) Chọn 3 sản phẩm xong thì tự tạo hồ sơ và triển khai sang Tạo video (boss phụ viết đề và tìm ra nguyên nhân lỗi 422 ở `productFromCandidate`). Đang làm. `tasks/T-005-trien-khai-3-san-pham.md`
6. [x] **T-006** (đạt, `85fbc66`) Tự nén file mới, video < 6 MB (boss phụ viết đề, c915857). Làm SAU T-005. Chờ người dùng xác nhận trực tiếp với boss chính việc chuyển file gốc vào Thùng rác và xoá bản render tạm. `tasks/T-006-nen-file-va-video.md`
7. [x] **T-007** (đạt, `2c2e876`) Khung kịch bản v2: nhịp khoảng 1,5 giây/shot, chữ đè, CTA đè cảnh kết quả (số đo 12 mẫu rea-video). Làm sau T-006. `tasks/T-007-khung-kich-ban-v2.md`
8. [x] **T-008** (đạt, `bd8aba9`) rea-video thay bước phân tích mẫu tay; 3 đường đọc ảnh (Codex CLI mặc định, Gemini API, nhập tay). Làm sau T-007. Cần đường dẫn `rea-video-12-mau.zip`. `tasks/T-008-rea-video-phan-tich-mau.md`
9. [ ] Kế hoạch boss dự phòng sau khi Claude Pro hết hạn (khoảng 19/11).

## 🔨 Đang làm
| Việc | Worker | Nhánh / PR | Ghi chú |
|---|---|---|---|
| _(trống: không có Codex nào đang chạy)_ | | | |

## 👀 Chờ người dùng duyệt
| Việc | PR | Boss đánh giá | Bằng chứng |
|---|---|---|---|
| T-001 merge night | Chưa push. Commit `86ecdc0` nằm trên nhánh cục bộ `merge-night-20261111`, app chính đang ở commit này | Đạt phần kỹ thuật. **Chưa kiểm:** app mở lại được và dữ liệu cũ còn nguyên (người dùng tự kiểm theo `E:\Hermes Night\hermes-night3\boss\MORNING.md`). Giữ F03 theo lựa chọn của người dùng | Sao lưu tại `D:\backup\hermes-20261112-1346`: AppData 2476 file / 361.792.710 byte, khớp nguồn; tar app 18145/18145 file. Merge không xung đột. Kết quả kiểm chạy trong app chính: typecheck exit 0; test 196/196; test:api 24/24; test:desktop 317 pass, 1 skip (OpenMontage), 0 fail; `local:build` exit 0 |
| T-002 media `manual` | Đã merge vào `main` cục bộ của app chính: `43a45dd` (commit việc `7d8e022`). Tag lùi `before-T-002`. Worktree `D:\hermes-wt\T-002` vẫn giữ | **Đạt.** Xem `REVIEW-T-002.md`. **Chưa kiểm:** Electron thật, file tải thật từ Flow/Gemini | Kiểm trong app sau merge: typecheck 0; test 196/196; api 24/24; desktop 328 pass, 1 skip, 0 fail; `local:build` 0. Ảnh `D:\hermes-wt\artifacts\T-002\T-002-tao-video-{1366,1920}.png` |
| T-003 research không Muse | Commit `56e9842` trên `main` cục bộ của app chính. Tag lùi `before-T-003` | **Đạt.** Có: nhập JSON hoặc file kiểm theo schema, báo lỗi từng trường; nhận JSON của skill `hermes-product-check`; Copy prompt research; Codex CLI tắt mặc định (không shell, timeout 180 giây, giới hạn 2 MB, test bằng `codex` giả); content và landing. **Chưa kiểm:** `codex exec` thật. App ép `model_provider=openai`, trong khi Codex trên máy dùng `session_gateway`, nên có thể phải chỉnh khi bật thật. Quy tắc tự chuyển Muse cho research và nội dung sẽ làm trong T-002b | Kiểm ngoài sandbox: typecheck 0; test 202/202; api 26/26; desktop 337 pass, 1 skip, 0 fail; build 0. Ảnh `D:\hermes-wt\artifacts\T-003\T-003-nghien-cuu-{1366,1920}.png`: 10 ứng viên `import:Claude`, null hiện "Chưa biết", CNY giữ nguyên, 0/3 chọn. `desktop/local-dist` đã build lại lúc 15:43:46 từ `56e9842` |
| T-002b Muse Bật/Tạm dừng + tự chuyển | Commit `4d5e672` trên `main` cục bộ của app. Tag lùi `before-T-002b` | **Đạt** sau 3 vòng (xem `REVIEW-T-002b.md`). Bật lại Muse không tự gửi job cũ (mặc định an toàn, người dùng có thể đổi) | typecheck 0; test 203/203; api 26/26; desktop 378 pass, 0 fail; build 0; 12 ảnh tại `D:\hermes-wt\artifacts\T-002b\` |
| T-004 Instagram API + comment→DM + tắt Instagram trình duyệt + Codex CLI session_gateway | Commit `3e653a0`. Tag lùi `before-T-004` (= `4d5e672`, trước cả commit G `ab94531`, nên lùi riêng T-004 thì dùng `git revert 3e653a0`) | **Đạt** (xem `REVIEW-T-004.md`). **Chưa kiểm:** tài khoản Meta thật, safeStorage trên Electron thật | typecheck 0; test 204/204; api 26/26; desktop 396 pass, 0 fail (2 lần); build 0; 4 ảnh tại `D:\hermes-wt\artifacts\T-004\` |
| T-002c: lối ra cho cảnh kẹt "Cần đối soát" (G) + chặn job Muse cũ + nhãn tiếng Việt + bỏ polling + bảng Instagram 1366 + xét lại `follow_unknown` | `ab94531` (G, boss phụ), `d1b57b1` (siết CTA, boss phụ), `adf48c9` (Codex, 2 vòng). Tag lùi `before-T-002c` / `before-T-004-cta` / `before-T-002c2`; lùi từng commit bằng `git revert` | **Đạt** (xem `REVIEW-T-002c.md`). Nhỏ còn lại: màn Tạo video lặp dòng "Muse đang tạm dừng…" 3 lần | Cây sạch: typecheck 0; test 204/204; api 26/26; desktop 418 pass, 1 skip, 0 fail; `local:build` thật 0 lúc **17:23:59** từ `adf48c9`. 10 ảnh tại `D:\hermes-wt\artifacts\T-002c\` |
| T-005 tự tạo hồ sơ + Triển khai N sản phẩm | Commit `04732a4` (chưa push). Tag lùi `before-T-005` | **Đạt** sau 2 vòng; boss phụ duyệt code ĐẠT. Sản phẩm đã có dự án video thì nút mở dự án cũ nhất, không tạo mới. **Chưa kiểm:** 3 ứng viên thật của đợt 17:49:44 | typecheck 0; test 208/208; api 28/28; desktop 420 pass, 0 fail; `local:build` thật lúc **18:42:29**; 6 ảnh tại `D:\hermes-wt\artifacts\T-005\` |
| T-006 tự nén file mới | Commit `85fbc66` (boss phụ chạy Codex và commit). Tag lùi `before-T-006` = `0028c88` | **Đạt**: boss phụ và boss chính duyệt độc lập. Ảnh Muse tải về giờ lưu WebP. **Chưa kiểm:** Flow/Gemini thật, Thùng rác Windows thật, Electron thật | Boss chính tự chạy: typecheck 0; test 208/208; api 28/28; desktop 447 pass, 0 fail; `local:build` 22:40:54 (boss phụ); 4 ảnh tại `D:/hermes-wt/artifacts/T-006/` |
| T-007 khung kịch bản v2 | Commit `2c2e876`. Tag lùi `before-T-007` = `85fbc66` | **Đạt** sau 3 vòng; boss phụ duyệt ĐẠT. 6 công thức v2 với nhịp riêng 8–13 shot, 11,8–16,1 giây; không mặc định LINK; không có nhãn AI. **Chưa kiểm:** tạo video thật trên Flow/Veo từ prompt mới | typecheck 0; test 213/213; api 28/28; desktop 449 pass, 0 fail; `local:build` thật 23:22:09; ảnh tại `D:/hermes-wt/artifacts/T-007/final/` |
| T-008 rea-video phân tích mẫu | Commit `bd8aba9` (77 file, gồm 48 file fixture). Tag lùi `before-T-008` = `2c2e876` | **Đạt** sau 2 vòng; boss phụ duyệt độc lập ĐẠT (ACL được đặt trước khi ghi key, cờ `wx`, xoá trong `finally`, key không chèn được xuống dòng, không log key). Codex CLI mặc định; Gemini API phải xác nhận chi phí; nhập tay. **Chưa kiểm:** chạy rea-video trên MP4 thật (cần chạy `desktop/SETUP-INTEGRATIONS.ps1`, có thể tải khoảng 220 MB model), đọc ảnh bằng Codex hay Gemini thật | typecheck 0; test 213/213; api 28/28; desktop 463 pass, 0 fail; bridge Python 2/2; `local:build` thật **23:59:15**; ảnh tại `D:/hermes-wt/artifacts/T-008/final/` |
| Dựng văn phòng (repo này) | nhánh `claude/multi-agent-office-setup-b4o3x9` | Đạt phần cấu hình. Chưa kiểm Codex thật trên máy người dùng | Ảnh chụp office chạy bản `v0.1.211` trong `docs/screenshots/` |

## ⛔ Bị chặn / cần người dùng
- (Đã gỡ, 12/11 khoảng 20:20) 31 file WIP từ Codex Desktop của người dùng: người dùng chọn TRỰC TIẾP với boss chính "commit giúp rồi chạy". Boss phụ đã commit nguyên văn thành `0028c88` (tag lùi `before-user-wip-20261112` = `04732a4`). Boss chính đóng êm Hermes Clip, rồi chạy full suite trên cây sạch: typecheck 0; test 208/208; api 28/28; desktop 429 pass / 1 skip / 0 fail; build 0.
- Office trên Windows báo `spawn EINVAL` ở phần đọc hạn mức Claude. Lỗi này **vô hại**, chỉ mất thanh hạn mức. Xem `docs/SETUP-WINDOWS.md`.
- Codex trong office: lần đầu phải mở terminal của worker để duyệt `/hooks`. Xem `docs/SETUP-WINDOWS.md`.
- **Màn hình theo dõi NosytLabs (12/11 14:11):** đã chạy `START-OFFICE.ps1 -Setup`. Python có sẵn (3.15.2) nên không cài. Hook đã nối cho Claude (12 event) và Codex (10 event). Server `http://127.0.0.1:8113` trả 200. Ảnh `docs/screenshots/office-live.png`: **thấy phiên Claude boss** (`agent dbcb16`); **KHÔNG thấy Codex T-002**. Lý do:
  1. Tiến trình `codex exec` T-002 đã khởi động trước khi có hook.
  2. Hook Codex chưa được tin cậy. Bước `/hooks` cần người dùng bấm trong TUI của `codex`, boss không làm thay được (Codex không có lệnh tin cậy hook không tương tác).
  - Việc người dùng: mở `codex`, gõ `/hooks`, chấp nhận hook trỏ tới `D:\agent-office\tools\nosyt-agent-office\codex\hook.py`.
  - Sao lưu trước khi nối hook: `~/.claude/settings.json.bak-before-nosyt-*`. File `~/.codex/hooks.json` trước đó chưa có, `config.toml` không đổi.
- T-001: người dùng mở app, kiểm dữ liệu cũ, rồi nói "push" thì boss mới đẩy `86ecdc0` lên `main` trên GitHub.

## 🔎 Kiểm "app đang chạy có phải bản cũ không" (12/11, khoảng 16:00)
1. **Commit night trong app chính** (`git log origin/main..86ecdc0`, 55 commit):
   - Có đủ **T01–T24, T26, T27, F01, F02, F03**.
   - **T25 không tồn tại**: không có đề bài, log hay commit nào trong gói đêm. `ops/night/out/T20.md` của đêm cũng ghi "không thấy đặc tả/báo cáo/commit T25". Đây là số bị bỏ qua, không phải task bị mất.
   - T12 từng bị revert (`6942d89`) rồi được nạp lại sau (`c66140b`).
2. **Bản build app chạy:**
   - `START-HERMES-CLIP.cmd` nằm ở `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` (dòng `cd /d "%~dp0"`). Nó chạy `desktop\setup-local.mjs` rồi `npm start` (Electron trong `desktop\`).
   - Electron nạp giao diện và server từ `desktop\local-dist`.
   - `local-dist/ui` và `local-dist/server` được build lúc **12/11 15:21:39**, tức **sau** khi app lên `86ecdc0` (13:52:11) và sau merge T-002 (15:20:45). Bản build này chạy từ commit sạch `43a45dd`. Không cần build lại.
   - Không tìm thấy shortcut hay bản cài Hermes Clip nào khác trên máy.
3. **Ảnh tính năng night** (`docs/screenshots/`):
   - `night-T16-dem-comment-tu-khoa-1366.png` và `night-T16-chi-tiet-1366.png`: cột "Từ khóa CTA";
   - `night-T17-link-utm-1366.png`: "Link UTM cho DM";
   - `night-T23-kiem-san-pham-1366.png`: hộp "Kiểm sản phẩm".
   - Cách chụp: chạy nguyên văn các script UI của đêm (`scripts/check-{keyword-comments,utm,product-check}-ui.mjs` ở `HEAD`) trên **bản sao giống hệt** `desktop/local-dist` (đã `diff -rq` khớp), dùng dữ liệu giả, 0 request ra ngoài, trong `D:\hermes-wt\evidence`.
   - T16 và T17 đạt toàn bộ script. T23 chụp xong màn kiểm, rồi timeout ở bước form phụ phía sau.
   - **Phát hiện:** người dùng đã mở app lúc **15:32:55** (`START-HERMES-CLIP.cmd`, Electron PID 15088). Lúc đó Codex T-003 đang sửa dở `desktop/src/main.mjs` (Codex xong 15:40, commit 15:43). Bản đang chạy có night + T-002 (UI build 15:21), tức **không phải bản cũ**, nhưng tiến trình chính đã nạp code T-003 còn dở, và khi mở app tự gọi `instagram?.start()`. Boss đã **đóng êm** cửa sổ app (CloseMainWindow, không kill) lúc khoảng 15:45, trước khi làm T-002b. **Người dùng đừng mở app trong lúc Codex đang sửa**; boss sẽ báo khi an toàn.
   - **Chưa kiểm:** mở Electron thật trên dữ liệu thật. Lưu ý: mở app là tự khởi động worker Instagram bằng trình duyệt. Boss **không mở** app lúc này vì Codex T-003 đang sửa `desktop/src/main.mjs` trong cùng thư mục; mở app sẽ chạy code dở dang trên dữ liệu thật. Sẽ mở và chụp sau khi T-003 được duyệt, commit và build lại.
   - Lưu ý cho boss sau: `D:\hermes-wt\evidence\node_modules` và `desktop\node_modules` là **junction** trỏ vào node_modules thật. Muốn gỡ thì dùng `cmd /c rmdir`, **không** dùng `rm -rf`.

## 🗣️ Góp ý boss phụ (12/11/2026, duyệt CHỈ ĐỌC theo `hermes-night-review` Office mode)
Phạm vi: `git diff before-T-002..before-T-003` (T-002, 42 file +935/−59) và `before-T-003..56e9842` (T-003, 25 file +821/−19) trong app chính. Chỉ duyệt phần **đã commit**. Cây làm việc đang có thay đổi chưa commit của T-002b (boss chính), boss phụ không đụng. Không chạy lại test: đang có Codex sửa cùng thư mục.

| Việc | Boss phụ kết luận | Lý do chính |
|---|---|---|
| T-002 | **Cần sửa (đúng ra không nên ghi "Đạt" trọn vẹn)**. Phần manual media đạt; phần công tắc Muse chưa đạt đề | Xem mục 1–4 dưới. Đa số đã nằm trong đề T-002b, nhưng `REVIEW-T-002.md` nên ghi rõ là chưa đạt Phạm vi 1 |
| T-003 | **Đạt có điều kiện**. Đường (A) nhập JSON đạt; đường (B) Codex CLI gần như chắc **không chạy được trên máy này** | Xem mục 5–9 |

**T-002**
1. **Công tắc Muse chưa đúng đề (Phạm vi 1).** Chỉ có **một** checkbox "Tạm dừng Muse" trong `ManualMediaSettings` (`components/lab/manual-media.tsx:26`, gắn ở Cài đặt qua `app.tsx:68`). Thiếu: nút ở đầu màn **Tài khoản Muse**; **hộp xác nhận** khi bật ("Muse chạy bằng trình duyệt tự động; tài khoản có thể bị khoá. Bật?"). Hiện bỏ tick là Muse bật ngay, **một cú bấm, không cảnh báo**. Với tài khoản vừa bị khoá, đây là rủi ro thật. T-002b có ghi việc này, đề nghị T-002b có test: bỏ tick, rồi bấm Huỷ trong hộp xác nhận, thì `setMusePaused` được gọi 0 lần.
2. **Tạm dừng đang huỷ job chạy dở** (`desktop/src/worker.mjs`, `setMusePaused`): đóng mọi context. Thêm `checkpoint()` gọi `assertMuseAvailable`, và route `abort` mọi request. Job đang submit hoặc đang tải sẽ chết giữa chừng. Đề bài ghi rõ "Job đang chạy dở **không bị huỷ**". Boss chính đã thấy (T-002b). Khi sửa, nhớ kiểm cả 3 chỗ: đóng context, `checkpoint`, route `abort`. Sửa một chỗ thì job vẫn chết.
3. **"Bật lại chạy y như trước" chưa chắc đúng.** Mỗi context Muse giờ luôn có `context.route('**/*', …)` và `serviceWorkers:'block'`, **kể cả khi Muse đang bật**. Playwright tắt HTTP cache khi bật route, nên trang Muse sẽ tải chậm hơn và tốn băng thông qua VPN/proxy hơn trước T-002. Test không phát hiện được vì fixture không có `route` (`if (context.route)`). Đề nghị T-002b: chỉ gắn route khi đang tạm dừng (hoặc gỡ route bằng `unroute` khi bật lại), và ghi rõ trong báo cáo.
4. **Test chiều "bật lại".** `desktop/test/muse-pause.test.mjs` chỉ chứng minh bật lại thì context mở và route `continue`. Không có test nào đi Tạm dừng → Bật → gọi đúng `adapter.submit` / `chat.send` / research như cũ (tiêu chí 1 đòi "test cho cả hai chiều, fixture đếm số lần gọi"). Các test Muse cũ chỉ chạy với `store.set('muse_paused',false)` từ đầu, nên chỉ chứng minh **gián tiếp**. Nên thêm một test chuyển trạng thái thật.
- Đã kiểm, ổn: không xoá file Muse nào (`--diff-filter=D` rỗng); không đụng `data/`, `evidence/`, lockfile, `package.json`; hộp nhận không xoá file gốc (chỉ `unlink` bản snapshot/tạm); chống trùng theo sha256 cả trong `applyProduction('manual_result')`.

**T-003**

5. **Codex CLI (B) ép `-c model_provider="openai"`** (`desktop/src/codex-cli.mjs:64`). `~/.codex/config.toml` của máy này dùng `model_provider = "session_gateway"`, nên lượt chạy thật nhiều khả năng lỗi đăng nhập hoặc định tuyến. Test fixture lại **khẳng định đúng tham số này** (`desktop/test/codex-cli.test.mjs`), nên khi sửa phải đổi test. Đề nghị: không ép `model_provider` (để Codex dùng config của người dùng), giữ `--sandbox read-only` và `--ephemeral`. Tên provider không phải bí mật, nhưng đừng chép khối `[model_providers.session_gateway]` vào app.
6. **Sự kiện `type:"error"` bị coi là thất bại cả lượt** (`codex-cli.mjs:51`). Nếu `codex exec --json` phát `error` tạm thời (ví dụ khi kết nối lại stream) rồi vẫn hoàn tất, app sẽ báo lỗi và bỏ kết quả. **Chưa kiểm** với Codex thật; cần kiểm khi chạy thật lần đầu. Nếu đúng vậy, chỉ nên coi `turn.failed`, hoặc `error` không có `agent_message` cuối, là thất bại.
7. **Landing nhập vào không ghi nguồn.** Content có `notes:'Nguồn: import:'+tool`, còn landing thì không (`components/lab/operations.tsx`, `landingForm(parseTextExchange('landing',…))`). Quy tắc "mỗi tác vụ ghi rõ nhà cung cấp" chưa đủ cho landing. Lỗi nhỏ, có thể gộp vào T-002b.
8. **Nhập trùng hết thì vẫn báo "Đã nhận kết quả research."** `mergeTextResearch` trả batch cũ khi mọi ứng viên trùng, và UI không nói là 0 ứng viên mới. Nên báo "Đã nhận N ứng viên mới, bỏ M trùng". Lỗi nhỏ.
9. **Nới schema lõi.** `candidateSchema.supplierUrl` đổi từ `sourceLink` sang `optionalLink` (`lib/lab/operations.ts:60`). Ràng buộc chỉ còn ở `researchBatchSchema.superRefine`. Hiện an toàn vì mọi đường lưu đều qua batch, nhưng chỗ nào dùng `candidateSchema` riêng (form sửa ứng viên, `productFromCandidate`) giờ nhận được URL rỗng. Nên có test: sửa tay một ứng viên `single` mà xoá URL thì bị chặn.
- Đã kiểm, ổn: `null` giữ nguyên (cờ logistics không có thì là `null`, không phải `false`); `listingStatus≠single` thì `cost` và `shipping` phải `null` (chặn ở cả parse lẫn batch); không quy đổi tiền tệ (CNY giữ nguyên); payload không giả mạo được `source`, `listingCheck` hay receipt YouTube; Muse response bị gỡ `source` và `importMetadata`; không tự chọn 3/10; không xoá hay nới test cũ (0 dòng `test(`/`assert` bị xoá); xoá `OPENAI_API_KEY`/`CODEX_API_KEY` khỏi env con; không shell, timeout 180 giây, giới hạn 2 MB. Báo cáo Codex trong commit khớp diff. Codex tự ghi trung thực rằng nó chạy test **không đạt** trong sandbox, boss chạy lại bên ngoài.

**Rủi ro khi người dùng mở app** (bản build 15:43 từ `56e9842`): công tắc Muse bật được bằng một cú bấm không xác nhận (mục 1); bật Muse rồi tạm dừng lại sẽ giết job đang chạy (mục 2); `instagram?.start()` vẫn tự chạy khi mở app (T-004 đã ghi).

**Người dùng phải tự kiểm trên giao diện thật:** Codex CLI thật (sau khi sửa mục 5); nhập một JSON thật từ skill `hermes-product-check`; xuất gói prompt rồi thả file thật từ Flow vào hộp nhận.

**Tự soi lại và đối chiếu bản T-002b đang sửa (chưa commit, đọc bằng `git diff` lúc khoảng 17:00):**
- Mục 1 (hộp xác nhận): đang được sửa. Có `components/lab/muse-switch.tsx`, dùng ở `desktop-console.tsx` và `manual-media.tsx`, có câu "tài khoản có thể bị khoá. Bật?".
- Mục 2 và 3 (huỷ job, route, `serviceWorkers`): đã gỡ. Giờ dùng `runMuseTask` (AsyncLocalStorage) để job đã nhận trước khi tạm dừng chạy được đến hết. Research tạm dừng thì chuyển `partial`, không kẹt `running`.
- Mục 5 (`model_provider="openai"`): **chưa sửa** trong T-002b. Commit `05747f9` xếp việc này vào T-004.
- **Lỗi mới trong T-002b** (gửi boss chính):
  - **A.** `CodexTextService.execute` (`desktop/src/codex-cli.mjs`) coi **mọi** `research_runs` là Muse chưa đối soát. Không lọc theo đợt hay scope, không có cờ `reconciled`, và điều kiện lọc `filter(row=>kind==='research')` không lọc gì cả. Nếu còn một lượt research cũ ở `needs_attention` (rất có thể, từ hôm tài khoản bị khoá), Codex research sẽ bị chặn **vĩnh viễn** ("Cần đối soát"). Mà muốn đối soát thì `resume()` lại đòi Muse đang bật, nên bị kẹt vòng tròn. **Chưa kiểm** trên dữ liệu thật, vì boss phụ không đọc SQLite người dùng.
  - **B.** `setMusePaused({paused:false})` gọi `this.tick()`, mà tạm dừng không còn xoá `approvedIds`. Nên **bật lại Muse là tự gửi ngay** các job đã duyệt từ trước khi tạm dừng, người dùng không bấm Chạy lần nữa. Với rủi ro khoá tài khoản, đây là quyết định của người dùng, cần hỏi.
  - **C.** AsyncLocalStorage truyền sang cả timer và listener được tạo trong job đã nhận. Callback nào chạy sau khi tạm dừng mà chỉ gọi `assertMuseAvailable` sẽ lọt qua chốt chặn. Cần một test: tạm dừng giữa job, rồi gọi `context()` hoặc `measureQuota()` từ một `setTimeout` tạo bên trong job, thì phải ra `MUSE_PAUSED`.

### Boss phụ vòng 2 (12/11, khoảng 17:05): T-002b commit `4d5e672` (`git diff 56e9842..4d5e672`: 51 file, +1220/−179)
| Việc | Kết luận | Lý do |
|---|---|---|
| T-002b | **Cần sửa** (1 lỗi Nặng, 2 Nhỏ) | A–E đã sửa đúng trong code. Còn kẹt đối soát ở phía **media** |

**Lỗi vòng trước, kiểm lại trong code:**
- **A: Đã sửa.** `provider-routing.mjs` dùng `textProviderReceipts` lọc theo `taskScope`/`batchId`, tôn trọng `reconciled`. Có `researchSkipReconciliation` và `museChatSkipReconciliation` (lưu bền, `resume`/`run` từ chối run đã bỏ qua).
- **B: Đã sửa.** `setMusePaused(true)` gọi `pause()`, hàm này xoá `approvedIds`. Bật lại thì chỉ tăng `dispatchVersion`, không `tick()`. Có test `T-002b B`/`D`.
- **C: Đã sửa.** `runMuseTask` gắn `jobId`+`profileId`; `task.active=false` khi xong; `assertMuseAvailable` chỉ cho qua khi khớp đúng id. Có test `T-002b C`.
- **D (`model_provider="openai"`, `codex-cli.mjs:66`): Chưa sửa.** Đã xếp vào T-004.
- **E: Đã sửa** theo báo cáo Codex (landing ghi `import:<tool>`, báo số mới/trùng). Chưa đọc kỹ UI.
- Test bị xoá hay sửa đều có lý do: test route cũ (hành vi đã bỏ có chủ ý) được thay bằng "pause persists without closing contexts…"; test công tắc cũ được thay bằng 3 test `MuseSwitch`; `instagram-ai-label.test.mjs` bỏ timeout 180 ms và `setDefaultTimeout(1500)` (mục F, chống chập chờn, assertion giữ nguyên, nằm ngoài phạm vi nhưng chấp nhận được).
- Bằng chứng test là của boss chính chạy ngoài sandbox: typecheck 0; test 203/203; api 26/26; desktop 378 pass/1 skip; build 0. Boss phụ **không chạy lại**.

**Lỗi mới:**
- **G (Nặng): media kẹt "Cần đối soát" mà không có lối ra khi Muse bị khoá.**
  - `ManualMedia.route()` (`desktop/src/manual-media.mjs`) và guard `manual_result` (`app/api/production/route.ts:14-20`) đưa **mọi** job Muse của cảnh vào `previous`. Đưa vào không kèm `reconciled`, cùng mọi `attempt.status==='unknown'`.
  - Cảnh nào có một job Muse ở `needs_attention` (hoặc attempt `unknown`) thì bị chặn vĩnh viễn: không xuất được gói prompt, hộp nhận không gắn file, gắn tay cũng lỗi 422.
  - Muốn đối soát thì cần `resume`/`recheckResult`, mà hai lệnh này đòi Muse bật, trong khi tài khoản Muse đã bị khoá. **Không có** `skipReconciliation` cho job media (chỉ có cho research và chat).
  - Tái hiện: một job `needs_attention` có `request.projectId=P, sceneId=S` → `manualMedia.exportPack({projectId:P})` trả "Duyệt ít nhất một cảnh manual…", và `status()` ghi trạng thái cảnh là "Cần đối soát".
  - **Chưa kiểm** dữ liệu thật có job như vậy không (boss phụ không đọc SQLite), nhưng rất có thể có, từ hôm tài khoản bị khoá.
- **H (Nhỏ):** `components/lab/text-exchange.tsx:70` hiện id thô "Mặc định: import:json / codex / muse" cho người dùng. Nên dùng nhãn tiếng Việt: "Nhập JSON", "Codex CLI", "Muse".
- **I (Nhỏ):** mỗi `TextExchange` gọi IPC `museChatList` (×2) và `researchStatus` mỗi 1,5 giây (`setInterval(read,1500)`), dù đã nghe sẵn `workspace-changed`. Nên chỉ đọc lại khi có sự kiện, hoặc giãn ra ≥ 10 giây.
- Tự phản biện:
  - Đã bỏ nghi vấn "auto → manual lệch giữa `production.ts` và resolver", vì guard ở `route.ts` chạy trước và chặn đúng.
  - Đã bỏ nghi vấn "MUSE_STATUS không có", vì `desktop/local/server.mjs:33` có cung cấp kèm `jobs`.

### Boss phụ sửa lỗi G (12/11, khoảng 17:00): commit `ab94531` trong app chính, tag lùi `before-T-002c` (= `4d5e672`)
- **Ai làm và vì sao:** người dùng yêu cầu tốc độ, bảo boss phụ tự sửa G. Boss chính đồng ý, kèm điều kiện: chỉ đụng file không nằm trong WIP T-004 (Codex T-004 đang chạy cùng thư mục), commit bằng `git commit -- <paths>`, chạy riêng test của mình.
- **Cách sửa:**
  - action production `skip_reconciliation {sceneId}` lưu `scene.museReconciledAt` (mốc chỉ tiến lên);
  - `mediaProviderReceipts()` trong `desktop/src/provider-routing.mjs` được dùng chung ở `manual-media.mjs`, `route.ts`, `production-desk.tsx`, `manual-media.tsx`;
  - `route.ts` trả 422 khi job Muse của cảnh đang chạy, hoặc khi không có gì chưa rõ;
  - màn Tạo video có nút "Bỏ qua, không đối soát" kèm hộp xác nhận. Job, attempt, take, receipt đều giữ nguyên.
- **Đã kiểm (chạy RIÊNG):** `tests/production.test.mjs` 32/32; desktop `provider-routing` + `manual-media` + `manual-media-ui` 37/37 (3 test G mới, tái hiện đúng dữ liệu thật: job `needs_attention`, không providerId); api `production-api` 5/5; `tsc --noEmit` 0 lỗi. Không xoá hay nới test cũ.
- **Chưa kiểm:** full suite, `local:build`, Electron thật, 2 job thật từ 08/11.
- **Còn lại:**
  - H và I để Codex làm sau T-004;
  - chặn hẳn `worker.resume` với job **có** providerId sau khi bỏ qua: để boss chính quyết (worker.mjs).
- **Lùi lại:** `git revert ab94531`. **Không** `reset --hard`, vì sẽ xoá WIP T-004.

### Boss phụ vòng 3 (12/11, khoảng 17:10): T-004 `3e653a0`, chạy song song với Codex T-002c
| Việc | Kết luận | Lý do |
|---|---|---|
| T-004 | **Đạt về code**, kèm 1 bản sửa của boss phụ (`d1b57b1`) và 1 câu hỏi cho người dùng | Codex CLI không còn bị ép provider; Instagram trình duyệt tắt mặc định (fail closed), bật phải qua cảnh báo; DM idempotent, có giới hạn tốc độ, có nút dừng khẩn cấp; follow chưa rõ thì không gửi link |
- **Đã tự sửa (Vừa):**
  - **Lỗi:** `matchCta` quá lỏng. LINK khớp pink, line, ink; SHOP khớp stop, show, ship; WANT khớp went. Khách sẽ bị DM nhầm.
  - **Sửa:** từ khoá 4–5 chữ chỉ nhận đúng từ, s/es, hoặc đảo 2 chữ liền nhau; từ khoá ≥ 6 chữ mới nhận 1 lần sửa chữ. Test cũ đổi thành chặt hơn (có chủ ý).
  - **Kiểm (chạy riêng):** `instagram-official` 12/12; tsc 0 lỗi. Tag lùi `before-T-004-cta`.
- **Người dùng đã quyết (12/11):** **giữ** "chỉ gửi khi đã follow" ("Giữ, an toàn hơn"). Polling không kiểm được follow, nên hiện **không DM nào được gửi**, cho tới khi có cách kiểm follow. Người dùng cũng trả lời trực tiếp boss chính: **có xét lại** các comment `follow_unknown` còn trong hạn 7 ngày khi đổi quy tắc, mỗi comment tối đa 1 DM. Việc này giao cho T-002c vòng 2 (file `instagram-comments.mjs` và test đã vào khoá Codex).
- **Chưa kiểm:** full suite, `local:build` (boss chính chạy sau T-002c), tài khoản Meta thật, ảnh 1366/1920.

### Boss phụ vòng 4 (12/11, khoảng 17:30): T-002c `adf48c9`: **ĐẠT**
- **Chặn job Muse cũ đã bỏ qua đối soát:** `worker.assertJobNotSkipped` được gọi trước run, resume, recheck và retry, khớp mốc `museReconciledAt`, thiếu dữ liệu thì chặn (fail closed).
- **Comment `follow_unknown`:** được xét lại theo `rule.revision`, mỗi comment tối đa 1 DM.
- **TextExchange:** bỏ polling 1,5 giây; nhãn tiếng Việt.
- **Bằng chứng (của boss chính):** test 204/204, api 26/26, desktop 418/1/0; `local:build` lúc 17:23:59 từ cây sạch.
- **Ghi chú nhỏ (vòng sau):**
  - job Muse của cảnh đã xoá, hoặc chạy chế độ `--hosted`, sẽ không resume được (fail closed); thông báo lỗi nên có hướng dẫn;
  - "Muse đang tạm dừng…" lặp 3 lần ở màn Tạo video.
- **Từ giờ app đã build đúng HEAD, nên người dùng mở app được.** Boss phụ tạm ngừng sửa app, chỉ đọc.

### Push và merge: chờ người dùng xác nhận trực tiếp với boss chính
- Người dùng nhắn boss phụ "Xong thì push và merge nhé", nhưng trước đó đã nói trực tiếp với boss chính "Hỏi tôi trước khi push hoặc merge" và "cấm push". Boss chính giữ lời nói trực tiếp, nên **chưa push, chưa merge**. Boss phụ cũng không làm thay.
- **Việc của người dùng khi về:** nhắn thẳng vào phiên boss chính câu "push và merge". Boss chính đã chuẩn bị sẵn (cây sạch, test và build đạt, danh sách sha).

**Chứng minh chỉ đọc:** app chính trước và sau khi duyệt đều là HEAD `56e9842`, nhánh `main`, `git stash list` rỗng, tag `before-T-002/002b/003` không đổi. Boss phụ không chạy Codex, không build, không mở app. `D:\agent-office\tools` chỉ có `nosyt-agent-office` ở `df6551d`, sạch, không liên quan T-002/T-003.

## ✅ Xong
- 12/11 17:45: mở Hermes Clip cho người dùng (Electron PID 34736, bản `adf48c9`; không có trình duyệt Muse hay Instagram nào tự bật). Tạo shortcut `C:\Users\ADMIN\Desktop\Hermes Clip.lnk` trỏ tới `START-HERMES-CLIP.cmd`: cửa sổ cmd chạy thu nhỏ, icon tạm của Electron vì app chưa có `.ico`.
- 12/11 khoảng 17:40, **push và merge** theo lời người dùng nói trực tiếp với boss chính:
  - **App:** `git push origin main` lên `ihaveabigcoke-a11y/hermes-clip`, `0e15716..adf48c9` (64 commit, gồm night T-001 `86ecdc0` tới T-002c). Fast-forward, không force. Không push tag hay nhánh phụ (`merge-night-20261111`, `codex/T-002-media-manual` vẫn chỉ ở máy). Trước khi push đã quét diff tìm key/token: không có.
  - **Văn phòng:** merge `claude/boss-phu-review-t002-t003-b4fdf6` (11 commit: `.claude/agents/boss-phu.md`, mục "Hai boss song song" trong CLAUDE.md, STATUS) vào `main`, không xung đột. Rồi push `main` văn phòng.
- 12/11 khoảng 17:05: boss phụ sửa so khớp CTA quá lỏng ở T-004 ("pink" khớp LINK), commit `d1b57b1`, tag lùi `before-T-004-cta` = `3e653a0`. Boss chính đã kiểm: 2 file, ngoài khoá. **Người dùng quyết:**
  - giữ `requireFollow` mặc định true. Vì app chỉ poll comment, **DM sẽ không gửi** cho tới khi có cách kiểm follow (webhook hoặc API messaging), hoặc người dùng tự bỏ tick ở từng quy tắc;
  - CÓ xét lại comment `follow_unknown` khi đổi quy tắc (trong 7 ngày, tối đa 1 DM mỗi comment). Phần này đưa vào T-002c vòng 2. (Boss phụ từng ghi "không xét lại", nhưng đã xác nhận đó là tự suy ra, không phải lời người dùng; đã sửa.)
- 12/11: pull luật mới (sửa thẳng trên app, kèm tag lùi lại). Chép 3 skill Hermes bản mới (có *Office mode*) vào app chính, commit `2661a5a`. Repo app có danh tính git local, chép từ clone night.
- 12/11: sửa `C:\Users\ADMIN\.claude\settings.json`: thêm dấu phẩy thiếu ở dòng 8, bản sao lưu là `settings.json.bak-20261112`. Cài FFmpeg 9.0.2 bằng winget.
- 12/11: app chính `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` giờ là repo git (remote `hermes-clip`), đang ở `86ecdc0`. Các thư mục cục bộ (backup, `local-dist`, `.integrations`, `tools`) vẫn giữ nguyên và được git bỏ qua (ignored).
- Ghi chú cho boss sau: lệnh build đúng là `pnpm local:build` (`pnpm build` lỗi vì repo không có `scripts/run-framework.mjs`). Các test cần `ffmpeg` trong PATH.
- 12/11: thêm NosytLabs (ghim `df6551d`) làm màn hình theo dõi, kèm script `scripts/START-OFFICE.ps1`.
- 12/11: chọn Agent Office (AgentSystemLabs) và ghim `v0.1.211`. Đã cài trên máy người dùng: thư mục dự án `D:\agent-office`, `gh` đã đăng nhập.

## T-019 — hoàn tất
- Commit 3b4d68b; 745 đạt/1 skip/0 lỗi, typecheck đạt. 4 ảnh outputs/T-019-ui; review Đạt. Nhả khóa, tiếp T-020; build sau T-019/T-020.


## T-020 — hoàn tất
- 758 đạt/1 skip/0 lỗi, typecheck; 4 ảnh outputs/T-020-ui; review Đạt. SHA theo git log T-020. Nhả khóa, build sau T-019/T-020.

- T-020 SHA 47bb61a; local:build đạt 05:22, cây sạch/app tắt. T-021 bắt đầu.

## T-021 — hoàn tất
- 758 đạt/1 skip/0 lỗi, typecheck; 13 link, 2 PNG outputs/T-021-ui; review Đạt. Tiếp T-022 review tổng và build cuối.


## T-022 — build đạt, kiểm bổ sung theo brief
- HEAD f374593; 760 pass/1 skip/0 fail, typecheck; local:build exit 0 lúc 05:29:56 +07, cây sạch/app tắt. Tiếp 3 mục bổ sung người dùng giao: test rủi ro, nhãn/trống, khả năng truy cập; không tính năng mới.

- T-022a test rủi ro xong: 764 pass/1 skip/0 fail; lỗi trùng ISO offset đã sửa. Tiếp kiểm nhãn/trống.

- T-022b **c5958fd**: 7 màn trống, 14 PNG, null/nhãn/nút thiếu đầu vào đạt; full suite 764 pass/1 skip/0 fail, typecheck. REVIEW-T-022b.md. Nhả khóa, build sau T-022a/b rồi kiểm khả năng truy cập.


- T-022c **8ec2aa5**: sửa vùng cuộn/role danh sách lỗi; axe 6 trạng thái/0 violation, 18 focus, 8 PNG; 764 pass/1 skip/0 fail, typecheck. Chưa NVDA; chi tiết REVIEW-T-022c.md. Nhả khóa và chốt báo cáo/build cuối.


## T-026j — hoàn tất kiểm local ngày 14/11/2026
- Văn phòng: mốc báo cáo `6dfd8d6db33b7c95af771720e8339c61f4da7b88` đã push origin/main và đối chiếu remote; bản ghi biên nhận này được commit/push tiếp cùng nhánh. Không đưa WIP cũ vào commit.
- Code `7b8fd40` sửa tràn 200% và chọn đúng hook; `22e66a4` thêm màu hệ thống cho tương phản cao, sửa script chụp và báo cáo. Cả hai đã push app origin/main, không force/merge; tag `before-T-026j` = `8142ff3`.
- Full suite cuối: `outputs/T-026j-release-verified-suite.json`, 267 domain + 29 API + 491 desktop = 787/0/0; typecheck đạt. Log cấu hình công cụ sai được giữ riêng, đã chạy desktop lại bằng executable Agent Reach đúng; không hạ assertion. `outputs/T-026j-release-build.json`: build trên cây sạch/Electron tắt, 00:40:20 +07.
- Launcher `outputs/T-026j-release-launcher.json`: Electron thật, 14 ảnh/bảy màn, mặc định Tín hiệu, Muse Tạm dừng, 0 lỗi/request ngoài, đóng êm. Workspace QA riêng; không AppData/profile thật.
- 28 ảnh thường rỗng/đầy: `outputs/T-026i-{empty,full}-ui`; 14 ảnh 200%: `outputs/T-026j-full-ui`; 28 ảnh tương phản: `outputs/T-026j-contrast-{empty,full}-ui`; 4 ảnh đổi hook: `outputs/T-026j-flow-ui`. Mọi ảnh có hai khổ 1366/1920. 28 axe/0 violation; incomplete còn color-contrast vùng ảnh/video và video-caption, không chứng nhận WCAG/NVDA.
- Đổi hook tạo ba MP4 mới giữ các đoạn thân và bản xuất cũ; kiểm hash/tên khi tải, clipboard caption/UTM và records không đổi. `outputs/T-026j-flow-media/refresh-proof.json`; Muse giả, OpenMontage local thật.
- Review đã thấy ảnh contrast cũ không đúng màu dù emulation báo đúng. Bằng chứng cuối dùng Chrome process riêng với `--force-high-contrast`, không đổi Windows. Ảnh contrast cũ trong T-026j-full-ui giữ lịch sử, không dùng nghiệm thu.
- Hai ngưỡng giữ null, không có việc chờ người dùng chốt. Các giới hạn dịch vụ/dữ liệu thật và NVDA giữ nguyên. Nhả riêng khóa codex-T-026j; giữ khóa khác và WIP văn phòng có từ trước. Review/đề: REVIEW-T-026j.md, tasks/T-026j-khep-kiem-tra-local.md.
