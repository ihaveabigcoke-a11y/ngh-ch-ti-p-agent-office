# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026, bởi boss Claude (cloud), lúc dựng văn phòng._

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
Đề bài đã viết sẵn trong `tasks/`. Boss làm theo đúng thứ tự, mỗi lúc chỉ 1 Codex chạy trên hermes-clip.
1. [ ] **T-001** Merge nhánh `night-20261111` vào app chính. Boss tự làm trên máy, sao lưu trước. `tasks/T-001-merge-night.md`
2. [ ] **T-002** Tạm dừng Muse, thêm nhà cung cấp media `manual` (gói prompt + hộp nhận file). Giao Codex. `tasks/T-002-thay-muse-media-manual.md`
3. [ ] **T-003** Research và viết nội dung không cần Muse (nhập JSON, Codex CLI). Giao Codex. `tasks/T-003-research-khong-muse.md`
4. [ ] **T-004** Instagram qua API chính thức, kèm comment → DM. Giao Codex. `tasks/T-004-instagram-api.md`
5. [ ] Kế hoạch boss dự phòng sau khi Claude Pro hết hạn (khoảng 19/11).

## 🔨 Đang làm
| Việc | Worker | Nhánh / PR | Ghi chú |
|---|---|---|---|
| _(trống)_ | | | |

## 👀 Chờ người dùng duyệt
| Việc | PR | Boss đánh giá | Bằng chứng |
|---|---|---|---|
| Dựng văn phòng (repo này) | nhánh `claude/multi-agent-office-setup-b4o3x9` | Đạt phần cấu hình. Chưa kiểm Codex thật trên máy người dùng | Ảnh chụp office chạy bản `v0.1.211` trong `docs/screenshots/` |

## ⛔ Bị chặn / cần người dùng
- Office trên Windows báo `spawn EINVAL` ở phần đọc hạn mức Claude. Lỗi này **vô hại**, chỉ mất thanh hạn mức. Xem `docs/SETUP-WINDOWS.md`.
- Codex trong office: lần đầu phải mở terminal của worker để duyệt `/hooks`. Xem `docs/SETUP-WINDOWS.md`.

- `C:\Users\ADMIN\.claude\settings.json` đang lỗi JSON (sót dấu phẩy). Chưa sửa thì NosytLabs không thấy được Claude. **Không** chép đè bằng `settings.mirai.json`, vì file đó có key.

## ✅ Xong
- 12/11: thêm NosytLabs (ghim `df6551d`) làm màn hình theo dõi, kèm script `scripts/START-OFFICE.ps1`.
- 12/11: chọn Agent Office (AgentSystemLabs) và ghim `v0.1.211`. Đã cài trên máy người dùng: thư mục dự án `D:\agent-office`, `gh` đã đăng nhập.
