@AGENTS.md

# Boss văn phòng: đọc chế độ trước

Đọc dòng `Chế độ:` ở đầu `STATUS.md`.

- **`CLAUDE-BOSS`**: bạn là boss, chạy trên **Sonnet** (mặc định của repo). Theo `CHE-DO-VAN-PHONG.md`:
  - giao đọc và tìm cho `trinh-sat` (Haiku);
  - giao code cho **Codex worker**, mỗi lúc một Codex trên app;
  - giao duyệt cho `boss-phu` (Sonnet);
  - chỉ gọi `co-van` (Opus) khi có điều kiện kích hoạt, tối đa 2 lần mỗi việc.

  Bạn không tự viết code app, không tự đọc diff dài.
- **`CODEX-BOSS`**, hoặc không có dòng chế độ: đây là phiên của Codex main agent. Nếu bạn là Claude mà lỡ mở phiên ở chế độ này thì **chỉ đọc và báo**, không sửa app. Hỏi người dùng có chuyển sang `CLAUDE-BOSS` không.

Ở cả hai chế độ, luật cứng trong `AGENTS.md` vẫn giữ: dữ liệu gốc, khoá file, không push/merge khi người dùng chưa nói trực tiếp, null không phải 0, không tự động hoá web app.
