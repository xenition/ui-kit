"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCardV2 = AccountCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
const mask_1 = require("./internal/mask");
const VARIANT_META = {
    checking: { fill: 'primary', on: 'onPrimary', glyph: '🏦', label: 'Checking' },
    savings: { fill: 'success', on: 'onSuccess', glyph: '🐖', label: 'Savings' },
    credit: { fill: 'accent', on: 'onAccent', glyph: '💳', label: 'Credit' },
};
/**
 * AccountCard, redesigned (v2): a **full credit-card face**. The whole tile is
 * filled with the variant's fill slot (primary / success / accent) and lifted
 * with a shadow; a translucent sheen band suggests a gradient without a literal
 * color. The balance is set large in the guaranteed on-fill text slot, with the
 * name up top and the masked number along the bottom like an embossed PAN.
 * Distinct at a glance from v1's small glyph tile. Same props, integer cents.
 */
function AccountCardV2({ name, variant, balanceCents, currency = 'USD', accountNumber, icon, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const press = (0, motion_1.usePressScale)();
    const onColor = colors[meta.on];
    const subColor = (0, color_1.withAlpha)(onColor, 0.72);
    const safeBalance = Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                minHeight: 172,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                backgroundColor: colors[meta.fill],
                justifyContent: 'space-between',
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: -60,
                    right: -40,
                    width: 200,
                    height: 200,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(onColor, 0.08),
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: onColor, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.xs }, children: meta.label })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, children: icon ?? meta.glyph })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.xs }, children: "Balance" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: onColor,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: (0, money_1.formatMoney)(safeBalance, currency) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: subColor,
                    fontSize: tokens.typography.scale.sm,
                    letterSpacing: 2,
                    fontVariant: ['tabular-nums'],
                }, children: accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : '•• ••••' })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label} account`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=AccountCardV2.js.map