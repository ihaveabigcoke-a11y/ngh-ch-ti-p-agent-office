# T-009: Codex boss — một main agent và hoàn tất kiểm local còn thiếu

- Repo: hermes-clip + văn phòng local. Người giao: người dùng trực tiếp 13/11/2026. Thực hiện: một main agent Codex.
- Mục tiêu: tiếp quản CODEX-BOSS-PROMPT, đối chiếu trạng thái thật, xử lý job còn thiếu và hoàn tất kế hoạch boss dự phòng.

## Phạm vi

- Đọc lịch sử T-001–T-008; không làm lại job đã có bằng chứng. Kiểm lại regression hiện tại.
- Cài rea-video ghim revision vào venv riêng, nghiệm thu 1 MP4 snapshot bằng DB fixture; xuất/nhập review thật, giữ SHA-256 gốc.
- Sửa bootstrap thiếu rea path ở cấu hình cũ; giữ lựa chọn/receipt, cache model chung. Tự review theo skill.
- Cập nhật AGENTS, CLAUDE, HANDOVER, STATUS, prompt bàn giao và context app cho một main agent.
- Không mở dữ liệu thật, không gọi VLM ngoài, không sub-agent, không đổi theme/font, không push/merge.

## Bố cục UI

Không thay UI. Kiểm hồi quy T-008 với script sẵn ở 1366 và 1920; 4 ảnh timeline/settings, fixture riêng và chặn request ngoài.

## Tiêu chí đạt

- [x] Một main agent; không worker phụ hoặc orchestrator.
- [x] App/checkouts/WIP/build được đối chiếu bằng Git và tiến trình.
- [x] Config cũ nhận rea path thiếu, không ghi đè path tùy chọn/receipt; có test hồi quy.
- [x] rea-video thật xử lý MP4, xuất và nhập review, source không đổi checksum; DB fixture.
- [x] Typecheck, domain, API, desktop, bridge và local:build đạt; 1 test OpenMontage tùy chọn skip được ghi rõ.
- [x] 4 PNG hai kích thước, 0 page error, 0 external request.
- [x] STATUS/HANDOVER/prompt phản ánh một agent, nêu rõ đã kiểm/chưa kiểm và không còn T-006/WIP giả.

## Cách kiểm

pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build. Log và acceptance: C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local/outputs/office-20261113.

## Báo cáo

Xem REVIEW-T-009.md, STATUS.md và FINAL.md. Code e47b51d, app/build 17cb38c; build 2026-11-13T01:11:29.4096762+07:00.
