import * as React from 'react';
import type { TimesheetRowProps } from './TimesheetRow';
export interface TimesheetRowV4Props extends TimesheetRowProps {
    /**
     * Why the entry was rejected.
     *
     * `rejected` is the adverse member of this union and the row had nowhere to
     * put the approver's answer, so a week of work came back marked "✕ Rejected"
     * and silent.
     */
    decisionReason?: string;
    /** Who approved or rejected the entry, shown once it has been decided. */
    approver?: string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 timesheet row** — the web twin of the native `TimesheetRowV4`, same
 * props as {@link TimesheetRow} plus `decisionReason`, `approver` and
 * `testID`.
 *
 * ## Six changes
 *
 * 1. **"2h 0m" with "+10h OT" under it is now called what it is.** Overtime is
 *    documented as *included in* `hours`, and the row only ever tested it for
 *    `> 0` — never against the total — so `hours={2} overtimeHours={10}`
 *    rendered two impossible figures with a straight face, on a row somebody's
 *    pay is calculated from. `hoursParts()` clamps the overtime into the total
 *    and reports the contradiction, and the row says so out loud.
 * 2. **A rejection can say why, and by whom.** See `decisionReason` and
 *    `approver`.
 * 3. **The row is one accessible name carrying the status.** `Timesheet Mon
 *    Aug 24, 7h 30m` dropped the project, the overtime and — on a row whose
 *    entire purpose is approval — whether it had been rejected.
 * 4. **The status pill is a sibling of the activation.** The row was a `<div
 *    role="button">` with the pill nested inside it; interactive content
 *    inside `role="button"` is invalid ARIA whatever the pill happens to be,
 *    and it flattened the row to a single leaf.
 * 5. **Press and hover are a state layer.** `hover:bg-neutral-100` is a ramp
 *    step: it mirrors under `[data-theme="dark"]` and paints a near-white slab
 *    across a dark page.
 * 6. **It joins the shared row family** and inks the overtime flag with the
 *    `warn-text` slot rather than `text-warn`, the fill.
 */
export declare const TimesheetRowV4: React.ForwardRefExoticComponent<TimesheetRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimesheetRowV4.d.ts.map