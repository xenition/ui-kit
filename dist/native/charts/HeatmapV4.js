"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEATMAP_V4_TAP_MIN = void 0;
exports.HeatmapV4 = HeatmapV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
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
exports.HEATMAP_V4_TAP_MIN = 28;
/** Default cell edge for a grid that is only looked at. */
const CELL_SIZE = 16;
/**
 * How many buckets the sequential ramp is quantised into.
 *
 * Carbon discretises a sequential scale into ten steps rather than serving a
 * gradient, for the honest reason that nobody reads the difference between the
 * 41st and the 42nd percentile off a fill. Native could paint the continuous
 * ramp — only the web adapter's custom-property trick forces discrete buckets
 * — and that is exactly why this must not be a local number: the two twins
 * have to bucket **identically**, or the same data renders as a smooth wash on
 * a phone and as nine bands in the browser, and a reader comparing the two
 * would be right to think they are different charts. So it is the shared
 * {@link CHART_RAMP_STEPS}, aliased for the arithmetic below.
 */
const RAMP_STEPS = v4_chart_1.CHART_RAMP_STEPS;
/** Clamp into `[0, 1]`, treating a non-finite ratio as the floor. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
/** Snap a normalised value onto one of {@link RAMP_STEPS} buckets. */
const bucket = (t) => Math.round(clamp01(t) * (RAMP_STEPS - 1)) / (RAMP_STEPS - 1);
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
function HeatmapV4({ data, max, min = 0, cellSize, rowLabels, columnLabels, title, caption, legend = true, valueFormat = String, onCellSelect, loading = false, emptyLabel = 'No data', accessibilityLabel, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const interactive = onCellSelect !== undefined;
    // The 28 floor applies at the moment the grid becomes a control, and not
    // before — see the docstring.
    const edge = Math.max(cellSize ?? CELL_SIZE, interactive ? exports.HEATMAP_V4_TAP_MIN : 1);
    const rows = data.length;
    const cols = rows === 0 ? 0 : Math.max(...data.map((row) => row.length), 0);
    const flat = data.flat().filter((v) => Number.isFinite(v));
    const ceiling = max ?? (flat.length > 0 ? Math.max(...flat) : 0);
    const floor = min;
    // A grid where every cell holds the same value has no range to map, so the
    // whole grid takes the top bucket rather than dividing by zero — §4.5's
    // no-`Infinity`-in-a-paint-value rule.
    const span = ceiling - floor;
    const height = rows * edge + Math.max(rows - 1, 0) * v4_chart_1.CHART_MARK.gap;
    const header = title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })) : null;
    const footer = caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null;
    const frame = { gap: tokens.spacing.md };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: Math.max(height, edge) }), footer] }));
    }
    if (rows === 0 || cols === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: Math.max(height, edge) }), footer] }));
    }
    const label = accessibilityLabel ??
        `Heatmap, ${rows} by ${cols} grid, ${valueFormat(floor)} to ${valueFormat(ceiling)}.`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [rowLabels !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: v4_chart_1.CHART_MARK.gap }, children: data.map((_, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: edge, justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "right", children: rowLabels[r] ?? '' }) }, r))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: { gap: v4_chart_1.CHART_MARK.gap }, children: data.map((row, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: Array.from({ length: cols }, (_, c) => {
                                        const value = row[c] ?? 0;
                                        const t = span === 0 ? 1 : bucket((value - floor) / span);
                                        const cell = {
                                            row: r,
                                            column: c,
                                            value,
                                            ...(rowLabels?.[r] !== undefined ? { rowLabel: rowLabels[r] } : {}),
                                            ...(columnLabels?.[c] !== undefined
                                                ? { columnLabel: columnLabels[c] }
                                                : {}),
                                        };
                                        const reading = [cell.rowLabel, cell.columnLabel].filter(Boolean).join(' · ');
                                        const tile = {
                                            width: edge,
                                            height: edge,
                                            borderRadius: tokens.radius.sm,
                                            backgroundColor: palette.sequential(t),
                                        };
                                        if (!interactive)
                                            return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "heatmap-cell", style: tile }, c);
                                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "heatmap-cell", accessibilityRole: "button", accessibilityLabel: reading
                                                ? `${reading}: ${valueFormat(value)}`
                                                : `${valueFormat(value)}`, onPress: () => onCellSelect(cell), style: tile }, c));
                                    }) }, r))) }), columnLabels !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: Array.from({ length: cols }, (_, c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: edge }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: columnLabels[c] ?? '' }) }, c))) })) : null] })] }), legend ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "heatmap-key", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: valueFormat(floor) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: Array.from({ length: RAMP_STEPS }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: v4_chart_1.CHART_MARK.dotSize,
                                height: v4_chart_1.CHART_MARK.dotSize,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: palette.sequential(i / (RAMP_STEPS - 1)),
                            } }, i))) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: valueFormat(ceiling) })] })) : null, footer] }));
}
//# sourceMappingURL=HeatmapV4.js.map