# Luật chung cho mọi agent trong văn phòng

Codex đọc file này. Claude đọc nó qua `CLAUDE.md`. Boss khác (ChatGPT…) cũng theo file này.

## Nếu bạn là WORKER (Codex)
- Bạn được boss thuê cho **một** việc. Đề bài nằm trong prompt. Chỉ làm đúng phạm vi đó.
- Làm trong worktree và nhánh office đã tạo cho bạn. Không chuyển sang nhánh khác, không push lên `main`.
- Thiếu thông tin hoặc gặp quyết định kinh doanh (tiền, tài khoản, đăng bài, mua công cụ): **dừng và hỏi** trong terminal. Đừng tự đoán.
- Xong việc:
  1. chạy đủ các lệnh kiểm trong mục *Cách kiểm* của đề bài;
  2. commit với message rõ ràng;
  3. `git push -u origin <nhánh của bạn>`;
  4. `gh pr create` với mô tả theo mục *Báo cáo* của đề bài.
- Báo cáo phải tách rõ **đã kiểm (kèm bằng chứng)** và **chưa kiểm**. Không báo "chạy được" chỉ vì thấy URL, cookie hay nút trên giao diện.

## Luật cho tất cả
- **Giữ nguyên dữ liệu người dùng:** SQLite, phiên đăng nhập, proxy, media gốc, phiên bản, file đã xuất. Không xoá cache, profile hay AppData.
- **Chưa biết là `null`, không phải `0`.**
- **Không tự động hoá web app tiêu dùng** (Muse, Gemini web, Flow, Instagram web…) bằng trình duyệt. Chỉ dùng CLI hoặc API chính thức. Tài khoản Muse đã bị khoá ngày 12/11/2026, và Meta có thể khoá dây chuyền sang các tài khoản Instagram.
- **Bí mật:** không in, không commit key, token, mật khẩu hay email người dùng.
- **Giao diện app:** nhãn tiếng Việt có dấu, không đổi font hay theme ngoài phạm vi việc được giao. Prompt gửi cho model AI thì viết tiếng Anh.
- **Ngân sách gần 0:** không tự dùng dịch vụ trả tiền. Có chi phí thì phải báo giá và chờ người dùng đồng ý.
