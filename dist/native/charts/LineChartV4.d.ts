import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { ChartEmptyV4 } from './internal-v4';
import { seriesInkV4, useChartRevealV4, type ChartToneV4 } from './SparklineV4';
import { CHART_SERIES_COUNT, type ChartIndicatorV4, type ChartSeriesV4 } from '../../primitives/internal/v4-chart';
/**
 * **V4 line chart (native)** — the twin of `charts/LineChartV4.tsx`, and the
 * file that carries the *figure frame* the rest of the native line family
 * composes.
 *
 * Everything about *why* is argued once, on the web twin, and is not repeated
 * here: the multi-series ceiling that made every dashboard reach past the base
 * (brief §5 Group A), the retirement of `SERIES` / `colors[color]` as an
 * identity channel (§1 rules 2–4), `strokeWidth` and dot radius coming from
 * {@link CHART_MARK} (§1 rule 1), and the legend / ring / direct-label
 * redundancy the palette's 6.5 CVD floor obliges (§1 rule 5).
 *
 * What is worth stating here is where the twins deliberately differ, because
 * "prop parity" is a promise about the API and not about the plumbing:
 *
 * 1. **The plot does not stretch.** Web renders into a responsive column and
 *    pays for it with `vector-effect="non-scaling-stroke"` and a round-capped
 *    line standing in for every dot. Native lays out at the `width` it was
 *    given — which is what every existing native chart in this module already
 *    does — so a `<Circle>` really is a circle and `CHART_MARK.stroke` really
 *    is two pixels. No trickery is needed and none is used.
 * 2. **The interaction is press, not hover** (§4.6). A transparent scrubber of
 *    one `Pressable` per point sits over the plot; each slice is the full
 *    height of the plot and carries `hitSlop` out to {@link minTap} on both
 *    axes, so rule 10's 44 floor holds even on an eight-point series in a
 *    32-tall plot. The painted mark stays 8.
 * 3. **The readout is pinned, not anchored.** Web floats a tooltip at the
 *    crosshair's own x. React Native cannot translate by a percentage of an
 *    element's own unmeasured width, and measuring would cost a layout pass on
 *    every scrub frame. So the readout pins to the top edge of the plot and
 *    picks one of three alignments from which third of the plot the active
 *    point falls in — close enough to read as anchored, free of a measurement,
 *    and it never changes the plot's footprint.
 *
 * `react-native-svg` is a **required** peer for this component (brief §7 open
 * question 6: only `SparklineV4` and `MiniBarV4` keep a `View` fallback). Every
 * other SVG chart in this module already requires it.
 */
/**
 * `ChartSeriesV4` — shadcn/ui's config/data split (brief §4.3) — declared here
 * while the native line family built and canonical in
 * `primitives/internal/v4-chart.ts` since. Imported and re-exported, so the
 * call sites that spell it `from './LineChartV4'` are untouched.
 */
export type { ChartSeriesV4 };
/** One row of a legend, when a caller supplies the rows itself. */
export interface ChartLegendItemV4 {
    /** React key and identity. Falls back to the label. */
    key?: string;
    /** The row's text. Never truncated — a clipped identity is no identity. */
    label: string;
    /** Categorical slot to draw the swatch from. Defaults to the row's index. */
    slot?: number;
    /** Status hue instead of a slot. */
    tone?: ChartToneV4;
}
/** How a readout draws its per-series swatch. shadcn's vocabulary (§4.6). */
export type { ChartIndicatorV4 };
/**
 * Above this many points a dot per datum stops being information.
 * Brief §5: "automatic below ~20 points and off above".
 */
export declare const CHART_AUTO_DOT_MAX = 20;
/** A point in the plot's own pixel space. */
interface PlotPoint {
    x: number;
    y: number;
}
/**
 * The empty state every V4 chart falls back to (brief §4.5).
 *
 * It used to be **defined** here, and this file's own doc comment said it
 * belonged beside `useChartPaletteV4` and was only local because
 * `native/charts/internal-v4.tsx` was closed to this pass's build agents. It
 * has moved there now — a move, not a rewrite — and is re-exported from this
 * file so `AreaChartV4` and anything else that imports it from `LineChartV4`
 * is untouched.
 */
