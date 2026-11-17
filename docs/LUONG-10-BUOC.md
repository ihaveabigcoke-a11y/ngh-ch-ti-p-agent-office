# CLAUDE.md — Hermes Clip: bối cảnh, bài học và việc tiếp theo

Viết ngày 16/11/2026 từ cuộc trò chuyện với Claude trên claude.ai (project "Hermes Clip"). File này dành cho Claude Code chạy trên máy Windows của người dùng. Đọc hết trước khi làm. Trả lời người dùng bằng tiếng Việt.

---

## 1. Dự án là gì

Hermes Clip dùng để **test sản phẩm dropship cho thị trường Mỹ bằng video AI ngắn trên Instagram**.

- Mỗi đợt: research tối đa 10 ứng viên, người dùng chọn 3 và tự xếp hạng 1–3 theo ba tiêu chí: nỗi đau của khách, khả năng chứng minh công dụng bằng hình, lãi (vốn + ship về Mỹ ≤ 20 USD, giá bán khoảng ×3–4). Làm **một** sản phẩm trước.
- Với sản phẩm đó: **một thân video + ba hook**. Giữ nguyên giá, CTA và trang bán trong một lượt so sánh.
- Ghi mọi thứ theo dòng `sản phẩm × khung × hook × tài khoản × bài đăng`.
- **Chỉ tăng sản lượng khi đã có tín hiệu mua thật.**

Người dùng **chưa từng làm dropship tay**. Đây là điều quan trọng nhất cần nhớ.

## 2. Vì sao workflow cũ hỏng (đánh giá ngày 16/11)

Repo `ihaveabigcoke-a11y/ngh-ch-ti-p-agent-office` (văn phòng agent) và app Hermes Clip đã chạy 13–16/11:

| Đã làm | Kết quả kinh doanh |
|---|---|
| ~69 đề bài, 67 file review, 117 script `tmp-*` | 0 video đã đăng |
| 974 test đạt, nhiều lần build | 0 lượt xem, 0 comment, 0 đơn |
| 21 màn hình (9 chính + 12 "nâng cao") | 0 sản phẩm đã test với khách thật |

- **Muse (Meta) bị khoá tạo video theo khu vực**, Muse tự nói là hạn chế lâu dài (T-058). Phần lớn độ phức tạp của app (receipt, đối soát, chặn trùng SHA, timeout, công tắc hồ sơ) chỉ để trông chừng Muse.
- Màn Video vẫn dùng khung cũ 4 cảnh × 3–4 giây, chữ đè trống, trong khi video bán tốt có khoảng 10 shot × 1,5 giây và chữ đè gánh toàn bộ nội dung.
- Repo văn phòng đang **public** và có đường dẫn máy, tên hồ sơ Muse, chuyện VPN → nên chuyển sang private.
- Gốc rễ: tự động hoá một quy trình chưa ai làm tay lần nào; xây trên một nền tảng không thuộc về mình; bộ máy boss/worker/review chứng minh code đúng chứ không chứng minh có người mua; đo nhầm thứ.

**Quyết định:** đóng băng phát triển Hermes. Không giao đề bài mới cho Codex. Chạy thật một vòng trước, rồi mới tự động hoá đúng bước làm mệt nhất.

## 3. Quy tắc làm việc

1. **Không tự động hoá bước nào chưa làm tay ít nhất 20–30 lần.**
2. **Mỗi video một mục đích:** kéo người xem *hoặc* chốt đơn *hoặc* tạo tin cậy.
3. **Đo bốn số trước tiên:** % người xem ở Mỹ, comment có từ khoá, lượt bấm link, đơn. Lượt xem không phải doanh thu.
4. Số chưa biết là `null`, không bao giờ là 0. Tách rõ **đã kiểm / chưa kiểm** trong mọi báo cáo.
5. Không dựng lời chứng thực giả, "nhà sáng lập" giả, chấn thương hay va chạm thật ("suýt" thì được). Hiệu ứng cách điệu chỉ khi sản phẩm thật có chức năng đó. Cảnh sát chỉ là nhân vật phản ứng, không ngụ ý chứng nhận. Gắn nhãn AI hay không là người dùng chọn lúc đăng; không ghi yêu cầu "nhãn AI" vào kịch bản.
6. Không điều khiển nhiều hồ sơ Muse/Meta AI bằng trình duyệt tự động. Không đụng cookie, token, mật khẩu của người dùng.

