import * as React from 'react';
import { type ChartIndicatorV4, type ChartSeriesV4, type ChartToneV4 } from '../primitives/internal/v4-chart';
/**
 * **V4 line chart** — and, because it is the first of the twenty to land, the
 * file that carries the *figure frame* the rest of the line family composes.
 *
 * ## What the base got wrong
 *
 * `LineChart` takes `data: number[]`. One series. That single fact is why
 * every dashboard in the product reaches past this module and hand-rolls an
 * SVG: a revenue chart with Direct / Referral / Organic on it cannot be
 * expressed at all, so the component that exists to draw it is skipped. Brief
 * §5 Group A names this first for that reason.
 *
 * Four more, in the order a reader notices them:
 *
 * 1. **Colour was a semantic token.** `color = 'primary'` resolving to
 *    `var(--xen-primary)`, and a multi-series form would have had to reach for
 *    the base's `SERIES` cycle — which paints series four `warn` and series
 *    five `danger` (brief §1 rule 2, and the whole argument in
 *    `primitives/internal/v4-chart.ts`). V4 takes the derived categorical
 *    palette: {@link chartVar} per slot, in assignment order, never cycled.
 * 2. **`r={3}` and `strokeWidth={2}` were typed in.** Brief §1 rule 1 lists
 *    both as violations to remove; they are {@link CHART_MARK.dotSize} and
 *    {@link CHART_MARK.stroke} now, imported rather than retyped.
 * 3. **`showDots` was a boolean the caller had to guess at.** Brief §5: it
 *    "becomes automatic below ~20 points and off above". A dot per datum on a
 *    90-point series is a caterpillar, not a chart; a dot per datum on eight
 *    points is what tells a reader where the samples actually are.
 * 4. **A picture of a chart.** Brief §3.4: "An SVG chart that cannot be
 *    hovered is a picture of a chart." V4 ships a crosshair and a tooltip by
 *    default, which is also what lets the grid stay recessive — the precise
 *    number lives in the tip, so the plot only has to carry the shape (HIG's
 *    progressive disclosure, §4.6).
 *
 * ## Why the marks are drawn the way they are
 *
 * The plot stretches: `preserveAspectRatio="none"`, so a 320-unit viewBox
 * fills whatever column it is dropped into. The base did the same and paid for
 * it silently — under a non-uniform scale a `strokeWidth={2}` line is 2px tall
 * and 0.6px wide, and an `r={3}` circle is an ellipse. Both marks here carry
 * `vector-effect="non-scaling-stroke"`, and a **dot is a zero-length
 * round-capped line** rather than a `<circle>`: a round cap is a true circle of
 * the stroke's own width no matter what the viewBox does to the axes. That is
 * the only way to get `CHART_MARK.dotSize` to mean 8 painted pixels in a
 * responsive plot without measuring the container.
 *
 * The ring of surface each dot carries (brief §4.4) is a second, wider line
 * underneath it wearing `data-xen-v4-mark-ring`, so its colour comes from the
 * shared sheet in `internal-v4` rather than from a value typed here.
 *
 * ## Secondary encoding
 *
 * The palette's worst adjacent CVD ΔE is 6.5, inside the 6–8 floor band, and
 * that band is legal only with secondary encoding (brief §1 rule 5). This
 * component ships three: a legend whenever there are two or more series,
 * direct labels at {@link CHART_DIRECT_LABEL_MAX} or fewer, and the ring of
 * page colour around every dot. It never asks colour to carry identity alone.
 *
 * @example
 * ```tsx
 * <LineChartV4
 *   title="Revenue"
 *   summary="£48,210"
 *   caption="vs last month"
 *   data={[direct, referral, organic]}
 *   series={[
 *     { key: 'direct', label: 'Direct' },
 *     { key: 'referral', label: 'Referral' },
 *     { key: 'organic', label: 'Organic' },
 *   ]}
 *   labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
 * />
 * ```
 */
/**
 * `ChartToneV4` — the opt-in to status colour, and the only way a V4 chart
 * paints one (brief §4.3) — and `ChartSeriesV4`, shadcn's config/data split.
 *
 * Both were declared here while the line family was built, because
 * `primitives/internal/v4-chart.ts` was closed to the build groups mid-pass.
 * They landed in that module afterwards and this file now **imports** them;
 * the re-export below keeps `import { type ChartToneV4 } from './LineChartV4'`
 * working for the four call sites that already spell it that way.
 */
