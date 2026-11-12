# T-001: Đưa nhánh `night-20261111` vào app chính Hermes Clip

- **Repo:** hermes-clip, **trên máy người dùng** (nhánh night chưa push lên GitHub)
- **Người làm:** boss Claude chạy trực tiếp trên máy, **không** thuê Codex (việc này cần thấy ổ C/E của máy)
- **Ngày:** 12/11/2026

## Mục tiêu
Đưa T01–T27 và F01–F03 (đã đạt review) vào bản clone git của app chính mà không mất dữ liệu thật. Sau đó push lên GitHub, để office có tầng `hermes-clip` đúng bản mới nhất.

## Phạm vi
- Làm:
  1. **Sao lưu** (chỉ copy, không di chuyển) `C:\Users\ADMIN\AppData\Roaming\product-lab-desktop` sang `D:\backup\hermes-<yyyyMMdd-HHmm>\`. Ghi tổng số file và tổng dung lượng của nguồn và bản sao, hai bên phải khớp.
  2. Trong app chính (`C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local`, hoặc đường dẫn mới hơn nếu `MORNING.md` ghi khác): `git status` phải sạch. Nếu không sạch thì **dừng và hỏi**.
  3. `git fetch C:\HermesNight\hermes-clip night-20261111` rồi `git merge --no-ff FETCH_HEAD`. Có xung đột thì **dừng**, ghi danh sách file xung đột và hỏi người dùng.
  4. Chạy: `pnpm install`, `pnpm typecheck`, `pnpm test`, `pnpm test:api`, `pnpm test:desktop`, `pnpm local:build`.
  5. Quyết định còn treo F03 (`productGate` chặt hơn): đề xuất **giữ**. Hỏi người dùng một câu trước khi push.
  6. Người dùng tự kiểm theo danh sách trong `E:\Hermes Night\hermes-night3\boss\MORNING.md`.
  7. **Chỉ khi người dùng nói "push":** `git push origin <nhánh chính>`.
- **Không** làm: xoá cache, profile hay AppData; reset hay force-push; chạy script cũ có hành động bên ngoài (đăng bài, gửi Muse).

## Tiêu chí đạt
- [ ] Bản sao lưu có số file và dung lượng khớp nguồn.
- [ ] Merge không xung đột, hoặc mọi xung đột đã được người dùng quyết.
- [ ] Toàn bộ lệnh kiểm ở bước 4 đều đạt (ghi số test).
- [ ] App mở lại được; dữ liệu cũ (dự án, Thư viện, bài Instagram đã đăng) vẫn còn.

## Báo cáo
Ghi vào `STATUS.md`: commit merge, kết quả từng lệnh kiểm, đường dẫn bản sao lưu, những gì người dùng đã kiểm tay.
