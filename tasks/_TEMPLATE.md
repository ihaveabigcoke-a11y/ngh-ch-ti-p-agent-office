# T-<số>: <tên việc>

- **Repo / tầng:** <owner/repo>
- **Người giao:** boss · **Worker:** codex · **Ngày:** <dd/mm/yyyy>

## Mục tiêu (1–3 câu)
<Người dùng cần gì và vì sao.>

## Phạm vi
- Làm: <danh sách cụ thể, có đường dẫn file hoặc thư mục>
- **Không** làm: <những gì cấm đụng>

## Bố cục giao diện (bắt buộc nếu có UI)
- Màn hình hoặc khối nào, nằm ở đâu, gồm những thành phần gì (vẽ ASCII nếu cần).
- Nhãn tiếng Việt có dấu. Giữ font và theme hiện tại.
- Phải đẹp ở **1366 px** và **1920 px**. Worker chụp ảnh cả hai khổ, đính vào PR.

## Tiêu chí đạt
- [ ] <kiểm được, có số liệu hoặc hành vi cụ thể>
- [ ] Test hiện có vẫn đạt. Có test mới cho phần mới.

## Cách kiểm
```
<lệnh test / build / typecheck cụ thể của repo>
# hermes-clip: pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build
# (KHÔNG dùng pnpm build; các test cần ffmpeg trong PATH)
```

## Báo cáo (worker điền vào mô tả PR)
- Đã thay đổi:
- Đã kiểm, kèm bằng chứng (lệnh và kết quả, ảnh chụp):
- Chưa kiểm hoặc còn rủi ro:
- Cách chạy thử:
