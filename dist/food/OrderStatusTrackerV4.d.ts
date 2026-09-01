import * as React from 'react';
import type { OrderStage, OrderStatusTrackerProps } from './OrderStatusTracker';
export interface OrderStatusTrackerV4Props extends OrderStatusTrackerProps {
    /**
     * Override the per-stage words. The same shape as the base's `labels`, which
     * still works and is consulted after this one.
     */
    stageLabels?: Partial<Record<OrderStage, string>>;
    /** Copy for a status that is not one of the four. Default `'Order status unavailable'`. */
    unknownLabel?: string;
}
/**
 * **V4 order status tracker** — the web twin of the native
 * `OrderStatusTrackerV4`, same props as {@link OrderStatusTracker} plus
 * `stageLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **The tracker stops silencing itself.** `role="progressbar"` sat on the
 *    root, and that role is children-presentational — so every stage label,
 *    every timestamp and every per-step state word inside it was pruned. With
 *    no `aria-label` or `aria-valuetext` either, the whole component announced
 *    as an unnamed "1 of 4". The value now lives on an element that contains
 *    nothing, the steps are a real ordered list, and both are read.
 * 2. **An unrecognised status says so.** `Math.max(0, indexOf(status))` mapped
 *    a `-1` miss onto stage 1, so a typo — or a backend that adds a stage —
 *    rendered a confident, entirely wrong "Order placed, in progress".
 *    `stageIndex()` returns `undefined` and `unknownLabel` is what a user
 *    sees.
 * 3. **A cancelled order does not report as progressing.** It kept counting up
 *    through the progressbar's value while the step beside it read "cancelled".
 *    Cancelled drops the meter and says the word.
 * 4. **The upcoming marker is inked with the corrected slots** — `text-muted`
 *    is a fill, and `bg-surface` is the page, under a component that lives on
 *    a card.
 */
export declare const OrderStatusTrackerV4: React.ForwardRefExoticComponent<OrderStatusTrackerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrderStatusTrackerV4.d.ts.map