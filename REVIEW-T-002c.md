# Duyệt T-002c (gồm G của boss phụ, siết CTA của boss phụ, phần Codex)

Boss Claude, 12/11/2026. Office mode.

| Phần | Commit | Ai làm | Kết luận |
|---|---|---|---|
| G: lối ra cho cảnh kẹt "Cần đối soát" | `ab94531` | boss phụ | **Đạt**. Boss chính đã kiểm phạm vi (10 file, không trùng WIP T-004) |
| Siết so khớp CTA ("pink" từng khớp LINK) | `d1b57b1` | boss phụ | **Đạt**. 2 file, ngoài khoá |
| Chặn hẳn job Muse cũ, nhãn và polling TextExchange, bảng Instagram 1366, xét lại `follow_unknown` | `adf48c9` | Codex, 2 vòng | **Đạt** |

## Bằng chứng (cây sạch tại `adf48c9`)
- **Lệnh kiểm:** typecheck 0; test 204/204; api 26/26; desktop 418 pass, 1 skip, 0 fail; `local:build` thật 0 lúc 17:23:59.
- **Script `scripts/check-t002c-ui.mjs` chạy hết**, 10 ảnh tại `D:\hermes-wt\artifacts\T-002c\`:
  - TextExchange: 10 giây trôi qua thì 0 lần gọi IPC; `workspace-changed` thì đọc lại đúng 1 lần; đọc lại ngay trước khi chạy CLI, nhập JSON hay Muse;
  - cảnh "Cần đối soát" có nút "Bỏ qua, không đối soát";
  - bảng Instagram ghim cột Sản phẩm và cuộn ngang trong vùng bảng, trang không tràn ngang.
- **Vòng 1 script lỗi ở bước "Dán JSON".** Vòng 2 sửa selector và gọi `clock.resume`; chạy ngoài sandbox thì đạt.
- **Test đổi:** "Thiếu mã kết quả" được thay bằng thông báo chính xác "Đã bỏ qua kết quả Muse cũ; app sẽ không gửi lại." (chặt hơn); render OperationsPanel được chuyển sang overview. Không assertion nào bị nới.
- **Xét lại `follow_unknown`:** chỉ xét comment chưa từng gửi (`attemptedAt` null, không có `messageId`), khi quy tắc được lưu lại với phiên bản mới, trong cửa sổ 7 ngày. Không xét `sending`, `sent` hay `needs_attention`. `requireFollow` vẫn mặc định true, theo quyết định của người dùng.

## Nhỏ còn lại
- Màn Tạo video lặp dòng "Muse đang tạm dừng, bật lại ở Tài khoản Muse" 3 lần (gợi ý dưới select, dải dưới thanh, nhà cung cấp cảnh).

## Chưa kiểm
- Electron thật trên dữ liệu thật: 2 cảnh có job Muse `needs_attention` từ 08/11.
