import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type LegendV4Tone } from './LegendV4';
export interface ScatterPointV4 {
    x: number;
    y: number;
    /** An optional name for this point, used in its spoken label. */
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
export interface ScatterChartV4Props {
    /**
     * A single series' points — the short form.
     *
     * The native base called this `points` and the web base called it `data`,
     * which was itself a parity break. Rule 7 says the gap closes rather than
     * deepens, so both V4 twins take `data`.
     */
    data?: ScatterPointV4[];
    /**
     * Two or three series, in slot order. **Throws past
     * {@link CHART_SCATTER_SERIES_CAP}** — see the component doc.
     */
    series?: ScatterSeriesV4[];
    /** Plot width in px. */
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
    /** Reserved for parity with the web twin, which ships hover (§4.6). */
    tooltip?: boolean;
    /** Format a coordinate for the spoken label. Default `String`. */
    valueFormat?: (value: number) => string;
    /** Called when a point is pressed. Gives every point a 44 hit area. */
    onPointSelect?: (point: ScatterPointV4, seriesIndex: number, pointIndex: number) => void;
    /** Show the loading placeholder at the plot's footprint instead of the marks. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Play the entrance reveal. Default `true` (§4.7). */
    animate?: boolean;
    /** Override the derived accessible sentence (rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 scatter plot** — the one form in this module with a *hard series cap*,
 * and the reason that cap exists.
 *
 * Requires the optional peer dep `react-native-svg`, as the base does and as
 * brief §7 open question 6 asks each native chart to state. A scatter is points
 * in a coordinate space with a stroked ring on each; a `View` fallback would be
 * a different chart wearing the same name, which is the mistake `Sparkline`
 * made and the only place a fallback is sanctioned.
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
 * multiples. Silently painting the fourth cloud a colour a dichromat reads as
 * the second is worse than saying so, because nobody ever finds out.
 *
 * **It folds rather than throws, and that is a deliberate change of mind.**
 * The cap is unmoved — the palette still refuses a fourth slot — but a
 * scatter's series count arrives with the *data*, and a `RangeError` out of
 * render takes the screen down. `foldChartSeries` draws the line: the
 * primitive throws, the component folds. Keep in step with the web twin.
 *
 * ## Every point carries a ring of surface
 *
 * Rule 5 names four secondary encodings and this form needs the fourth: two
 * points that overlap are, without a ring, one blob whose colour is in neither
 * series. `palette.ring` is the page colour, so the separation is the ground
 * showing through rather than a fourth hue.
 *
 * The base instead set `fillOpacity={0.85}` on every point, which is the same
 * idea done wrong: two overlapping translucent dots make a *third*, darker
 * colour that is in neither series' key, and a single dot over the page is a
 * fourth. V4 paints at full strength and separates by geometry.
 *
 * ## What else changed from the base
 *
 * - **Axes were `colors.border`** — a hairline token doing an axis's job. They
 *   are `palette.axis` at `CHART_MARK.stroke`, with the grid one step quieter
 *   behind them at `palette.grid` and a 1px hairline (§3, §4.4).
 * - **`dotRadius` was a prop defaulting to 4** — a literal, and a scatter whose
 *   dot size a caller can shrink is a scatter whose marks stop being marks. The
 *   painted dot is `CHART_MARK.dotSize`, imported.
 * - **A single point rendered at the origin.** With one datum the domain span
 *   is zero, and the base's `|| 1` guard put the mark hard against the axis
 *   corner rather than saying "one value, no spread". §4.5 requires a single
 *   datum to render *legibly*, so a zero span centres its point.
 * - **Tap area.** A painted 8px dot is not a target. When `onPointSelect` is
 *   given each mark carries `hitSlop` out to `minTap(spacing)` — the kit's one
 *   composed 44 (rule 10) — rather than a bigger dot. In a dense cloud the slop
 *   regions overlap deliberately: the topmost wins, which is the same rule the
 *   paint order already follows, and a chooseable near-miss beats an unhittable
 *   exact one.
 */
export declare function ScatterChartV4({ data, series, width, height, xDomain, yDomain, showAxes, showGrid, title, summary, caption, legend, tooltip: _tooltip, valueFormat, onPointSelect, loading, emptyLabel, animate: _animate, accessibilityLabel, style, }: ScatterChartV4Props): React.ReactElement;
//# sourceMappingURL=ScatterChartV4.d.ts.map