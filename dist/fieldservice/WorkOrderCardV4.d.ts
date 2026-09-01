import * as React from 'react';
import type { WorkOrderCardProps, WorkOrderPriority, WorkOrderStatus } from './WorkOrderCard';
export interface WorkOrderCardV4Props extends WorkOrderCardProps {
    /** Override the priority words — four English words lived inside. */
    priorityLabels?: Partial<Record<WorkOrderPriority, string>>;
    /** Override the status words — five English phrases lived inside. */
    statusLabels?: Partial<Record<WorkOrderStatus, string>>;
    /** The busy region's accessible name. Default `'Loading work order'`. */
    loadingLabel?: string;
}
/**
 * **V4 work-order card** — the web twin of the native `WorkOrderCardV4`, same
 * props as {@link WorkOrderCard} plus `priorityLabels`, `statusLabels` and
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card's name carries the job, not just its number.** `` `Work order
 *    ${n}, ${title}, ${status}` `` replaced the whole subtree, so a technician
 *    heard "Open" and never "Emergency" — and never the site, the assignee or
 *    the schedule either.
 * 2. **An interactive card is a real `<button>`.** It was a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler:
 *    three approximations of what a button already does, and the shape that
 *    breaks the moment a control is nested inside it.
 * 3. **Priority stops wearing a status colour** — see {@link PRIORITY_V4}.
 * 4. **The leading disc is decorative.** It announced "Work order" before the
 *    card said which one.
 * 5. **The skeleton is an opaque mix and the busy region is named**, and the
 *    press feedback is a state layer rather than a shadow that grows.
 */
export declare const WorkOrderCardV4: React.ForwardRefExoticComponent<WorkOrderCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkOrderCardV4.d.ts.map