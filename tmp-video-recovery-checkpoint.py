from pathlib import Path
r=Path('D:/agent-office/ngh-ch-ti-p-agent-office')
checkpoint='''# M-20261114-video-recovery — đã sửa màn Video, 14/11/2026

- App main **2b1a1cb** cục bộ, chưa push. Tag before-M-20261114-video-recovery = 9d160c4. Build **12:08:02 +07**, exit 0, app tắt/cây sạch; source sạch sau build.
- Sửa lỗi xuất gói cùng phút bằng path riêng, giữ gói cũ. Thư viện hiện clip/bản xuất của mọi dự án trong sản phẩm, ghi dự án nguồn; không coi clip cũ là clip mới. MUSE_NO_MEDIA/unknown có lý do và bước tiếp theo; path gói còn sau reload.
- Đã kiểm: typecheck, **270 domain + 29 API + 498 desktop**; 1 OpenMontage bị skip trong full suite đã chạy riêng 1/1 đạt = **798 kiểm khác nhau đạt, không lỗi còn lại**. Focused 6+16 đã nằm trong tổng này, không cộng trùng.
- UI fixture: 4 gói cùng phút/hai dự án, byte gói cũ giữ nguyên; 5 clip + 3 MP4 cũ phát được; record cũ nguyên trạng, reload/đổi sản phẩm đạt, 0 gửi Muse/request ngoài. 4 PNG 1366/1920 tại app outputs/M-20261114-video-recovery-ui.
- Launcher thật với QA riêng: IPC export lặp + reload đạt, 2 PNG tại outputs/M-20261114-video-recovery-desktop-ui, 0 lỗi console/request ngoài, đóng êm bằng CloseMainWindow. Không mở DB/profile thật để kiểm.
- Đã mở lại cửa sổ app cho người dùng; giữ chế độ Muse-only của phiên trước để không tự boot hàng chờ research/đăng/manual ngoài phạm vi. Chưa nghiệm thu nhập file thật qua watcher trong phiên hạn chế này; launcher bình thường khởi động watcher theo cấu hình sẵn có.
- **Chưa kiểm:** tạo clip Muse mới/quyền video/khu vực, chất lượng nội dung/SKU. Không gửi lại Muse, không đổi công tắc/ledger/receipt thật trong việc này. MUSE_NO_MEDIA không được báo thành công.
- **Cần anh chốt:** không có. Tự review [REVIEW-M-20261114-video-recovery](REVIEW-M-20261114-video-recovery.md). Nhả khóa chính phiên; giữ toàn bộ WIP văn phòng có trước. Không push/merge.

---

'''
p=r/'STATUS.md';s=p.read_text(encoding='utf-8');prefix='Chế độ: CODEX-BOSS\n';assert s.startswith(prefix);p.write_text(prefix+checkpoint+s[len(prefix):],encoding='utf-8')
p=r/'HANDOVER.md';s=p.read_text(encoding='utf-8');p.write_text(checkpoint+s,encoding='utf-8')
