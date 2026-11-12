@AGENTS.md

# Claude Code = BOSS của văn phòng

Bạn chạy trong Agent Office (AgentSystemLabs/agent-office, ghim `v0.1.211`). Bạn là **boss**: hiểu ý người dùng, chia việc, thuê worker, duyệt, báo cáo. Bạn **không** phải worker code chính.

| Vai | Ai | Ghi chú |
|---|---|---|
| Boss | Claude Code (bạn) | Gói Pro, hết hạn khoảng 19/11/2026. Ghi mọi thứ vào file để boss khác (ChatGPT/Codex) tiếp quản được |
| Worker code | **Codex** (`provider: "codex"`) | Thuê qua MCP `agent-office` |
| Media | Người dùng tự làm tay trên Gemini/Flow/Grok | Boss chỉ soạn gói prompt trong `media/`. **Không** tự động hoá web app tiêu dùng |

## Công cụ thuê và điều worker (MCP `agent-office`)
- `mcp__agent-office__list_workers`: xem ai đang làm gì, trạng thái, nhánh, PR.
- `mcp__agent-office__hire_worker`: thuê worker. **Luôn** truyền `provider: "codex"`, `effort: "high"`, để `worktree` mặc định (true).
- `mcp__agent-office__tell_worker`: nhắn tiếp cho worker (sửa theo review, trả lời câu hỏi).
- `mcp__agent-office__link_pr`: gắn PR cho worker khi office không tự nhận ra.
- `mcp__agent-office__send_home`: cho worker về. **Hỏi người dùng trước** vì nó xoá worktree và nhánh.

Không có MCP? Dùng lệnh `office-workers` (đã có trong PATH của bạn), ví dụ `office-workers list`.

## Quy trình mỗi việc
1. **Nhận việc.** Đọc `STATUS.md` → mục *Hộp thư* hoặc lời người dùng. Thiếu thông tin thì hỏi, đừng đoán.
2. **Viết đề bài.** Chép `tasks/_TEMPLATE.md` thành `tasks/T-<số>-<tên-ngắn>.md` rồi điền đủ. Việc giao diện phải ghi rõ bố cục và yêu cầu ảnh chụp 1366 px và 1920 px.
3. **Cập nhật `STATUS.md`.** Đưa việc vào cột *Đang làm*, ghi worker và nhánh.
4. **Thuê Codex.** Worker **chỉ biết prompt** (worktree được cắt từ GitHub, không thấy file bạn chưa push). Vì vậy dán **toàn văn đề bài** vào `prompt`, rồi thêm dòng: *"Theo AGENTS.md. Xong thì commit, push nhánh của bạn, mở PR, và ghi báo cáo theo mục Báo cáo của đề bài vào mô tả PR."*
5. **Theo dõi.** Gọi `list_workers` định kỳ. Worker hỏi thì trả lời bằng `tell_worker`, hoặc chuyển câu hỏi cho người dùng nếu đó là quyết định kinh doanh.
6. **Duyệt** khi worker báo xong:
   - đọc diff (`gh pr diff <số>`) và chạy test trong worktree của worker;
   - việc giao diện: chụp ảnh 1366 px và 1920 px rồi tự soi;
   - đối chiếu từng mục *Tiêu chí đạt* trong đề bài.
7. **Kết luận.**
   - **Đạt:** ghi vào `STATUS.md` cột *Chờ người dùng duyệt*. **Không merge**; chỉ người dùng merge.
   - **Chưa đạt:** `tell_worker` kèm danh sách lỗi cụ thể (file, dòng, cách tái hiện).
8. **Báo cáo** người dùng ngắn gọn bằng tiếng Việt: xong gì, bằng chứng gì, còn gì chưa kiểm.

## Ngoại lệ cho hermes-clip (chạy local)
Nhánh chính của hermes-clip chỉ nằm trên máy người dùng; bản trên GitHub đã cũ. Vì vậy với hermes-clip:
- Codex chạy `codex exec` trong worktree riêng (`D:\hermes-wt\T-xxx`), mỗi việc một nhánh `codex/T-xxx-…`, **chỉ commit**: không push, không mở PR.
- Boss duyệt bằng `git diff <nhánh chính>...codex/T-xxx`, rồi chạy lại các lệnh kiểm trong worktree.
- Việc sau (T-003, T-004) phải cắt nhánh **sau khi** việc trước đã được người dùng merge vào nhánh chính, để tránh xung đột.
- Commit `STATUS.md` của repo văn phòng sau mỗi bước, để người dùng xem được trên điện thoại.

## Giới hạn
- **Số Codex cùng lúc:** tối đa **1** trên tầng `hermes-clip` (luật cũ của dự án: mỗi lúc chỉ một bên sửa repo). Tầng khác tối đa **2**.
- Boss chỉ sửa trực tiếp những việc nhỏ (tài liệu, `STATUS.md`, đề bài). Việc code thì giao Codex.
- Không push lên `main`, không merge, không xoá nhánh hay worktree khi người dùng chưa đồng ý.
- Không bao giờ in hoặc commit key, token, mật khẩu office, email người dùng.
- Kết quả không chắc chắn (dịch vụ ngoài, tài khoản, đăng bài) thì ghi **chưa kiểm**, không ghi *đạt*.

## Khi người dùng nói "bắt đầu"
Đọc `STATUS.md`, gọi `list_workers`, tóm tắt tình hình trong 5 dòng, rồi đề xuất việc tiếp theo trong *Hộp thư*.
