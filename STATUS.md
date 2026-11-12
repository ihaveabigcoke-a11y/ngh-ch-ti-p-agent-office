# Bảng tiến độ

Boss cập nhật file này sau mỗi bước. Người dùng xem nó, hoặc xem `/lite` của office trên điện thoại.

_Cập nhật lần cuối: 12/11/2026, bởi boss Claude (cloud), lúc dựng văn phòng._

## 📥 Hộp thư (người dùng ghi việc mới vào đây)
- [ ] **Merge nhánh `night-20261111` vào app chính Hermes Clip.** Sao lưu dữ liệu trước, không xoá gì. Làm trên máy người dùng, vì nhánh chưa push lên GitHub.
- [ ] **Thay Muse.** Công tắc tạm dừng Muse, cộng tầng nhà cung cấp media `manual` (gói prompt cho Flow/Gemini, 9:16, 8 giây; thư mục tự nhập file theo mã cảnh), cộng nhập JSON research theo schema `hermes-product-check`.
- [ ] **Chuyển Instagram sang API chính thức** (bật adapter T18), kèm comment theo từ khoá → tự trả lời DM.
- [ ] **Kế hoạch boss dự phòng** sau khi Claude Pro hết hạn (khoảng 19/11).

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
