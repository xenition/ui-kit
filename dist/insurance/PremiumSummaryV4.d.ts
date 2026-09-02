import * as React from 'react';
import type { PremiumSummaryProps } from './PremiumSummary';
export interface PremiumSummaryV4Props extends PremiumSummaryProps {
    /** The word over the total. Default `'Total'`. */
    totalLabel?: string;
    /** Title when there are no lines. Default `'No premium breakdown'`. */
    emptyLabel?: string;
    /** The next-step sentence under {@link emptyLabel}. */
    emptyDescription?: string;
    /** The skeleton's accessible name. Default `'Loading premium'`. */
    loadingLabel?: string;
    /**
     * Word the disagreement between the printed total and the lines under it,
     * both in integer **cents**. Default
     * `'Total $99.00, lines add up to $120.00'`.
     */
    formatMismatch?: (total: number, derived: number) => string;
}
/**
 * **V4 premium summary** — same props as {@link PremiumSummary} plus
 * `totalLabel`, `emptyLabel` and `emptyDescription`.
 *
 * ## Five changes
 *
 * 1. **`items={[]}` is a real empty state.** The base rendered a card
 *    containing nothing but "Total $0.00" over a rule — a confident, precise
 *    figure asserting that this policy costs nothing, produced by summing an
 *    empty array. A quote that has not loaded and a policy that is genuinely
 *    free were the same screen.
 * 2. **A total that contradicts its own lines says so.** The base's TSDoc
 *    promised the printed total "always reconciles with the lines shown", and
 *    then let `totalCents` win outright: three lines summing to $120.00
 *    printed above a $99.00 Total with nothing to indicate which number the
 *    holder would be charged. `premiumParts` reports the disagreement and the
 *    card surfaces both figures.
 * 3. **A credit is not an achievement.** Every negative line was painted
 *    `text-success` — so a refunded fee, a cancelled rider and a prorated
 *    adjustment all rendered as good news in the colour this kit reserves for
 *    *status*. A credit is a direction, and the leading `−` already says it.
 * 4. **Loading draws the shape it is about to be.** The placeholder rows were
 *    `bg-border` — the hairline token used as a fill, so the skeleton was the
 *    colour of a divider — and they replaced the total row rather than
 *    standing in for it.
 * 5. **The total is announced once.** The base put an `aria-label` on the
 *    figure and then rendered the figure inside it, so the amount was read
 *    from the label and the visible text was dropped; the label and the text
 *    are now the same string, and every word is a prop.
 */
export declare const PremiumSummaryV4: React.ForwardRefExoticComponent<PremiumSummaryV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PremiumSummaryV4.d.ts.map