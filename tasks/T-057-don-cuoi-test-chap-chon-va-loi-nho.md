# T-057: Dọn cuối đêm 15/11: test chập chờn + vài lỗi Nhỏ (KHÔNG gửi Muse)

- **Repo:** hermes-clip app `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local` · **Worker:** Codex · **Ngày:** 15/11/2026
- Chạy sau T-051 (không Codex khác, không khoá `codex-*.txt`, `git status` sạch). Tag `before-T-057`, khoá `codex-T-057.txt`, tự xoá khi xong. **KHÔNG gửi Muse thật**, không đổi đường gửi, không đổi công tắc hồ sơ/Muse/VPN, `MUSE_VIDEO_COMMAND` đúng 1 lần, không cookie/token/DB, không nhãn "AI", nhãn tiếng Việt có dấu. **Hermes thật của người dùng đang mở**: KHÔNG chạy `pnpm local:build` mặc định; chỉ build vào thư mục riêng (`HERMES_LOCAL_BUILD_DIR=outputs/T-057-package/...`) như T-050/T-051, và ghi rõ "chưa áp build chính vì app mở".

## Việc (theo mức ưu tiên)
1. **Vừa, test chập chờn** `desktop/test/long-video.test.mjs` (T-046 TIMEOUT và T-046 MUSE_OLD_CLIP, cả 3 lần chạy riêng đều có 1–3 test hỏng): lỗi `database is not open` vì `Worker.tick` (`desktop/src/worker.mjs:~512`, `muse-pause.mjs:5`, `store.mjs:15`) chạy sau khi test `store.close()`. Sửa gốc: `tick` bỏ qua êm khi worker/store đã đóng (cờ closed, hoặc chờ vòng tick đang chạy dừng rồi mới đóng DB trong `Worker.close()`), và test đóng đúng thứ tự (dừng worker → chờ → đóng DB). Chạy riêng file này **10 lần liên tiếp**, 0 hỏng; không hạ assertion.
2. **Nhỏ**, băm theo luồng: `desktop/local/library-merge.mjs:~47` đọc cả clip (≤256 MB) vào RAM để băm → băm bằng stream; test giữ nguyên hành vi.
3. **Nhỏ**, `store.mjs:~106-117`: job `WORKER_LOST` có output băm không khớp bị băm lại (≤64 MB) mỗi lần `status()` và mỗi 5 giây của watchdog → nhớ kết quả theo `updatedAt`/size/mtime, chỉ băm lại khi đổi.
4. **Nhỏ**, giao diện nhân vật: nút X bỏ ảnh (`components/lab/characters.tsx:~49`) tương phản thấp, gần như vô hình trên ảnh → nền/viền tối rõ; dòng "Ảnh (1–3)" icon tách khỏi nhãn (`:~48`) → gộp lại. Không đổi font/theme. Ảnh 1366/1920.
5. **Nhỏ**, dọn ảnh lỗi cũ `failure.png`/`failure.txt` trong `outputs/T-045-ui` và `outputs/T-043-ui` (đã gitignore; xoá bằng lệnh có kiểm đường dẫn, chỉ hai file đó).
6. Ghi nhận (không làm): nhãn lỗi 24 giờ chưa có mã lỗi riêng (`museFailureKind`) nên với Muse thật có thể không hiện; ghi vào STATUS "Cần anh chốt: cần mã lỗi 24 giờ đặt ở đâu / thử lỗi thật".
## Tiêu chí đạt
- [ ] `long-video.test.mjs` 10/10 lần chạy liên tiếp không hỏng; full suite xanh (desktop 638 hoặc hơn, 0 hỏng); typecheck; build riêng; push (không force). Báo cáo ≤ 10 dòng đầu STATUS.md mục T-057.
