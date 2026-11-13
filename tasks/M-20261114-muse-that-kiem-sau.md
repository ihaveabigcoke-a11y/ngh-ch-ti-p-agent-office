# M-20261114: Kiểm Muse thật xuyên suốt trong Hermes Clip

- **Repo / tầng:** Hermes Clip, app main `22e66a4`; một main Codex.
- **Người giao:** người dùng trực tiếp: “Bạn cứ test muse thật đi, test sâu vào”, 14/11/2026.

## Mục tiêu
Kiểm phiên Muse hiện có qua worker của app, tạo clip mới và theo dõi lượt thật trên Tín hiệu. Khi có clip hợp lệ, kiểm nhập take, dựng ba MP4 chung thân, phát/tải và bảo toàn lịch sử.

## Phạm vi
- Mở app trong chế độ HERMES_MUSE_ONLY; chỉ worker dùng phiên đã có. Agent thao tác qua UI/API/IPC của app, không đọc/ghi trực tiếp AppData, DB, cookie hay file profile.
- Chọn một sản phẩm thật có ảnh tham chiếu và đủ đầu vào qua app; dùng dự án kiểm mới, giữ hồ sơ/cảnh/media/receipt cũ. Không gửi fixture giả tới Muse.
- Xem hạn mức và đối soát trước gửi; giãn tối thiểu 60 giây, trong trần phiên đang cấu hình. Dừng khi từ chối/captcha/đăng xuất/cảnh báo hoặc hai lỗi liên tiếp. Không reset phanh hoặc gửi lại lượt chưa rõ.
- Không Instagram/DM/đăng bài, paid API, đổi bảo mật, xóa media/record hoặc xuất thông tin phiên. Bằng chứng thật ở outputs/M-20261114 bị Git bỏ qua; báo cáo chỉ số tổng hợp.
- Quyền kiểm Muse thật mới này thay giới hạn Muse giả của T-026 riêng cho đợt nghiệm thu này. Không suy rộng sang dịch vụ khác hoặc công khai media/dữ liệu mới.

## Giao diện
Kiểm Tín hiệu, Video và chi tiết lượt trên app đang dùng; ảnh 1366/1920 khi có dữ liệu nghiệm thu phù hợp. Giữ theme/font.

## Tiêu chí đạt
- [x] Ghi phiên/giới hạn trước kiểm, tổng lượt gửi/thành công/lỗi và trạng thái cuối.
- [ ] Lượt mới có receipt, clip thật nhập đúng take; Tín hiệu phản ánh chuyển trạng thái đúng.
- [ ] Kiểm hash/container/full decode và phát; ba MP4 có ba hook chung thân khi đầu vào đáp ứng.
- [ ] Kiểm bấm lại không gửi/dựng trùng, lỗi giữ receipt và media/lịch sử cũ không đổi.
- [ ] Ghi riêng phần đạt/chưa đạt/blocker; nếu sửa source thì app tắt, khóa/tag, test/full suite/build trước kiểm lại.

## Cách kiểm / báo cáo
Thao tác app hiện có qua UI/IPC, chỉ worker gọi Muse thật. Kiểm metadata/hash bằng API và công cụ local. Tránh gây lỗi/captcha cố ý trên tài khoản thật. Review Office mode, cập nhật STATUS; không đưa media hay dữ liệu phiên mới vào Git.

## Phát hiện và sửa trong đợt kiểm
- Muse trả lời từ chối video theo vùng nhưng gắn metadata presentation cho thẻ gợi ý. Adapter nhận nhầm mã kết quả rồi chờ media.
- Sửa desktop/src/muse.mjs: thẻ kết quả chat phải có video/img; đọc cả phản hồi có gợi ý; đường lấy receipt cũ phát hiện phản hồi ổn định không media và kiểm guard.
- Regression DOM trình duyệt local, giữ assertion cũ; full suite và build sạch trước mở lại. Không gửi Muse mới sau từ chối, không reset ledger.

## Kết quả chốt
- App b05d591, build 14/11 01:20:19 +07; 789 kiểm đạt sau khép OpenMontage, typecheck đạt. 52/52 Muse; không đổi assertion.
- Một lượt mới/0 clip, dịch vụ trả lời từ chối video theo khu vực. Tạm dừng, không gửi lại. Giữ ledger 2 gồm một lượt cũ; số lỗi ledger 1 có trước đợt kiểm.
- Restart/chặn gửi/bấm lại/ảnh 1366 và 1920 đã kiểm thật. 67 record cũ nguyên hash, không mất job; chỉ một job cũ được đối soát thay đổi lịch sử.
- Chưa đạt tiêu chí clip mới/ba MP4; không nghiệm thu lại bản sửa bằng lượt gửi thật sau từ chối. Biên nhận cần đối soát vẫn giữ, không sửa giả trạng thái.
- Đã tự review Office mode, app đóng êm/cây sạch/nhả khóa chính phiên. Commit local, không push. Bằng chứng riêng tư chỉ ở outputs/M-20261114 của app; đầu STATUS/REVIEW-M-20261114.md có checkpoint.
