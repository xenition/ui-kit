import * as React from 'react';
import type { LeaveRequestProps } from './LeaveRequest';
/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV3Props = LeaveRequestProps;
/**
 * LeaveRequest, design **V3** — a dense single line for tight queues. A leading
 * tone status-dot (paired with the status word for a11y — never color alone),
 * the leave type + optional employee and date range, and the day-count pinned
 * right. Same Props as {@link LeaveRequest}; approve/deny chrome is intentionally
 * dropped in favour of a tappable, borderless divider row. Token-pure.
 */
export declare const LeaveRequestV3: React.ForwardRefExoticComponent<LeaveRequestProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaveRequestV3.d.ts.map