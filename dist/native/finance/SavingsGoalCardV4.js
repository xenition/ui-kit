"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsGoalCardV4 = SavingsGoalCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const ProgressRingV4_1 = require("../charts/ProgressRingV4");
const money_1 = require("../commerce/money");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** Only the three status names are status; the rest are identity. */
const RING_TONE = {
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/** The ring's diameter, in `2xl` steps — the base wrote `size={84}`. */
const RING_STEPS = 1.75;
/** A share, through `Intl` (rule D). */
const PERCENT = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 0,
});
/**
 * **V4 savings goal card** — same props as {@link SavingsGoalCard} plus
 * `overLabel`, and with `color` narrowed to the twins' shared union.
 *
 * ## Four changes
 *
 * 1. **Beating the goal is visible.** `Math.max(target - saved, 0)` floored
 *    the overshoot, so $12,000 against a $10,000 goal read *identically* to
 *    landing exactly on target — "$0.00 to go" in both cases. The surplus now
 *    prints as a signed amount with its own caption.
 * 2. **The ring is a `progressbar`.** It was an `image` on both twins, so the
 *    one number the card exists to show was drawn and never exposed. The
 *    clamped ratio is the value; the true percent is in the name.
 * 3. **The percentage and the breakdown go through `Intl`** and are tabular,
 *    so a column of goal cards lines up and a de-DE app does not show a
 *    localised amount beside a hard-coded decimal point.
 * 4. **The captions are `mutedText`**, and the card is one announced object
 *    rather than five loose text nodes a reader walks one at a time.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function SavingsGoalCardV4({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, overLabel = 'saved over goal', appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!title)
        return null;
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const meter = (0, ledger_v4_1.meterParts)(saved, target);
    // Signed, and not floored: positive is what is left, negative is the surplus.
    const remaining = target - saved;
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const size = Math.round(tokens.spacing['2xl'] * RING_STEPS);
    const now = Math.round(meter.ratio * 100);
    const percentText = PERCENT.format(meter.percent / 100);
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [surface, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, ledger_v4_1.spokenLine)([title, percentText]), accessibilityValue: { min: 0, max: 100, now }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(ProgressRingV4_1.ProgressRingV4, { value: now, max: 100, size: size, tone: RING_TONE[color], label: percentText }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, ledger_v4_1.spokenLine)([
                        title,
                        format(saved, currency),
                        format(target, currency),
                        format(Math.abs(remaining), currency),
                        remaining < 0 ? overLabel : 'to go',
                        deadline,
                    ]), style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: saved, currency: currency, tone: "neutral", size: "md" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `/ ${format(target, currency)}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: Math.abs(remaining), currency: currency, tone: remaining < 0 ? 'income' : 'muted', size: "sm", signDisplay: remaining < 0 ? 'always' : 'never' }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: remaining < 0 ? overLabel : 'to go' }), deadline != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `· by ${deadline}` })) : null] })] })] }) }));
}
//# sourceMappingURL=SavingsGoalCardV4.js.map