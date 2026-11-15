# T-045: Thư viện nhân vật (menu "Nhân vật") — gõ @tên thì tự đính ảnh

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Nguồn ý: học từ 2 video hướng dẫn một công cụ khác (D:/hermes-wt/meosu-frames/), Opus xếp hạng. **Chỉ học ý, KHÔNG đọc/chạy/sao chép mã, thương hiệu hay văn bản của họ** (thư mục của công cụ đó có mã độc và là tool crack).
- **Luật chung:** không tắt công tắc hồ sơ/Muse; VPN bật; Chi giữ bật nhưng không gửi video; mọi prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND` đúng 1 lần; không cookie/token/DB; không đăng/DM; không nhãn "AI"; nhãn tiếng Việt có dấu; tính năng mới **mặc định TẮT hoặc không đổi luồng 3 video đang chạy**; không đổi đường gửi Muse ngoài phạm vi. Chạy sau việc trước (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-xxx`, khoá `codex-T-xxx.txt`, tự xoá khi xong. Test xanh, không hạ assertion; typecheck; build; ảnh 1366 và 1920 cho việc giao diện; push (không force). Báo cáo ≤ 12 dòng đầu STATUS.md mục T-xxx: đã làm (SHA) · đã kiểm · chưa kiểm · Cần anh chốt.

## Việc
1. Bảng dữ liệu nhân vật (tên duy nhất, ghi chú tuỳ chọn, 1–3 ảnh) lưu cùng dữ liệu app (migration an toàn, không đụng dữ liệu cũ); màn "Nhân vật": thêm/sửa/xoá, thẻ có handle `@tên`, ảnh rõ, xác nhận khi xoá. **Chỉ cho sản phẩm, linh vật, nhân vật hoạt hình/minh hoạ**: hộp thêm có dòng nhắc "Không dùng ảnh người thật", không có chế độ "người mẫu".
2. Công tắc "Giữ nguyên nhân vật" (mặc định TẮT): bật thì prompt nhắc `@tên` được **tự đính 1–3 ảnh của nhân vật** vào lượt gửi Muse (đi qua đường ảnh tham chiếu có sẵn `muse.mjs`/`muse-chat.mjs`, tối đa 4 ảnh/lượt); prompt không nhắc tên → 0 ảnh thêm; tên không tồn tại → cảnh báo trước khi gửi, không gửi.
3. Chip tên nhân vật hiện trong form tạo video khi nhận ra `@tên`.
## Tiêu chí đạt
- [ ] Test (Muse giả): "@Bông" đính đúng 1–3 ảnh của Bông; không tên → 0 ảnh thêm; công tắc tắt → không đính; prompt vẫn bắt đầu `MUSE_VIDEO_COMMAND` đúng 1 lần; migration không mất dữ liệu cũ; công tắc hồ sơ không đổi.
- [ ] Ảnh 1366/1920 của màn Nhân vật. Không gửi Muse thật trong việc này.