## 4. Luồng 10 bước

Bảng trắng: https://claude.ai/artifact/649ZGJdP3Y6RxfZxMct9Qv

| # | Bước | Ai làm | Ghi chú |
|---|---|---|---|
| 1 | Săn sản phẩm: ≤10 ứng viên với lãi, mùa vụ (Google Trends Mỹ), quảng cáo đối thủ chạy lâu (Meta Ad Library), và **8 câu về content** (mục 5) | Claude / Muse | |
| 2 | Chọn 3, xếp hạng 1–3, lấy 1 | Người dùng | |
| 3 | **Chọn khung content:** gợi ý 3 khung + 2 dự phòng từ thư viện | Claude gợi ý, người dùng chọn thân + 3 hook | |
| 4 | Kịch bản theo khung: shot 1–2 giây, chữ đè có mốc giây, checklist quay Mỹ, gói prompt | Claude soạn, người dùng duyệt (tiếng Anh) | |
| 5 | Tạo clip | Meosu (MeosuQTshop) | Muse bị khoá vùng |
| 6 | Nhận clip, kiểm file | Claude | |
| 7 | Chọn đoạn, ghép, đè chữ → 3 MP4 chung thân, khác hook | Claude (FFmpeg) hoặc người dùng (CapCut) | **Chưa chốt** |
| 8 | Đăng Instagram | Người dùng, đăng tay | Nuôi tài khoản 3–7 ngày trước; khoảng 3 video/ngày |
| 9 | Ghi số sau 48 giờ: % Mỹ, comment từ khoá, click, đơn | Người dùng gửi, Claude ghi | Một bảng tính là đủ |
| 10 | Quyết định: bỏ (↻ bước 1), đổi hook/khung (↻ bước 3), có tín hiệu mua → mở khung chốt đơn, tăng sản lượng. Ghi khung thắng/thua vào thư viện | Người dùng chốt | |

## 5. Thư viện khung content

Bản đầy đủ: https://claude.ai/artifact/8Ch9ZJhFGWyGByW57fhZDZ (35 khung).

**Nhịp chung (đo từ 15 video đã reverse):** 10–19 giây (TB 14), không lời thoại, 8–12 shot × 1–2 giây, 35–41 cắt/phút. Hook 0–4s → "VS…" mở hộp/lắp đặt 4–8s → kết quả 8s–hết → CTA từ khoá đè lên 4–6 giây cuối. Chữ đè trắng viền đen, giữa trên, 1–4 từ + emoji, đổi theo phần chứ không theo shot. Từ khoá CTA là từ định danh tệp khách (BIKE, RUN, PAWS, GLOW), không phải "LINK".

**Nhóm A, đã có mẫu reverse:**
- A1 Problem → VS → Solution (RuffDry, LumaWalk, LazrWeb)
- A2 Problem → tour tính năng (Niightraa)
- A3 Bản tự chế dở → VS → Result (Heelit, TailWard, Starlit Set)
- A4 "What people think we sell" vs "What we actually sell" (WingGlow, 3M like)
- A5 USP ngay khung đầu + gọi đúng tệp (DryLid)
- A6 "DO NOT show this to a ___" (NeonBlink, 3M like)
- A7 Cảnh sát chặn xe (RideHold, CycleFreaks)
- A8 "POV: you send this to your ___" (CycleFreaks)
- A9 Câu chuyện 5 thẻ chữ (đồng hồ SOS; đánh dấu `dramatization: true`)

**Nhóm B, chưa có mẫu (cần reverse trước khi dùng):** trả lời bình luận, 3 lý do, chia đôi màn hình, test hành hạ, ASMR, "TikTok made me buy it", mở hộp, tặng quà, tiểu phẩm, chèn vào thói quen, "wait for it", "stop doing X", kỳ vọng vs thực tế, trước/sau, góc nhìn thú cưng, phỏng vấn đường phố, giải thích thiết kế, "thư tình" chữ dài, bắt trend, hướng dẫn 3 bước, neo giá, thử 7 ngày, xếp hạng, trả lời băn khoăn, tổng hợp thất bại, phản ứng video viral. Thêm từ buổi live: **"món quà hoàn hảo cho ___, giấu đi"** và **founder tự làm UGC**.

