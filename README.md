# Văn phòng agent (agent office)

Nơi người dùng **theo dõi tiến độ**. Phía sau là các agent đang chạy:

- **Claude Code = boss**: chia việc, thuê worker, duyệt, báo cáo (`CLAUDE.md`)
- **Codex = worker code**: được boss thuê qua MCP `agent-office`, mỗi worker có worktree và PR riêng (`AGENTS.md`)
- **Gemini / Grok = media**: người dùng tự làm tay; boss soạn sẵn gói prompt

Hai phần mềm, mỗi cái một việc:

| | Vai | Địa chỉ |
|---|---|---|
| [NosytLabs/agent-office](https://github.com/NosytLabs/agent-office) (ghim `df6551d`) | **Màn hình theo dõi.** Văn phòng pixel 2D dễ nhìn: ai đang làm, ai cần input, token và chi phí. Chỉ quan sát, không ra lệnh | http://127.0.0.1:8113 |
| [AgentSystemLabs/agent-office](https://github.com/AgentSystemLabs/agent-office) `v0.1.211` | **Máy chạy agent.** Boss Claude thuê worker Codex qua MCP. Có thể thu nhỏ cửa sổ | http://localhost:4600 (điện thoại: `/lite`) |

Mở cả hai: `scripts\START-OFFICE.ps1` (lần đầu thêm `-Setup`). Ảnh chụp giao diện nằm trong `docs/screenshots/`.

| File | Dùng để |
|---|---|
| `STATUS.md` | Bảng tiến độ: hộp thư, đang làm, chờ duyệt, bị chặn, xong |
| `CLAUDE.md` | Luật và quy trình của boss |
| `AGENTS.md` | Luật của worker và luật chung |
| `tasks/` | Đề bài giao Codex (`_TEMPLATE.md`) |
| `docs/SETUP-WINDOWS.md` | Cài đặt, chạy, lỗi đã biết |
