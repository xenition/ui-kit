import * as React from 'react';
import { CHART_AREA_FILL_ALPHA } from '../primitives/internal/v4-chart';
import { type ChartFigureV4Props, type ChartIndicatorV4, type ChartSeriesV4 } from './LineChartV4';
/**
 * How much of its line's colour an area fill keeps.
 *
 * Brief §4.4: "Area fills sit under their line at reduced alpha; the line keeps
 * full strength. The fill is context, the line is the data." §5 Group A then
 * says to "retire `fillOpacity` guesses" — and a guess is what the two base
 * twins shipped: `0.18` on web, `0.2` on native, for the same mark.
 *
 * The number now lives in `primitives/internal/v4-chart.ts` beside
 * `CHART_MARK`, where the two twins and `RadarChartV4` read the *same* binding
 * rather than four copies that agree today. Re-exported here so the specs and
 * call sites that read it from this file are unchanged.
 */
export { CHART_AREA_FILL_ALPHA };
export interface AreaChartV4Props extends ChartFigureV4Props, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** One series (`number[]`, the base's shape) or several (`number[][]`). */
    data: number[] | number[][];
    /** Names and tones for the series, index-aligned with `data`. */
    series?: ChartSeriesV4[];
    /** Category labels under the plot, one per point. Thinned, never rotated. */
    labels?: string[];
    /** The viewBox width. Geometry only — the plot still fills its column. */
    width?: number;
    /** Value at the top of the plot. Defaults to the largest datum. */
    max?: number;
    /** Value at the bottom of the plot. Defaults to the smallest datum. */
    min?: number;
    /**
     * Stack the series into bands rather than overlaying them.
     *
     * A stack is the honest form when the series are parts of a whole; an
     * overlay is honest when they are independent quantities. The base offered
     * neither, because it offered one series.
     */
    stacked?: boolean;
    /**
     * Draw a dot at each datum. Defaults to **automatic**: on at
     * {@link CHART_AUTO_DOT_MAX} points or fewer, off above.
     */
    showDots?: boolean;
    /** Horizontal reference rules behind the plot. Default `true`. */
    grid?: boolean;
    /** Crosshair + tooltip on hover. Default `true`. */
    tooltip?: boolean;
    /** How the tooltip draws its per-series swatch. Default `'line'`. */
    indicator?: ChartIndicatorV4;
    /** Direct series labels at the end of each band. Defaults on at four or fewer. */
    directLabels?: boolean;
    /** How a value is spoken and printed. Default `String`. */
    formatValue?: (value: number) => string;
    /** Fired when a point is clicked, and on the native twin when it is pressed. */
    onPointPress?: (index: number) => void;
}
/**
 * **V4 area chart** — `LineChartV4`'s twin, for the case where the space
 * under the line means something.
 *
 * ## What the base got wrong
 *
 * The same single-series ceiling as `LineChart`, plus two of its own:
 *
 * 1. **`fillOpacity={0.18}` on web, `fillOpacity = 0.2` on native.** One mark,
 *    two numbers, neither of them a decision — brief §1 rule 1 lists
 *    `fillOpacity={0.15}` among the literals this pass exists to retire. See
 *    {@link CHART_AREA_FILL_ALPHA} for the number and the argument.
 * 2. **The closing path crosses itself.** `M…L last.x baseline L first.x
 *    baseline Z` closes along the bottom from right to left *after* jumping
 *    straight down, which happens to look right for one series over a flat
 *    baseline and produces a bow-tie the moment the lower edge is another
 *    series. That is exactly what stacking needs, so it is fixed here rather
 *    than worked around.
 *
 * ## Stacking, and the gap that makes it readable
 *
 * Brief §5: "Stacked areas get `CHART_MARK.gap` between bands." That is not
 * decoration — it is the secondary encoding the palette's 6–8 CVD band obliges
 * (§1 rule 5). Two adjacent bands a dichromat cannot separate by hue are still
 * visibly two bands when a hairline of page runs between them.
 *
 * The gap is painted as a `CHART_MARK.gap`-wide stroke of `--xen-surface`
 * along each band's lower boundary, carrying
 * `vector-effect="non-scaling-stroke"` so it is exactly 2 painted pixels
 * whatever the responsive viewBox does to the axes. Insetting the geometry
 * instead would make the gap wider on a wide screen and invisible on a narrow
 * one, which is how a "2px separator" becomes a 6px stripe on a desktop.
 *
 * Everything else — the figure frame, the crosshair, the legend, the derived
 * label, the dot geometry — is `LineChartV4`'s and is composed from it rather
 * than re-typed.
 */
export declare const AreaChartV4: React.ForwardRefExoticComponent<AreaChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AreaChartV4.d.ts.map