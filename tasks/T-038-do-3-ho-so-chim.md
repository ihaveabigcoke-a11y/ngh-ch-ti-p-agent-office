# T-038: Đo 3 video / 1 sản phẩm với 3 hồ sơ Cho + Duc + Chim

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Người dùng (15/11): Chi bị Muse giới hạn video lâu dài (xác nhận tay), nên người dùng thêm hồ sơ mới **Chim** (tự đăng nhập). Chạy sau T-037 (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-038`, khoá `codex-T-038.txt`, tự xoá khi xong.
- **Luật:** KHÔNG tắt/bật công tắc hồ sơ hay Muse (kể cả Chi: giữ bật, chỉ dừng gửi). Prompt video bắt đầu bằng `MUSE_VIDEO_COMMAND`. Không cookie/token/DB. Không đăng, không DM.

## Việc
1. Qua app (IPC): kiểm Chim có trong danh sách, bật, `ready`, quota, VPN/phiên. Không nhập mật khẩu. Nếu Chim chưa đăng nhập/ chưa ready: ghi nguyên văn và dừng (không đoán).
2. Đưa Chim vào nhóm gửi video; **loại Chi khỏi nhóm gửi video** (Chi giữ bật, dừng gửi, không thử lại). Cho + Duc + Chim = 3 hồ sơ gửi được → chế độ **song song mỗi hồ sơ 1 cảnh** (không dùng "một tin") khi ≥ 3 hồ sơ gửi được. Sửa mã/test nếu app còn hard-code Chi/Cho/Duc hoặc tính Chi vào nhóm.
3. **Đo thật**: tối đa **6 lượt gửi** (2 lần × 3 hồ sơ song song, mỗi hồ sơ ≥ 60 s giữa 2 lượt; lần 2 chỉ chạy nếu lần 1 đủ 3 clip hợp lệ). Ghi bảng chặng từng lần vào `D:/hermes-wt/artifacts/T-038/progress.md`: preflight/gửi, chờ Muse, kết quả→tải, tải, kiểm+nhập, chọn đoạn, dựng, tổng bấm→3 MP4 (3 mã băm khác nhau, 720×1280). So với T-035 (76–88 s).
4. Hồ sơ nào bị từ chối/lỗi: dừng gửi riêng hồ sơ đó, chép nguyên văn, không thử lại, không đổi hồ sơ để lách, không tắt công tắc.
5. Test (Muse giả) nếu sửa mã; full suite xanh, không hạ assertion; push (không force).
6. **Kết luận bắt buộc:** nếu chờ Muse (mỗi clip, song song) ≥ 56 s thì bấm→3 MP4 ≥ chờ Muse + tải + dựng ≈ 70 s: ghi trong STATUS "mục tiêu <60 s phụ thuộc Muse", kèm số. Không bịa số.

## Báo cáo (đầu STATUS.md, mục "T-038", ≤ 15 dòng)
Hồ sơ đang bật (Cho/Chi/Duc/Chim, trạng thái) · bảng chặng từng lần · tổng bấm→3 MP4 · 3 sha256 · lỗi đã sửa (SHA) · chưa kiểm · Cần anh chốt.
