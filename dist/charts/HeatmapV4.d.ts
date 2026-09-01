import * as React from 'react';
/** One cell, as handed to {@link HeatmapV4Props.onCellSelect} and to the tooltip. */
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
export interface HeatmapV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
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
    /** Per-cell hover tooltip. Default `true` (§4.6). */
    tooltip?: boolean;
    /** Format a value for the tooltip and the ramp key. Default `String`. */
    valueFormat?: (value: number) => string;
    /** Called when a cell is clicked. Makes the grid interactive — see the tap note. */
    onCellSelect?: (cell: HeatmapV4Cell) => void;
    /** Show the loading placeholder at the plot's footprint instead of the grid. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Play the entrance reveal. Default `true` (§4.7). */
    animate?: boolean;
    /** Override the derived accessible sentence (rule 6). */
    'aria-label'?: string;
}
/**
 * The one `<style>` id this component injects from. Idempotent.
 */
export declare const HEATMAP_V4_STYLE_ID = "xen-v4-heatmap-styles";
/**
 * The cell corner, as the SVG geometry *property* rather than the `rx`
 * attribute.
 *
 * The base wrote `rx={2}`, which brief §1 names as a violation to remove. The
 * obvious fix — `rx={tokens.radius.sm}` — is not available to a web chart: the
 * radius is a `--xen-*` custom property, and an SVG presentation *attribute*
 * takes a length, not a `var()`. Geometry properties are settable from CSS
 * (`rx`, `ry` have been CSS properties since SVG 2 and are supported across the
 * evergreen engines), so the token reaches the cell through a stylesheet
 * instead. Where an engine does not support it the cell is simply square, which
 * is the correct degradation for a grid tile and not a broken one.
 *
 * `--xen-radius-sm` and not `md`: at a 16px cell an 8px corner is half the tile
 * and the grid stops reading as a grid.
 */
export declare const HEATMAP_V4_CSS = "\n[data-xen-v4-heatmap-cell] {\n  rx: var(--xen-radius-sm);\n  ry: var(--xen-radius-sm);\n}\n/*\n  The ramp key's swatches are div elements, not SVG rects, so their fill cannot\n  ride a presentation attribute. It rides an element-scoped custom property\n  instead: a CSSOM that does not parse var() -- jsdom, and every SSR style\n  extractor built on one -- drops a var() background-color from an inline style\n  outright, while a custom property survives, because React sets it with\n  setProperty and it has no value grammar to fail.\n*/\n[data-xen-v4-heatmap-key-step] {\n  background-color: var(--xen-heatmap-key-step);\n}\n";
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
 * rhythm would be a fiction.
 */
export declare const HEATMAP_V4_TAP_MIN = 28;
/**
 * **V4 heatmap** — the sequential ramp's home, and the one component in this
 * module whose whole job is *magnitude* rather than identity.
 *
 * ## What was wrong: an opacity ramp is a sequential scale built by hand
 *
 * The base paints every cell the same `var(--xen-primary)` and varies only
 * `fill-opacity`, floored at `0.08 + intensity * 0.92`. Brief §1 rule 1 lists
 * that expression by name as a violation, and it is worth being precise about
 * *why*, because "no literal numbers" is the least interesting of the reasons.
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
 *    compresses and the top spreads. `chartSequential` interpolates OKLCH
 *    lightness instead, which is the space the ramp was validated in.
 * 3. **It never flips.** Carbon's rule, adopted in `v4-chart.ts`: on a light
 *    page the *darkest* step is the largest value; on a dark page the
 *    *lightest* step is. "More ink" and "more light" are the same signal read
 *    against opposite grounds. An alpha ramp says "more paint" in both, which
 *    on a dark page means the largest values are the ones that disappear.
 * 4. **It spends the wrong channel.** Alpha is the kit's disabled-content
 *    channel (`V4_DISABLED_CLASS`, 0.38). A grid whose quiet cells are drawn
 *    the same way its disabled controls are is saying something it does not
 *    mean.
 *
 * V4 uses `chartSeqVar`, which is one hue at nine discrete lightness steps —
 * Carbon's ten-step discretisation, one step short of it because the shared
 * adapter quantises the ramp into `CHART_RAMP_STEPS` buckets for the custom
 * property trick. Nine is also honest about the reader: nobody reads the
 * difference between the 41st and the 42nd percentile off a fill.
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
 * - There is **no `hitSlop` equivalent**. Everywhere else in the kit a small
 *   mark grows an invisible hit area; in a grid every cell's neighbour is
 *   0 to `CHART_MARK.gap` away, so overlapping hit areas would steal each
 *   other's taps and the cell a finger lands on would not be the cell it
 *   selects. HIG's own advice — pad *around* a control to stop mis-taps —
 *   cannot be followed here, so the honest answer is a bigger cell.
 *
 * ## The rest of the figure
 *
 * - **A ramp key ships by default.** Brief §4.8: where a fill lands below 3:1
 *   on the surface, the legend or a visible label is the relief the validator
 *   obliges — and a sequential ramp's lightest buckets are exactly that case.
 *   A heatmap whose scale is not stated is a picture of some numbers.
 * - **Row and column labels are the direct-label channel** (§4.4) and the
 *   second reason a dichromat can read the grid: lightness ordering survives
 *   every CVD simulation, and the labels say which cell is which.
 * - **The tooltip carries the precise value** so the fill does not have to,
 *   which is HIG's progressive disclosure. It is an SVG `<title>` per cell
 *   rather than a floating panel: `<title>` is the tooltip *and* the cell's
 *   accessible name in one element, it needs no portal, no measurement and no
 *   pointer bookkeeping, and it cannot be dragged out of the viewport. A
 *   floating panel would be the right call for a crosshair chart, where the
 *   value being read is between the marks; on a grid the mark *is* the value.
 */
export declare const HeatmapV4: React.ForwardRefExoticComponent<HeatmapV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HeatmapV4.d.ts.map