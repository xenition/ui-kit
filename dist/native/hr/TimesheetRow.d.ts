import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type TimesheetStatus } from './internal';
export type TimesheetRowVariant = 'default' | 'compact';
export interface TimesheetRowProps {
    /** Pre-formatted work date (e.g. "Mon Aug 24"). */
    date: string;
    /** Total hours worked (decimal, e.g. 7.5). */
    hours: number;
    /** Approval state — glyph + word pill. */
    status?: TimesheetStatus;
    /** Clock-in time label. */
    clockIn?: string;
    /** Clock-out time label. */
    clockOut?: string;
    /** Project / task the time is booked to. */
    project?: string;
    /** Overtime hours included in `hours` — flagged by word when > 0. */
    overtimeHours?: number;
    /** Density. */
    variant?: TimesheetRowVariant;
    /** Tap handler (open / edit entry). */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One timesheet entry: date, hours worked (formatted `Hh Mm`), optional clock
 * in/out and project, plus an approval-status pill (glyph + word, never color
 * alone). Overtime is surfaced as a labelled word (`+Xh OT`) rather than only a
 * color. `compact` shows just date + hours + status. All colors are theme
 * tokens — no literals.
 */
export declare function TimesheetRow({ date, hours, status, clockIn, clockOut, project, overtimeHours, variant, onPress, testID, style, }: TimesheetRowProps): React.ReactElement;
//# sourceMappingURL=TimesheetRow.d.ts.map