export { ChartEmptyV4 };
/** `number[]` or `number[][]` → always `number[][]`. The base's shape stays valid. */
export declare function toSeriesRowsV4(data: number[] | number[][]): number[][];
/**
 * Scale a series into the plot box.
 *
 * The two guards brief §4.5 asks every spec in this pass to assert: a
 * **single** datum sits at the horizontal centre rather than dividing by
 * `length - 1`, and a **flat** series divides by 1 rather than by `max - min`.
 */
export declare function plotSeriesV4(values: number[], lo: number, span: number, width: number, height: number): PlotPoint[];
/** Evenly-spaced indices to print an axis label at, at most `max` of them. */
export declare function thinAxisIndicesV4(count: number, max?: number): number[];
/**
 * A legend swatch at {@link CHART_MARK.dotSize} — brief §4.8: "its swatch is
 * `dotSize`, not a 10×10 literal", which is exactly what the base `Legend`
 * ships (`width: 10, height: 10`).
 */
export declare function ChartSwatchV4({ ink, indicator, radiusFull, }: {
    ink: string;
    indicator: ChartIndicatorV4;
    radiusFull: number;
}): React.ReactElement;
/**
 * The native line family's legend.
 *
 * This used to be the markup itself — `LegendV4` was Group D's component and
 * was not on disk while this group built, so the shape it is specified to have
 * was drawn here instead. **The body is now `LegendV4`**, and with it the
 * signature loses the four resolution parameters (`palette`, `statusColors`,
 * `gap`, `radiusFull`): `LegendV4` reads all four from the theme itself, and
 * threading them through a second component was only ever a symptom of the
 * legend being drawn in the wrong file. The web twin's `ChartLegendV4` takes
 * `items` and `indicator` and nothing else, so this is also rule 7's prop
 * parity being restored rather than broken.
 */
export declare function ChartLegendV4({ items, indicator, }: {
    items: ChartLegendItemV4[];
    indicator?: ChartIndicatorV4;
}): React.ReactElement;
/**
 * The shared props of every **figure** in the line family (brief §4.2), which
 * `LineChartV4` and `AreaChartV4` wear and `SparklineV4` / `MiniBarV4`
 * deliberately do not — they are marks inside someone else's figure.
 */
export interface ChartFigureV4Props {
    /** The descriptive headline. HIG's rule: say the takeaway, not the axis names. */
    title?: string;
    /** The one loud number. Read before the plot, which is the evidence for it. */
    summary?: string;
    /** The quiet line — "vs last month", "last 30 days". */
    caption?: string;
    /** Defaults to `true` at two or more series — the identity channel's redundancy. */
    legend?: boolean | ChartLegendItemV4[];
    /** The plot's own height in px. Never auto; a declared footprint stops reflow. */
    height?: number;
    /** Render the loading skeleton at the plot's footprint instead of the plot. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
}
export interface LineChartV4Props extends ChartFigureV4Props {
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
     * Draw a dot at each datum. Defaults to **automatic**: on at
     * {@link CHART_AUTO_DOT_MAX} points or fewer, off above.
     */
    showDots?: boolean;
    /** Horizontal reference rules behind the plot. Default `true`. */
    grid?: boolean;
    /** The press scrubber and its readout. Default `true` (§4.6). */
    tooltip?: boolean;
    /** How the readout draws its per-series swatch. Default `'line'`. */
    indicator?: ChartIndicatorV4;
    /** Direct series labels at the end of each line. Defaults on at four or fewer. */
    directLabels?: boolean;
    /** How a value is spoken and printed. Default `String`. */
    formatValue?: (value: number) => string;
    /** Fired when a point is pressed. */
    onPointPress?: (index: number) => void;
    /** Play the entrance reveal. Kept for parity; see the note in the body. */
    animate?: boolean;
    /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
export declare function LineChartV4({ data, series, labels, title, summary, caption, legend, height, width, max, min, showDots, grid, tooltip, indicator, directLabels, loading, emptyLabel, formatValue, onPointPress, animate, accessibilityLabel, style, }: LineChartV4Props): React.ReactElement;
/**
 * The number of categorical slots, re-exported so a caller can guard before it
 * hands over a sixth series rather than learning about the cap from a thrown
 * `RangeError` in production.
 */
export { CHART_SERIES_COUNT };
/**
 * Re-exported so a caller composing the line family has one import site, and
 * so `AreaChartV4` does not have to know that the peer-free mark is where
 * they physically live.
 */
export { seriesInkV4, useChartRevealV4, type ChartToneV4 };
//# sourceMappingURL=LineChartV4.d.ts.map