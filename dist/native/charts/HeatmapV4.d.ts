import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One cell, as handed to {@link HeatmapV4Props.onCellSelect}. */
export interface HeatmapV4Cell {
    /** Row index, top to bottom. */
    row: number;
    /** Column index, leading to trailing. */
    column: number;
    /** The raw value at that position. */
    value: number;
    /** `rowLabels[row]`, when one was given. */
    rowLabel?: string;
    /** `columnLabels[column]`, when one was given. */
    columnLabel?: string;
}
export interface HeatmapV4Props {
    /** Row-major grid of values. Ragged rows are padded with zero, not dropped. */
    data: number[][];
    /**
     * The value that paints the darkest (light scheme) or lightest (dark scheme)
     * bucket. Defaults to the grid maximum.
     */
    max?: number;
    /**
     * The value that paints the palest bucket. Defaults to `0` rather than to the
     * grid minimum, because a heatmap whose floor floats with the data cannot be
     * compared with the one beside it — the reader has no way to know the two
     * ramps do not mean the same thing.
     */
    min?: number;
    /** Cell edge length in px. See {@link HEATMAP_V4_TAP_MIN} for the tap rule. */
    cellSize?: number;
    /** Row labels, drawn down the leading edge. The direct-label channel (§4.4). */
    rowLabels?: string[];
    /** Column labels, drawn under the grid. */
    columnLabels?: string[];
    /** The descriptive headline (§4.2). Say the takeaway, not the axis names. */
    title?: string;
    /** The quiet line under the plot — "last 30 days", "vs. the same week". */
    caption?: string;
    /** Render the ramp key. Default `true` — a sequential fill without one is a mystery. */
    legend?: boolean;
    /** Format a value for the cell's spoken name and the ramp key. Default `String`. */
    valueFormat?: (value: number) => string;
    /** Called when a cell is pressed. Makes the grid interactive — see the tap note. */
    onCellSelect?: (cell: HeatmapV4Cell) => void;
    /** Show the loading placeholder at the plot's footprint instead of the grid. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Override the derived accessible sentence (rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * HIG's **absolute** minimum tap target, 28×28 — not the 44 floor.
 *
 * Brief §5 Group D names heatmap cells as the documented exception to rule 10,
 * and this constant is that exception with a number on it. It applies only when
 * {@link HeatmapV4Props.onCellSelect} is given: a grid nobody can press is a
 * picture and has no tap target at all, so a 16px cell stays 16px until the
 * moment it becomes a control.
 *
 * A geometric constant with a comment, which is the one category of bare number
 * brief §1 rule 1 allows. It is deliberately **not** composed from the spacing
 * scale: 44 is composed (`2xl - xs`) because the whole kit shares it, whereas
 * 28 is HIG's floor for one exceptional case and pretending it rides the seed's
 * rhythm would be a fiction. The web twin exports the identical constant; the
 * two are the same number in two files because neither platform can read the
 * other's, and a shared home for it would mean editing the shared adapter.
 */
export declare const HEATMAP_V4_TAP_MIN = 28;
/**
 * **V4 heatmap** — the sequential ramp's home, and the one component in this
 * module whose whole job is *magnitude* rather than identity.
 *
 * ## What was wrong: an opacity ramp is a sequential scale built by hand
 *
 * The base paints every cell `colors[color]` and varies only `opacity`, floored
 * at `0.08 + intensity * 0.92`. Brief §1 rule 1 lists that expression by name
 * as a violation, and it is worth being precise about *why*, because "no
 * literal numbers" is the least interesting of the reasons.
 *
 * 1. **It fails at the light end.** A cell at 0.08 of a mid-blue over the page
 *    is, measured, a shade or two off the page itself. The `dataviz` validator
 *    asks a sequential ramp for ≥ 2:1 at its light end precisely so the
 *    smallest non-zero bucket is still visibly a cell; an 8%-alpha tile is not.
 *    So the base's lowest bucket — the one that says "something happened here,
 *    just not much" — is invisible, and a reader cannot tell it from zero.
 * 2. **It is linear in alpha, which is not linear in anything a reader sees.**
 *    Compositing at 40% and at 50% of one hue differs by far less perceptually
 *    at the dark end than at the light end, so the middle of the grid
 *    compresses and the top spreads. `palette.sequential` interpolates OKLCH
 *    lightness instead, which is the space the ramp was validated in.
 * 3. **It never flips.** Carbon's rule, adopted in `v4-chart.ts`: on a light
 *    page the *darkest* step is the largest value; on a dark page the
 *    *lightest* step is. "More ink" and "more light" are the same signal read
 *    against opposite grounds. An alpha ramp says "more paint" in both, which
 *    on a dark page means the largest values are the ones that disappear.
 * 4. **It spends the wrong channel.** On native, `opacity` on a `View` composes
 *    with whatever is behind it, so the same value renders differently over a
 *    card and over the page — the identical bug `SkeletonV4` was rewritten to
 *    remove. A derived hex composes with nothing.
 *
 * ## Why this one stays `View`-based
 *
 * Brief §7 open question 6 asks each native chart to state its `react-native-svg`
 * position. A heatmap is a grid of axis-aligned rectangles with no curves, no
 * paths and no text inside the plot, so `View` renders it exactly and an
 * optional peer dep would buy nothing. It is also the form most likely to carry
 * hundreds of marks, and a `View` grid is the cheaper of the two there.
 *
 * ## The tap floor, and why this component is allowed to break it
 *
 * Rule 10 sets 44 as the tap floor and rule 10 also names the escape: HIG's
 * absolute minimum of 28 applies "only where density genuinely forbids 44, and
 * that exception is stated per component in §5 or it does not apply". §5 Group
 * D states it for heatmap cells, so **this is that exception**. A 53-week
 * contribution grid at 44 per cell is 2,332px wide, which is not a heatmap; the
 * form's entire value is that a year fits in a glance.
 *
 * Two consequences are deliberate:
 *
 * - The floor is applied **only when the grid is interactive**. A cell with no
 *   `onCellSelect` is not a target and does not need to be one, so `cellSize`
 *   stays where the caller put it. Give the grid a press handler and the cell
 *   is floored at {@link HEATMAP_V4_TAP_MIN}.
 * - There is **no `hitSlop`**. Everywhere else in the kit a small mark grows an
 *   invisible hit area; in a grid every cell's neighbour is `CHART_MARK.gap`
 *   away, so overlapping slop would steal neighbouring taps and the cell a
 *   finger lands on would not be the cell it selects. HIG's own advice — pad
 *   *around* a control to stop mis-taps — cannot be followed here, so the
 *   honest answer is a bigger cell.
 *
 * ## The rest of the figure
 *
 * A ramp key ships by default (§4.8: a fill below 3:1 on the surface needs the
 * legend or a visible label as relief, and a sequential ramp's palest buckets
 * are exactly that case), row and column labels are the direct-label channel
 * (§4.4), and each interactive cell carries its own spoken name so the precise
 * value is available without the fill having to carry it.
 */
export declare function HeatmapV4({ data, max, min, cellSize, rowLabels, columnLabels, title, caption, legend, valueFormat, onCellSelect, loading, emptyLabel, accessibilityLabel, style, }: HeatmapV4Props): React.ReactElement;
//# sourceMappingURL=HeatmapV4.d.ts.map