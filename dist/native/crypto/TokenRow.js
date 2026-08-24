"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRow = TokenRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
/**
 * One holding in a token list: a tinted token disc, symbol/name, the held
 * quantity (fixed-precision — no float drift), and a right-aligned fiat value
 * over a token-toned 24h change (gain = `success`, loss = `danger`, each with a
 * ▲/▼ glyph so it is not color-only). Becomes a button when `onPress` is set.
 */
function TokenRow({ symbol, name, amount, decimals = 4, valueCents, currency = 'USD', changePct, icon, iconColor = 'primary', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasChange = changePct != null;
    const toneKey = (0, format_1.changeToneKey)(changePct ?? 0);
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.ramps.neutral[100],
                    borderWidth: 1,
                    borderColor: colors.border,
                }, children: icon != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: iconColor, size: "lg" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[iconColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: symbol.slice(0, 3).toUpperCase() })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: symbol }), name != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: name })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            fontVariant: ['tabular-nums'],
                        }, children: (0, format_1.formatToken)(amount, { decimals, symbol }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "neutral", size: "sm" })) : null, hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct ?? 0))}`, style: {
                                    color: colors[toneKey],
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '600',
                                    fontVariant: ['tabular-nums'],
                                }, children: [(0, format_1.changeGlyph)(changePct ?? 0), " ", (0, format_1.formatPct)(changePct ?? 0)] })) : null] })] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${symbol} holding`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=TokenRow.js.map