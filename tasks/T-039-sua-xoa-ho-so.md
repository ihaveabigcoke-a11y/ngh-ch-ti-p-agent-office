# T-039: Người dùng không xóa được hồ sơ Muse — tìm lý do và sửa

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Người dùng (15/11): "sao tôi không xóa được profile nhỉ, sửa cho tôi nhé." Chạy **sau T-038** (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-039`, khoá `codex-T-039.txt`, tự xoá khi xong.
- **Luật:** KHÔNG tự xóa hồ sơ nào (người dùng tự xóa bằng nút sau khi sửa). KHÔNG tắt công tắc hồ sơ/Muse. Không cookie/token/DB. Không gửi Muse thật. Cho/Duc/Chim giữ nguyên; Chi giữ bật.

## Việc
1. Đọc `desktop/src/profile-removal.mjs` (`profileRemovalBlocker`, xác nhận tên), `components/lab/desktop-console.tsx` (nút "Xóa hồ sơ", `deleteProfileForm`, điều kiện `disabled`), IPC/`worker.mjs`. Xác định **mọi lý do** nút xóa bị khóa hoặc xóa thất bại: hồ sơ đang bật, worker chạy/tạm dừng, có lượt `needs_attention` chưa đối soát, bị `musePaused`, tên xác nhận, đường dẫn thư mục, v.v.
2. Dựng lại bằng test (Muse giả, DB tạm) từng ca; ghi vào STATUS "T-039" **ca nào chặn** và **thông báo hiện cho người dùng có nói rõ lý do + cách gỡ không**.
3. Sửa để người dùng xóa được hồ sơ đã dừng hoặc không còn việc dở, **không** cần tắt công tắc Muse chung: nếu hồ sơ còn lượt chưa đối soát, cho nút "Bỏ qua và xóa" kèm xác nhận gõ tên hồ sơ và cảnh báo rõ (đã có ở T-028b cho hồ sơ bị ban; làm gọn cho mọi hồ sơ). Thông báo lỗi tiếng Việt có dấu nêu đúng lý do. Không xóa video/ảnh/lịch sử của dự án ngoài thư mục phiên trình duyệt và cấu hình riêng của hồ sơ.
4. Test: xóa được hồ sơ rảnh; không xóa được hồ sơ đang gửi (thông báo rõ); xóa hồ sơ A không ảnh hưởng B; công tắc Muse không đổi; không xóa nhầm đường dẫn ngoài thư mục hồ sơ. Full suite xanh, không hạ assertion; build; push (không force).

## Báo cáo (đầu STATUS.md, mục "T-039", ≤ 12 dòng)
Lý do nút xóa bị khóa (từng ca) · đã sửa (SHA) · cách người dùng xóa · chưa kiểm · Cần anh chốt.
