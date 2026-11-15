# T-022c — Tự review Office mode

| Việc | Kết luận | Bằng chứng |
| --- | --- | --- |
| Focus/bàn phím | Đạt | 18 kiểm, chín tab/mũi tên/Home/End/Tab, Enter link đúng đích; vùng bảng cuộn được và thoát được |
| Nhãn/ngữ nghĩa | Đạt phạm vi | 6 trạng thái axe 0 violation; ARIA snapshot; sửa scrollable-region-focusable và listitem ở metric-import.tsx |
| UI/hồi quy | Đạt | 8 PNG, T-019 UI lại đạt; 764 pass/1 skip/0 fail, typecheck |
| Phạm vi | Đạt | Không đổi theme/font, dependency, data/evidence, AppData hoặc phiên thật; không giảm assertion |

Main agent tự review, không reviewer độc lập. HEAD c5958fd, main, stash trống trước/sau pha review; commit sau review. Chưa NVDA/200%/high contrast; các incomplete axe ghi nguyên tại outputs/T-022c-ui/axe-results.json và report app. Không coi 0 violation là chứng nhận WCAG. Không phát hiện nặng chưa sửa trong phạm vi giao.