export type { ChartIndicatorV4, ChartSeriesV4, ChartToneV4 };
/** One row of a legend, when a caller supplies the rows itself. */
export interface ChartLegendItemV4 {
    /** React key and identity. Falls back to the label. */
    key?: string;
    /** The row's text. Never truncated — a clipped identity is no identity. */
    label: string;
    /** Categorical slot to draw the swatch from. Defaults to the row's index. */
    slot?: number;
    /** Status hue instead of a slot, for a row that means good or bad. */
    tone?: ChartToneV4;
}
/**
 * Above this many points a dot per datum stops being information.
 *
 * Brief §5 asks for "automatic below ~20 points and off above". It is a
 * **count**, not a size — the one other category of bare number §1 rule 1
 * allows alongside geometry — and it lives here as a named constant so the
 * area chart can hold the identical threshold rather than pick its own.
 */
export declare const CHART_AUTO_DOT_MAX = 20;
/** The one `<style>` id the line family's figure frame injects from. */
export declare const CHART_FIGURE_V4_STYLE_ID = "xen-v4-chart-figure-styles";
/**
 * Two rules a utility class bound to a token cannot say.
 *
 * The tooltip is positioned against a percentage of the plot's width and has
 * to be pulled back by half its own (unknown) width — a `transform` a Tailwind
 * class has no arbitrary value for at this precision — and it must never eat
 * the pointer events that drive it, or moving onto the tip would move the
 * crosshair off the point the tip is describing.
 */
export declare const CHART_FIGURE_V4_CSS = "\n[data-xen-v4-chart-tip] {\n  transform: translateX(-50%);\n  pointer-events: none;\n}\n";
/** A point in viewBox units. */
interface PlotPoint {
    x: number;
    y: number;
}
/**
 * `number[]` or `number[][]` → always `number[][]`.
 *
 * The base's single-series shape stays valid — brief §1 rule 8, additive only —
 * and a caller who has one series does not have to wrap it in an array to use
 * the component that finally supports several.
 */
export declare function toSeriesRowsV4(data: number[] | number[][]): number[][];
/**
 * The ink for series `i`: its slot, or its status hue when it declared one.
 *
 * {@link chartVar} throws past the fifth slot rather than wrapping, which is
 * the whole point of brief §1 rule 4 — so a sixth series arrives as a loud
 * `RangeError` naming the fix (fold it into "Other", or facet) instead of as
 * two lines quietly sharing a colour.
 */
export declare function seriesInkV4(index: number, tone?: ChartToneV4): string;
/**
 * Evenly-spaced indices to print an axis label at, at most `max` of them.
 *
 * Thinning rather than rotating: a rotated tick is unreadable on a phone and
 * changes the plot's height, which is the layout shift §4.5 exists to stop.
 */
export declare function thinAxisIndicesV4(count: number, max?: number): number[];
/**
 * The shared props of every **figure** in the line family — brief §4.2's
 * frame, which `LineChartV4` and `AreaChartV4` both wear and which
 * `SparklineV4` and `MiniBarV4` deliberately do not (they are marks inside
 * someone else's figure).
 */
