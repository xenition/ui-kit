import * as React from 'react';
import type { OrderStage, OrderStatusTrackerProps } from './OrderStatusTracker';
export interface OrderStatusTrackerV4Props extends OrderStatusTrackerProps {
    /**
     * Override the per-stage labels. Wins over `labels`, which the base already
     * had; both are honoured so an existing caller keeps working.
     */
    stageLabels?: Partial<Record<OrderStage, string>>;
    /** Shown when `status` is not a stage this component knows. Default `'Order status unavailable'`. */
    unknownLabel?: string;
}
/**
 * **V4 order status tracker** — same props as {@link OrderStatusTracker} plus
 * `stageLabels` and `unknownLabel`.
 *
 * ## Five changes
 *
 * 1. **The stages can be read again.** The root was
 *    `accessibilityRole="progressbar"`, which is children-presentational — so
 *    every stage label, every timestamp and every per-step state word inside
 *    it was pruned, and with no name of its own the whole component announced
 *    an unattributed "1 of 4". The value now sits on an element that contains
 *    nothing, and the steps are read.
 * 2. **An unknown status says so.** `Math.max(0, indexOf(status))` mapped a
 *    miss onto stage 1, so a typo or a stage the backend added rendered a
 *    confident, wrong "Order placed, in progress". `stageIndex()` returns
 *    `undefined` and this renders `unknownLabel`.
 * 3. **A cancelled order does not report as progressing.** It counted up like
 *    any other order while one step wore a ✕. There is no progress value at
 *    all when an order is cancelled — the summary says what happened instead.
 * 4. **Markers and rails are hidden from the reader.** They are ✓ / ● / ○
 *    glyphs and 2px rules that restate the step's own state word, so they were
 *    reader stops that said nothing.
 * 5. **Timestamps are tabular and inked `mutedText`**, not the promise-free
 *    `muted` ramp step.
 */
export declare function OrderStatusTrackerV4({ status, variant, labels, stageLabels, timestamps, cancelled, unknownLabel, style, }: OrderStatusTrackerV4Props): React.ReactElement;
//# sourceMappingURL=OrderStatusTrackerV4.d.ts.map