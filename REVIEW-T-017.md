# Review T-017 — Office mode

| Tiêu chí | Kết luận | Bằng chứng |
|---|---|---|
| 3×3 = 9 draft/ô | Đạt fixture | hook-matrix.test + SQLite API test + script check-t017-ui |
| Cùng CTA/giá/landing | Đạt | bản điều kiện bất biến; API chặn giả/sửa snapshot; UI cảnh báo CTA khác |
| UTM, null, dữ liệu cũ | Đạt | 9 UTM khác nhau, legacy parse, null không thành 0 |
| Chống trùng và giao dịch | Đạt | retry giữ chỉnh sửa, account lạ rollback không lưu một phần |
| MP4 đúng bản xuất | Đạt | kiểm plan/hash/asset/metadata; UI xem đúng render, không tự fallback nguồn |
| Ảnh 1366/1920 | Đạt | outputs/T-017-ui, 5 PNG; main agent xem |
| Ba draft trên dữ liệu thật | Đạt | build 6c09a9f, nút app tạo đúng 3 draft/MP4; PAWS, 5,99 USD từ hồ sơ; account thiếu, landing/UTM null. Không đăng, Muse không gửi thêm |

Không giảm/xóa assertion; không đổi data/evidence/dependencies/theme/font. Giới hạn: giao dịch nhóm draft là desktop local; worker đăng render chưa mở rộng và không thuộc nhiệm vụ đăng đêm này. Null/source/observedAt giữ rõ. Diff đã so before-T-017; lỗi header JSON và xem nhầm source đã sửa trước commit. HEAD f098843/main/stash không đổi trong review; chỉ báo cáo được ghi. Full suite cuối: typecheck đạt, 733 test đạt/1 skip/0 lỗi.