**8 câu research phải trả lời → khung gợi ý:**

| Câu hỏi | Nếu có |
|---|---|
| Kết quả là cảnh tượng nhìn thấy (phát sáng, ban đêm, biến đổi lớn)? | A3, A4, B11 |
| Dễ hình dung bản tự chế dở, buồn cười? | A3, A4 |
| Giải nỗi đau / nguy hiểm quay được trong 1 giây? | A1, A7 |
| Bán cho cộng đồng đam mê (xe, chạy bộ, thú cưng, tennis)? | A6, A8 |
| Công dụng thấy ngay khi đang dùng (làm đẹp, cá nhân)? | A5, B3, B14 |
| Nhiều tính năng nhỏ, không có cảnh tượng? | A2, B2, B20 |
| Người mua khác người dùng (quà, người già, trẻ em)? | A9, B8, "quà, giấu đi" |
| Khách hay nghi công dụng / độ bền / cách lắp? | B1, B4, B24 (khung chốt đơn) |

Kênh mới chỉ gợi ý khung kéo người xem; khung chốt đơn mở khi kênh đã có người theo. Khung dễ kéo người xem toàn cầu (A3, đồ hài) phải kiểm % người xem Mỹ.

## 6. Bài học từ buổi live 3 tiếng của Hiếu (Viral Builder)

Nguồn: Facebook live `39846094768339413`, 3 giờ 4 phút. Người nói bán khoá học "Viral Builder" (~1.700 USD/năm), nên các con số doanh thu chỉ để tham khảo.

- **Viral chỉ là 500 m đầu của quãng đường 10 km.** Video hài trăm triệu view thường kéo người xem ở nước thu nhập thấp. Big Ol' Feet triệu view nhưng store chỉ 1–3 nghìn lượt vào/tháng. Mỗi video chỉ cần vài nghìn đến vài trăm nghìn view **đúng tệp**.
- **Bối cảnh quyết định ai xem:** phòng kiểu Mỹ (thảm, cửa sổ, sàn gỗ, giường Mỹ), đạo cụ có tín hiệu (Tesla), màu và ánh sáng sạch; màu "kiểu Việt Nam, Trung Quốc" trông bẩn. Mở bình luận để kiểm người xem từ đâu.
- **Video chốt đơn = mỗi video gỡ một rào cản** (dễ dùng? hiệu quả? so với rẻ/đắt? bảo hành?), chỉ làm khi kênh đã có người theo.
- **Tay nghề:** đổi góc liên tục (rộng, trung, cận, POV), chuyển động máy, stop-motion, quay qua gương, ống macro, cắt khớp nhạc; một thao tác là hiểu công dụng; không giới thiệu dài. Khoảng 3 video/ngày/kênh.
- **Sản phẩm:** hàng bán tốt khá bình thường, chỉ cần một điểm khác; đi từ sản phẩm → nỗi đau → chân dung khách → content; xem mùa vụ (massage chân mạnh nhất tháng 11–12); điểm yếu đối thủ thành điểm bán; đặt tên theo thương hiệu, không theo tính năng.
- **AI:** chê "AI slop" (hình xấu), không chê công cụ. Store làm toàn AI (dreamsnug) vẫn được khen vì sản phẩm và khuôn đúng. Khi có đơn, thêm một video quay thật hướng dẫn dùng. Doanh nghiệp lớn thì thuê mẫu hoặc tặng sản phẩm cho creator UGC.
- **Store:** vài chục review ngắn có ảnh thật, xen 3–4 sao; ghi đúng thời gian giao (kho Trung Quốc không giao được 5–8 ngày làm việc); mỗi store một ngách; một nước (Mỹ, có thể thêm Canada), chặn nước xa.
- **Instagram:** tài khoản mới lướt như người thường 3–7 ngày rồi mới đăng; đăng Instagram và Facebook cùng lúc.

