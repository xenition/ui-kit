import * as React from 'react';
import type { FarmTaskRowProps, TaskPriority } from './FarmTaskRow';
export interface FarmTaskRowV4Props extends FarmTaskRowProps {
    /** Override the priority names — four English words lived inside the component. */
    priorityLabels?: Partial<Record<TaskPriority, string>>;
    /** Announced after the title when the task is late. Default `'overdue'`. */
    overdueLabel?: string;
}
/**
 * **V4 farm task row** — the web twin of the native `FarmTaskRowV4`, same
 * props as {@link FarmTaskRow} plus `priorityLabels` and `overdueLabel`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line.** Height, padding, gap, hover
 *    fill and separator inset come from `dashboard/internal/row-v4`, which is
 *    the file that decides them for every row in the kit.
 * 2. **The checkbox is `CheckboxV4`**, so its hit area, focus ring and checked
 *    transition match every other checkbox in the product.
 * 3. **`overdue` reaches assistive tech.** The base painted the due date red
 *    and stopped — colour alone, which is exactly what §6 forbids. The badge
 *    now carries the word.
 * 4. **A done task's title is struck through *and* dimmed**, so "done"
 *    survives a greyscale screenshot.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare const FarmTaskRowV4: React.ForwardRefExoticComponent<FarmTaskRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FarmTaskRowV4.d.ts.map