"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendCardV4 = TrendCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
const SparklineV4_1 = require("./SparklineV4");
/**
 * Trend → direction glyph.
 *
 * The kit's confirmed icon set has `chevron-up`, `chevron-down` and `forward`
 * and no arrows, so the mark is a chevron rather than a `▲` typed into this
 * file. Identical to `StatCardV4`'s table, deliberately.
 */
const TREND_ICON = {
    up: 'chevron-up',
    down: 'chevron-down',
    flat: 'forward',
};
/**
 * Trend → ink.
 *
 * The contrast-corrected `*Text` slots, **never the fills**. Brief §5 Group A
 * asks for exactly this: "delta ink from the `*Text` slots (`successText` /
 * `dangerText` / `mutedText`), never the fills". `success` is what a filled
 * chip is painted with and the compiler makes no contrast promise about it as
 * ink on a card; `successText` is exactly that promise. The base painted the
 * delta `colors[color]` — the *fill* — which is the same defect one layer
 * down.
 */
const TREND_TONE = {
    up: 'successText',
    down: 'dangerText',
    flat: 'mutedText',
};
/**
 * **V4 trend card (native)** — the figure `StatCardV4` already got right, with
 * a plot in it.
 *
 * Brief §5 Group A names the anatomy exactly: `colors.card` ground, label →
 * value → delta → caption → sparkline, delta ink from the `*Text` slots,
 * composing `SparklineV4`. Four changes from the base, in the order they
 * matter.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** The single most
 *    visible bug in the whole V4 line: a card painted the same colour as the
 *    page it sits on is a spreadsheet cell (charts brief §3.2, layout brief
 *    §4.2), and the border ends up doing all the work. `CardV4` supplies the
 *    rest of the recipe — the radius, the hairline, `elevation.card`, and the
 *    shadow that gets *more* opacity in dark — and only the fill is stated
 *    here.
 * 2. **The delta is not colour alone.** The base tinted it `colors[color]` —
 *    the sparkline's own hue — so a delta was *purple* on a purple-seeded app
 *    and carried no direction at all. V4 pairs the `*Text` ink with a real
 *    chevron from the named set, which is the secondary encoding §1 rule 5
 *    obliges everywhere in this module and the ~8% of men who cannot separate
 *    green from red depend on.
 * 3. **The trend and the series are two different channels.** `trend` colours
 *    the delta; `slot` / `tone` colour the plot. Folding them together — one
 *    `color` prop for the sparkline *and* the delta accent — means a chart
 *    whose line changes colour when the last point moves, which is the
 *    identity break `CHART_HUE_OFFSETS` is documented to prevent. A sparkline
 *    stays slot 1 whatever the number did this month.
 * 4. **The value is the loudest thing on the block.** `3xl` bold in tabular
 *    figures, matching `StatCardV4` and `StatisticV4`. `2xl` ties the page
 *    title, and a KPI that ties the page title has no hierarchy. Tabular
 *    figures are what stop a ticking value reflowing and a column of cards
 *    failing to line up.
 *
 * Composes `CardV4`, `TextV4`, `IconV4` and `SparklineV4` — §1 rule 8, a V4
 * composite composes V4 children, which is also what keeps the mark on the
 * derived palette instead of on `colors.primary`. It renders **nothing** when
 * it has neither a label nor a value: brief §4.5, a component with nothing to
 * show is never a blank bordered box.
 */
function TrendCardV4({ label, value, delta, trend = 'flat', caption, data, slot = 0, tone, height = 28, width = 120, loading = false, raised = true, animate = true, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    const hasValue = value !== undefined && value !== null && value !== '';
    const hasLabel = label !== undefined && label !== null && label !== '';
    if (!hasLabel && !hasValue && !loading)
        return null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessibilityLabel: accessibilityLabel ??
            `${String(label ?? '')}${valueText ? `, ${valueText}` : ''}${delta ? `, ${delta}` : ''}${caption ? `, ${caption}` : ''}`, variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", style: [
            {
                // The headline fix. Everything else in the recipe is `CardV4`'s;
                // only the fill is stated here, because `CardV4` still paints the
                // page colour.
                backgroundColor: colors.card,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: loading ? ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: 2 })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: label })) : null, hasValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: value })) : null, delta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "trend-delta", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: TREND_ICON[trend], size: "xs", color: TREND_TONE[trend] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: TREND_TONE[trend], numeric: "tabular", children: delta })] })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] })) }), loading ? ((0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: [], loading: true, width: width, height: height })) : data !== undefined && data.length > 0 ? ((0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: data, slot: slot, tone: tone, width: width, height: height, animate: animate })) : null] }));
}
//# sourceMappingURL=TrendCardV4.js.map