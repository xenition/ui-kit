import * as React from 'react';
import type { NextStepPriority, NextStepRowProps } from './NextStepRow';
export interface NextStepRowV4Props extends NextStepRowProps {
    /** Override the priority words (`Low` / `Normal` / `High`). */
    priorityLabels?: Partial<Record<NextStepPriority, string>>;
    /** Word for a step past due. Default `'Overdue'`. */
    overdueLabel?: string;
    /** Name of the checkbox while unchecked. Default `'Mark complete'`. */
    completeLabel?: string;
    /** Name of the checkbox once checked. Default `'Completed'`. */
    completedLabel?: string;
}
/**
 * **V4 next-step row** — same props as {@link NextStepRow} plus
 * `priorityLabels`, `overdueLabel`, `completeLabel` and `completedLabel`.
 *
 * ## Six changes
 *
 * 1. **The row announces its meta line.** `accessibilityLabel={title}` dropped
 *    everything under the title, so "⚠ Overdue · Mar 4" — the entire point of
 *    a next-step row — was silent (rule A).
 * 2. **The checkbox clears 44.** It was a 22px box with `hitSlop`, and it is
 *    the row's *primary* action; the box keeps its size and the target grows
 *    around it.
 * 3. **No dead checkbox.** With no `onToggle` the base still rendered a
 *    normal, apparently-tappable checkbox that silently did nothing. Without a
 *    handler it is now a static mark, and `done` is carried by the row's name.
 * 4. **A checked box fills `primary`, not `success`.** Ticking a task is a
 *    *selection*, not a report that something went well; spending a status
 *    colour on it leaves `success` meaning nothing.
 * 5. **Overdue is inked with `dangerText`**, the contrast-corrected slot — the
 *    base drew text in the `danger` **fill**, which carries no promise as ink.
 * 6. **A press is a state layer** (rule B) rather than no feedback at all.
 *
 * **Renders nothing without a `title`.**
 */
export declare function NextStepRowV4({ title, dueDate, overdue, done, assignee, priority, priorityLabels, overdueLabel, completeLabel, completedLabel, onToggle, onPress, testID, style, }: NextStepRowV4Props): React.ReactElement | null;
//# sourceMappingURL=NextStepRowV4.d.ts.map