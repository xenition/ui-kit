"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasFeeRow = GasFeeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const SPEED_META = {
    slow: { label: 'Slow', glyph: '🐢', slot: 'muted' },
    average: { label: 'Average', glyph: '🚶', slot: 'primary' },
    fast: { label: 'Fast', glyph: '⚡', slot: 'success' },
};
/**
 * One selectable gas-fee tier: a glyph + speed label (so the tier is not
 * distinguished by color alone), the gwei price, an optional ETA, and a fiat
 * cost estimate (via {@link MoneyAmount} — no float drift). When `selected` the
 * row gains a primary-ramp tint and an accessibility `selected` state.
 */
function GasFeeRow({ speed, gwei, costCents, currency = 'USD', eta, selected = false, onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SPEED_META[speed];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? tokens.ramps.primary[100] : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: meta.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: [(0, format_1.formatToken)(gwei, { decimals: 2, symbol: 'gwei' }), eta != null ? ` · ${eta}` : ''] })] }), costCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: costCents, currency: currency, tone: "neutral", size: "sm" })) : null] }));
    if (!onSelect)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${meta.label} gas`, onPress: () => onSelect(speed), style: ({ pressed }) => ({ opacity: pressed ? 0.8 : 1 }), children: body }));
}
//# sourceMappingURL=GasFeeRow.js.map