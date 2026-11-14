# M-20261114-video-type — tự review Office mode

Một main CODEX-BOSS tự review theo hermes-night-review; không có reviewer độc lập. Tag before-M-20261114-video-type và HEAD lúc review đều 529356103239e5097f8447982e210ff02be8fd54, main, stash rỗng; không đổi trong lượt review.

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| Job video không nhận thumbnail tài liệu | Đạt fixture DOM | mediaCards theo loại yêu cầu; submit/inspect/fetch yêu cầu video |
| Receipt cũ trỏ tài liệu không tải thành MP4 | Đạt fixture DOM | Chờ phản hồi ổn định/kết thúc, trả MUSE_NO_MEDIA kèm phản hồi; không gọi download |
| Chờ clip tới muộn, không gửi lặp | Đạt fixture | Thẻ video được nhận; phản hồi trung tính vẫn chờ timeout; tài liệu ổn định 15 giây báo chưa có file |
| Kiểm cảnh báo trước tải | Đạt | Giữ test guard, sửa lỗi thiếu request của bản dở; không hạ assertion |
| Full suite | Đạt | typecheck, 272 domain, 29 API, 505 desktop; OpenMontage skip do thiếu env đã chạy riêng 1/1 = 807 kiểm khác nhau đạt |
| Giao diện 1366/1920 | Đạt fixture | 8 ảnh check-muse-flow-ui; 1 click tạo 3 MP4 bằng OpenMontage local; bấm lại không nhân đôi; lỗi không xuất manual hoặc tắt công tắc |
| Muse thật | Đối soát đạt; chưa có clip mới | Hai receipt thật trở về MUSE_NO_MEDIA; không gửi mới, Muse bật. Phản hồi nhắc không tạo video và tài khoản/khu vực; 73 record/45 job cũ nguyên checksum |

Diff chỉ desktop/src/muse.mjs và desktop/test/muse.test.mjs. Không sửa dependency/lockfile, theme/font, data/evidence hoặc công tắc Muse. Không xóa media/receipt. Bản dở có một test guard lỗi, đã sửa và chạy lại đạt. Không có hai lần lỗi cùng một phần.

Rủi ro còn lại: Muse có thể đổi DOM; tài liệu thay video không chứng minh quyền tạo video của dịch vụ. 3 MP4 fixture không chứng minh đã có clip Muse mới. Cần người dùng duyệt nội dung/SKU trước đăng. Không gửi bài/DM hoặc gọi API trả phí. SHA/build/push và kết quả kiểm thật cuối xem STATUS.md.

Hoàn tất: 92307c6 đã push origin/main, build 23:29:59 +07 ngày 14/11/2026, cây sạch/Electron không chạy trước build. Launcher mở thật sau build; bốn ảnh UI/IPC thật 1366/1920 trong outputs/M-20261114-video-type-live chỉ lưu local. Giữ công tắc bật và app mở. Hàng chờ vẫn chặn gửi sau hai lỗi, không coi Muse bật là đã có quyền tạo video; nhãn Muse sẵn sàng của Video chỉ phản ánh công tắc. Không nghiệm thu clip mới/3 MP4 mới.
