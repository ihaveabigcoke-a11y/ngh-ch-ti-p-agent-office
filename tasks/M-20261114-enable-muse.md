# M-20261114-enable: bật lại Muse và sửa trần lượt nội bộ

- **Repo / tầng:** Hermes Clip, app main hiện tại.
- **Người giao:** người dùng trực tiếp · **Worker/Boss:** một Codex · **Ngày:** 14/11/2026.

## Mục tiêu
Bật được Muse sau khi phiên dừng. Cho phép bỏ trần lượt do Hermes đặt, không xóa lịch sử hoặc bỏ kiểm hạn mức dịch vụ.

## Phạm vi
- Worker/MuseNight, công tắc Muse, cài đặt nhịp, luồng gói/video và test tương ứng.
- Người dùng trực tiếp yêu cầu bật Muse thay chỉ đạo tạm dừng lịch sử. Bật qua chức năng app; không mở DB/profile/AppData bằng công cụ kiểm.
- Giữ receipt/media/record; không gửi lại job cũ, đổi vùng/tài khoản, trả phí, đăng/DM hoặc push.

## Bố cục giao diện
- Tài khoản Muse: công tắc hoạt động khi dừng, modal giải thích bật lại và giữ lượt cũ.
- Cài đặt: tùy chọn Không giới hạn lượt trong Hermes; giãn tối thiểu 60 giây; nêu hạn mức dịch vụ riêng.
- Giữ theme/font; kiểm 1366 và 1920.

## Tiêu chí đạt
- [x] Bật lại có xác nhận rõ; không tự mở browser hoặc dispatch; lỗi mới vẫn dừng.
- [x] Resume giữ submissions/outcomes/receipt, ghi lịch sử bật lại; chống gửi trùng còn hiệu lực.
- [x] Không giới hạn dùng null, đi xuyên preview/UI/auto-video; cap hữu hạn vẫn kiểm đúng khi người dùng chọn.
- [x] Full suite, typecheck và build cây sạch/app tắt; kiểm launcher QA.
- [x] Bật Muse qua app thật theo lệnh trực tiếp, chỉ xuất trạng thái tổng hợp; tách rõ bật thành công với tạo clip dịch vụ.

## Cách kiểm
Test Muse riêng, pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build. Test hồi quy null không bị hiểu là 0, giữ phanh thật, lỗi mới dừng lại, job cũ không chạy.

## Báo cáo
Ghi REVIEW-M-20261114-enable.md và đầu STATUS: SHA/build, đã kiểm/chưa kiểm; nhả khóa chính phiên.
