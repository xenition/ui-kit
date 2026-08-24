import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type LeaveStatus, type LeaveType } from './internal';
export type LeaveRequestVariant = 'default' | 'compact';
export interface LeaveRequestProps {
    /** Category of leave — glyph + word chip. */
    type: LeaveType;
    /** Pre-formatted start date. */
    startDate: string;
    /** Pre-formatted end date (omit for a single day). */
    endDate?: string;
    /** Number of working days requested. */
    days: number;
    /** Approval state. `pending`/`approved`/`denied`/`cancelled`. */
    status: LeaveStatus;
    /** Requesting employee's name (for a manager's approval queue). */
    employeeName?: string;
    /** Requesting employee's avatar. */
    employeeAvatarUrl?: string;
    /** Approver's name (shown once approved/denied). */
    approver?: string;
    /** Optional reason / note. */
    reason?: string;
    /** Show approve/deny actions (only meaningful while `pending`). */
    actionable?: boolean;
    /** Density. */
    variant?: LeaveRequestVariant;
    onApprove?: () => void;
    onDeny?: () => void;
    /** Tap handler for the whole card. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A leave / time-off request: type, date range, day count and approval status.
 * Status is a glyph + word pill (pending → warn, approved → success, denied →
 * danger) so it never rests on color alone. When `actionable` and still
 * `pending`, approve / deny buttons render for a manager's queue; once decided
 * the approver is shown instead. All colors are theme tokens — no literals.
 */
export declare function LeaveRequest({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable, variant, onApprove, onDeny, onPress, testID, style, }: LeaveRequestProps): React.ReactElement;
//# sourceMappingURL=LeaveRequest.d.ts.map