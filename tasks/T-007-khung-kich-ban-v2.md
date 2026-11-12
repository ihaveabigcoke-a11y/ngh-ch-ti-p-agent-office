# T-007: Khung kịch bản v2 — shot 1–2 giây, chữ đè có mốc, CTA đè cảnh kết quả

- **Repo:** hermes-clip, sửa thẳng trong app chính (tag `before-T-007`) · **Worker:** codex, effort high · **Ngày:** 12/11/2026

## Điều kiện trước khi chạy (boss chính kiểm)
- Làm **sau T-006**. Người dùng đã commit xong phần tự sửa (khoảng 31 file) hoặc nói rõ cho chạy; `git status --short` phải sạch. Không đụng file có WIP hay đang bị khoá trong `.git/office-locks/`.
- Đề viết khi đối chiếu bản `adf48c9`; app hiện ở `04732a4` trở lên (đã có T-005: tự tạo hồ sơ khi chọn 3 sản phẩm, nút Triển khai). Trước khi giao Codex, boss đọc lại các file nêu trong "Bối cảnh trong code" ở HEAD và sửa đường dẫn/tên hàm trong đề nếu đã đổi.
- Theo quy trình office: tắt app → `git tag before-T-007` → ghi khoá `codex-T-007.txt` → chạy Codex với **toàn văn đề** → boss phụ duyệt diff → full test → `pnpm local:build` khi app tắt → commit theo path → nhả khoá → ghi `STATUS.md` (đã kiểm / **chưa kiểm**).

## Mục tiêu
Kịch bản sinh ra từ công thức hiện nay nhạt: 4 cảnh × 8 giây, một góc máy tĩnh, prompt toàn câu cấm, kết quả "trung tính". 12 video mẫu (đều là video AI) đo bằng rea-video cho thấy: **41 cắt/phút, 1,5 giây/shot, ~10 shot/video, không lời thoại, chữ đè gánh nội dung, CTA đè lên cảnh kết quả.** Làm lại tầng sinh storyboard để prompt ra Flow/Veo/Grok đúng nhịp và đúng "ruột" của video mẫu. Số liệu cần dùng đã chép đủ vào đề này (mục "Số đo 12 mẫu" dưới). Gói phân tích đầy đủ `rea-video-12-mau.zip` người dùng giữ; boss hỏi đường dẫn nếu Codex cần xem.

## Số đo 12 mẫu (rea-video, cả 12 đều là video AI)
- 10–18 giây, trung bình **41 cắt/phút, 1,5 giây/shot, ~10 shot/video** (ít nhất 5, nhiều nhất 15). Không video nào có lời; nhạc 83–152 BPM, cắt theo nội dung, không theo beat.
- Chữ đè: trắng viền đen, cao 5–6% khung, giữa trên, 1–2 dòng, vào/ra cứng đúng lúc cắt, một nhãn giữ 3–8 giây, có emoji ("The idea 🤢", "Vs…", "The result 😍❤️", "The problem… 😳🚗").
- CTA đè lên cảnh kết quả ở 7/12 mẫu (ví dụ "Comment "bike" for the link!!!" 7,4–13,1s trên video 13,3s; "Comment "LED" if you want one" 11–16,7s trên 16,7s). 5/12 không có chữ CTA, để ở caption.
- Hộp sản phẩm luôn có tên: NIGHTRAZE, LumaWalk "Night Walk LED Kit", SENVIA "Smart SOS Bracelet".
- Dòng chuyện: hook (1–5 shot) → bằng chứng / mở hộp (3–5 shot) → kết quả (3–6 shot) → CTA đè. Riêng sản phẩm chức năng (vest chạy bộ): hook 3 shot → tour tính năng 11 shot, không có cảnh kết quả.

## Bối cảnh trong code
- `lib/lab/formula-storyboard.ts`: biến công thức thành bản nháp. **Đây là file cần sửa chính.** Các goal `problem/versus_unbox/result/cta`, `camera:'One steady close-up'`, cảnh CTA riêng, từ khoá mặc định `LINK`, prompt 6/8 dòng là cấm đoán.
- `lib/lab/viral-formulas.ts` + `viral-formulas.seed.json`: taxonomy v1 cố định, seed version 1. Nâng lên **version 2** của từng công thức (giữ v1 nguyên để so sánh), không đổi taxonomy v1; giá trị mới đề xuất qua trường mới optional.
- `lib/lab/production.ts`: `overlayTextSchema` (1 dòng, 60 ký tự), `ctaKeywordSchema`, `formulaDraftInputSchema`. Cảnh (`Scene`) hiện có `duration`, `overlayText`, `prompt`, `camera`, `voice`.
- UI: `components/lab/production-intelligence.tsx` (nút Mẫu kịch bản), `components/lab/viral-formulas.tsx` (khối Công thức video ở Nghiên cứu).

