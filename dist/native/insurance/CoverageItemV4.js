"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageItemV4 = CoverageItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 coverage line** — same props as {@link CoverageItem} plus
 * `unlimitedLabel`, `excludedLabel` and `includedLabel`.
 *
 * ## Four changes
 *
 * 1. **`'—'` no longer means two opposite things.** The base printed an em
 *    dash in the limit column for an included coverage with no ceiling *and*
 *    for a coverage the policy does not carry at all. So "Roadside assistance
 *    — " could mean unlimited roadside assistance or no roadside assistance,
 *    and the only way to tell was to notice which of two similar glyph discs
 *    was drawn 200px to the left. They are `unlimitedLabel` and `excludedLabel`
 *    now, and they are words.
 * 2. **Inclusion stops being a verdict.** `included → success` and
 *    `excluded → muted` spent the status palette on a property of the
 *    contract: a benefits table rendered half green and half greyed-out, so by
 *    the time something genuinely was wrong the screen had already used its
 *    alarm colours on a list of what a policy covers. Both marks are a glyph
 *    and a word on the one neutral chip ground.
 * 3. **The line is one announced object.** The mark carried its own
 *    `accessibilityLabel` ("Included") and the limit sat in a separate text
 *    node, so a reader walking a fifteen-line benefits table heard "Included",
 *    "Collision", "$50,000.00" as three unrelated stops. It is one name now:
 *    "Collision, Included, $50,000.00, Up to actual cash value".
 * 4. **A negative limit is shown.** `Math.max(0, …)` printed `$0.00` for
 *    `limitCents={-1}`, which reads as a coverage with no benefit rather than
 *    as the data error it is.
 *
 * `included={false}` keeps its strike-through: it is a non-colour signal, and
 * with the word beside it the state no longer rests on either one alone.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
function CoverageItemV4({ label, included = true, limitCents, detail, currency = 'USD', unlimitedLabel = 'Unlimited', excludedLabel = 'Not covered', includedLabel = 'Included', formatMoney: format = money_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const mark = included ? tone_v4_1.COVERAGE_MARK_V4.included : tone_v4_1.COVERAGE_MARK_V4.excluded;
    const word = included ? includedLabel : excludedLabel;
    // Three distinct readings where the base had two: a limit, no ceiling, or
    // not carried at all.
    const value = !included
        ? excludedLabel
        : typeof limitCents === 'number' && Number.isFinite(limitCents)
            ? format(Math.trunc(limitCents), currency)
            : unlimitedLabel;
    const spoken = (0, tone_v4_1.spokenLine)([label, word, value, detail]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: detail != null && detail !== '' }), style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.full, backgroundColor: (0, tone_v4_1.chipGround)(theme) },
                ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: mark.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: included ? 'onCard' : 'mutedText', numberOfLines: 1, style: { textDecorationLine: included ? 'none' : 'line-through' }, children: label }), detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 2, children: detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: included ? 'onCard' : 'mutedText', numeric: "tabular", children: value }) })] }));
}
//# sourceMappingURL=CoverageItemV4.js.map