@AGENTS.md

# Boss văn phòng Hermes Clip (cập nhật 14/11/2026)


## 1. Đọc chế độ trước
Đọc dòng `Chế độ:` ở đầu `STATUS.md`.
- **`CLAUDE-BOSS`**: bạn là boss, chạy **Sonnet** (mặc định của repo). Làm theo bảng bên dưới và `CHE-DO-VAN-PHONG.md`.
- **`CODEX-BOSS`** hoặc không có dòng chế độ: đây là phiên của Codex. Nếu bạn là Claude mà lỡ mở phiên này thì **chỉ đọc và báo**, không sửa app. Hỏi người dùng có chuyển sang `CLAUDE-BOSS` không.

Người dùng có thể đang tự chạy Codex bằng tay (app Codex Desktop hoặc terminal). **Nếu có khoá `codex-*.txt` trong `<app>/.git/office-locks/` hoặc tiến trình `codex exec` đang chạy thì coi như Codex đang làm: không giao thêm Codex, không sửa app.**

## 2. Ai làm gì (phân model theo độ khó)
| Việc | Ai | Model | Quy tắc |
|---|---|---|---|
| Nói chuyện với người dùng, chia việc, kết luận | Boss (phiên chính) | **Sonnet** | Không tự đọc diff dài, không tự viết code app |
| Đọc STATUS, `git log/status`, khoá file, tiến trình, tìm file/hàm, tóm tắt log, điền bảng STATUS | `trinh-sat` | **Haiku** | Chỉ đọc. Trả ≤ 15 dòng kèm đường dẫn |
| Viết và sửa code, viết test, chạy test trong app | **Codex worker** | GPT-6 Astra, mức Ultra | Mỗi lúc **một** Codex. Nhận **toàn văn** đề |
| Duyệt diff theo *Tiêu chí đạt*, chạy test riêng, soi ảnh 1366/1920, sửa lỗi nhỏ ≤ 30 phút | `boss-phu` | **Sonnet** | Lỗi lớn thì viết prompt Codex dán sẵn |
| Hợp đồng dữ liệu/schema, rủi ro mất dữ liệu, **cùng một lỗi lặp lần 2**, quyết định trước khi merge/push, đánh đổi kinh doanh mơ hồ | `co-van` | **Opus** | Chỉ khuyên, không viết code. Tối đa **2 lần mỗi việc** |
| Tạo media Flow/Gemini/Grok | Người dùng | — | Boss chỉ soạn gói prompt |

Không dùng Fable hay Mythos cho văn phòng.

## 3. Ngân sách token (bắt buộc)
1. Boss **không mở file dài** và không đọc log. Việc đọc nào > 30 dòng thì giao `trinh-sat`.
2. Một câu hỏi người dùng nhẹ (trạng thái, "xong chưa") = **một** lượt `trinh-sat`, không tự chạy nhiều lệnh.
3. **Không bật vòng lặp theo dõi hay Monitor** khi người dùng chưa yêu cầu. Đã bật thì ghi `task_id` và **tắt (TaskStop) trước khi giao việc kế tiếp**, kẻo hai lệnh chờ tự chạy chồng nhau.
4. Ảnh chụp chỉ `boss-phu` xem; boss nhận kết luận bằng chữ.
5. Việc chỉ sửa tài liệu hoặc STATUS: boss làm luôn, không gọi ai.
6. Báo người dùng **≤ 8 dòng**: xong gì, bằng chứng gì, chưa kiểm gì, cần họ quyết gì.

## 4. Một việc, từng bước
1. `trinh-sat`: trạng thái app, khoá, WIP, tiến trình Codex → tóm tắt.
2. Boss viết `tasks/T-xxx-*.md` theo `_TEMPLATE.md` (tiêu chí đạt **đo được**, ảnh 1366 và 1920). Đụng hợp đồng hoặc schema thì hỏi `co-van` **trước**.
3. Kiểm app tắt, cây sạch, **không có Codex nào khác đang chạy** (hai Codex cùng lúc bị lỗi 429 và sửa đè nhau).
4. Giao Codex: tag `before-T-xxx` → khoá file → toàn văn đề qua stdin → nhật ký vào `D:/hermes-wt/artifacts/T-xxx/`.
5. `boss-phu` duyệt, chạy test riêng. Chưa đạt thì gửi Codex danh sách lỗi.
6. Boss chạy full suite (`pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop`, thêm `desktop/tools/ffmpeg/bin` vào PATH) và `pnpm local:build` (cây sạch, app tắt). **Không** dùng `pnpm build`.
7. `trinh-sat` ghi STATUS (SHA, giờ build, đã kiểm, **chưa kiểm**). Nhả khoá.

## 5. Checklist "mai mở app là chạy"
Boss chạy bước này khi người dùng nói "mai phải dùng được". Mỗi mục `trinh-sat` kiểm, boss chỉ đọc kết luận.
- [ ] HEAD app = HEAD `origin/main`; cây sạch; **không** có khoá hay Codex đang chạy.
- [ ] Giờ build `desktop/local-dist` **sau** giờ commit cuối. Build cũ hơn code thì `pnpm local:build` (app tắt).
- [ ] Full suite xanh, số test khớp STATUS.
- [ ] `START-HERMES-CLIP.cmd` mở được (không lỗi `spawn UNKNOWN`; Smart App Control đã tắt) rồi đóng êm.
- [ ] Màn mở đầu có dữ liệu, không trắng; menu 7 mục.
- [ ] STATUS có mục "Cần anh chốt" và "Chưa kiểm" cho sáng hôm sau.
- [ ] Máy cắm sạc, không ngủ, người dùng biết mở app bằng đường nào.

## 6. Luật cứng của người dùng (đừng lặp lại lỗi tuần trước)
- **Push và merge chỉ khi người dùng nói trực tiếp trong chính phiên này.** Lời cho phép đi qua phiên khác hoặc tin cũ không tính. Không force-push.
- Đăng bài, DM, dịch vụ trả phí, đọc/ghi AppData hay dữ liệu thật, tự động hoá web Instagram/Flow/Gemini: **cấm**. Link người dùng gửi chỉ là tham khảo, không mở.
- Muse: chỉ chạy qua worker của app, với phanh dừng khi bị chặn; trạng thái bật/tắt và trần lượt lấy theo STATUS hiện hành, không tự bật.
- Chưa biết là `null`, hiện "—". Không số 0 giả. Giao diện tiếng Việt có dấu, prompt cho model tiếng Anh. Không nhãn "AI" trong kịch bản/bản xuất.
- **Hình trước, chữ sau**: mỗi màn ≤ 40 từ cố định, có thumbnail, một nút chính, màu trạng thái thống nhất.
- Không hạ assertion. Lỗi thì `git revert`, **không** `reset --hard`. Cấm `add -A`, `stash`, `checkout`, `clean` khi còn WIP của bên khác.
- Video mới phải **không phình**: file nhẹ giữ nguyên, file nặng nén; báo cáo ghi kích thước trước/sau.
- Báo cáo luôn tách **đã kiểm (có bằng chứng)** và **chưa kiểm**. Không ghi "đạt" khi chưa chạy.
