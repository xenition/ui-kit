import * as React from 'react';
import type { TimeLogRowProps } from './TimeLogRow';
export interface TimeLogRowV4Props extends TimeLogRowProps {
    /** The word on the billable chip. Default `'Billable'`. */
    billableLabel?: string;
}
/**
 * **V4 time-log row** — the web twin of the native `TimeLogRowV4`, same props
 * as {@link TimeLogRow} plus `billableLabel`.
 *
 * ## Four changes
 *
 * 1. **The money total and the billable flag are announced.** The row's name
 *    was `` `${label}, ${duration}, ${status}` `` — on a timesheet, which is
 *    read to find out what an hour is going to be billed at and whether it is
 *    billable at all.
 * 2. **The literal `$` is gone.** The chip read `$ Billable` while the total
 *    beside it was formatted by `currency`, so a EUR timesheet showed "€12.50"
 *    under a dollar sign. The chip is a word, and the word is a prop.
 * 3. **The stacked figures are tabular**, so a column of durations and totals
 *    aligns down a timesheet instead of shifting a digit at a time.
 * 4. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, and the status is announced once — the disc carried
 *    it as an accessible label and the pill carried it again.
 */
export declare const TimeLogRowV4: React.ForwardRefExoticComponent<TimeLogRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimeLogRowV4.d.ts.map