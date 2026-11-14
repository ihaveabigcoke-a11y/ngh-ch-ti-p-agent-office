# T-035 — tự review Office mode

Đọc đề T-035, diff before-T-035..fa41fbc và bằng chứng local. Dùng skill hermes-night-review, không agent phụ. Review chỉ đọc source, viết STATUS/REVIEW; HEAD fa41fbc, branch main, stash rỗng không đổi trong review. Người dùng cho phép nghiệm thu thật qua app; không đọc/sửa trực tiếp AppData/DB/cookie/token. App tự lưu media/receipt mới là tác động đã được giao.

| Tiêu chí | Kết luận | Bằng chứng / giới hạn |
| --- | --- | --- |
| Chi: phản hồi nguyên văn, phân biệt tầng | Đạt chẩn đoán, còn blocker | chi-ipc.json; command đầu prompt đúng; adapter chung, không nhánh theo tên. Muse nói quyền/vùng; chưa chứng minh backend403. recheckResult hai lần không có snapshot ổn định; giữ receipt/phanh, không gửi lại. |
| Ba thẻ theo thứ tự prompt | Đạt | muse-bundle/muse/worker; Scene 1/2/3, appearance-v1, giữ lần quan sát đầu qua DOM reorder; legacy không tự remap. Hai bộ thật đúng ordinal/hook trên contact sheet. |
| Tải/dựng song song, không nhận bộ lỗi | Đạt | t035-bundle: đủ/trùng hash gốc/trùng hash đầu ra/thiếu/sai kích thước; 0 imports khi lỗi, công tắc giữ bật. Chromium local thật chạy blob khi Stop còn hiện. Live tải cách nhau 3/8ms, dựng 160/154ms, 6 file nguồn và 6 MP4 đã hash/ffprobe/decode. |
| Gián đoạn không nhận lẻ | Đạt | fa41fbc chặn resume appearance-v1 cho leader/child, kể cả recoverExisting. Test giữ nguyên job/receipt/công tắc, không fetch. Gói gián đoạn còn cần đối soát cả bộ; không tự gửi lại. |
| Ngân sách/pacing | Đạt | 2 lượt, 2 profile cách nhau197ms; cùng profile cách lượt trước1874s/2045,408s; 0 Chi. Ledger giữ, giới hạn về null sau đo. |
| Auto dưới ba hồ sơ | Đạt code/fixture, chưa click thật riêng | Chỉ nhận gói đủ/hash đạt mới ghi xác minh; auto khi dưới3; từ3 gửi riêng. Hai bộ thật kích hoạt cờ; không dùng thêm lượt chỉ để kiểm default. |
| Full suite, assertion, bảo toàn | Đạt | 278+29+534+8=849 kiểm; full desktop 534 đạt, không skip, có OpenMontage local. Không xóa/hạ assertion. Ma trận mode cũ đổi theo điều kiện mới, thêm kiểm preview. Fixture gate race đã sửa chờ bounded, không bỏ concurrency. 106 records/71 jobs/56 hash cũ nguyên sau restart. |
| Số đo và giới hạn | Đạt báo cáo | 76,123s/87,636s so150,052–155,191s; mốc gọi production handler, không DOM click. Có thân cũ. Chưa dưới60s, quyền Chi, SKU/chất lượng. |

Rủi ro: thứ tự là hợp đồng người dùng mới chốt, không chứng minh Muse luôn tuân mô tả. Speculative render chỉ ghi receipt nội bộ, chưa nhận take/export khi bộ thiếu/trùng; file lỗi được giữ để đối soát. Có chữ tự sinh trên mũi tên, cần người dùng duyệt trước đăng. Ảnh/sample không chứng minh công dụng hay SKU.

Chạy tiếp: mở Video/Thư viện xem hai bộ mới. Chi cần xác minh quyền video hiện tại, đối soát receipt qua app rồi mới cân nhắc đúng một lượt đã duyệt; không reset/đổi vùng/tắt công tắc. Không có fix prompt code bắt buộc còn lại; blocker dịch vụ/đối soát ghi rõ trong STATUS. Không thay theme/font/data/evidence/dependencies, không đưa media/receipt mới lên Git.

Kiểm bàn giao bổ sung: build 05:36:44 +07, source fa41fbc, restart và IPC/API chỉ đọc đạt; hai lượt gửi, 120 records/77 jobs, hai bộ ba exports. Snapshot records/jobs gốc còn nguyên sau restart cuối. 56 hash media đã kiểm sau build trước guard; không gọi đó là kiểm hash lại sau build cuối. Chi vẫn dừng gửi, công tắc giữ bật. Không có yêu cầu Muse mới.
