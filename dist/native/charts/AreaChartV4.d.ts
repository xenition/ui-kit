import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { CHART_AREA_FILL_ALPHA } from '../../primitives/internal/v4-chart';
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
export interface AreaChartV4Props extends ChartFigureV4Props {
    /** One series (`number[]`, the base's shape) or several (`number[][]`). */
    data: number[] | number[][];
    /** Names and tones for the series, index-aligned with `data`. */
    series?: ChartSeriesV4[];
    /** Category labels under the plot, one per point. Thinned, never rotated. */
    labels?: string[];
    /** The plot's width in px. */
    width?: number;
    /** Value at the top of the plot. Defaults to the largest datum. */
    max?: number;
    /** Value at the bottom of the plot. Defaults to the smallest datum. */
    min?: number;
    /**
     * Stack the series into bands rather than overlaying them. A stack is the
     * honest form when the series are parts of a whole; an overlay is honest
     * when they are independent quantities. The base offered neither, because it
     * offered one series.
     */
    stacked?: boolean;
    /** Draw a dot at each datum. Automatic at {@link CHART_AUTO_DOT_MAX} or fewer. */
    showDots?: boolean;
    /** A reference rule at the baseline. Default `true`. */
    grid?: boolean;
    /** The press scrubber and its readout. Default `true`. */
    tooltip?: boolean;
    /** How the readout draws its per-series swatch. Default `'line'`. */
    indicator?: ChartIndicatorV4;
    /** Direct series labels at the end of each band. Defaults on at four or fewer. */
    directLabels?: boolean;
    /** How a value is spoken and printed. Default `String`. */
    formatValue?: (value: number) => string;
    /** Fired when a point is pressed. */
    onPointPress?: (index: number) => void;
    /** Play the entrance reveal. Default `true`. */
    animate?: boolean;
    /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 area chart (native)** — `LineChartV4`'s twin, for the case where the
 * space under the line means something.
 *
 * The frame, the palette, the scrubber, the readout, the legend and the
 * derived label are all `LineChartV4`'s and are **composed from it** rather
 * than re-typed (§1 rule 8). Two things are this component's own:
 *
 * 1. **{@link CHART_AREA_FILL_ALPHA}** replaces the base's
 *    `fillOpacity = 0.2` prop, which was one of two different numbers for one
 *    mark across the twins and is on §1 rule 1's list of literals to retire.
 *    The prop is gone rather than defaulted, because a caller who can set it
 *    is a caller who can put a fill at 0.6 and bury the line.
 * 2. **Stacking, with `CHART_MARK.gap` between bands** (§5 Group A). The gap
 *    is not decoration: it is the secondary encoding the palette's 6–8 CVD
 *    band obliges (§1 rule 5). Two adjacent bands a dichromat cannot separate
 *    by hue are still visibly two bands with a hairline of page between them.
 *    It is painted as a `gap`-wide stroke of `colors.surface` along each
 *    band's lower boundary rather than as an inset in the geometry, so it is
 *    exactly two pixels at any plot size.
 */
export declare function AreaChartV4({ data, series, labels, title, summary, caption, legend, height, width, max, min, stacked, showDots, grid, tooltip, indicator, directLabels, loading, emptyLabel, formatValue, onPointPress, animate, accessibilityLabel, style, }: AreaChartV4Props): React.ReactElement;
//# sourceMappingURL=AreaChartV4.d.ts.map