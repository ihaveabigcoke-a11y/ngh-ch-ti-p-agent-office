# M-20261114-muse-flow — thoát chờ nhập tay, chạy Muse rồi xuất MP4

- Người dùng giao trực tiếp 14/11: tối ưu để dự án chạy được, kiểm Muse thật theo quyền đã cấp và push GitHub. Một main CODEX-BOSS, không spawn.
- App hiện tại main; tag before-M-20261114-muse-flow. Đề này thay yêu cầu chỉ sửa hiển thị của video-recovery.

## Mục tiêu
Làm video phải dùng Muse khi sẵn sàng; lỗi/chưa sẵn sàng phải dừng và nêu bước xử lý, không tự chuyển thành trạng thái đợi người dùng nhập file vô hạn. Nhập tay chỉ theo lựa chọn rõ của người dùng. Tiếp tục dự án đang có, giữ clip và receipt, không gửi lại lượt chưa rõ.

## Tiêu chí đạt
- [x] Cảnh manual chưa gửi chuyển lại Muse bằng một hành động; queued được tiếp tục, cancelled/failed chưa gửi được retry hữu hạn.
- [x] Job đã gửi/không rõ giữ receipt và chặn gửi trùng; lỗi trước gửi được phân biệt với từ chối dịch vụ.
- [x] Không kết luận NO_MEDIA sau 15 giây cho phản hồi chỉ báo đang tạo; chờ thời hạn cấu hình, vẫn dừng sớm từ chối rõ/captcha/quota.
- [x] Dự án UI và nút Làm video trỏ cùng một dự án; progress rõ, dừng có lý do, lựa chọn nhập tay riêng.
- [x] Fixture chạy từ manual → Muse giả → nhận 5 clip → 3 MP4, retry không nhân đôi; UI 1366/1920.
- [x] Test riêng + full suite, review hermes-night-review Office mode, commit đúng path/build cây sạch/app tắt.
- [ ] Kiểm lượt Muse thật qua app hiện có, không mở trực tiếp DB/profile/credential; tách kết quả dịch vụ khỏi fixture. Giới hạn dịch vụ được giữ, không đổi vùng/tài khoản để vượt chặn.
- [x] Push app và checkpoint văn phòng lên origin main khi kiểm đạt, không force/merge; kiểm SHA remote. Không đưa dữ liệu thật mới lên Git. App 5293561; checkpoint văn phòng kèm commit này.

## Quyền và giới hạn
Quyền test Muse thật/push do người dùng trực tiếp cấp; không đăng bài/DM/paid API, không gọi Flow/Gemini/Instagram. Không reset --hard, không hạ assertion, không xóa media/record. Chỉ đọc trạng thái thật qua API/IPC app; không in cookie/key/tài khoản.

Chỉ đạo bổ sung mới nhất: không bao giờ tự tắt Muse. Công tắc giữ bật khi lượt lỗi; chỉ chặn dispatch cần đối soát/giới hạn dịch vụ và có nút tiếp tục sau kiểm tra. Không đóng phiên Muse thật.

Checkpoint: cec3004, 805 kiểm đạt/0 skip; fixture 1 click → 3 MP4, 8 PNG hai khổ. Build cây sạch 23:02:01 +07. Auto-review chặn mở app thật vì luật AppData, đã hỏi ngoại lệ; chỉ kiểm QA riêng trong lúc chờ. Không coi fixture là nghiệm thu dịch vụ.
