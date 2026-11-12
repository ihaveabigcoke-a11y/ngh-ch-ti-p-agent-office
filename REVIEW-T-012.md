# T-012 — tự review Office mode

Một main agent đọc spec, diff từ before-T-012, source domain/API/IPC/compose/UI và kết quả kiểm; không có reviewer độc lập.

| Phần | Kết luận | Bằng chứng |
|---|---|---|
| Legacy và nguồn render | Đạt | Schema optional, gates ID/take/hash/revision, domain test |
| Cắt/ghép/chữ/tiếng | Đạt local | OpenMontage ghim revision, pixel glyph vùng trên và tone từng đoạn, ±0,1s |
| Ba hook chung thân | Đạt fixture | 3 variants, cùng segments thân/overlays/CTA, 3 MP4 |
| UI/asset/export | Đạt local | 4 ảnh 1366/1920; lưu và render qua API thật trên DB kiểm riêng |
| Muse thật | Chưa kiểm | Làm tiếp mục M/T-023 được người dùng cho phép |

Không hạ assertion hoặc xóa test; không đổi data/, evidence/, lockfile/dependencies, theme/font. Không truy cập AppData thật. Mục 0 chỉ mở QA Electron: lỗi module chưa build, đã thoát qua app.quit, không kill. Các lần sửa test gồm đường dẫn fixture chưa tạo và định dạng đối số FFmpeg; không dùng chúng để tuyên bố kiểm thành công. Kết quả cuối đạt 723/1 skip/0 fail.

Rủi ro còn lại: chất lượng nội dung, Electron IPC và Muse thật chưa nghiệm thu; chưa phát bằng trình phát mặc định. Không cần người dùng duyệt code, tiếp tục trong phạm vi được giao.

Review chỉ đọc source; HEAD/nhánh/stash không thay đổi trong review. Commit do cùng main agent thực hiện sau review.
