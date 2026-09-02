import * as React from 'react';
import type { PremiumSummaryProps } from './PremiumSummary';
export interface PremiumSummaryV4Props extends PremiumSummaryProps {
    /** Caption beside the total figure. Default `'Total'`. */
    totalLabel?: string;
    /** Headline when there are no lines. Default `'No premium breakdown'`. */
    emptyLabel?: string;
    /** The next-step sentence under {@link PremiumSummaryV4Props.emptyLabel}. */
    emptyDescription?: string;
    /** Announced while the placeholders are up. Default `'Loading premium'`. */
    loadingLabel?: string;
    /**
     * Warn that the supplied `totalCents` disagrees with the lines. Receives the
     * printed total and the sum of the lines, both already formatted.
     *
     * Default `'Total does not match the lines below ($120.00)'`.
     */
    formatMismatch?: (total: string, derived: string) => string;
}
/**
 * **V4 premium summary** — same props as {@link PremiumSummary} plus
 * `totalLabel`, `emptyLabel`, `emptyDescription`, `loadingLabel` and
 * `formatMismatch` (`formatMoney` is already on the base).
 *
 * ## Five changes
 *
 * 1. **`items={[]}` renders a real empty state.** The base drew a card
 *    containing a horizontal rule and the words "Total $0.00" — a confident
 *    figure asserting that this policy costs nothing, which is
 *    indistinguishable from a breakdown that failed to load. It now says what
 *    is missing and what will fill it.
 * 2. **A total that contradicts its own lines says so.** The base's TSDoc
 *    promised the printed total "always reconciles with the lines shown" and
 *    the code then let `totalCents` win outright, so three lines summing to
 *    $120.00 printed above a $99.00 Total and nothing anywhere flagged it. The
 *    shared reader returns `reconciles: false` for exactly that, and the card
 *    prints the derived sum beside the warning rather than quietly picking a
 *    winner — the caller is the only one who can say which number is right.
 * 3. **A credit is not an achievement.** Every negative line was painted
 *    `success`, so a multi-policy discount and a *credited late fee* both
 *    arrived in celebration green. The minus sign already carries the
 *    direction; the ink is the same as every other line.
 * 4. **The skeleton is opaque and in the shape of the card.** It was three
 *    bars painted in `colors.border` — the hairline token used as a fill, so
 *    the placeholder was the colour of a divider — and it drew no total row, so
 *    the card jumped a line taller when the data arrived. `skeletonFill`
 *    composites against the card's own ground, and the placeholder includes the
 *    total.
 * 5. **`colors.muted` and `colors.primary` stop drawing text.** Both are fill
 *    slots with no contrast promise; the line labels and the total figure now
 *    use `mutedText` and `primaryText`.
 */
export declare function PremiumSummaryV4({ items, totalCents, cadence, currency, loading, totalLabel, emptyLabel, emptyDescription, loadingLabel, formatMismatch, formatMoney: format, style, }: PremiumSummaryV4Props): React.ReactElement;
//# sourceMappingURL=PremiumSummaryV4.d.ts.map