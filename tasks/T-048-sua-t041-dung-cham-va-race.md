# T-048: Sửa T-041: dựng/chọn đoạn chậm hơn, 2 lỗi Vừa, 1 lỗi Nhỏ (KHÔNG gửi Muse)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-042 (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-048`, khoá `codex-T-048.txt`, tự xoá khi xong. **KHÔNG gửi Muse thật** (dùng clip cục bộ có sẵn của T-038/T-041 để dựng thử). Luật chung: không tắt công tắc hồ sơ/Muse; VPN bật; `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI".

## Số liệu review T-041 (3 lượt đo thật, Cho/Duc/Chim)
Gửi và tải nhanh hơn rõ (preflight→gửi 0,25 s; kết quả→tải 0,06 s) nhưng **chọn đoạn 2,6–3,4 s (T-038: 0,9–1,7)** và **dựng 12,3–19,6 s (T-038: 6,5–11,1)**; phần app tổng ~21 s ngang T-038. Nghi: `media-capacity.mjs` đặt tối đa 3 ffmpeg cùng lúc, compose + ffprobe + giải mã kiểm dùng chung 3 slot (`compress.mjs`, `integrations.mjs:73`) nên dựng phải xếp hàng; `-threads 2` mới thêm ở `montage_bridge.py`. Chờ Muse lượt đó 85 s (T-038: 65 s) nên tổng 100,5 s không do app.

## Việc
1. **Đo bằng trace, không Muse:** dựng lại 3 hook từ 3 clip cục bộ đã có, ghi thời gian từng bước (chờ slot, ffprobe, giải mã kiểm, chọn đoạn, ffmpeg dựng) vào `D:/hermes-wt/artifacts/T-048/progress.md`; xác định chỗ xếp hàng.
2. **Sửa:** tách slot riêng cho compose (không bị ffprobe/validate chiếm), thử `-threads` 0/2/3 và thứ tự để dựng ≤ 11 s và chọn đoạn ≤ 1,7 s khi chạy 3 hook song song trên máy này; giữ kết quả 3 MP4 khác mã băm, 720×1280, ≤ 6 MiB, giữ tiếng, đủ CTA; không hạ kiểm giải mã. Báo số trước/sau từ trace.
3. **Lỗi Vừa 1** `desktop/src/muse.mjs:~291`: nhận nguồn video ngay khi thẻ ẩn có URL mà chưa kiểm blob đầy đủ → kiểm kích thước ổn định/`Content-Length`/đọc hết trước khi nhận; test với fixture blob dở.
4. **Lỗi Vừa 2** `desktop/src/worker.mjs:~327`: lưu `earlyRenderError` bằng `store.put({...latest})` có thể ghi đè chuyển trạng thái `ready` → cập nhật nguyên tử chỉ trường lỗi/đọc lại trạng thái trong cùng giao dịch; test đua (hai bên đồng thời).
5. **Lỗi Nhỏ** `worker.mjs:~311`: `warmPages.delete` trước khi chắc chắn dùng trang → chỉ xoá khi đã dùng/đã đóng; nếu dispatch lỗi thì trả tab ấm về hoặc đóng.
6. **Chi:** đọc qua IPC (không đổi gì) trạng thái bật/tắt của Chi và ghi vào STATUS ("Chi còn trong danh sách: có/không; enabled: ..."). progress T-041 ghi Chi "không còn trong app": có thể anh người dùng đã xoá bằng chức năng xoá hồ sơ (T-039); **không thêm lại, không bật/tắt**, chỉ báo.
## Tiêu chí đạt
- [ ] Trace trước/sau; dựng ≤ 11 s và chọn đoạn ≤ 1,7 s ở 3 hook song song (hoặc nêu số thật và vì sao không đạt); test race và blob dở; full suite xanh, không hạ assertion; typecheck; build; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-048.
