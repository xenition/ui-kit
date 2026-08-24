"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpendCategoryRow = SpendCategoryRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const charts_1 = require("../charts");
const MoneyAmount_1 = require("./MoneyAmount");
/**
 * A spend-by-category row: tinted glyph, category name over a share bar, and a
 * right-aligned amount + percentage. `share` is a `0–1` fraction (guarded and
 * clamped) that sizes the {@link MiniBar} and prints as a whole-percent chip;
 * the amount is neutral-toned integer cents. Fully token-bound.
 */
function SpendCategoryRow({ category, amountCents, currency = 'USD', share, icon, color = 'primary', onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const clampedShare = typeof share === 'number' && Number.isFinite(share) ? Math.min(Math.max(share, 0), 1) : undefined;
    // Appearance surface FIRST; layout (radius/padding) stays AFTER. Classic → no
    // surface layer, so the historical row is byte-for-byte identical.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: color, size: "xl" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }, children: category }), clampedShare != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [Math.round(clampedShare * 100), "%"] })) : null] }), clampedShare != null ? ((0, jsx_runtime_1.jsx)(charts_1.MiniBar, { value: clampedShare * 100, max: 100, color: color, accessibilityLabel: `${category}, ${Math.round(clampedShare * 100)}% of spend` })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: amountCents, currency: currency, tone: "neutral", size: "sm" })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: category, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=SpendCategoryRow.js.map