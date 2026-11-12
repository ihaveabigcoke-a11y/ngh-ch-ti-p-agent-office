# T-010: Đợt chọn theo ngày và view theo dõi trong app

> Chỉ đạo trực tiếp mới nhất: không ghi snapshot, không dùng repo production-office. T-010 dùng `buildOfficeView` và GET `/api/lab?view=office`; T-011 thêm hai màn trong Hermes. Patch phòng ban chỉ tham khảo. Mốc media local thật được nghiệm thu chung sau T-011.

- **Repo / tầng:** hermes-clip · domain, SQLite local, desktop và Nghiên cứu.
- **Người giao:** người dùng trực tiếp · **Thực hiện / tự review:** một main agent Codex · **Ngày:** 13/11/2026.

## Mục tiêu
Giữ hồ sơ sản phẩm ổn định qua nhiều ngày, ghi mã và thứ hạng do người dùng chọn. Cung cấp view v1 cho hai màn theo dõi ngay trong app; dừng cùng T-011 tại mốc nghiệm thu 1.

## Phạm vi
- Làm: schema optional, lượt chọn ngày VN, giao dịch nguyên tử chọn/bỏ chọn, gợi ý mã nhưng không tự lưu, xếp hạng 1–3, bộ đếm theo ngày/toàn kỳ.
- Làm: hàm thuần `buildOfficeView(records, workerStore, manual, integrations, now)`, đọc qua route local đã xác thực, không I/O trong hàm và không ghi file snapshot.
- **Không** làm: T-012 renderPlan/cắt ghép/ba hook, đổi menu/phông/theme, Muse/API trả phí, dịch vụ/tài khoản thật, đọc AppData/worker.sqlite/profile thật, push/merge.
- Không đổi ID, không tự gán mã cho record cũ; record cũ thiếu ngày/mã/rank vẫn đọc được. Ngày cũ suy từ created_at theo VN, không từ lần sửa cuối.

## Bố cục giao diện
- Đầu khối chọn trên Nghiên cứu: Hôm nay n/3, tổng lượt, sản phẩm khác nhau. Khi chọn: mã sản phẩm (gợi ý riêng, phải xác nhận), hạng 1–3 và lý do, trong dialog dùng kiểu hiện tại.
- Hồ sơ đã có cùng mã được dùng lại, không ghi đè ghi chú/giá của hồ sơ. Hạng do người dùng chọn, không có chấm điểm tự động.
- Hai màn T-011 đọc dữ liệu này; T-010 không thêm cấu hình thư mục Office.
- Nhãn tiếng Việt có dấu, prompt tiếng Anh; chụp 1366 và 1920 px.

## Tiêu chí đạt
- [x] Một ngày VN có tối đa 3 sản phẩm trên tất cả đợt; rank 1–3 duy nhất. Tranh chấp/retry không tạo trùng hoặc lưu một nửa.
- [x] productKey do người dùng xác nhận, duy nhất và bất biến; cùng mã qua hai ngày dùng một productId, selectionCount=2. Dữ liệu/ID cũ được giữ.
- [x] Fixture hôm nay 3 + hôm qua 1 khác còn việc: ngày hôm nay 3 ID, 4 active, totals.distinctProducts=4; unknown/null không thành 0.
- [x] View đúng phần dữ liệu contract trong CLAUDE.md: 10 nhóm, ready thiếu asset chưa vào Thư viện, history tối đa 20, các đơn vị đếm riêng; không có secrets/đường dẫn tuyệt đối/prompt đầy đủ.
- [x] Hàm thuần không ghi file; route giữ xác thực cookie, chặn host/origin lạ. Giao dịch chọn nguyên tử khi lỗi/retry/hai tab.
- [x] Một thao tác media local thật bằng dữ liệu kiểm cô lập đi qua pipeline Hermes và đổi view; báo rõ DB kiểm cô lập khác dữ liệu/tài khoản thật. Bằng chứng chung ở T-011, không xóa media người dùng để thử.
- [x] Hồi quy phù hợp và 5 lệnh chuẩn đạt, không hạ assertion. Tự review Office mode và ghi bằng chứng.

## Cách kiểm
```powershell
pnpm typecheck
pnpm test
pnpm test:api
pnpm test:desktop
pnpm local:build
# Thêm desktop/tools/ffmpeg/bin vào PATH. Full suite/build chỉ khi app tắt, không có WIP phiên khác.
```
Test tập trung: selection thuần, HTTP + SQLite local có giao dịch/retry, view thuần, UI fixture ở hai khổ.

## Báo cáo
- Baseline: app 17cb38c; tag before-T-010; tài liệu người dùng được cài bằng commit cce6b4e (đúng AGENTS.md và CLAUDE.md).
- Khác mục 3 CLAUDE: T-005 đã tự tạo hồ sơ qua ID research_batch_candidate, tái dùng production theo productId; T-007 đã có shot/overlay v2, T-008 đã có rea-video. Không port engine cũ hoặc sửa lại các luồng đó.
- Đã kiểm: commit `4f759c3`, typecheck; domain 213/213, API 28/28, desktop 475 pass / 1 skip / 0 fail; build cây sạch lúc 02:24:51 13/11/2026 +07. Bốn ảnh 1366/1920 tại app `outputs/T-010-ui`; xem `REVIEW-T-010.md`.
- Chưa kiểm: dữ liệu/profile/tài khoản thật. MP4 local mới trên DB kiểm riêng được nghiệm thu ở T-011.
- Cách chạy thử: Nghiên cứu → chọn ứng viên → tự nhập mã, hạng, lý do; cùng mã ở đợt khác dùng lại hồ sơ. Báo cáo app: `ops/office/reports/T-010.md`.
