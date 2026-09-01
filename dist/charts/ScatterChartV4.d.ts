import * as React from 'react';
import { type LegendV4Tone } from './LegendV4';
export interface ScatterPointV4 {
    x: number;
    y: number;
    /** An optional name for this point, used in its tooltip. */
    label?: string;
}
export interface ScatterSeriesV4 {
    /** Stable identity for the series. Not rendered. */
    key: string;
    /** The series name, as it appears in the legend. */
    label: string;
    /** The points in this series. */
    points: ScatterPointV4[];
    /**
     * Opt this series into a status hue instead of its categorical slot.
     * Use only where it genuinely *means* good or bad (rule 3).
     */
    tone?: LegendV4Tone;
}
export interface ScatterChartV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
    /**
     * A single series' points — the short form.
     *
     * The web base called this `data` and the native base called it `points`,
     * which was itself a parity break. Rule 7 says the gap closes rather than
     * deepens, so both V4 twins take `data`.
     */
    data?: ScatterPointV4[];
    /**
     * Two or three series, in slot order. **Throws past
     * {@link CHART_SCATTER_SERIES_CAP}** — see the component doc.
     */
    series?: ScatterSeriesV4[];
    /** Plot width in px, used for the viewBox. The element itself is fluid. */
    width?: number;
    /** Plot height in px. Never auto (§4.2). */
    height?: number;
    /** x-domain bounds; defaults to the data range. */
    xDomain?: [number, number];
    /** y-domain bounds; defaults to the data range. */
    yDomain?: [number, number];
    /** Draw the two axis lines. Default `true`. */
    showAxes?: boolean;
    /** Draw the recessive horizontal grid. Default `true` (§3: chrome is recessive). */
    showGrid?: boolean;
    /** The descriptive headline (§4.2). Say the takeaway, not the axis names. */
    title?: string;
    /** The one loud number, when the figure has one. */
    summary?: string;
    /** The quiet line under the plot — "last 30 days". */
    caption?: string;
    /** Render the legend. Defaults to `true` at two or more series. */
    legend?: boolean;
    /** Per-mark hover tooltip. Default `true` (§4.6). */
    tooltip?: boolean;
    /** Format a coordinate for the tooltip. Default `String`. */
    valueFormat?: (value: number) => string;
    /** Called when a point is clicked. Gives every point a 44 hit area. */
    onPointSelect?: (point: ScatterPointV4, seriesIndex: number, pointIndex: number) => void;
    /** Show the loading placeholder at the plot's footprint instead of the marks. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Play the entrance reveal. Default `true` (§4.7). */
    animate?: boolean;
    /** Override the derived accessible sentence (rule 6). */
    'aria-label'?: string;
}
/**
 * **V4 scatter plot** — the one form in this module with a *hard series cap*,
 * and the reason that cap exists.
 *
 * ## Three series, and the fourth folds into "Other"
 *
 * Every other chart in the line may carry all five slots. A scatter may carry
 * `CHART_SCATTER_SERIES_CAP` — three — and a fourth series is **folded into
 * the last slot** and named {@link CHART_OVERFLOW_LABEL} in the legend rather
 * than painted a colour the palette never cleared.
 *
 * The reason is measured, not stylistic, and `v4-chart.ts` records it. A bar
 * chart, a line chart and a stack only ever place a series next to its
 * *neighbours in assignment order*, so the adjacent-pair CVD check is the
 * honest gate for them. A scatter places **any two marks side by side** — that
 * is what a scatter is — which is the strictly harder all-pairs test. The same
 * validator run that locked the palette reported the first three slots clearing
 * it (all-pairs normal-vision ΔE 18.3 light / 17.7 dark) and five slots not.
 *
 * So a scatter with four series is not a palette problem waiting for a fourth
 * colour. It is a chart that needs faceting, an "Other" fold, or small
 * multiples. Rule 4's argument applies with more force here than anywhere
 * else: silently painting the fourth cloud a colour a dichromat reads as the
 * second is worse than saying so, because nobody ever finds out.
 *
 * **It folds rather than throws, and that is a deliberate change of mind.**
 * The cap itself is unmoved — the palette still refuses a fourth slot — but a
 * scatter's series count arrives with the *data*, and a `RangeError` out of
 * render takes the page down. `foldChartSeries` in
 * `primitives/internal/v4-chart.ts` draws the line: the primitive throws,
 * because `chartVar(3)` is a mistake in the caller's own code; the component
 * folds, because it cannot know at build time how many series will arrive. The
 * tail's points are merged into one cloud in the last slot and the legend says
 * "Other" — the same answer `PieChartV4` gives, and unlike a throw, a reader
 * can see it.
 *
 * ## Every point carries a ring of surface
 *
 * Rule 5 names four secondary encodings and this form needs the fourth: two
 * points that overlap are, without a ring, one blob whose colour is neither
 * series. `data-xen-v4-mark-ring` is the shared adapter's paint rule —
 * `stroke: var(--xen-surface); paint-order: stroke` — so the ring is the page
 * showing through rather than a fourth colour, and it is stroked *under* the
 * fill so the painted dot keeps its full `CHART_MARK.dotSize`.
 *
 * The base instead set `fillOpacity={0.75}` on every point, which is the same
 * idea done wrong: two overlapping translucent dots make a *third*, darker
 * colour that is in neither series' key, and a single dot over the page is a
 * fourth. V4 paints at full strength and separates by geometry.
 *
 * ## What else changed from the base
 *
 * - **Axes were `var(--xen-border)`** — a hairline token doing an axis's job.
 *   They are `CHART_AXIS_VAR` at `CHART_MARK.stroke`, with the grid one step
 *   quieter behind them at `CHART_GRID_VAR` and a 1px hairline (§3, §4.4).
 * - **`radius` was a prop defaulting to 4** — a literal, and a scatter whose
 *   dot size a caller can shrink is a scatter whose marks stop being marks.
 *   The painted dot is `CHART_MARK.dotSize`, imported.
 * - **A single point rendered at the origin.** With one datum the domain span
 *   is zero, and `(x - x0) / 0` fed the `cx` attribute. §4.5 requires a single
 *   datum to render, so a zero span centres its point instead.
 * - **Tap area.** A painted 8px dot is not a target. When `onPointSelect` is
 *   given each mark also carries a transparent {@link HIT_DIAMETER} circle
 *   (rule 10). They overlap in a dense cloud, deliberately: the last-drawn wins,
 *   which is the same rule the paint order already follows, and a chooseable
 *   near-miss beats an unhittable exact one.
 */
export declare const ScatterChartV4: React.ForwardRefExoticComponent<ScatterChartV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScatterChartV4.d.ts.map