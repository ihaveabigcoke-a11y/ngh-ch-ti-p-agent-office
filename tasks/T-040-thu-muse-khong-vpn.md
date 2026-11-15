# T-040: Thử tạo video Muse KHÔNG qua VPN để xem VPN có làm chậm không (không sửa mã)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Người dùng (15/11): "hay là do VPN, hãy thử 1 trình duyệt tắt VPN rồi thử giúp tôi xem như nào (ko sửa code)". Chạy sau T-039 (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-040`, khoá `codex-T-040.txt`, tự xoá khi xong.
- **KHÔNG SỬA MÃ, không commit mã.** Chỉ đo và ghi báo cáo (STATUS + `D:/hermes-wt/artifacts/T-040/progress.md`; commit docs nếu cần).
- **Luật:** không tắt công tắc hồ sơ/Muse; không cookie/token/DB; không nhập mật khẩu; không đăng/DM; chỉ dùng đường của app (UI/IPC). Tối đa **2 lượt gửi** cho cả việc này (1 lượt không VPN + 1 lượt đối chứng có VPN), mỗi lượt trên hồ sơ **Cho** và **Duc** (không dùng Chi, không đụng Chim).

## Việc
1. Tìm trong app cách **tắt VPN (Touch VPN) cho đúng 1 hồ sơ** mà không sửa mã: cấu hình hồ sơ trong UI, tuỳ chọn "không dùng VPN", hoặc mở trình duyệt của hồ sơ rồi tắt tiện ích VPN bằng tay qua UI. Nếu app **không** có cách hợp lệ và không sửa mã: **dừng**, ghi nguyên văn lý do, không gửi gì (khuyên người dùng tự thử tay trên Chrome thường).
2. Nếu có cách: ghi trạng thái VPN trước/sau (qua `checkProfile`/IPC), rồi gửi **1 lượt 1 cảnh** trên Duc **không VPN** (prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND`, cảnh đã duyệt), đo: preflight→gửi, **chờ Muse**, tải, nhập. Nếu Muse từ chối/hạn chế vùng/captcha: dừng gửi trên hồ sơ đó, chép nguyên văn, **không thử lại, không đổi hồ sơ để lách**.
3. Lượt đối chứng: gửi 1 lượt tương đương trên Cho **có VPN** (cấu hình hiện tại) cùng lúc hoặc ngay sau (≥ 60 s trên mỗi hồ sơ), đo cùng các chặng.
4. **Khôi phục** trạng thái VPN của hồ sơ về như cũ (bật VPN) sau khi đo; ghi đã khôi phục. Công tắc hồ sơ/Muse giữ bật.
5. Kết luận một câu: không VPN, chờ Muse nhanh/chậm hơn bao nhiêu giây (nêu 2 mẫu 1 lượt/bên chưa đủ kết luận thống kê); có rủi ro tài khoản/vùng không.

## Báo cáo (đầu STATUS.md mục "T-040", ≤ 10 dòng)
Cách tắt VPN dùng · bảng chặng 2 lượt · kết luận · đã khôi phục VPN · chưa kiểm · Cần anh chốt.
