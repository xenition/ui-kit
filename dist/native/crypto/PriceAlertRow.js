"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceAlertRow = PriceAlertRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const CONDITION_META = {
    above: { label: 'Above', glyph: '▲', slot: 'success' },
    below: { label: 'Below', glyph: '▼', slot: 'danger' },
};
/**
 * One configurable price alert: the watched symbol, a condition line (glyph +
 * `Above`/`Below` label, so direction is not color-only) with the target
 * price, an optional current-price context line, and a {@link Switch} to arm
 * or disarm it. Prices are fixed-precision — no float drift. The whole row's
 * opacity drops while disabled to reinforce the state beyond the switch alone.
 */
function PriceAlertRow({ symbol, condition, targetPrice, currentPrice, currencySymbol = '$', decimals = 2, enabled = false, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = CONDITION_META[condition];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                opacity: enabled ? 1 : 0.6,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: symbol }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.slot], fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatPrice)(targetPrice, { symbol: currencySymbol, decimals }) })] }), currentPrice != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: `Now ${(0, format_1.formatPrice)(currentPrice, { symbol: currencySymbol, decimals })}` })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onCheckedChange: onToggle, accessibilityLabel: `${symbol} alert ${meta.label.toLowerCase()} ${(0, format_1.formatPrice)(targetPrice, { symbol: currencySymbol, decimals })}` })] }));
}
//# sourceMappingURL=PriceAlertRow.js.map