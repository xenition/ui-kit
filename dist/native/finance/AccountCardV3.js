"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCardV3 = AccountCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const MoneyAmount_1 = require("./MoneyAmount");
const mask_1 = require("./internal/mask");
const VARIANT_META = {
    checking: { accent: 'primary', glyph: '🏦', label: 'Checking' },
    savings: { accent: 'success', glyph: '🐖', label: 'Savings' },
    credit: { accent: 'accent', glyph: '💳', label: 'Credit' },
};
/**
 * AccountCard, redesigned (v3): a **minimal list row**. A single colored account
 * dot (the variant accent) leads a name / type stack, with the balance right-
 * aligned through {@link MoneyAmount}. No card, no glyph tile — a hairline base
 * rule is the only separation, so a stack of these reads as a lean account list.
 * Distinct at a glance from v1's bordered card and v2's card face. Same props.
 */
function AccountCardV3({ name, variant, balanceCents, currency = 'USD', accountNumber, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const press = (0, motion_1.usePressScale)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 10,
                    height: 10,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors[meta.accent],
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : meta.label })] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "md" })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label} account`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=AccountCardV3.js.map