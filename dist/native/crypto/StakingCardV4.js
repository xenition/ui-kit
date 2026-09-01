"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingCardV4 = StakingCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const money_1 = require("../../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const STATUS_META = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
    inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};
/**
 * A yield printed as a level: two fixed decimals, a `%`, and no sign.
 *
 * `formatPct` prefixes `+` for any positive number, which is right for a
 * *change* and wrong for a *rate* — see the doc block below. `formatPrice`
 * with an empty symbol is the module's own fixed-precision formatter with the
 * sign logic left out, so there is no second number formatter here.
 */
function formatApy(apy) {
    return `${(0, format_1.formatPrice)(apy, { symbol: '', decimals: 2 })}%`;
}
/**
 * **V4 staking position** — same props as {@link StakingCard} plus `apyLabel`.
 *
 * ## Four changes
 *
 * 1. **APY is printed without a change sign.** `formatPct` prefixes `+` for
 *    every positive value, so a 4.2% yield rendered as **`+4.20%`** — which
 *    reads as a movement *in* the rate, not as the rate. An APY is a level.
 * 2. **APY is not `success`.** The base coloured it green unconditionally. A
 *    yield is not a gain; it is a number that happens to be positive, and
 *    spending the success slot on it means the one colour that should mean
 *    "this went well" is on screen whether or not anything did.
 * 3. **The two twins agree about the actions.** Native gave Claim
 *    `tone="success"` and web did not, so the same button was green on the
 *    phone and brand-coloured on the laptop; both now take the default
 *    primary. `disabled` is `!hasRewards || loading` for Claim and `loading`
 *    for Unstake, as the web twin already had it.
 * 4. **The figures are announced as figures.** "Staked, 12.5 ETH, $30,000" is
 *    one stop instead of three, and the fiat and token amounts are tabular so
 *    the two stacked columns line up.
 */
function StakingCardV4({ symbol, name, stakedAmount, decimals = 4, stakedValueCents, currency = 'USD', apy, rewardsAmount, status = 'active', apyLabel = 'APY', onClaim, onUnstake, loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!symbol)
        return null;
    const meta = STATUS_META[status];
    const hasRewards = rewardsAmount != null && rewardsAmount > 0;
    const stakedText = (0, format_1.formatToken)(stakedAmount, { decimals, symbol });
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: symbol }), name != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: name })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...market_v4_1.BADGE_V4, children: `${meta.glyph} ${meta.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.md,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, market_v4_1.spokenLine)([
                                'Staked',
                                stakedText,
                                stakedValueCents != null ? (0, money_1.formatMoney)(stakedValueCents, currency) : null,
                            ]), style: { gap: tokens.spacing.xs, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "Staked" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: stakedText }), stakedValueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: stakedValueCents, currency: currency, tone: "muted", size: "sm" })) : null] }), apy != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, market_v4_1.spokenLine)([apyLabel, formatApy(apy)]), style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: apyLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: formatApy(apy) })] })) : null] }), rewardsAmount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                        paddingTop: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: "Rewards" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", numeric: "tabular", style: {
                                color: hasRewards ? (0, market_v4_1.toneInk)(theme, 'success') : colors.mutedText,
                            }, children: (0, format_1.formatToken)(rewardsAmount, { decimals, symbol }) })] })) : null, onClaim != null || onUnstake != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onClaim != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onPress: onClaim, disabled: !hasRewards || loading, loading: loading, style: { flex: 1 }, children: "Claim" })) : null, onUnstake != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", onPress: onUnstake, disabled: loading, loading: loading, style: { flex: 1 }, children: "Unstake" })) : null] })) : null] }) }));
}
//# sourceMappingURL=StakingCardV4.js.map