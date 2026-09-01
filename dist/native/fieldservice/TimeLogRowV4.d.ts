import * as React from 'react';
import type { TimeLogRowProps } from './TimeLogRow';
export interface TimeLogRowV4Props extends TimeLogRowProps {
    /** The billable chip's word. Default `'Billable'` — with no currency sign. */
    billableLabel?: string;
}
/**
 * **V4 time log row** — same props as {@link TimeLogRow} plus `billableLabel`.
 *
 * ## Four changes
 *
 * 1. **The money and the billable flag are announced.** The row's name was
 *    `"${label}, ${duration}, ${status}"`, which replaces the subtree — so on
 *    a timesheet the two facts an approver is actually reading, the line total
 *    and whether it bills, were spoken to nobody.
 * 2. **The literal `$` is gone.** The chip read "$ Billable" while the total
 *    beside it was formatted by `currency`, so a EUR timesheet printed "€12.50"
 *    under a dollar sign. Billable is a word; the currency belongs to the
 *    number.
 * 3. **The stacked figures are tabular**, so a column of durations and totals
 *    lines up digit-for-digit down a timesheet instead of drifting.
 * 4. **The row is a row from the shared row line** — 44 clear, a press that is
 *    a state layer rather than `opacity: 0.7`, a decorative disc, and the
 *    module's one badge shape.
 *
 * **Renders nothing without a `label`.**
 */
export declare function TimeLogRowV4({ label, minutes, status, window, billable, rateCentsPerHour, currency, formatMoney, billableLabel, onPress, style, }: TimeLogRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TimeLogRowV4.d.ts.map