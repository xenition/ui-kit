"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductibleBarV4 = DeductibleBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../../commerce/money");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 deductible bar** — same props as {@link DeductibleBar} plus `metLabel`,
 * `toGoLabel`, `overLabel` and `noCeilingLabel` (`formatMoney` is already on
 * the base).
 *
 * ## Five changes
 *
 * 1. **A policy with no deductible stops claiming the deductible is met.**
 *    `ratio = ceiling > 0 ? met / ceiling : 1` — so `deductibleCents={0}`, which
 *    is what a plan with no deductible sends, drew a **full green bar reading
 *    "Deductible met"** over "$0.00 / $0.00". The shared reader reports that
 *    case as `hasCeiling: false`, and the component draws no meter and no
 *    verdict, only what has been applied.
 * 2. **The meter and the caption agree.** The base passed `value={ratio * 100}`
 *    straight through, so `metCents={10000} deductibleCents={30000}` announced
 *    "33.33333333333333 percent" beside a caption that said 33%. `percent` is
 *    a whole number, computed once, and it is the number the progressbar
 *    reports and the number the caption prints.
 * 3. **Money applied beyond the ceiling is acknowledged.** $1,500 against a
 *    $1,000 deductible rendered "$1,000.00 / $1,000.00" and said nothing about
 *    the other $500 — a figure a policyholder is entitled to see, because it is
 *    what their next claim is measured from.
 * 4. **The bar is one named progressbar.** The label sat on a plain `View`
 *    with no `accessible`, so on iOS it was not a stop at all and the meter
 *    inside it reported a bare number with no name.
 * 5. **`warn` stops meaning "in progress".** An unmet deductible is the normal
 *    state of a policy in January, not a caution; toning it amber is how a
 *    product teaches people to ignore amber. In-progress is `primary`, met is
 *    `success` — a state colour for the one state that is actually a state.
 */
function DeductibleBarV4({ metCents, deductibleCents, label = 'Deductible', currency = 'USD', metLabel = 'Deductible met', toGoLabel = 'to go', overLabel = 'applied beyond the deductible', noCeilingLabel = 'No deductible recorded', formatMoney: format = money_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const parts = (0, coverage_v4_1.deductibleParts)(metCents, deductibleCents);
    const metText = format(parts.met, currency);
    const figures = parts.hasCeiling
        ? `${metText} / ${format(parts.ceiling ?? 0, currency)}`
        : metText;
    const overText = parts.over > 0 ? `${format(parts.over, currency)} ${overLabel}` : null;
    const words = !parts.hasCeiling
        ? [noCeilingLabel]
        : parts.satisfied
            ? [metLabel, overText]
            : [`${format((parts.ceiling ?? 0) - parts.met, currency)} ${toGoLabel}`];
    // The drawn caption keeps `metaLine`'s middle dot; the spoken one takes
    // commas, because a reader either says "middle dot" or swallows the pause.
    const verdict = (0, tone_v4_1.metaLine)(words);
    const percent = parts.percent ?? 0;
    const spoken = (0, tone_v4_1.spokenLine)([label, figures, parts.hasCeiling ? `${percent}%` : null, ...words]);
    const meter = ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: spoken, accessibilityValue: { min: 0, max: 100, now: percent, text: `${percent}%` }, children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: percent, max: 100, tone: parts.satisfied ? 'success' : 'primary' }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View
    // With a ceiling the meter is the named element; without one there is no
    // meter, so the block itself becomes the single stop.
    , { ...(parts.hasCeiling ? {} : { accessible: true, accessibilityLabel: spoken }), style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View
            // The meter below carries the whole line; announcing the caption too
            // would read the same three facts twice.
            , { ...(parts.hasCeiling ? tone_v4_1.DECORATIVE : {}), style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flex: 1 }, children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: figures })] }), parts.hasCeiling ? meter : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { ...(parts.hasCeiling ? tone_v4_1.DECORATIVE : {}), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: parts.satisfied ? 'semibold' : 'regular', style: { color: parts.satisfied ? (0, tone_v4_1.toneInk)(theme, 'success') : theme.colors.mutedText }, children: verdict }) })] }));
}
//# sourceMappingURL=DeductibleBarV4.js.map