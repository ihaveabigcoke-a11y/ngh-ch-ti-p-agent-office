# Văn phòng agent (agent office)

Nơi người dùng **theo dõi tiến độ**. Phía sau là các agent đang chạy:

- **Claude Code = boss**: chia việc, thuê worker, duyệt, báo cáo (`CLAUDE.md`)
- **Codex = worker code**: được boss thuê qua MCP `agent-office`, mỗi worker có worktree và PR riêng (`AGENTS.md`)
- **Gemini / Grok = media**: người dùng tự làm tay; boss soạn sẵn gói prompt

Giao diện: [Agent Office](https://github.com/AgentSystemLabs/agent-office) `v0.1.211` (MIT). Có bản 3D và bản `/lite` cho điện thoại. Ảnh chụp nằm trong `docs/screenshots/`.

| File | Dùng để |
|---|---|
| `STATUS.md` | Bảng tiến độ: hộp thư, đang làm, chờ duyệt, bị chặn, xong |
| `CLAUDE.md` | Luật và quy trình của boss |
| `AGENTS.md` | Luật của worker và luật chung |
| `tasks/` | Đề bài giao Codex (`_TEMPLATE.md`) |
| `docs/SETUP-WINDOWS.md` | Cài đặt, chạy, lỗi đã biết |
