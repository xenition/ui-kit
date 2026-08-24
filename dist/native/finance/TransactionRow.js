"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRow = TransactionRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const MoneyAmount_1 = require("./MoneyAmount");
/**
 * One line in a transaction feed: a tinted category avatar, a title/subtitle
 * stack, and a right-aligned {@link MoneyAmount} over an optional date. The
 * amount tone follows `direction` (income = `success`, expense = `danger`) and
 * the magnitude is integer cents — no float drift. Fully token-bound; becomes a
 * button only when `onPress` is supplied (which also enables a press-scale
 * spring). `appearance` opts the row into an alternate surface treatment.
 */
function TransactionRow({ title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const signedCents = direction
        ? direction === 'expense'
            ? -Math.abs(amountCents)
            : Math.abs(amountCents)
        : amountCents;
    // Appearance surface goes FIRST; layout (radius/padding) stays AFTER. Classic
    // stays byte-for-byte identical (no surface layer added).
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: iconColor, size: "lg" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), subtitle != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: signedCents, currency: currency, tone: direction ?? 'auto', size: "md", signDisplay: "always" }), date != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: date })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }) }));
}
//# sourceMappingURL=TransactionRow.js.map