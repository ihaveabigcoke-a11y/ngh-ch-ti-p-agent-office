# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026 chiều, bởi boss Claude (trên máy người dùng)._

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
Đề bài đã viết sẵn trong `tasks/`. Boss làm theo đúng thứ tự, mỗi lúc chỉ 1 Codex chạy trên hermes-clip.
1. [~] **T-001** Merge nhánh `night-20261111` vào app chính. Đã xong phần kỹ thuật; còn chờ người dùng kiểm tay và quyết định push. `tasks/T-001-merge-night.md`
2. [ ] **T-002** Tạm dừng Muse, thêm nhà cung cấp media `manual` (gói prompt + hộp nhận file). Giao Codex. `tasks/T-002-thay-muse-media-manual.md`
3. [ ] **T-003** Research và viết nội dung không cần Muse (nhập JSON, Codex CLI). Giao Codex. `tasks/T-003-research-khong-muse.md`
4. [ ] **T-004** Instagram qua API chính thức, kèm comment → DM. Giao Codex. `tasks/T-004-instagram-api.md`
5. [ ] Kế hoạch boss dự phòng sau khi Claude Pro hết hạn (khoảng 19/11).

## 🔨 Đang làm
| Việc | Worker | Nhánh / PR | Ghi chú |
|---|---|---|---|
| T-002 media `manual` | Codex (`codex exec`, effort high) | `codex/T-002-media-manual`, worktree `D:\hermes-wt\T-002`, base `merge-night-20261111` | Chưa push, chưa mở PR. Theo luật mới: duyệt bằng `hermes-night-review`; đạt thì tag `before-T-002` trong app chính rồi merge vào `main` cục bộ; hỏng thì reset về tag. Worktree giữ nguyên. T-003/T-004 sẽ sửa thẳng trong app chính |

## 👀 Chờ người dùng duyệt
| Việc | PR | Boss đánh giá | Bằng chứng |
|---|---|---|---|
| T-001 merge night | Chưa push. Commit `86ecdc0` nằm trên nhánh cục bộ `merge-night-20261111`, app chính đang ở commit này | Đạt phần kỹ thuật. **Chưa kiểm:** app mở lại được và dữ liệu cũ còn nguyên (người dùng tự kiểm theo `E:\Hermes Night\hermes-night3\boss\MORNING.md`). Giữ F03 theo lựa chọn của người dùng | Sao lưu tại `D:\backup\hermes-20261112-1346`: AppData 2476 file / 361.792.710 byte, khớp nguồn; tar app 18145/18145 file. Merge không xung đột. Kết quả kiểm chạy trong app chính: typecheck exit 0; test 196/196; test:api 24/24; test:desktop 317 pass, 1 skip (OpenMontage), 0 fail; `local:build` exit 0 |
| Dựng văn phòng (repo này) | nhánh `claude/multi-agent-office-setup-b4o3x9` | Đạt phần cấu hình. Chưa kiểm Codex thật trên máy người dùng | Ảnh chụp office chạy bản `v0.1.211` trong `docs/screenshots/` |

## ⛔ Bị chặn / cần người dùng
- Office trên Windows báo `spawn EINVAL` ở phần đọc hạn mức Claude. Lỗi này **vô hại**, chỉ mất thanh hạn mức. Xem `docs/SETUP-WINDOWS.md`.
- Codex trong office: lần đầu phải mở terminal của worker để duyệt `/hooks`. Xem `docs/SETUP-WINDOWS.md`.
- **Màn hình theo dõi NosytLabs (12/11 14:11):** đã chạy `START-OFFICE.ps1 -Setup`. Python có sẵn (3.15.2) nên không cài. Hook đã nối cho Claude (12 event) và Codex (10 event). Server `http://127.0.0.1:8113` trả 200. Ảnh `docs/screenshots/office-live.png`: **thấy phiên Claude boss** (`agent dbcb16`); **KHÔNG thấy Codex T-002**. Lý do:
  1. Tiến trình `codex exec` T-002 đã khởi động trước khi có hook.
  2. Hook Codex chưa được tin cậy. Bước `/hooks` cần người dùng bấm trong TUI của `codex`, boss không làm thay được (Codex không có lệnh tin cậy hook không tương tác).
  - Việc người dùng: mở `codex`, gõ `/hooks`, chấp nhận hook trỏ tới `D:\agent-office\tools\nosyt-agent-office\codex\hook.py`.
  - Sao lưu trước khi nối hook: `~/.claude/settings.json.bak-before-nosyt-*`. File `~/.codex/hooks.json` trước đó chưa có, `config.toml` không đổi.
- T-001: người dùng mở app, kiểm dữ liệu cũ, rồi nói "push" thì boss mới đẩy `86ecdc0` lên `main` trên GitHub.

## ✅ Xong
- 12/11: pull luật mới (sửa thẳng trên app, kèm tag lùi lại). Chép 3 skill Hermes bản mới (có *Office mode*) vào app chính, commit `2661a5a`. Repo app có danh tính git local, chép từ clone night.
- 12/11: sửa `C:\Users\ADMIN\.claude\settings.json`: thêm dấu phẩy thiếu ở dòng 8, bản sao lưu là `settings.json.bak-20261112`. Cài FFmpeg 9.0.2 bằng winget.
- 12/11: app chính `C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local` giờ là repo git (remote `hermes-clip`), đang ở `86ecdc0`. Các thư mục cục bộ (backup, `local-dist`, `.integrations`, `tools`) vẫn giữ nguyên và được git bỏ qua (ignored).
- Ghi chú cho boss sau: lệnh build đúng là `pnpm local:build` (`pnpm build` lỗi vì repo không có `scripts/run-framework.mjs`). Các test cần `ffmpeg` trong PATH.
- 12/11: thêm NosytLabs (ghim `df6551d`) làm màn hình theo dõi, kèm script `scripts/START-OFFICE.ps1`.
- 12/11: chọn Agent Office (AgentSystemLabs) và ghim `v0.1.211`. Đã cài trên máy người dùng: thư mục dự án `D:\agent-office`, `gh` đã đăng nhập.
