"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTickerV4 = PriceTickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const SparklineV4_1 = require("../charts/SparklineV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * The sparkline's box — the same 64 × 28 the web twin draws, passed as a
 * `width` rather than left to a wrapper, because the V4 mark plots into the
 * width it is given.
 */
const SPARK = { width: 64, height: 28 };
/**
 * **V4 price ticker** — same props as {@link PriceTicker} plus
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A loss is announced as a loss.** The base built its spoken change as
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` — and
 *    `formatPct` re-applies the sign, so `Math.abs` guaranteed a `+` on a
 *    fall: "down +3.20%". `>= 0` also sent a flat `0` down the "up" branch
 *    while the glyph beside it drew `•`.
 * 2. **The row announces the price.** `"BTC price"` was the whole name, and it
 *    *replaced* the subtree — so the one number the component exists to show
 *    was never spoken. It is one line now: symbol, name, price, movement.
 * 3. **Loading is a ticker-shaped skeleton**, not a translucent slab of
 *    `border` that is a different colour on every ground it lands on.
 * 4. **The change reads as text.** `colors[changeToneKey(pct)]` handed back a
 *    fill slot for ink; the `*Text` slots are what carry a contrast promise.
 *    Press is a state layer, and the sparkline — which says nothing the name
 *    does not — is hidden from the reader.
 */
function PriceTickerV4({ symbol, name, price, changePct = 0, currencySymbol = '$', priceDecimals = 2, spark, variant = 'compact', loading = false, directionLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!symbol)
        return null;
    const detailed = variant === 'detailed';
    const change = (0, market_v4_1.changeParts)(changePct, directionLabels);
    const ink = (0, market_v4_1.changeInk)(theme, change.tone);
    const priceText = (0, format_1.formatPrice)(price, { symbol: currencySymbol, decimals: priceDecimals });
    const pctText = (0, format_1.formatPct)(changePct);
    if (loading) {
        const band = (width, height) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height,
                width,
                borderRadius: tokens.radius.sm,
                backgroundColor: (0, market_v4_1.skeletonFill)(theme),
            } }));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `Loading ${symbol} price`, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: detailed }), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [band('40%', tokens.typography.scale.base), detailed ? band('60%', tokens.typography.scale.xs) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [band('100%', tokens.typography.scale.base), band('70%', tokens.typography.scale.xs)] })] }));
    }
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: detailed }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: symbol }), detailed && name != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: name })) : null] }), detailed && spark != null && spark.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: spark, width: SPARK.width, height: SPARK.height, ...(change.tone === 'neutral' ? {} : { tone: change.tone }) }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numeric: "tabular", children: priceText }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: ink }, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: change.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: ink }, children: pctText })] })] })] }));
    const spoken = (0, market_v4_1.spokenLine)([symbol, detailed ? name : null, priceText, change.word, pctText]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=PriceTickerV4.js.map