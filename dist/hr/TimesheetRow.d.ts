import * as React from 'react';
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
    /** Click handler (open / edit entry). */
    onClick?: () => void;
    className?: string;
}
/**
 * One timesheet entry: date, hours worked (formatted `Hh Mm`), optional clock
 * in/out and project, plus an approval-status pill (glyph + word, never color
 * alone). Overtime is surfaced as a labelled word (`+Xh OT`) rather than only a
 * color. `compact` shows just date + hours + status. When `onClick` is set the
 * row becomes a keyboard-operable `role="button"`. All colors are `--xen-*`
 * token classes — no literals. `forwardRef` to the root `<div>`.
 */
export declare const TimesheetRow: React.ForwardRefExoticComponent<TimesheetRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimesheetRow.d.ts.map