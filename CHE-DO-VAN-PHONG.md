# Chế độ văn phòng và phân model (13/11/2026)

Người dùng chốt: Claude làm boss khi còn token, nhưng **tiết kiệm**. Việc nhẹ giao model nhẹ, việc khó mới dùng Opus. **Code chủ yếu do Codex làm.** Khi Claude hết token, Codex làm boss.

## Công tắc
Dòng đầu mục "Trạng thái hiện hành" trong `STATUS.md` ghi chế độ đang dùng:
- `Chế độ: CLAUDE-BOSS` — Claude Code là boss, Codex là worker.
- `Chế độ: CODEX-BOSS` — một main agent Codex, theo `HANDOVER.md` và luật hiện có trong `AGENTS.md`.

Chỉ **người dùng** đổi chế độ, hoặc boss Claude đổi theo lời người dùng nói trực tiếp. Không có dòng này thì coi là `CODEX-BOSS`, vì luật đó an toàn hơn.

## CLAUDE-BOSS: ai làm gì

| Việc | Ai | Model | Ghi chú |
|---|---|---|---|
| Nói chuyện với người dùng, chia việc, chốt kết luận | Boss (phiên chính) | **Sonnet 5.5** (mặc định trong `.claude/settings.json`) | Không tự đọc diff dài, không tự viết code app |
| Đọc STATUS, `git log/status`, khoá file, tìm file/hàm, tóm tắt log test, điền bảng STATUS | `trinh-sat` | **Haiku 5.5** | Chỉ đọc, trả về tóm tắt ≤ 15 dòng kèm đường dẫn |
| Viết code, sửa lỗi, viết test, chạy test trong app | **Codex worker** (`codex exec`, effort high) | GPT/Codex | Mỗi lúc **một** Codex trên app. Nhận **toàn văn** đề bài |
| Duyệt diff theo *Tiêu chí đạt*, chạy test riêng, soi ảnh 1366/1920, sửa lỗi nhỏ ≤ 30 phút | `boss-phu` | **Sonnet 5.5** | Lỗi lớn thì viết prompt Codex dán sẵn |
| Hợp đồng dữ liệu/schema, rủi ro mất dữ liệu, cùng một lỗi lặp **2 lần**, quyết định trước khi merge, đánh đổi kinh doanh mơ hồ | `co-van` | **Opus 5.5** | Chỉ khuyên, **không viết code**. Tối đa **2 lần mỗi việc** |
| Tạo media (Flow/Gemini/Grok) | Người dùng làm tay | — | Boss chỉ soạn gói prompt |

**Không dùng Fable/Mythos** cho văn phòng: đắt, và không việc nào cần tới.

## Mẹo tiết kiệm token (bắt buộc)
1. Boss không mở file dài. Giao `trinh-sat` đọc, nhận lại tóm tắt và số dòng.
2. Giao việc bằng **đường dẫn file đề bài + tiêu chí**, không dán lại bối cảnh dài mà đề đã có. Riêng Codex là ngoại lệ: Codex nhận toàn văn đề vì nó không thấy file chưa push.
3. Log test chỉ lấy phần tóm tắt (`# pass/# fail`, lỗi đầu tiên). Không dán cả log.
4. Ảnh chụp: chỉ `boss-phu` xem. Boss nhận kết luận bằng chữ.
5. Gọi `co-van` một lần, kèm câu hỏi đóng ("A hay B, vì sao") và đường dẫn bằng chứng. Không gửi cả lịch sử hội thoại.
6. Việc chỉ sửa tài liệu hoặc STATUS: boss làm luôn, không gọi ai.

## Vòng một việc (CLAUDE-BOSS)
1. `trinh-sat`: kiểm trạng thái app, khoá file, WIP, việc trùng → tóm tắt.
2. Boss viết `tasks/T-xxx-*.md` theo `_TEMPLATE.md`. Nếu đụng hợp đồng hoặc schema thì hỏi `co-van` **trước** khi giao.
3. Boss giao Codex theo các bước trong `AGENTS.md` (tag, khoá, toàn văn đề, test, commit theo path).
4. `boss-phu`: duyệt diff, chạy test riêng, chụp ảnh. Đạt thì báo; chưa đạt thì gửi Codex danh sách lỗi.
5. Cùng một lỗi lặp lần 2 → `co-van`.
6. Boss chạy full suite + `pnpm local:build` (cây sạch, app tắt), rồi giao `trinh-sat` ghi STATUS. Boss báo người dùng ≤ 8 dòng.

## CODEX-BOSS
Giữ nguyên `HANDOVER.md` và luật một main agent trong `AGENTS.md`: không spawn, không gọi Codex thứ hai. Khi chuyển từ CLAUDE-BOSS sang, boss Claude phải để lại cây sạch, nhả khoá và ghi checkpoint trong STATUS.

## Ước lượng phân bổ (để soát mức dùng)
Một việc code vừa (ví dụ T-010): khoảng 3 lượt Haiku, 1–2 lượt Sonnet duyệt, 0–1 lượt Opus. Phần còn lại do Codex làm. Nếu thấy boss Sonnet tự đọc trên 300 dòng code trong một việc, tức là đang làm sai vai.
