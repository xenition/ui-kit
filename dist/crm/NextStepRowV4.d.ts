import * as React from 'react';
import type { NextStepPriority, NextStepRowProps } from './NextStepRow';
export interface NextStepRowV4Props extends NextStepRowProps {
    /** Override the three priority words — they were hard-coded English. */
    priorityLabels?: Partial<Record<NextStepPriority, string>>;
    /** The word a past-due step carries. Default `'Overdue'`. */
    overdueLabel?: string;
    /** The checkbox's name while the step is open. Default `'Mark complete'`. */
    completeLabel?: string;
    /** The checkbox's name once the step is done. Default `'Completed'`. */
    completedLabel?: string;
}
/**
 * **V4 next-step row** — the web twin of the native `NextStepRowV4`, same props
 * as {@link NextStepRow} plus `priorityLabels`, `overdueLabel`, `completeLabel`
 * and `completedLabel`.
 *
 * ## Six changes
 *
 * 1. **The whole meta row is announced.** `aria-label={title}` replaced the
 *    subtree, so "⚠ Overdue · Mar 4" — the single reason a next-step row exists
 *    — was silent. This is the sharpest case of the defect in the module.
 * 2. **The checkbox clears 44.** It was a 22px square, and it is the row's
 *    *primary* action.
 * 3. **No dead checkbox.** With no `onToggle` the base still rendered a normal,
 *    apparently-tappable checkbox that silently did nothing. Without a handler
 *    the row draws a static mark instead, and the state goes into the name.
 * 4. **A checked box fills `primary`, not `success`.** Ticking a task is a
 *    *selection*; `success` has to keep meaning that something went well.
 * 5. **The `<button>` holds phrasing content only.** It had a `<p>` and a
 *    `<div>` inside it, which is invalid and which browsers repair
 *    unpredictably.
 * 6. **A press is the M3 state layer**, mixed against the pair the control
 *    actually wears — `on-primary` over `primary` for a checked box — rather
 *    than an opacity that would read as unavailable.
 */
export declare const NextStepRowV4: React.ForwardRefExoticComponent<NextStepRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NextStepRowV4.d.ts.map