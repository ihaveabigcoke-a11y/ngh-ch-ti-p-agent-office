# Review T-037 — một Codex, Office mode

| Tiêu chí | Kết luận | Bằng chứng |
| --- | --- | --- |
| Receipt/đối soát | Đạt | IPC giữ phản hồi gốc, hai lượt mục tiêu reconciled=true. Pha đầu còn sáu lượt bị guard chặn, một receipt chữ cũ được khép; không gửi lại. |
| Một gửi đúng Chi | Đạt | Job 23613441…, preferredProfileId Chi; ledger tăng đúng 1. Cảnh 1 đã duyệt, command đúng, timeout 900s. |
| Kết quả video | Không có clip | Muse tự mô tả lasting restriction/403 video_not_available; terminal MUSE_NO_MEDIA sau 76,773s. Chưa xác minh HTTP/entitlement độc lập. |
| Phanh/công tắc | Đạt | Đầu kỳ mới stopped=false, không reset. Cuối Chi stopped=true, Muse/ba hồ sơ giữ bật, worker paused/active0/budget0. |
| Source | Đạt | cd31ad6 chờ chữ hydrate ≤30s; giữ đúng prompt/Stop/media/receipt. IPC kiểm profileId rồi dùng pin job có sẵn. Không thay timeout tạo video, UI/theme/font. |
| Kiểm | Đạt | Typecheck +862/862 không skip:278 domain+29 API+547 desktop+8 Codex. Full desktop concurrency2; Muse giả, FFmpeg/OpenMontage local thật. |
| Bảo toàn | Đạt trong phạm vi đã đo | 77 job cũ đủ, providerResponse cũ nguyên; cuối78 job. Không đọc trực tiếp DB/cookie/token hoặc push snapshot tài khoản. App tự dùng phiên/ghi receipt theo T-037. |

Tự review, không reviewer độc lập. Không thay data/evidence/dependencies/lockfiles. Không hạ/xóa assertion cũ. Test mới ban đầu vướng RAM thật, sửa fixture memory8GiB không nới assertion. Không thay nội dung prompt cảnh, chỉ tên job phép thử và chuẩn command có sẵn. Pha review trước commit giữ HEAD42bac14/main/stash rỗng; pha review sau source giữ cd31ad6/main/stash rỗng trước/sau. Commit báo cáo1515a30 là bước sau review.

Build12:21:07 +07 cây sạch/app tắt; mở launcher kiểm thật. Build đầu controller PowerShell dừng vì stderr trạng thái pnpm, build cuối exit0. Full desktop đầu bị ngắt tránh đè log runner, không tính; bộ cuối547/547. Log tại D:/hermes-wt/artifacts/T-037. WIP STATUS/file văn phòng có trước giữ nguyên.

Giới hạn: receipt app cắt2.000ký tự, không toàn văn Muse. Phanh theo kỳ10:00 không phải khóa lâu dài; không tự gửi thêm khi sang kỳ mới. Không băm lại toàn bộ media cũ. Không clip để xác minh SKU/chất lượng. Mở hội thoại từ app để người dùng kiểm quyền trên web bằng tay; không đổi vùng/hồ sơ để lách. Không cần sửa source tiếp chỉ từ lời tự báo403 của Muse.

**Cần anh chốt: Chi bị hạn chế quyền video phía Muse (kiểm trên web bằng tay).** Task đạt phép thử trực tiếp; quyền tạo clip của Chi chưa đạt.
