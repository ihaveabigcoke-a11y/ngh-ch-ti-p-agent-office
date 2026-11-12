# Chạy văn phòng trên Windows: Claude boss + Codex worker

## 0. Đã xong (12/11)
- Đã cài Agent Office `v0.1.211`, thư mục dự án `D:\agent-office`.
- Đã cài `gh` và đăng nhập.

## 1. Cần có trên máy
- `claude` đã đăng nhập: chạy `claude` một lần, gõ `/login`.
- `codex` đã đăng nhập: chạy `codex` một lần và đăng nhập tài khoản ChatGPT.

## 2. Mở office
```powershell
agent-office --password "mat-khau-tu-dat"
```
Mở `http://localhost:4600`. Trên điện thoại cùng máy thì mở `http://localhost:4600/lite`.

## 3. Thêm tầng văn phòng
Elevator → gõ `ihaveabigcoke-a11y/ngh-ch-ti-p-agent-office` → **Add floor**.
Repo này sẽ được clone vào `D:\agent-office\ihaveabigcoke-a11y\ngh-ch-ti-p-agent-office`. Claude tự đọc `CLAUDE.md`, Codex tự đọc `AGENTS.md`.

> Tầng `hermes-clip` chỉ thêm **sau khi** nhánh `night-20261111` đã merge và push lên GitHub. Nếu thêm trước, office sẽ clone bản cũ.

## 4. Thuê boss
Lên **Boss Office** (cầu thang sau), hoặc ra một bàn trống bất kỳ, bấm **E**:
- Provider: **Claude Code**, effort **high**.
- Prompt: `bắt đầu`

Boss sẽ đọc `STATUS.md`, tóm tắt, rồi tự thuê Codex qua MCP `agent-office` khi bạn giao việc.

Lần đầu boss gọi `hire_worker` hoặc `tell_worker`, terminal của boss sẽ hỏi quyền. Chọn **"Yes, and don't ask again"** cho hai lệnh này. Riêng `send_home` (xoá worktree và nhánh) thì cứ để nó hỏi mỗi lần.

## 5. Lần đầu Codex ngồi bàn
Codex cần bạn **duyệt hook một lần**. Đi tới bàn Codex, bấm **E** để mở terminal, gõ `/hooks` và chấp nhận các lệnh Office. Nếu không duyệt, office sẽ báo worker luôn ở trạng thái "cần input".

## 6. Theo dõi
- 🔴 Đèn đỏ trên bàn: worker đang chờ bạn. Bấm **N** để tới thẳng chỗ nó.
- 🟢 Worker nhảy lên kèm tiếng "ding": worker đã xong việc.
- `STATUS.md`: boss ghi tiến độ và những gì chờ bạn duyệt.

## Lỗi đã biết
| Lỗi | Ý nghĩa | Cách xử lý |
|---|---|---|
| `unhandled rejection Error: spawn EINVAL … limits.js` | Office không chạy được `claude.CMD` (bản npm) để đọc hạn mức gói. Node mới chặn chạy file `.CMD` trực tiếp | **Vô hại**, chỉ mất thanh "5h/Week". Muốn có lại thanh này thì cài Claude Code bản native (`claude.exe`) |
| `GitHub CLI (gh) is not installed` | Thiếu `gh` | `winget install --id GitHub.cli -e`, rồi `gh auth login` |
| PowerShell đứng im | Lỡ click chuột vào cửa sổ (chế độ QuickEdit) | Bấm `Esc` |

## Bảo mật
- Giữ office ở `127.0.0.1` như mặc định. Không dùng `--host 0.0.0.0`.
- Ai có mật khẩu office là chạy được lệnh trên máy bạn và push bằng tài khoản GitHub của bạn. Không dán mật khẩu hay link `#key=` vào chat.
