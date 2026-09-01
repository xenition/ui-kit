import * as React from 'react';
import type { PortfolioSummaryProps } from './PortfolioSummary';
export interface PortfolioSummaryV4Props extends PortfolioSummaryProps {
    /**
     * The words the 24h direction is announced with. Defaults `'up'`, `'down'`,
     * `'unchanged'` — the third of which the base did not have at all.
     */
    directionLabels?: {
        up?: string;
        down?: string;
        flat?: string;
    };
    /**
     * Print one allocation's number, for the legend row beside its swatch.
     *
     * Receives the slice's own `label` and its **raw `value`** — the weight
     * `AllocationSlice` carries, not a share — so a caller holding cents can
     * print money. The default prints the whole-percent share, which the
     * component can compute from the total and a formatter given one row cannot.
     */
    formatAllocation?: (label: string, value: number) => string;
}
/**
 * **V4 portfolio summary** — the web twin of the native `PortfolioSummaryV4`,
 * same props as {@link PortfolioSummary} plus `directionLabels` and
 * `formatAllocation`.
 *
 * ## Five changes
 *
 * 1. **The allocation numbers are rendered.** The donut plus a bare `Legend`
 *    was colour-matching only: "how much is in ETH" could be answered solely
 *    by matching a swatch hue to a ring segment, which a colour-blind user
 *    cannot do and a screen-reader user cannot attempt at all. The chart is
 *    `DonutChartV4` with its own legend off and a `RadialLegendV4` built from
 *    the **same** `foldPieDataV4` result beside it, so swatch, segment and
 *    figure are the same object three times rather than three that happen to
 *    line up.
 *
 *    Two consequences, both deliberate. Neither `size` nor `thickness` is
 *    passed — web's thickness is a fraction of the radius and native's is a
 *    stroke in px, so the only way the ring means the same thing on both twins
 *    is for neither to state it. And `AllocationSlice.color` is **ignored**:
 *    `PieDatumV4` carries `tone`, which is status hues, and painting an
 *    identity — a token, an asset — with a status hue is what the tone rules
 *    exist to stop.
 * 2. **The glyph and the money are toned from one source.** Direction came
 *    from `changePct` while the money was toned from `changeCents`, so
 *    `changePct={0}` with `changeCents={-500}` drew a muted `•` beside a red
 *    −$5.00. The money leads when it is there, because it is the figure the
 *    user reads, and a percentage that rounds to `0.00` does not make a real
 *    loss flat.
 * 3. **A loss is no longer announced as a gain.** The label read
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``, and
 *    `formatPct` re-applies the sign — "down +3.20%". It also replaced the
 *    percentage's own text, so the figure itself went unspoken.
 * 4. **The change is inked, not filled.** `changeToneClass()` hands back
 *    `text-success` / `text-danger` / `text-muted`, all three of which are
 *    fill slots with no contrast promise for text.
 * 5. **Loading is the shape it is about to be.** A single 128px
 *    `bg-neutral-100` block — a ramp step, so a pale plate on a dark page —
 *    collapsed into the real layout on arrival.
 */
export declare const PortfolioSummaryV4: React.ForwardRefExoticComponent<PortfolioSummaryV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PortfolioSummaryV4.d.ts.map