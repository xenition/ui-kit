import * as React from 'react';
import type { FarmTaskRowProps, TaskPriority } from './FarmTaskRow';
export interface FarmTaskRowV4Props extends FarmTaskRowProps {
    /** Override the priority names — four English words lived inside the component. */
    priorityLabels?: Partial<Record<TaskPriority, string>>;
    /** Announced after the title when the task is late. Default `'overdue'`. */
    overdueLabel?: string;
}
/**
 * **V4 farm task row** — same props as {@link FarmTaskRow} plus
 * `priorityLabels` and `overdueLabel`.
 *
 * ## Five changes
 *
 * 1. **It is a row from the shared row line.** Height, padding, gap, press
 *    fill and separator inset now come from `dashboard/internal/row-v4`, which
 *    is the file that decides them for every row in the kit — so a task row and
 *    a notification row stop being two components that happen to look similar.
 * 2. **The checkbox is `CheckboxV4`**, so its hit area, its focus ring and its
 *    checked animation match every other checkbox in the product.
 * 3. **`overdue` reaches assistive tech.** The base painted the due date red
 *    and stopped — colour alone, which is exactly what §6 forbids.
 * 4. **A done task's title is struck through *and* dimmed**, rather than only
 *    dimmed, so "done" survives a greyscale screenshot.
 * 5. **Type comes from `TextV4`** and the caption takes `mutedText`.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function FarmTaskRowV4({ title, done, due, priority, field, assignee, icon, overdue, priorityLabels, overdueLabel, onToggle, onPress, last, style, }: FarmTaskRowV4Props): React.ReactElement | null;
//# sourceMappingURL=FarmTaskRowV4.d.ts.map