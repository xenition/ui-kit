"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletCardV3 = WalletCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const KIND_META = {
    hot: { accent: 'primary', label: 'Hot' },
    hardware: { accent: 'success', label: 'Hardware' },
    watch: { accent: 'accent', label: 'Watch-only' },
};
/**
 * WalletCard, redesigned (v3): a **minimal list row** built around a copyable
 * address chip. A single custody-tinted dot leads a label + address stack, where
 * the truncated address sits in a bordered chip that hands the FULL address back
 * through `onCopy`; the fiat balance is right-aligned through {@link MoneyAmount}
 * (integer cents — no drift) over the native amount. No card, just a hairline
 * base rule, so a stack reads as a lean wallet list. Distinct at a glance from
 * v1's card and v2's gradient face. Same props.
 */
function WalletCardV3({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, loading = false, onCopy, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = kind ? KIND_META[kind] : undefined;
    const short = (0, format_1.truncateHash)(address, 6, 4);
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
                    backgroundColor: meta ? colors[meta.accent] : colors.muted,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Copy address ${address}`, onPress: onCopy ? () => onCopy(address) : undefined, disabled: !onCopy, style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: tokens.ramps.neutral[100],
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.full,
                            paddingVertical: 3,
                            paddingHorizontal: tokens.spacing.sm,
                            opacity: pressed ? 0.7 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: short }), onCopy ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u29C9" }) : null] })] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading balance", style: { height: 20, width: 84, borderRadius: tokens.radius.sm, backgroundColor: colors.border, opacity: 0.5 } })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [balanceCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "md" })) : null, nativeAmount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol }) })) : null] }))] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=WalletCardV3.js.map