**Kênh/store được chấm trong buổi live (mốc giờ):** sakkshamx (0:14, hình mẫu organic), Relivo (0:15, store học viên: ảnh AI, ghi ship sai), Therabody (0:26, mẫu store), Meta Ad Library + Google Trends (0:30), Hanger Pro (0:47, chăm nhưng sai chiến lược), kwasi.ph (0:52), ESSPUR (1:19), **wearheelit** (1:24, đối thủ của mình: nên bán combo đồ chạy bộ, review trông AI), kênh hoodie cậu bé 14 tuổi (1:28), ShilaSource (1:35), Upcycle X (1:52), Divoom (1:56), 4mytu (2:08), slopeguard (2:10), **welliawell.hello** (2:16, danh sách lỗi: quay khách sạn, giới thiệu dài, bấm 3 nút, màu bẩn, đăng thưa), **dreamsnug.store** (2:24, AI nhưng đúng khuôn), Big Ol' Feet (2:38), Valora Jewelry (2:59).

Tài liệu có ảnh: https://claude.ai/artifact/5VMiadfgaMwP7i9qn56Jj7

## 7. Việc đầu tiên cho Claude trên máy này: học các buổi live của Viral Builder

Trang: https://www.facebook.com/viralbuilder. Máy này vào được Facebook; workspace cloud của Claude thì không.

**Phạm vi:** bắt đầu với 3–5 buổi live mới nhất hoặc có tiêu đề về content / chọn sản phẩm. Hỏi người dùng trước khi tải hết.

**Bước làm** (PowerShell; cần Python 3.10+ và ffmpeg trong PATH):

```powershell
# 0. Công cụ. Agent Reach nếu đã cài thì dùng; lõi tải video của nó là yt-dlp.
python -m pip install -U yt-dlp sherpa-onnx numpy

# 1. Liệt kê video của trang (CHƯA KIỂM; nếu trang cần đăng nhập, thêm --cookies-from-browser chrome,
#    không đọc hay chép cookie ra ngoài)
yt-dlp --flat-playlist --print "%(id)s|%(title)s|%(duration)s|%(upload_date)s" "https://www.facebook.com/viralbuilder/videos"

# 2. Tải một buổi, bản 360p là đủ
yt-dlp -f "bv*[height<=360]+ba/b[height<=360]" -o "lives/%(id)s.%(ext)s" "https://www.facebook.com/watch/live/?v=<ID>"

# 3. Tách tiếng 16 kHz mono cho nhận dạng giọng nói
ffmpeg -y -i lives/<ID>.mp4 -vn -ac 1 -ar 16000 -c:a pcm_s16le lives/<ID>.wav

# 4. Bộ ảnh tổng hợp: lấy khung mỗi lần đổi cảnh, ít nhất 45 giây một khung, có mốc giờ, ghép 4x4
ffmpeg -y -skip_frame nokey -i lives/<ID>.mp4 -an -vf "select='gt(scene,0.3)+gte(t-prev_selected_t,45)+eq(n,0)',drawtext=fontfile=C\\:/Windows/Fonts/arialbd.ttf:text='%{pts\:hms}':x=8:y=8:fontsize=28:fontcolor=yellow:box=1:boxcolor=black@0.7,scale=480:-2,tile=4x4:padding=4" -fps_mode passthrough -q:v 3 lives/<ID>_sb_%03d.jpg
```

**Nhận dạng giọng nói tiếng Việt** bằng sherpa-onnx (chạy trên CPU, khoảng 4–5 phút cho 3 tiếng). Model: tải và giải nén `sherpa-onnx-zipformer-vi-int8-2025-04-20.tar.bz2` và `silero_vad.onnx` từ GitHub releases `k2-fsa/sherpa-onnx` (thẻ `asr-models`). Script `asr.py`:

