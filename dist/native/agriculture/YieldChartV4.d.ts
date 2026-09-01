import * as React from 'react';
import type { ChartToneV4 } from '../../primitives/internal/v4-chart';
import type { YieldChartProps } from './YieldChart';
export interface YieldChartV4Props extends Omit<YieldChartProps, 'color'> {
    /**
     * A status tone for the series — **only** when the yield genuinely means
     * good or bad news (a target met, a shortfall against contract).
     *
     * The base took `color: keyof SemanticColors` defaulting to `'success'` and
     * used it as an **identity**: every yield chart in the kit was green because
     * green was the default, not because the yield was good. That is exactly what
     * `CHARTS-V4-BRIEF.md` §2/§3 retired — `success` means *good*, and a chart
     * that spends the status colour on identity has none left for meaning. Left
     * unset (the default) the series takes palette slot 1, which is what a
     * neutral measurement should look like.
     *
     * `color` is dropped from the props rather than deprecated: keeping a prop
     * that silently means something different is worse than removing it, and a
     * V4 is a new component, not an edit to the base.
     */
    tone?: ChartToneV4;
    /** Copy for the empty state. Default `'No yield data yet'`. */
    emptyLabel?: string;
    /** Name for the series in the legend and tooltip. Default: the `title`. */
    seriesLabel?: string;
}
/**
 * **V4 yield chart** — {@link YieldChart}'s props with `color` replaced by
 * `tone`, plus `emptyLabel` and `seriesLabel`.
 *
 * ## Four changes
 *
 * 1. **The palette does identity; status does meaning.** See `tone`. This is
 *    the one prop change in the whole pass that is not purely additive, and the
 *    reason is in the note there.
 * 2. **It composes `BarChartV4` / `LineChartV4`**, so it inherits the
 *    validated palette, the tooltip, the direct labels and the derived
 *    accessible summary the charts pass built — including the rule that a
 *    chart must state its value in words, not only draw it.
 * 3. **The headline is tabular** and its unit is a separate muted element
 *    rather than part of the same string, so `12.4 t/ha` aligns down a column
 *    of fields.
 * 4. **The empty state is the chart's own**, not a bare muted sentence: the
 *    chart keeps its height, so a dashboard does not reflow when data arrives.
 */
export declare function YieldChartV4({ data, labels, title, headline, unit, variant, tone, seriesLabel, emptyLabel, height, style, }: YieldChartV4Props): React.ReactElement;
//# sourceMappingURL=YieldChartV4.d.ts.map