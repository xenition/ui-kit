"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTicker = PriceTicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
/**
 * A single live-price line: symbol/name on the left, price + a token-toned
 * change on the right. Gains read `success`, losses `danger`, and each change
 * is prefixed with a ▲/▼ glyph so direction is never color-only. The
 * `detailed` variant adds the long name and an optional {@link Sparkline}.
 * Prices/percentages are formatted with fixed precision — no float drift.
 */
function PriceTicker({ symbol, name, price, changePct = 0, currencySymbol = '$', priceDecimals = 2, spark, variant = 'compact', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const detailed = variant === 'detailed';
    const toneKey = (0, format_1.changeToneKey)(changePct);
    const glyph = (0, format_1.changeGlyph)(changePct);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `Loading ${symbol} price`, style: [
                {
                    height: detailed ? 56 : 40,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.border,
                    opacity: 0.5,
                },
                style,
            ] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: symbol }), detailed && name != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: name })) : null] }), detailed && spark != null && spark.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64 }, children: (0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: spark, height: 28, color: toneKey === 'muted' ? 'primary' : toneKey }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: (0, format_1.formatPrice)(price, { symbol: currencySymbol, decimals: priceDecimals }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `${changePct >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, style: {
                            color: colors[toneKey],
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                            fontVariant: ['tabular-nums'],
                        }, children: [glyph, " ", (0, format_1.formatPct)(changePct)] })] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${symbol} price`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }));
}
//# sourceMappingURL=PriceTicker.js.map