```python
import sys, wave, time, numpy as np, sherpa_onnx
M = "models/sherpa-onnx-zipformer-vi-int8-2025-04-20/"
rec = sherpa_onnx.OfflineRecognizer.from_transducer(
    encoder=M+"encoder-epoch-12-avg-8.int8.onnx", decoder=M+"decoder-epoch-12-avg-8.onnx",
    joiner=M+"joiner-epoch-12-avg-8.int8.onnx", tokens=M+"tokens.txt", num_threads=4)
cfg = sherpa_onnx.VadModelConfig(); cfg.silero_vad.model = "models/silero_vad.onnx"
cfg.silero_vad.min_silence_duration = 0.4; cfg.silero_vad.max_speech_duration = 20; cfg.sample_rate = 16000
vad = sherpa_onnx.VoiceActivityDetector(cfg, buffer_size_in_seconds=60)
w = wave.open(sys.argv[1]); out = open(sys.argv[2], "w", encoding="utf-8")
def flush():
    while not vad.empty():
        seg = vad.front; s = rec.create_stream()
        s.accept_waveform(16000, np.array(seg.samples, dtype=np.float32)); rec.decode_stream(s)
        st = seg.start/16000; t = s.result.text.strip()
        if t: out.write(f"[{int(st//3600)}:{int(st%3600//60):02d}:{int(st%60):02d}] {t.lower()}\n")
        vad.pop()
while True:
    b = w.readframes(512*200)
    if not b: break
    a = np.frombuffer(b, dtype=np.int16).astype(np.float32)/32768
    for i in range(0, len(a), 512): vad.accept_waveform(a[i:i+512])
    flush()
vad.flush(); flush()
```

Chạy: `python asr.py lives/<ID>.wav lives/<ID>.txt`. Từ tiếng Anh hay bị nghe sai: "orandex" = organic, "vb" = Viral Builder, "un/ug" = UGC, "thu wan" = TOFU, "rach" = reach, "seo" = sale.

**Đầu ra mỗi buổi** (`lives/<ID>-bai-hoc.md`):
1. Bài học mới, chưa có ở mục 6. Không chép lại bài học cũ.
2. Bảng kênh/store/video được chấm: mốc giờ · tên · là gì · khen/chê gì · áp vào bước nào của luồng 10 bước.
3. Khung content mới (nếu có) theo dạng nhóm A/B ở mục 5.
4. Câu hỏi học viên hay hỏi và câu trả lời.

Sau 3–5 buổi, viết `lives/TONG-HOP.md`: bài học lặp lại nhiều buổi (mạnh nhất), chỗ các buổi mâu thuẫn, và đề xuất sửa luồng 10 bước hoặc thư viện khung. **Không tự sửa luồng; đề xuất để người dùng chốt.**

## 8. Việc song song

- Người dùng nuôi một tài khoản Instagram 3–7 ngày trong ngách định làm.
- Chốt ngách. Gợi ý: ngách đã quen qua 12 video đối thủ (đồ phát sáng cho chó, đồ chạy bộ ban đêm), hoặc ngách người dùng chọn.
- Chốt bước 7: Claude ghép bằng FFmpeg hay người dùng làm trong CapCut.
- Khi có ngách: chạy bước 1 (10 ứng viên + 8 câu content).

## 9. Công cụ đã dùng

- **rea-video** (reverse video ngắn): `pip install "rea-video[ocr] @ git+https://github.com/JuneYaooo/rea-video"`, cần ffmpeg; lệnh `rea-video decompose <mp4> --lang en`, rồi `review` / `apply-review` để Claude tự xem từng shot. App Hermes ghim commit `2f50ab3…`.
- **Reverse Reels trong Chrome** (khi không tải được MP4): seek video mỗi 0,1 giây, so khác biệt khung 24×42 px để tìm điểm cắt, ghép khung giữa mỗi shot thành tấm tổng hợp. Không có BPM, OCR hay prompt từng shot.
- **Meosu (MeosuQTshop):** app tạo video người dùng đang dùng thay Muse.
- Muse (Meta) có tính năng đăng lên Instagram, nhưng video bị khoá theo vùng với tài khoản hiện tại. Cần thử một lần với tài khoản Mỹ hợp lệ trước khi dựa vào.

## 10. Tài liệu liên quan (project "Hermes Clip" trên claude.ai)

`claude/livestream-dropship-organic-hieu-bai-hoc.md`, `claude/livestream-hieu-danh-sach-kenh-va-nhan-xet.md`, `claude/ig-12-video-doi-thu-15-11.md`, `claude/rea-video-12-mau-ket-qua.md`, `claude/phan-tich-12-video-v2-va-sua-khung-kich-ban.md`, `claude/cong-thuc-video-mau-va-brief-research.md`, `claude/meosu-tin-hieu-mcp-reverse.md`, `claude/CLAUDE-md-hermes-va-office-v1.md` (bản cũ, phần lớn đã bị thay bằng file này).
