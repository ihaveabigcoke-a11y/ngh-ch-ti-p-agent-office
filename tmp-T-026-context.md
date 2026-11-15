# T-026 — bảy màn gọn theo luồng ra video, 13/11/2026

Chỉ đạo trực tiếp T-026 thay T-024b/T-025; phần T-024 đã đạt được giữ. CODEX-BOSS, một main agent. Người dùng cho phép push app origin main sau từng phần đạt full suite và push văn phòng cuối; không force-push/merge. Chỉ đạo này thay các dòng cấm push lịch sử bên dưới trong phạm vi T-026.

Menu: Tín hiệu & Phòng chờ (mặc định) → Hôm nay → Săn sản phẩm → Sản phẩm → Video → Đăng → Kết quả; Cài đặt riêng. View cũ giữ được qua URL và Hiện màn nâng cao. Hôm nay ba thẻ, kéo thứ tự; chọn sản phẩm tự đặt mã/hạng, vẫn sửa được. Sản phẩm có sáu ô và hồ sơ cũ trong Chi tiết; dán nội dung nguồn khi chưa đọc được listing, không bịa giá/SKU.

Video có ba hàng cùng thước, ba hook thay thế: phóng đại vấn đề / tự chế ngớ ngẩn / tò mò. Làm video chạy production commands hiện có, chọn đoạn kỹ thuật, giữ tiếng gốc, xuất ba MP4 chung thân và tên ổn định. Muse tạm dừng/từ chối chuyển tay, kết quả chưa rõ cần đối soát, receipt cũ giữ nguyên. Trần lượt chỉnh được (mặc định 12), giãn ít nhất 60 giây. Trong T-026 chỉ Muse giả; không gửi Muse thật.

Đăng có cột tài khoản động, Chia đều, tải/caption có UTM, dán URL đăng tay. Không tự đăng. Kết quả có ba số, unknown là —, nhập nhanh và Nhập nhiều. Hai ngưỡng 48 giờ mặc định null: chưa đặt không kết luận. Quy tắc đang dùng khi đã đặt: đủ cả hai → Đẩy; dưới cả hai → Bỏ; còn lại → Đổi hook. Hạng theo trung bình lượt xem/bài của ba hook trong cùng sản phẩm/đợt, chỉ mô tả, không chứng minh quan hệ nhân quả khi khác tài khoản. Đổi hook giữ nguyên đoạn thân và lịch sử.

Nghiệm thu: script scripts/check-t026i-ui.mjs đo chữ cố định toàn trang gồm menu (fixture rỗng): 40/28/34/30/38/33/31 theo thứ tự bảy màn; đầy có ảnh/MP4 kỹ thuật tải thật, không ảnh vỡ, một nút chính, 28 PNG 1366/1920. scripts/check-t026f-ui.mjs dùng Muse giả + OpenMontage local: một click → ba MP4 720×1280 khoảng 15 giây; retry không nhân đôi; từ chối sau submitted chuyển tay giữ receipt. Kiểm đổi hook giữ thân và rank/null ở tests/auto-video.test.mjs.

Không đọc/ghi AppData, DB/profile/phiên người dùng; không đăng, DM, paid API hoặc tự động hóa web tiêu dùng. Chưa kiểm Muse thật, tài khoản/Insights thật, chất lượng/SKU của video sản phẩm, trình đọc màn hình. Bằng chứng fixture không thay nghiệm thu dịch vụ thật. SHA, full suite và build/launcher cuối xem STATUS văn phòng; báo cáo ops/office/reports/T-026i.md. Các phần bên dưới là lịch sử, không dùng để ghi đè T-026.

---

