"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBarsV4 = ProgressBarsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
/**
 * One row's bar, as its own component so the width can be an animated value.
 *
 * A hook cannot live inside the `items.map()` callback — the number of rows
 * changes with the data, and so would the number of hooks — so the row's mark
 * becomes a component and takes the hook with it.
 *
 * The width is a percentage, which is the one thing that made this fix
 * non-obvious: `Animated` cannot drive a percentage directly, so the driven
 * value is the **ratio** and `interpolate` spells it back out as `0%` to
 * `100%`. See {@link useChartValueV4} for why this is JS-driven and why that
 * costs nothing here.
 */
function ProgressFillV4({ ratio, color }) {
    const progress = (0, internal_v4_1.useChartValueV4)(ratio);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "progress-fill", style: {
            width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            height: '100%',
            backgroundColor: color,
            borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
            borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
        } }));
}
/**
 * **V4 progress bars** — a labelled row list with a bar per row.
 *
 * ## This is a list, not a plot, and that decides almost everything
 *
 * Brief §5 Group D says it in one line — "the one chart-shaped thing that is
 * really a *list*, so it takes the row metric from
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3, not a chart metric" — and the
 * consequences are worth spelling out, because every one of them is a place the
 * naive reading would have gone wrong.
 *
 * - **The row height is the row family's.** `rowMetrics(theme).twoLine` — 72,
 *   composed as `2xl + lg`, M3's two-line list container — *imported* from
 *   `dashboard/internal/row-v4.ts` rather than restated. A row carrying a title
 *   and a bar is a two-line row: the bar sits where a supporting line sits. The
 *   point of importing is that a "top channels" list inside a dashboard card
 *   and the `SettingsRow` list on the next screen must be indistinguishable as
 *   a family, and they cannot be if one of them measured its own height. The
 *   base used a bare `spacing.sm` between rows and no height at all, so its
 *   rows were shorter than every other row in the product.
 * - **The horizontal padding is `spacing.md`,** the row gutter. The list lives
 *   inside a card that is already inset by `lg`; paying the page gutter twice
 *   pushes every row's text into a narrow channel down the middle.
 * - **The accessible shape is a list.** Not `accessibilityRole="image"`, which
 *   is what the base used. Rule 6 asks every *chart* to state its value in
 *   words because a rendered plot has no text a screen reader can reach — but
 *   this component's values already *are* text, in reading order, one per row.
 *   Collapsing them into a single image with a derived sentence takes working
 *   content away and gives back a summary. So the container is a `list` with
 *   the derived sentence as its label, and each row names itself and its value.
 *   This is a decision the brief did not settle; it is the one that loses
 *   nothing.
 * - **The bar is not coloured by its own value.** §4.1: bar length already
 *   shows magnitude, and spending the identity channel on it says nothing new.
 *   Every row is slot 1 unless it carries a `tone`, which is the *only* way a
 *   status hue is painted here (rule 3, §4.3). The base's per-item `color` took
 *   any semantic slot, which is how a list of five rows ended up green, amber
 *   and red for no reason other than being third, fourth and fifth.
 *
 * ## What the bar itself is made of
 *
 * A track at `palette.grid` — chart *chrome*, the same recessive neutral the
 * grid lines take — under a fill at slot 1. The track matters: without it a
 * reader cannot see how much of the row is unfilled, and rows stop being
 * comparable, which is the entire reason the form exists.
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). For a horizontal bar
 * the data end is the trailing edge and the baseline is the leading edge, so
 * the corners are rounded on the right and square on the left. A fill rounded
 * at both ends floats off its own zero.
 *
 * The bar's thickness is `CHART_MARK.dotSize` — the module's smallest painted
 * mark, reused rather than a new number, which is also why it is not a prop: a
 * list whose rows have different bar weights is not one list.
 *
 * ## Why it does not compose `MiniBarV4`
 *
 * The base builds each row on `MiniBar`, and rule 8's "a V4 composite composes
 * V4 children" would point at `MiniBarV4`. It deliberately does not, for a
 * reason about the form rather than about build order: a `MiniBar` is a
 * **mark** — a fill with no track — and this row needs a track, because the
 * unfilled remainder is half of what a reader is comparing. Composing the mark
 * and then drawing a track behind it would leave the two halves of one bar
 * owned by two components.
 */
function ProgressBarsV4({ items, max, showValues = true, title, caption, valueFormat = String, onItemSelect, loading = false, emptyLabel = 'No data', animate: _animate = true, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const metrics = (0, row_v4_1.rowMetrics)(theme);
    const frame = { gap: tokens.spacing.md };
    const header = title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })) : null;
    const footer = caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: Math.max(items.length, 1) }), footer] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, minHeight: metrics.twoLine }), footer] }));
    }
    const finite = items.map((i) => i.value).filter(Number.isFinite);
    const ceiling = max ?? (finite.length > 0 ? Math.max(...finite) : 0);
    const label = accessibilityLabel ??
        `${title ?? 'Progress'}, ${items.length} ${items.length === 1 ? 'row' : 'rows'}, ` +
            `${items.map((i) => `${i.label} ${valueFormat(i.value)}`).join(', ')}.`;
    const rowStyle = {
        // The row metric (§4.3), imported rather than restated.
        minHeight: metrics.twoLine,
        paddingHorizontal: metrics.padX,
        paddingVertical: tokens.spacing.sm,
        justifyContent: 'center',
        gap: metrics.textGap,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: label, children: items.map((item, i) => {
                    // A zero ceiling has no scale to map onto; every fill is then the
                    // hairline that says "nothing yet", not a divide-by-zero.
                    const ratio = ceiling === 0 || !Number.isFinite(item.value)
                        ? 0
                        : Math.min(Math.max(item.value / ceiling, 0), 1);
                    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: metrics.gap }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, style: { flex: 1 }, children: item.label }), showValues ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: valueFormat(item.value) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "progress-track", style: {
                                    height: v4_chart_1.CHART_MARK.dotSize,
                                    backgroundColor: palette.grid,
                                    overflow: 'hidden',
                                    // §4.4: the rounded end is the DATA end — the trailing edge
                                    // for a horizontal bar. The leading edge is the baseline and
                                    // stays square.
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                }, children: (0, jsx_runtime_1.jsx)(ProgressFillV4, { ratio: ratio, color: item.tone !== undefined ? colors[item.tone] : (0, internal_v4_1.chartSlotColor)(palette, 0) }) }), item.caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: item.caption })) : null] }));
                    if (onItemSelect === undefined) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "progress-row", style: rowStyle, children: body }, i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "progress-row", accessibilityRole: "button", accessibilityLabel: `${item.label}: ${valueFormat(item.value)}`, onPress: () => onItemSelect(item, i), style: rowStyle, children: body }, i));
                }) }), footer] }));
}
//# sourceMappingURL=ProgressBarsV4.js.map