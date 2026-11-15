# T-022 — Review toàn đợt từ a473b72

Main agent tự review theo skill hermes-night-review Office mode. Spec ở tasks/T-xxx, report trong app ops/office/reports. Không giả reviewer độc lập. Kiểm nội dung dựa trên diff/fixture/ảnh và bằng chứng công cụ thật, không lấy báo cáo cũ làm chứng nhận.

| Việc | Kết luận | Bằng chứng và giới hạn |
| --- | --- | --- |
| Mục 0 | Đạt | Electron mở; module WIP đã giải quyết bằng build; đóng êm, không đổi bảo mật |
| T-012 | Đạt | Schema optional, trim/hash/revision gates, OpenMontage/ASS/audio; 3 MP4 fixture và clip cũ thật, cùng thân |
| T-023 | Đạt phần app | Muse package, ledger/60s/12, refusal/timeout fake; worker thật đã phanh |
| M | Kẹt | 1 gửi/0 clip mới/2 lỗi; video hạn chế vùng, Tạm dừng và không thử lại |
| T-017 | Đạt nháp | 9 ô fixture, snapshot/UTM, 3 draft thật từ clip cũ; chưa tài khoản/landing, chưa đăng |
| T-013 | Đạt | HTTPS/max20/legacy/rea/link; nhãn Khung content giữ view cũ |
| T-014 | Đạt | 9 tab, keyboard/URL, checklist chung, 7,80 USD/×4,4, blank không thành 0 |
| T-015 | Đạt | Menu phòng ban, view cũ, không scroll menu 1366×768, lọc ngày |
| T-018 | Đạt | latest observedAt, null/0 ratio, threshold null, decision append-only |
| T-019 | Đạt | Việt/Anh CSV/TSV, quoted thousand/null/0, preview/invalid, atomic/replay/revision |
| T-020 | Đạt | 10 bước và 3 ca nhóm bổ sung, revision Muse/current render, đúng product/project/section |
| T-021 | Đạt | 13 link + Enter, hai khổ ảnh, Muse chính/manual dự phòng |
| T-022 | Đạt review | Ba lỗi sửa riêng 8a2753d/c9546a4/a38a226; suite cuối và ảnh hồi quy đạt; build cuối ghi STATUS |

Sau bổ sung T-022a/b/c: 764 pass / 1 skip / 0 fail, typecheck đạt; trước bổ sung 760 pass. Một skip montage-live thiếu cấu hình tùy chọn; montage-plan dùng OpenMontage thật. Fixture không là test tài khoản. T-022 có bốn PNG 1366/1920; đã đọc ảnh và kiểm hash/ffprobe của ba MP4 thật từ clip cũ. Không còn phát hiện nặng chưa sửa trong phạm vi app.

Review bổ sung: c0474fb chống trùng cùng thời điểm ISO khác offset, test render/matrix/CSV; c5958fd bảy màn trống/14 ảnh; 8ec2aa5 bảng preview có vùng cuộn bàn phím, list lỗi đúng ngữ nghĩa. Axe 0 violation ở sáu trạng thái, 18 focus, 8 PNG/ARIA snapshot; incomplete giữ nguyên và chưa NVDA/zoom/high contrast. Các review riêng T-022a/b/c ghi giới hạn. HEAD 8ec2aa5/main/stash trống trước/sau pha review chốt; commit tài liệu/build thực hiện sau.

Không giảm assertion: positive render fixture bổ sung plan đúng, thêm negative cho thiếu/cũ; test nhãn T-013 đổi expected đúng nhãn mới; các assertion khác giữ. Không đổi data/evidence, dependency/lockfile, theme/font. AppData/phiên chỉ worker app dùng trong M được người dùng duyệt; không mở DB/profile thô khi review. Không push/merge. HEAD của pha review cuối a38a226, main, stash trống trước/sau; sửa code thực hiện ở các commit riêng, tài liệu commit sau review.

Rủi ro/chưa kiểm: Muse mới còn kẹt, ba video cũ chưa duyệt đúng SKU/công dụng; Meta/DM/Flow/Thùng rác thật và toàn dữ liệu người dùng sau build cuối chưa nghiệm thu. Người dùng chốt ngưỡng/tài khoản/landing; SAC đã tắt, không yêu cầu chỉnh thêm. Không có fix prompt chờ người khác; các phát hiện app đã sửa và tự kiểm.
