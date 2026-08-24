import * as React from 'react';
import type { LeaveRequestProps } from './LeaveRequest';
/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV2Props = LeaveRequestProps;
/**
 * LeaveRequest, design **V2** — a card built around an explicit date-range block
 * and a 3-step approval timeline (Requested → In review → Decided). The range
 * renders as two dated columns joined by an arrow with the day-count between;
 * status is a glyph + word pill (never color alone). When `actionable` and still
 * `pending`, approve / deny buttons show; otherwise the approver is named. Same
 * Props as {@link LeaveRequest}. Elevated + mount-fade, token-pure.
 */
export declare function LeaveRequestV2({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable, onApprove, onDeny, onPress, testID, style, }: LeaveRequestV2Props): React.ReactElement;
//# sourceMappingURL=LeaveRequestV2.d.ts.map