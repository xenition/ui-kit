import * as React from 'react';
import type { WorkOrderCardProps, WorkOrderPriority, WorkOrderStatus } from './WorkOrderCard';
export interface WorkOrderCardV4Props extends WorkOrderCardProps {
    /** Override the four priority names — they lived inside the component. */
    priorityLabels?: Partial<Record<WorkOrderPriority, string>>;
    /** Override the five status names. */
    statusLabels?: Partial<Record<WorkOrderStatus, string>>;
    /** Announced while the skeleton is up. Default `'Loading work order'`. */
    loadingLabel?: string;
}
/**
 * **V4 work order card** — same props as {@link WorkOrderCard} plus
 * `priorityLabels`, `statusLabels` and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card announces the priority.** Its name was
 *    `"Work order WO-1, title, Open"`, which **replaces** the subtree — so an
 *    emergency job and a low-priority one sounded identical, and the site, the
 *    assignee and the schedule were never spoken at all. A technician heard
 *    "Open" and never "Emergency".
 * 2. **Priority stops wearing a status colour.** `emergency` was a `danger`
 *    pill beside a `danger`-capable status pill, so two different questions
 *    answered in the same red. It is a neutral chip with its own glyph now.
 * 3. **A press is a state layer.** `opacity: 0.85` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The skeleton is opaque and announced.** It was a translucent `muted`
 *    wash — a different colour on every ground — sitting on a plain `View`
 *    whose `accessibilityLabel` announced nothing.
 * 5. **The badges are one shape across the twins**, and the meta glyphs are
 *    decorative rather than emoji embedded in the sentence a reader speaks.
 *
 * **Renders nothing without a `title`.**
 */
export declare function WorkOrderCardV4({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph, loading, priorityLabels, statusLabels, loadingLabel, onPress, style, }: WorkOrderCardV4Props): React.ReactElement | null;
//# sourceMappingURL=WorkOrderCardV4.d.ts.map