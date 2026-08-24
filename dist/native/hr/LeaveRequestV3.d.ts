import * as React from 'react';
import type { LeaveRequestProps } from './LeaveRequest';
/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV3Props = LeaveRequestProps;
/**
 * LeaveRequest, design **V3** — a dense single line for tight queues. A leading
 * tone status-dot (paired with the status word for a11y — never color alone),
 * the leave type + date range, and the day-count pinned right. Same Props as
 * {@link LeaveRequest}; approve/deny chrome is intentionally dropped in favour
 * of a tappable row. Press-scales on tap; token-pure.
 */
export declare function LeaveRequestV3({ type, startDate, endDate, days, status, employeeName, onPress, testID, style, }: LeaveRequestV3Props): React.ReactElement;
//# sourceMappingURL=LeaveRequestV3.d.ts.map