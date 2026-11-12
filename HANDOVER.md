# Bàn giao Codex boss — một main agent

Cập nhật 02:40 13/11/2026, Asia/Saigon. Chế độ CODEX-BOSS; chỉ một main agent, không spawn/codex exec/orchestrator.

1. **Đã dừng ở mốc nghiệm thu 1** theo yêu cầu. T-010 và T-011 hoàn tất trong Hermes Clip; không tự làm T-012 hoặc các bước video tiếp theo trong brief.
2. App tại C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local, nhánh main hiện tại, HEAD a473b72; code T-010 4f759c3, T-011 7007d08. Cây sạch, Electron tắt, đã nhả khóa T-011 chính phiên. Build local:build đạt 02:39:54 +07 ngày 13/11, đúng HEAD a473b72.
3. Không dùng/clone repo production-office; patch phòng ban chỉ tham khảo. Office nằm trong app, đọc buildOfficeView qua route local, không live/snapshot.json. CLAUDE.md app và BACKLOG đã đồng bộ hướng này. Patch chế độ văn phòng đã git am thành 564ccc6; dòng Chế độ: CODEX-BOSS giữ nguyên.
4. Fixture Hôm nay 3/3 · Đang triển khai 4; MP4 kỹ thuật mới qua ManualMedia local trên DB/profile kiểm riêng đổi unmatched → received, màn Tín hiệu đổi attention → library sau 4937 ms. Không chạm dữ liệu/phiên/AppData thật và không gọi dịch vụ ngoài.
5. Đã kiểm typecheck; domain 213/213; API 28/28; desktop 477 pass / 1 skip OpenMontage / 0 fail; 13 PNG T-011 1366/1920 và kiểm lại T-010 4 PNG. Main agent tự review theo hermes-night-review Office mode. Báo cáo và giới hạn tại STATUS.md, REVIEW-T-010.md, REVIEW-T-011.md; app ops/office/reports/T-011.md, outputs/T-011-acceptance.
6. Chưa kiểm Electron trên dữ liệu thật, Muse/Codex/Gemini VLM/Meta thật, file Flow/Gemini mới và Thùng rác thật. Không tự biến chúng thành quyền chạy dịch vụ/tài khoản thật. Không push/merge.
7. Khi có việc mới: đọc AGENTS, STATUS, CLAUDE/context app; xác minh app tắt/WIP/khóa, tag before-T-xxx; sửa trực tiếp nhánh hiện tại, khóa đúng file, commit đúng path. Full suite/local:build chỉ khi không WIP phiên khác; thêm desktop/tools/ffmpeg/bin vào PATH. Không pnpm build. Mở app bằng START-HERMES-CLIP.cmd sau build cuối.

Thông tin rea-video/T-009 vẫn ở app docs/context/T-009-OFFICE-HANDOVER.md và outputs/office-20261113/FINAL.md. Không cần chạy lại hay tải model lại cho T-010/T-011.
