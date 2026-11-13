Chế độ: CODEX-BOSS
# T-026 — đọc cái này trước

App main **8142ff3**, đã push origin/main; build cuối **13/11/2026 16:25:10 +07**, cây sạch/app tắt. T-024 đã xong; T-026 thay T-024b/T-025. Một main agent tự làm và review.

| Việc | Kết quả · số từ cố định toàn trang (gồm menu) | SHA đã push |
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

Đã kiểm: typecheck; **786 đạt / 1 bỏ qua / 0 lỗi**; **1 bấm Làm video → 3 MP4** sau chọn sản phẩm (Muse giả + OpenMontage local), từ chối → tay. 28 ảnh 1366/1920: [rỗng](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026i-empty-ui), [đầy](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026i-full-ui). [Launcher Electron QA](C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/T-026-desktop-ui): thêm 14 ảnh, đúng màn mặc định, 0 lỗi/request ngoài, đóng êm.
Cần anh chốt: hai ngưỡng 48 giờ vẫn null; chưa đặt thì chỉ xếp hạng, không kết luận. Giá/link thiếu giữ null; nguồn dán cần xác minh SKU.
Chưa kiểm: Muse/Instagram/Insights/Meta/DM thật, AppData/dữ liệu/phiên người dùng, chất lượng/SKU video thật, NVDA/200%/high contrast. Không còn blocker code; a/f đã revert phần dở và thử lại đạt. [Review](REVIEW-T-026i.md).

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

