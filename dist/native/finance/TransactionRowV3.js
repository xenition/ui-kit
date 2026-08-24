"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRowV3 = TransactionRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const MoneyAmount_1 = require("./MoneyAmount");
/**
 * TransactionRow, redesigned (v3): a **minimal dense line**. A tiny colored
 * status glyph leads, the title and (middot-joined) subtitle share one flexible
 * line, and the signed amount hugs the right edge. No avatar disc, no card —
 * tuned for long, scannable feeds. Distinct at a glance from v1/v2. Same props,
 * integer-cents money, token-pure.
 */
function TransactionRowV3({ title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const signedCents = direction
        ? direction === 'expense'
            ? -Math.abs(amountCents)
            : Math.abs(amountCents)
        : amountCents;
    const meta = [subtitle, date].filter((s) => s != null).join(' · ');
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: icon })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 6,
                    height: 6,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors[iconColor],
                } })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), meta !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: signedCents, currency: currency, tone: direction ?? 'auto', size: "sm", signDisplay: "always" })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=TransactionRowV3.js.map