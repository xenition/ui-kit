import * as React from 'react';
import type { TimesheetRowProps } from './TimesheetRow';
export interface TimesheetRowV4Props extends TimesheetRowProps {
    /** Why the entry was rejected. Shown when the status is adverse. */
    decisionReason?: string;
    /** Who approved or rejected the entry. */
    approver?: string;
}
/**
 * **V4 timesheet row** — same props as {@link TimesheetRow} plus
 * `decisionReason` and `approver`.
 *
 * ## Five changes
 *
 * 1. **A rejection says why, and who.** `rejected` was one of six adverse
 *    statuses in the module with nowhere to record a reason, and this is the
 *    one attached to somebody's pay: the row said "✕ Rejected" and the employee
 *    had to go and ask which of five days was wrong.
 * 2. **Overtime cannot exceed the day.** Overtime is documented as *included
 *    in* `hours`, but the base only ever tested it for `> 0`, so
 *    `hours={2} overtimeHours={10}` rendered "2h 0m" with "+10h 0m OT" beneath
 *    it — two numbers that cannot both be true, printed as confidently as each
 *    other. `hoursParts()` clamps the overtime and the row *says* the input is
 *    inconsistent rather than quietly drawing a corrected figure.
 * 3. **The overtime flag is inked with ink.** `toneColor(colors, 'warn')`
 *    returns the `warn` **fill** slot and the base assigned it straight to
 *    `color:`. It is `warnText` now.
 * 4. **It is a row from the shared row family**, so a timesheet, a settings row
 *    and a notification are one height, one gutter and one press layer instead
 *    of a hand-rolled box with its own border and `gap: 2`.
 * 5. **The row announces its whole state** — date, hours, overtime, clock,
 *    project, status, approver and the rejection reason. The base named itself
 *    "Timesheet Mon Aug 24, 7h 30m" and left the status, which is the part a
 *    manager is scanning for, to a pill the reader walked past separately.
 *
 * **Renders nothing without a `date`.**
 */
export declare function TimesheetRowV4({ date, hours, status, clockIn, clockOut, project, overtimeHours, variant, decisionReason, approver, onPress, testID, style, }: TimesheetRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TimesheetRowV4.d.ts.map