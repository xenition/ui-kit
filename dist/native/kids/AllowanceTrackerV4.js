"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowanceTrackerV4 = AllowanceTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const money_1 = require("../../commerce/money");
const family_v4_1 = require("../../kids/family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** An ISO 4217 code, as opposed to the `'$'` the base defaults `currency` to. */
const CURRENCY_CODE = /^[A-Za-z]{3}$/;
/**
 * **V4 allowance tracker** — same props as {@link AllowanceTracker} plus
 * `formatMoney`, `locale` and `labels`.
 *
 * ## Five changes
 *
 * 1. **Money is formatted, not concatenated.** The base built every amount as
 *    `` `${currency}${amount.toLocaleString()}` ``, so `balance={-5}` printed
 *    **`$-5`** — the sign wedged between the symbol and the digits — and
 *    `5.5` printed `$5.5` rather than `$5.50`. `formatMoney` from
 *    `commerce/money` handles a real ISO code; a bare symbol falls back to a
 *    localised number with the symbol in front and the sign in front of *that*.
 *    A `formatMoney` override and a `locale` are both accepted.
 * 2. **The savings meter draws what it announces.** The base computed a clamped
 *    percentage and then used it **only as a truthiness gate**, handing the raw
 *    `balance` and `target` to the bar — so a balance of −20 against a $100
 *    goal announced `valuenow=-20` against `valuemin=0`. `meterParts` gives the
 *    bar a clamped ratio and the readout the untouched number, which are two
 *    different jobs the base was doing with one variable.
 * 3. **A goal of nought still shows the balance.** `target={0}` used to remove
 *    the whole goal block; now the goal line renders with the reading and no
 *    meter, because the money in the wallet is real either way.
 * 4. **Spending is not an error.** The base inked spent-this-period in
 *    `colors.danger`. A child buying something with their own allowance has not
 *    caused a fault; the direction is carried by the `−` in front of the
 *    amount and by the word above it. Earned keeps `successText`, which is a
 *    genuine positive event.
 * 5. **The card is a card.** It painted `surface` — the page colour — so it
 *    never read as raised, and its skeleton painted `colors.border`, the
 *    hairline colour used as a fill. Both are tokens now (`card`/`onCard`,
 *    `skeletonFill`), and the actions clear the 44 tap floor.
 */
function AllowanceTrackerV4({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', formatMoney, locale, labels, onAdd, onWithdraw, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const copy = {
        balance: labels?.balance ?? 'Balance',
        earned: labels?.earned ?? 'Earned',
        spent: labels?.spent ?? 'Spent',
        add: labels?.add ?? 'Add',
        spend: labels?.spend ?? 'Spend',
    };
    const money = formatMoney ??
        ((amount, code) => {
            if (!Number.isFinite(amount))
                return '—';
            const iso = code != null && CURRENCY_CODE.test(code) ? code.toUpperCase() : undefined;
            // `commerce/money` carries minor units, which is the shape every other
            // priced component in the kit uses; this module carries whole units.
            if (iso)
                return (0, money_1.formatMoney)(Math.round(amount * 100), iso, locale);
            const digits = new Intl.NumberFormat(locale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(Math.abs(amount));
            // The sign goes in front of the symbol, which is the whole of defect 1.
            return `${amount < 0 ? '−' : ''}${code ?? ''}${digits}`;
        });
    const container = [(0, tone_v4_1.cardStyle)(theme), style];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading allowance", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.xs, width: '35%' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale['2xl'], width: '50%' }) })] }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: copy.balance }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        alignItems: 'center',
                        paddingVertical: tokens.spacing.lg,
                        gap: tokens.spacing.xs,
                    }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\uD83D\uDC37" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel })] })] }));
    }
    const reading = money(balance, currency);
    const parts = goal ? (0, family_v4_1.meterParts)(balance, goal.target) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([copy.balance, reading]), style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: copy.balance }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: reading })] }), typeof earned === 'number' || typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [typeof earned === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([copy.earned, money(earned, currency)]), style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: copy.earned }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", numeric: "tabular", style: { color: (0, tone_v4_1.toneInk)(theme, 'success') }, children: `+${money(earned, currency)}` })] })) : null, typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([copy.spent, money(spent, currency)]), style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: copy.spent }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: `−${money(spent, currency)}` })] })) : null] })) : null, goal ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([
                            goal.label,
                            `${reading} / ${money(goal.target, currency)}`,
                            parts?.hasLimit === true ? `${parts.percent}%` : null,
                        ]), style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: `🎯 ${goal.label}` }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: `${reading} / ${money(goal.target, currency)}` })] }), parts?.hasLimit === true ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, tone_v4_1.spokenLine)([goal.label, `${parts.percent}%`]), accessibilityValue: (0, tone_v4_1.percentValue)(parts.percent), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: parts.percent ?? 0, max: 100, tone: "success" }) }) })) : null] })) : null, onAdd || onWithdraw ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onAdd ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "soft", tone: "success", onPress: onAdd, style: { flex: 1 }, children: copy.add })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", onPress: onWithdraw, style: { flex: 1 }, children: copy.spend })) : null] })) : null] }));
}
//# sourceMappingURL=AllowanceTrackerV4.js.map