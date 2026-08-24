"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletCard = WalletCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const KIND_META = {
    hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
    hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
    watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};
/**
 * The header card for a single wallet: a friendly label + custody badge, the
 * total fiat balance (via {@link MoneyAmount}, so the printed value never
 * drifts), the native-token amount, and a pressable truncated-address chip
 * that hands the FULL address back through `onCopy`. Token-bound throughout;
 * the `accent` variant tints the surface from the primary ramp.
 */
function WalletCard({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, variant = 'elevated', loading = false, onCopy, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const short = (0, format_1.truncateHash)(address, 6, 4);
    const kindMeta = kind ? KIND_META[kind] : undefined;
    const cardVariant = variant === 'accent' ? 'elevated' : variant;
    const accentStyle = variant === 'accent' ? { backgroundColor: tokens.ramps.primary[100] } : null;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), kindMeta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: kindMeta.tone, variant: "soft", size: "sm", children: `${kindMeta.glyph} ${kindMeta.label}` })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading balance", style: { height: 32, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border, opacity: 0.5 } })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [balanceCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "xl" })) : null, nativeAmount != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol }) })) : null] })), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Copy address ${address}`, onPress: onCopy ? () => onCopy(address) : undefined, disabled: !onCopy, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: tokens.ramps.neutral[100],
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.full,
                    paddingVertical: 4,
                    paddingHorizontal: tokens.spacing.sm,
                    opacity: pressed ? 0.7 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontVariant: ['tabular-nums'],
                        }, children: short }), onCopy ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u29C9" })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: cardVariant, style: [accentStyle, style], children: onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner })) : (inner) }));
}
//# sourceMappingURL=WalletCard.js.map