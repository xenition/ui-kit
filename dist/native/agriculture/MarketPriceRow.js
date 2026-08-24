"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketPriceRow = MarketPriceRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const DIR_META = {
    up: { glyph: '▲', color: 'success', sign: '+' },
    down: { glyph: '▼', color: 'danger', sign: '' },
    flat: { glyph: '▪', color: 'muted', sign: '' },
};
function deriveDirection(changePct) {
    if (typeof changePct !== 'number' || changePct === 0)
        return 'flat';
    return changePct > 0 ? 'up' : 'down';
}
/**
 * A market-price row — commodity glyph + name, the current price with unit, and
 * a change readout. The change carries a direction glyph (`▲`/`▼`/`▪`) and an
 * explicit sign alongside its color, so the movement reads without color alone.
 * `changePct` is guarded and the direction defaults to the sign of the change.
 * Tappable via `onPress` (accessible button). Token-bound — no literal colors.
 */
function MarketPriceRow({ commodity, price, unit, changePct, direction, icon = '🌾', market, last = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dir = direction ?? deriveDirection(changePct);
    const meta = DIR_META[dir];
    const hasChange = typeof changePct === 'number';
    const changeText = hasChange
        ? `${meta.glyph} ${meta.sign}${Math.abs(changePct).toFixed(1)}%`
        : null;
    const Body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "lg", color: "onSurface" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: commodity }), market != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: market })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: [String(price), unit != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }, children: [" ", unit] }) : null] }), changeText != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: changeText })) : null] })] }));
    if (!onPress)
        return Body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${commodity}, ${String(price)}${unit ? ` ${unit}` : ''}${changeText ? `, ${dir} ${Math.abs(changePct).toFixed(1)} percent` : ''}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }], children: Body }));
}
//# sourceMappingURL=MarketPriceRow.js.map