export interface ChartFigureV4Props {
    /**
     * The descriptive headline. HIG's rule, quoted in brief §2: say the
     * takeaway — "Chance of light rain in the next hour" — not the axis names.
     */
    title?: React.ReactNode;
    /** The one loud number. Read before the plot, which is the evidence for it. */
    summary?: React.ReactNode;
    /** The quiet line — "vs last month", "last 30 days". */
    caption?: React.ReactNode;
    /**
     * The legend. Defaults to `true` at two or more series, because a legend is
     * not decoration in this line — it is the identity channel's redundancy
     * (brief §1 rule 5). Pass rows to label something the `series` config does
     * not cover.
     */
    legend?: boolean | ChartLegendItemV4[];
    /**
     * The plot's own height in px. **Never auto** — shadcn's `ChartContainer`
     * refuses to auto-size for the same reason (brief §2), and a declared
     * footprint is what stops the page reflowing when the data lands.
     */
    height?: number;
    /** Render the loading skeleton at the plot's footprint instead of the plot. */
    loading?: boolean;
    /** What the empty state says. Never a bare string in the tree; see §4.5. */
    emptyLabel?: string;
    /** Play the entrance reveal. Default `true`; reduced motion turns it into a fade. */
    animate?: boolean;
}
export interface LineChartV4Props extends ChartFigureV4Props, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * One series (`number[]`, the base's shape) or several (`number[][]`).
     *
     * Capped at {@link CHART_SERIES_COUNT} by {@link chartVar}, which throws
     * rather than cycling.
     */
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
     * Draw a dot at each datum. Defaults to **automatic**: on at
     * {@link CHART_AUTO_DOT_MAX} points or fewer, off above.
     */
    showDots?: boolean;
    /** Horizontal reference rules behind the plot. Default `true`. */
    grid?: boolean;
    /** Crosshair + tooltip on hover. Default `true` (brief §3.4, §4.6). */
    tooltip?: boolean;
    /** How the tooltip draws its per-series swatch. Default `'line'`. */
    indicator?: ChartIndicatorV4;
    /** Direct series labels at the end of each line. Defaults on at four or fewer. */
    directLabels?: boolean;
    /** How a value is spoken and printed. Default `String`. */
    formatValue?: (value: number) => string;
    /** Fired when a point is clicked, and on the native twin when it is pressed. */
    onPointPress?: (index: number) => void;
}
/**
 * The tooltip's and the legend's per-series swatch.
 *
 * Its size is {@link CHART_MARK.dotSize} and its thickness
 * {@link CHART_MARK.stroke} — brief §4.8 is explicit that a swatch is
 * `dotSize`, "not a 10×10 literal", which is what the base `Legend` ships
 * (`h-2.5 w-2.5` on web, `width: 10, height: 10` on native; both on §1 rule
 * 1's list).
 *
 * Drawn as a tiny inline SVG rather than a `<span>` with a background,
 * because the ink is a `var(--xen-chart-N)` reference: an SVG `fill` /
 * `stroke` is an **attribute**, which survives every CSSOM, whereas the same
 * value in an inline `style` is dropped outright by the jsdom-class parsers
 * this kit's specs and any SSR style extractor run on. `internal-v4` makes the
 * same call for the palette itself and says so; this is the same reason one
 * level down.
 */
export declare function ChartSwatchV4({ ink, indicator, }: {
    ink: string;
    indicator: ChartIndicatorV4;
}): React.ReactElement;
/**
 * The line family's legend.
 *
 * This used to be the markup itself — `LegendV4` (Group D) was not on disk
 * while this group built, so the shape that component is specified to have was
 * drawn here instead, and the doc comment said the coordinator's pass was the
 * right place to swap the body. That is what this is: **the body is now
 * `LegendV4`**, and the name, the props and the two call sites are unchanged.
 *
 * The mapping is one to one because the stand-in was built to the same spec:
 * `key` → `key`, `slot` → `slot` (defaulting to the row index either way),
 * `tone` → `tone`, and `indicator` chooses a dot or a rule. What `LegendV4`
 * adds on top is the part a stand-in could not have: the toggle behaviour, the
 * 44 hit floor behind it, and the derived `Legend: …` sentence.
 */
export declare function ChartLegendV4({ items, indicator, }: {
    items: ChartLegendItemV4[];
    indicator?: ChartIndicatorV4;
}): React.ReactElement;
/**
 * A dot on a line, drawn as a zero-length round-capped stroke.
 *
 * See the file header: a `<circle>` under `preserveAspectRatio="none"` is an
 * ellipse, and `r={3}` is one of the literals brief §1 rule 1 retires. A round
 * cap with `vector-effect="non-scaling-stroke"` is a true circle of exactly
 * {@link CHART_MARK.dotSize} painted pixels at any viewBox scale, and the ring
 * of surface underneath it comes from the shared `data-xen-v4-mark-ring` rule.
 */
export declare function ChartDotV4({ x, y, ink, }: {
    x: number;
    y: number;
    ink: string;
}): React.ReactElement;
/**
 * Scale a series into the viewBox.
 *
 * The two guards brief §4.5 asks the spec to assert: a **single** datum sits
 * at the horizontal centre rather than dividing by `length - 1`, and a **flat**
 * series divides by 1 rather than by `max - min`. The base sources guard the
 * second unevenly and the first not at all on some forms; `Infinity` in a `d`
 * attribute is a blank chart with no error.
 */
export declare function plotSeriesV4(values: number[], lo: number, span: number, width: number, height: number): PlotPoint[];
export declare const LineChartV4: React.ForwardRefExoticComponent<LineChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LineChartV4.d.ts.map