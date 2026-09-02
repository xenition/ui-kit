"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitsEnrollmentV4 = BenefitsEnrollmentV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../../commerce/money");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 benefits enrollment** — same props as {@link BenefitsEnrollment} plus
 * `enrollLabel`, `formatMoney` and `formatEnrollBy`.
 *
 * ## Five changes
 *
 * 1. **Enroll is reachable.** It was a `Button` inside the card's own
 *    `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Benefit PPO Gold, Eligible" — so during open
 *    enrollment the one action with a deadline on it was not a focus stop. The
 *    card is a plain `CardV4`; the activation wraps only the plan region and
 *    the button is its sibling.
 * 2. **Benefit type stops being a status.** `retirement` was toned `success`,
 *    `health` and `vision` `primary`, `dental` `accent` — four kinds of plan
 *    wearing four semantic colours, so a benefits screen used up green before
 *    anything was actually enrolled. A type is identity: glyph, word, neutral
 *    chip.
 * 3. **Money takes a formatter.** `formatMoney`'s third `locale` argument was
 *    unreachable, so a per-period premium printed in the runtime's default
 *    locale regardless of where the employee is paid.
 * 4. **The copy is props.** "Enroll", "Complete enrollment" and "Enroll by"
 *    were hard-coded English on a deadline the employee must not miss.
 * 5. **The card announces the whole plan** — name, type, coverage, cost,
 *    deadline and status — where the base said "Benefit PPO Gold, Eligible".
 *
 * The enroll button is `variant="soft"` on **both** twins; the web base spelled
 * it `secondary`, so the same call to action carried a different weight per
 * platform.
 *
 * **Renders nothing without a `planName`.**
 */
function BenefitsEnrollmentV4({ planName, type, status, coverage, costCents, costPeriod = '/mo', currency = 'USD', enrollBy, actionable = false, variant = 'default', enrollLabel, formatMoney = money_1.formatMoney, formatEnrollBy, onEnroll, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!planName)
        return null;
    const compact = variant === 'compact';
    const typeMeta = tone_v4_1.BENEFIT_TYPE_V4[type];
    const statusMeta = tone_v4_1.BENEFIT_STATUS_V4[status];
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const showAction = actionable && (status === 'eligible' || status === 'pending');
    const enrolled = status === 'enrolled';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const cost = costCents != null ? formatMoney(costCents, currency) : null;
    const deadline = !compact && enrollBy && !enrolled
        ? (formatEnrollBy ?? ((d) => `Enroll by ${d}`))(enrollBy)
        : null;
    const action = enrollLabel ?? (status === 'pending' ? 'Complete enrollment' : 'Enroll');
    const spoken = (0, tone_v4_1.spokenLine)([
        planName,
        typeMeta.label,
        coverage,
        cost ? `${cost}${costPeriod}` : null,
        interactive ? statusMeta.label : null,
        deadline,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minHeight: tap,
            justifyContent: 'center',
            gap: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "onCard", children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: planName })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.chipStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onCard", children: typeMeta.label }) })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: interactive })] }), !compact && coverage ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: coverage })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [cost ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: cost }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: costPeriod })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), deadline ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: deadline })) : null] }), showAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "soft", onPress: onEnroll, accessibilityLabel: `${action}: ${planName}`, style: { minHeight: tap }, children: action })) : null] }));
}
//# sourceMappingURL=BenefitsEnrollmentV4.js.map