import * as React from 'react';
import type { PortfolioSummaryProps } from './PortfolioSummary';
export interface PortfolioSummaryV4Props extends PortfolioSummaryProps {
    /** Wording for the movement. Defaults `up` / `down` / `unchanged`. */
    directionLabels?: {
        up?: string;
        down?: string;
        flat?: string;
    };
    /**
     * The figure printed beside each allocation.
     *
     * `value` is the slice's own weight, exactly as it was handed in — so a
     * caller whose weights are cents can print money and a caller whose weights
     * are already percentages can print percentages. Omitted, the legend shows
     * the slice's whole-percent share of the total.
     */
    formatAllocation?: (label: string, value: number) => string;
}
/**
 * **V4 portfolio hero** — same props as {@link PortfolioSummary} plus
 * `directionLabels` and `formatAllocation`.
 *
 * ## Four changes
 *
 * 1. **The allocation numbers are rendered.** The donut was colour-matching
 *    only: "how much of this is ETH" was answerable solely by holding a legend
 *    swatch against a ring segment. Every segment now carries a figure through
 *    {@link PortfolioSummaryV4Props.formatAllocation}.
 * 2. **The direction and the money are toned from one source.** The base took
 *    the tone from `changePct ?? changeCents` and the money's own tone from
 *    the cents, so `changePct={0}` with `changeCents={-500}` drew a muted `•`
 *    beside a red `−$5.00`. Both now come from a single `changeParts()` call
 *    on the cents, falling back to the percentage.
 * 3. **A loss is announced as a loss.** `up +3.20%` / `down +3.20%` came from
 *    `pct >= 0 ? 'up' : 'down'` glued to `formatPct(Math.abs(pct))`, which
 *    re-applies the sign — and `>= 0` sent a flat `0` down the "up" branch
 *    while the glyph beside it drew `•`.
 * 4. **Loading is the card's own shape**, not a 120px grey slab, and the
 *    donut's `thickness` is left to the chart family so it means the same
 *    number on both twins — the bases read it as pixels here and as a
 *    fraction on the web.
 */
export declare function PortfolioSummaryV4({ totalCents, currency, changeCents, changePct, allocations, loading, directionLabels, formatAllocation, style, }: PortfolioSummaryV4Props): React.ReactElement;
//# sourceMappingURL=PortfolioSummaryV4.d.ts.map