# Luật văn phòng (cập nhật 14/11/2026)

Luật cho Codex và mọi agent khác. Chỗ đánh dấu **[cần anh xác nhận]** là điều chưa kiểm chứng.

## Hai chế độ (ghi ở dòng `Chế độ:` đầu `STATUS.md`)
- **`CODEX-BOSS`** (mặc định khi không có dòng): Codex tự làm boss, **một main agent**, không spawn Codex thứ hai.
- **`CLAUDE-BOSS`**: Claude làm boss, Codex là **worker**. Worker chỉ làm đúng đề `tasks/T-xxx` được giao, không tự nhận việc, không sửa STATUS, báo cáo theo mục *Báo cáo* của đề.

## Trước khi sửa
1. Đọc `HANDOVER.md`, STATUS hiện hành, `CLAUDE.md` và `AGENTS.md` của app.
2. App: `C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local`, nhánh hiện tại, **không worktree, không đổi nhánh**.
3. **Chỉ một Codex một lúc** trên app. Thấy tiến trình `codex exec` khác hoặc khoá `codex-*.txt` của phiên khác thì **đợi**, không chạy chung (chạy chung bị lỗi 429 và sửa đè nhau).
4. App tắt, cây sạch (`git status`), tag `before-T-xxx`, ghi khoá `<app>/.git/office-locks/codex-T-xxx.txt` (mỗi dòng một đường dẫn).

## Khi sửa
- Test riêng → full suite (`pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop`, thêm `desktop/tools/ffmpeg/bin` vào PATH) → tự review theo `hermes-night-review` Office mode → commit **đúng path** (`git commit -m … -- <paths>`).
- **Cấm** `git add -A`, `stash`, `checkout`, `reset`, `clean`. Lùi bằng `git revert` đúng phạm vi, **không** `reset --hard`.
- `pnpm local:build` chỉ khi cây sạch và app tắt; **không** dùng `pnpm build`. Ghi giờ build vào STATUS.
- Việc nào hỏng 2 lần: `git revert` phần dở, ghi blocker, sang việc độc lập khác.
- Cuối việc: cập nhật STATUS (SHA, giờ build, **đã kiểm**, **chưa kiểm**, **Cần anh chốt**) rồi nhả khoá.

## Dữ liệu và bí mật
- Không đọc/ghi AppData, `worker.sqlite`, profile hay phiên thật khi kiểm; test bằng fixture cùng hình dạng. Giữ media, biên nhận, phiên bản cũ.
- Ngoại lệ T-006: chỉ trong chức năng của app, với file Hộp nhận **mới**, sau khi nhập, nén và kiểm thành công; agent không tự xoá media thật để thử.
- Không in hay commit key, token, cookie, mật khẩu proxy, email, cấu hình tài khoản.

## Điều cấm (không đổi)
- **Push, merge**: chỉ khi người dùng nói trực tiếp trong **chính phiên này**. Không force-push. Bị từ chối non-fast-forward thì `fetch`; cây remote trùng một commit tổ tiên local thì `merge -s ours origin/main` rồi push lại; không trùng thì ghi "Cần anh chốt".
- Đăng bài, gửi DM, dịch vụ trả phí, thao tác tiền/tài khoản ngoài phạm vi duyệt, tự động hoá web Instagram/Flow/Gemini/Muse web.
- **Muse** **[cần anh xác nhận]**: STATUS 14/11 ghi Muse đã bật, giãn nhịp nội bộ không giới hạn lượt. Mặc định giữ phanh: giãn ≥ 60 giây, gặp từ chối/captcha/đăng xuất/2 lỗi liền thì dừng hẳn và bật Tạm dừng, không gửi lại lượt chưa đối soát. Chỉ chạy qua worker của app.
- Quyền "approve all" trong phiên **không** phải yêu cầu bật dịch vụ trả phí, gửi DM hay public dữ liệu mới.

## Chất lượng (rút từ tuần qua)
- Chưa biết là `null`, hiện "—", **không** số 0 giả. Giao diện tiếng Việt có dấu; prompt cho model tiếng Anh; giữ theme graphite–lime và font. Không có trường hay nhãn "AI" trong kịch bản/cảnh/bản xuất.
- **Hình trước, chữ sau**: mỗi màn ≤ 40 từ cố định, có thumbnail thật, **một** nút chính, màu trạng thái thống nhất (xám chờ, lam đang chạy, hổ phách cần người, đỏ lỗi, xanh lá xong). Một câu trạng thái Muse chỉ hiện một lần.
- Mỗi việc có ít nhất **một test ca ngược**: file nhẹ không phình, null không thành 0, không gửi khi thiếu điều kiện. (Lỗi video nhẹ phình từ 21 KB lên 15,7 MB đã lọt qua tự kiểm một lần.)
- Không hạ assertion. Tách rõ fixture, CLI local thật, và dịch vụ/tài khoản thật. URL, cookie, báo cáo cũ hay checkbox **không** là bằng chứng hoàn tất.
- Mở app thật bằng `START-HERMES-CLIP.cmd` (đóng êm bằng CloseMainWindow) một lần sau mỗi build, ghi lỗi console nếu có.
- Báo cáo luôn tách **đã kiểm (kèm lệnh, kết quả)** và **chưa kiểm**.

Không tự chạy script cũ có hành động bên ngoài.
