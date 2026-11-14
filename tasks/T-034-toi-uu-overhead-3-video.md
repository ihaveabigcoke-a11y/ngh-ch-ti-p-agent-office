# T-034: Giảm overhead app trong luồng 3 video / 1 sản phẩm (sau review T-033)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-033 (không còn Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-034`, khoá `codex-T-034.txt`, tự xoá khi xong.
- **Luật:** KHÔNG tắt công tắc hồ sơ/Muse (phanh = dừng GỬI). Prompt video luôn bắt đầu bằng `MUSE_VIDEO_COMMAND`. Không đăng, không DM.

## Số liệu T-033 (1 lần đo thật)
Chờ Muse 53,5 s (Cho) / 63,6 s (Duc); tổng bấm→MP4 78,4 s / 84,5 s. Overhead app ~21–25 s: preflight+gửi 2–3 s, kết quả→nút tải 4,7–7,7 s, tải 3,8–5 s, kiểm+nhập ~0,6–0,9 s, chọn đoạn 0,5–1 s, dựng MP4 ~8 s. Chi (H2) bị Muse từ chối nên thiếu video thứ 3.

## Việc
1. **Cắt "kết quả → nút tải"** (4,7–7,7 s): bấm tải ngay khi clip xuất hiện (poll 500–1000 ms, theo dõi thẳng phần tử video/URL), không đợi trạng thái "hoàn tất" của khung chat.
2. **Chồng chặng:** bắt đầu dựng hook ngay khi tải xong; nhập Thư viện + lưu chạy nền song song với dựng, không chặn. Thử dựng nhanh hơn (preset ffmpeg nhanh, chỉ cắt 1 lần, không mã hoá lại thừa) mà vẫn ≤ 6 MB, 720×1280, giữ tiếng, chữ CTA.
3. **Chi bị từ chối:** không đổi hồ sơ để lách. Nếu một hồ sơ từ chối/lỗi thì **chỉ dừng gửi trên hồ sơ đó** (công tắc vẫn bật); hook của nó nhận clip từ hồ sơ kia ở lượt kế sau ≥ 60 s theo hồ sơ, hoặc báo thiếu rõ ràng. Thêm bước kiểm quyền video rẻ (không gửi) nếu có đường hợp lệ qua app, nếu không thì ghi "chưa kiểm".
4. **Thử đúng 1 lượt "một tin 3 video"** (dòng đầu `You create a video for me.`, dòng sau `Make 3 separate videos, one per scene below.`) trên 1 hồ sơ: ghi Muse trả mấy clip và mất bao lâu. Chỉ ghi kết quả, không đổi mặc định nếu thiếu clip.
5. **Đo lại tối đa 6 lượt gửi** (2 lần × 3 hồ sơ song song, mỗi hồ sơ ≥ 60 s giữa 2 lượt) + 1 lượt thử mục 4. Ghi bảng chặng từng lần vào `D:/hermes-wt/artifacts/T-034/progress.md`; 3 MP4 sha256 khác nhau nếu đủ.
6. Test (Muse giả): tải ngay khi thấy clip; dựng chồng chặng; hồ sơ từ chối không tắt công tắc; full suite xanh, không hạ assertion. Push (không force).

## Kết luận bắt buộc
Nếu chờ Muse một mình ≥ 53 s và overhead app đã giảm tới mức tối thiểu có số đo, ghi trong STATUS mục "T-034": "mục tiêu <60 s phụ thuộc tốc độ Muse", kèm bảng. Không bịa số.

## Báo cáo (đầu STATUS.md, mục "T-034", ≤ 20 dòng)
Bảng chặng trước/sau · tổng bấm→3 MP4 · số clip Muse trả ở lượt "một tin" · lỗi đã sửa (SHA) · chưa kiểm · Cần anh chốt.
