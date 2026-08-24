"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingCard = StakingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const STATUS_META = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
    inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};
/**
 * A staking position card: asset header with a status badge (glyph + label, so
 * state is not color-only), the staked amount + fiat value, a highlighted APY,
 * claimable rewards toned `success`, and Claim / Unstake actions. Claim is
 * disabled when there are no rewards. All token amounts are fixed-precision and
 * fiat is integer cents — no float drift. Token-bound throughout.
 */
function StakingCard({ symbol, name, stakedAmount, decimals = 4, stakedValueCents, currency = 'USD', apy, rewardsAmount, status = 'active', onClaim, onUnstake, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const hasRewards = rewardsAmount != null && rewardsAmount > 0;
    const rewardSlot = hasRewards ? 'success' : 'muted';
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: symbol }), name != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: name })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Staked" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(stakedAmount, { decimals, symbol }) }), stakedValueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: stakedValueCents, currency: currency, tone: "muted", size: "sm" })) : null] }), apy != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "APY" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatPct)(apy) })] })) : null] }), rewardsAmount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                        paddingTop: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Rewards" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[rewardSlot], fontSize: tokens.typography.scale.base, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatToken)(rewardsAmount, { decimals, symbol }) })] })) : null, onClaim != null || onUnstake != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onClaim != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: "success", onPress: onClaim, disabled: !hasRewards, loading: loading, style: { flex: 1 }, children: "Claim" })) : null, onUnstake != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onUnstake, loading: loading, style: { flex: 1 }, children: "Unstake" })) : null] })) : null] }) }));
}
//# sourceMappingURL=StakingCard.js.map