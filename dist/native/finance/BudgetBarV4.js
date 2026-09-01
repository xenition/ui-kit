"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetBarV4 = BudgetBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const MiniBarV4_1 = require("../charts/MiniBarV4");
const money_1 = require("../commerce/money");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** Where the fill changes what it means. Three quarters spent is a warning. */
const WARN_AT = 0.75;
/** A share, through `Intl` — never `toFixed`, never concatenation (rule D). */
const PERCENT = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 0,
});
/**
 * **V4 budget bar** — same props as {@link BudgetBar} plus `overLabel` and
 * `formatPercent`.
 *
 * ## Five changes
 *
 * 1. **The bar and its name agree.** The base clamped the *fill* and left the
 *    announced percentage uncapped, so at 300% spent one element drew a full
 *    bar while the name beside it said "300% of budget used" — and the meter
 *    was an `image`, so the number was never exposed as a value at all.
 *    `meterParts()` returns the clamped ratio for the meter and the true
 *    percent for the name, and the meter is a real `progressbar` carrying the
 *    clamped value.
 * 2. **Over-budget prints with a sign.** `signDisplay="never"` made −$12.00
 *    and +$12.00 the same string, leaving the tone as the only difference
 *    between "you have twelve dollars left" and "you are twelve dollars over"
 *    — invisible in greyscale.
 * 3. **The remaining balance is readable.** It is drawn through
 *    `MoneyAmount`'s `tone="muted"`, which meant `colors.muted`: a ramp step
 *    with no contrast promise, carrying a real balance.
 * 4. **The figure is sized by `size`, not by an override.** The base handed
 *    `MoneyAmount` a style object setting `fontSize` and `fontWeight` — which
 *    applies on native and is silently dropped on web, where `cn` is a joiner
 *    rather than a merger — so the same remaining balance rendered at two
 *    different sizes on the two platforms.
 * 5. **The bar's tone is genuinely status.** Budget health is one of the few
 *    places `success` / `warn` / `danger` are earned, and it ships with the
 *    percentage as a word so it never rests on hue.
 */
function BudgetBarV4({ label, spentCents, limitCents, currency = 'USD', formatMoney: format = money_1.formatMoney, overLabel = 'over', formatPercent = (percent) => `${PERCENT.format(percent / 100)} of budget used`, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
    const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
    const meter = (0, ledger_v4_1.meterParts)(spent, limit);
    const remaining = limit - spent;
    const tone = meter.over ? 'danger' : meter.ratio >= WARN_AT ? 'warn' : 'success';
    const percentText = formatPercent(meter.percent);
    const now = Math.round(meter.ratio * 100);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, style: { flex: 1 }, children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `${format(spent, currency)} / ${format(limit, currency)}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, ledger_v4_1.spokenLine)([label, percentText]), accessibilityValue: { min: 0, max: 100, now }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(MiniBarV4_1.MiniBarV4, { value: now, max: 100, tone: tone }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: remaining >= 0 ? 'Remaining' : overLabel }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: remaining, currency: currency, tone: remaining >= 0 ? 'muted' : 'expense', size: "sm", signDisplay: "auto" })] })] }));
}
//# sourceMappingURL=BudgetBarV4.js.map