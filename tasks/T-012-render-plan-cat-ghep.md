# T-012: Chọn đoạn, ghép chữ và ba hook trên cùng thân video

- **Repo / tầng:** Hermes Clip · domain, React, IPC, FFmpeg local.
- **Người giao:** người dùng trực tiếp · **Thực hiện/tự review:** một main agent · **Ngày:** 13/11/2026.

## Mục tiêu
Từ take đã duyệt, người dùng chọn đoạn thực tế để xuất một MP4 có chữ và giữ tiếng gốc. Ba biến thể hook dùng chung thân, CTA và giá; không sửa thời gian shot dự kiến.

## Phạm vi
- Lưu renderPlan 9:16, 720×1280, segments có scene/take/asset/hash và in/out; overlays có thời gian/style; audio keep. Legacy optional.
- Form chọn đoạn và chữ trong Ghép và xuất; kiểm đầu vào ở domain và desktop; bản render có receipt/hash/ffprobe, content_plan.variantId optional.
- Tái dùng công cụ local hiện có; xác định khả năng OpenMontage trước khi chọn FFmpeg. Không gọi dịch vụ hay sửa nguồn media/phiên thật, không push/merge.

## Bố cục giao diện
Mỗi biến thể ở Ghép và xuất có nút Chọn đoạn & chữ; bảng cảnh/đoạn vào/ra và chữ đè/từ/đến. Tổng thời lượng thực tế riêng với shot dự kiến. Xuất gói prompt và MP4 đã kiểm tách nhãn. Giữ theme/font, ảnh 1366/1920.

## Tiêu chí đạt
- [ ] Plan kiểm ID/take duyệt/revision/hash, in < out ≤ thời lượng nguồn, chữ trong timeline, không sửa shot dự kiến; legacy đọc được.
- [ ] Render thật trên MP4 kỹ thuật riêng: 720×1280, hash, giải mã được; audio gốc còn, thời lượng audio/video lệch ≤0,1 giây; overlay xuất hiện đúng vùng/thời gian.
- [ ] Ba hook dùng cùng body segments, CTA/caption; provenance đi vào bản xuất và variantId đi vào content_plan.
- [ ] UI chọn/lưu/render qua đường hiện có, 1366/1920; lỗi không tạo bản xuất giả.
- [ ] Test phù hợp/full suite/local:build, commit đúng path, review và STATUS; app tắt, không WIP phiên khác.

## Cách kiểm
pnpm typecheck; pnpm test; pnpm test:api; pnpm test:desktop; pnpm local:build. Thêm desktop/tools/ffmpeg/bin vào PATH. MP4 và DB kiểm riêng; Electron bị SAC chặn nên kiểm UI trên server local bằng Chrome, báo rõ giới hạn.

## Báo cáo
Sẽ ghi SHA, kết quả, ảnh và đã kiểm/chưa kiểm sau triển khai. Bước 0 SAC đã thử a–d, bằng chứng ở outputs/SAC-20261113; không đổi bảo mật hệ điều hành.
