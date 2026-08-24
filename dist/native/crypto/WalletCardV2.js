"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletCardV2 = WalletCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
const format_1 = require("./internal/format");
const KIND_META = {
    hot: { fill: 'primary', on: 'onPrimary', glyph: '🔥', label: 'Hot' },
    hardware: { fill: 'success', on: 'onSuccess', glyph: '🔒', label: 'Hardware' },
    watch: { fill: 'accent', on: 'onAccent', glyph: '👁', label: 'Watch-only' },
};
/**
 * WalletCard, redesigned (v2): a **full gradient wallet-face**. The whole tile is
 * filled from a custody-mapped slot (hot → primary, hardware → success, watch →
 * accent) and lifted with a shadow; a translucent on-color sheen band reads as a
 * gradient without a literal color. The fiat balance is set large in the
 * guaranteed on-fill text slot, with the custody badge up top and a translucent
 * copyable address chip along the bottom. Distinct at a glance from v1's small
 * bordered card. Same props; balance stays integer cents (no float drift).
 */
function WalletCardV2({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, loading = false, onCopy, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = kind ? KIND_META[kind] : KIND_META.hot;
    const onColor = colors[meta.on];
    const subColor = (0, color_1.withAlpha)(onColor, 0.72);
    const short = (0, format_1.truncateHash)(address, 6, 4);
    const safeBalance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                minHeight: 176,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                backgroundColor: colors[meta.fill],
                justifyContent: 'space-between',
                gap: tokens.spacing.md,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: -70,
                    right: -50,
                    width: 220,
                    height: 220,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(onColor, 0.1),
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: onColor, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), kind ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(onColor, 0.18),
                            borderRadius: tokens.radius.full,
                            paddingVertical: 4,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label })] })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading balance", style: { height: 34, width: '62%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(onColor, 0.22) } })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.xs }, children: "Balance" }), safeBalance != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: onColor,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: (0, money_1.formatMoney)(safeBalance, currency) })) : null, nativeAmount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.sm, fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol }) })) : null] })), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Copy address ${address}`, onPress: onCopy ? () => onCopy(address) : undefined, disabled: !onCopy, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(onColor, 0.14),
                    borderRadius: tokens.radius.full,
                    paddingVertical: 5,
                    paddingHorizontal: tokens.spacing.sm,
                    opacity: pressed ? 0.7 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onColor, fontSize: tokens.typography.scale.sm, fontVariant: ['tabular-nums'] }, children: short }), onCopy ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.xs }, children: "\u29C9" }) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.92 : 1 }), children: body }) }));
}
//# sourceMappingURL=WalletCardV2.js.map