## Phạm vi
1. **Beat → nhiều shot.** Mỗi beat có `shots[]` 1–6 shot, mỗi shot 1,0–2,5 giây, có `camera` riêng (góc, cỡ cảnh, chuyển động), `subjects` (ai/con gì, mấy chủ thể, phản ứng của nhân vật phụ), `setting`. Tổng video 10–18 giây, **tối thiểu 8 shot**. Một shot = một cảnh (`Scene`) trong hàng đợi, nhưng nhóm theo beat để gửi nhà cung cấp theo "generation unit" (một lần tạo 8 giây có thể chứa 3–5 shot liền kề cùng bối cảnh, cắt sau bằng FFmpeg/OpenMontage).
2. **Chữ đè có mốc.** `overlay {text, emoji, fromSec, toSec, position:'top-center', lines:1|2}`. Nhãn đổi đúng lúc cắt cảnh. Giữ emoji trong `labelVariants` (ví dụ "The idea 🤢", "The result 😍❤️", "The problem… 😳🚗"). Trường `voice` mặc định rỗng và prompt không nhắc narration. Kiểu chữ ghi trong seed: trắng, viền đen, cao 5–6% khung, 1–2 dòng, vào/ra cứng.
3. **CTA đè cảnh kết quả, không phải cảnh riêng.** CTA là overlay của 4–6 giây cuối beat kết quả. `ctaKeyword` **bắt buộc người dùng nhập**, không có mặc định `LINK`; gợi ý từ định danh tệp khách (bike, run, PAWS, HELP…), không phải tên sản phẩm. Cho phép `ctaPlacement: 'overlay' | 'caption'` (5/12 mẫu để CTA ở caption).
4. **Hook là tình huống cụ thể.** Beat `problem` có `situation` bắt buộc: một cố gắng tự chế dở hoặc một tình huống suýt xảy ra, đọc được trong 1 giây (ví dụ điện thoại dán băng dính vào giày, vòng bìa đội đầu chó, chó chạy ra đường khi ô tô pha đèn tới). Đổi goal: "Show ONE specific failed DIY attempt or near-miss that reads in one second. Fictional. No injury, no blood, no collision shown."
5. **Kết quả theo `resultStyle`** (trường mới trong công thức v2): `spectacle` (sản phẩm phát sáng: đêm, góc rộng, 2–5 chủ thể, 3–6 góc, cho phép hiệu ứng ánh sáng cách điệu khi sản phẩm thật phát sáng), `subject_after` (thú cưng/người yên ổn, cận mặt), `feature_tour` (6–8 shot mỗi shot một tính năng, không cần beat kết quả), `story_cards` (5 thẻ chữ, có nhân vật thứ ba; **đánh dấu `dramatization: true` trong metadata**, không ngôi "my dad" thật). Đổi goal result: "Show the product's real function at maximum visual scale…", bỏ "neutral handling".
6. **Prompt tách hai phần.** `prompt` = mô tả hình (shot, góc, chủ thể, hành động, kết thúc, ánh sáng, bối cảnh Mỹ: cờ, xe, nhà ngoại ô, sân vận động — tuỳ chọn qua `usCues`). `constraints` = tối đa 3 dòng guardrail. Không trộn.
7. **Bao bì có tên.** Trước beat `versus_unbox`, bản nháp yêu cầu `packaging {brandName, boxText}`; thiếu thì cảnh mở hộp ghi "Chưa đặt tên bao bì" và chặn gửi.
8. **Seed v2** cho 6 công thức với `situationExamples[]`, `resultStyle`, `shots[]`, overlay có emoji, lấy số từ 12 mẫu (độ dài, số shot, mốc CTA). Giữ seed v1.

## Không làm
- Không đụng Muse, Instagram, research, hạn mức, dữ liệu người dùng, `data/`, `evidence/`.
- Không đổi taxonomy v1 (`formulaTaxonomy`), không xoá test cũ.
- **Không thêm bất cứ trường, cờ, nhãn, câu prompt hay bước nào về "nhãn AI" / "AI label" / "AI-generated" vào kịch bản, cảnh, gói xuất hay bao bì.** Việc gắn nhãn khi đăng là quyết định của người dùng ở bước đăng (đã có T09 riêng), không nằm trong kịch bản.
- Không dựng chấn thương, máu, va chạm thật; không lời chứng thực ngôi thứ nhất giả; không ngụ ý cơ quan nhà nước chứng nhận (cảnh sát chỉ là nhân vật phản ứng).

## Bố cục giao diện
- Màn **Tạo video → Mẫu kịch bản**: sau khi chọn công thức, hiện bảng shot: cột `#`, `Beat`, `Giây` (từ–đến), `Chữ đè`, `Góc máy`, `Chủ thể`, `Prompt` (thu gọn). Trên bảng: ô nhập **Từ khoá CTA** (bắt buộc), chọn **Vị trí CTA** (Đè cảnh / Caption), ô **Tên bao bì** và **Chữ trên hộp**, ô **Tình huống mở đầu** (bắt buộc, gợi ý từ `situationExamples`).
- Nhãn tiếng Việt có dấu. Giữ font và theme. Đẹp ở **1366 px** và **1920 px**, chụp cả hai.

## Tiêu chí đạt
- [ ] `formulaStoryboard()` với seed v2 trả ≥ 8 shot, mỗi shot 1,0–2,5 giây, tổng 10–18 giây.
- [ ] Beat kết quả có ≥ 3 shot; overlay CTA nằm trong khoảng thời gian của beat kết quả khi `ctaPlacement='overlay'`.
- [ ] Không có cảnh có `role='cta'` riêng trong bản nháp v2.
- [ ] Thiếu `ctaKeyword`, `situation` hoặc `packaging.brandName` thì bản nháp bị chặn với lỗi rõ ràng; không có mặc định `LINK`.
- [ ] Prompt mỗi shot: phần mô tả ≥ 60% số dòng, `constraints` ≤ 3 dòng; không chứa chuỗi "narration", "neutral handling", "AI label", "AI-generated".
- [ ] Seed v1 và v2 cùng parse; `workspaceFormulas` chọn v2 khi chưa có bản người dùng.
- [ ] Test mới cho các điểm trên; test cũ vẫn đạt.

## Cách kiểm
```
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build
```

## Báo cáo (worker điền vào mô tả PR)
- Đã thay đổi:
- Đã kiểm, kèm bằng chứng:
- Chưa kiểm hoặc còn rủi ro:
- Cách chạy thử:
