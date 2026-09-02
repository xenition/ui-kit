"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceV4 = LeaveBalanceV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * The default for {@link LeaveBalanceV4Props.overdrawnLabel} — what an
 * over-drawn balance says instead of a negative number.
 *
 * A balance that has gone past its entitlement is the one figure here a person
 * acts on, and "−2 days" is arithmetic rather than an answer: it reads as a
 * quantity of leave the employee has, spelled oddly. The remaining figure
 * becomes this word, and the meter is already full.
 */
const OVERDRAWN = 'Over entitlement';
/** A figure that is not a finite, non-negative number is not a balance. */
function days(value) {
    return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0;
}
/**
 * **V4 leave balance** — a new component. There is no base to extend, so the
 * props are plain `LeaveBalanceV4Props`.
 *
 * ## Why it exists
 *
 * `LeaveRequest` asks the employee for a number of `days` and there is no
 * entitlement context anywhere in the module — not on the request, not on the
 * approval card, not in the directory. So the one number the requester needs
 * before deciding whether to ask for a fortnight ("how much do I actually
 * have?") is the one number the module could not draw, and the one an approver
 * has to open another system to check.
 *
 * ## What it does that the rest of the module did not
 *
 * 1. **The meter is a real meter, and it is a sibling.** The group carries
 *    `accessibilityRole="progressbar"` with a value, so a reader is told
 *    "Taken, 13 days of 25" rather than handed four loose numerals — and it
 *    sits **beside** the card's activation rather than under it, because a
 *    `progressbar` inside a `Pressable` has its value flattened away.
 * 2. **An over-drawn balance is a word.** Taken can exceed the entitlement —
 *    unpaid days, an advance, a correction — and the honest rendering of that
 *    is not a negative number in a field labelled "Remaining". Remaining floors
 *    at zero and the overage says
 *    {@link LeaveBalanceV4Props.overdrawnLabel}.
 * 3. **Every figure is validated.** A negative or non-finite accrual is bad
 *    data rather than a small entitlement.
 * 4. **The leave type is identity.** Glyph, word, neutral chip, from the same
 *    table `LeaveRequestV4` reads — and deliberately no tone: `sick` is not
 *    `danger` and `parental` is not `success`.
 * 5. **Every visible string is a prop**, and the day count goes through
 *    `pluralizeCount` rather than an appended `'s'`. That now includes the
 *    overage word, which used to be the one English string in the file a
 *    caller could not reach.
 * 6. **A balance with nothing to name draws nothing.** With neither `type` nor
 *    `label`, this used to invent an English heading of its own — "Leave
 *    balance" — and meter an entitlement nobody had said the name of. It
 *    returns `null` instead, as the web twin already did.
 */
function LeaveBalanceV4({ type, label, accruedDays, takenDays, carryoverDays = 0, periodLabel, variant = 'default', formatDays, accruedLabel = 'Accrued', takenLabel = 'Taken', remainingLabel = 'Remaining', carryoverLabel = 'Carryover', overdrawnLabel = OVERDRAWN, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const compact = variant === 'compact';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const typeMeta = type ? tone_v4_1.LEAVE_TYPE_V4[type] : undefined;
    const heading = label ?? typeMeta?.label;
    // A balance with nothing to name is a meter measuring an unlabelled thing.
    if (!heading)
        return null;
    const accrued = days(accruedDays);
    const taken = days(takenDays);
    const carryover = days(carryoverDays);
    const entitlement = accrued + carryover;
    const overdrawn = taken > entitlement;
    const remaining = Math.max(0, entitlement - taken);
    const metered = Math.min(taken, entitlement);
    const fmt = formatDays ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'day'));
    const remainingText = overdrawn ? overdrawnLabel : fmt(remaining);
    /*
      The meter reads how much of the entitlement is gone, which is the question
      a balance is asked; the remaining figure beside it is the same fact stated
      the other way round, in words.
    */
    const meterName = `${takenLabel}, ${fmt(metered)} of ${fmt(entitlement)}`;
    const figures = [
        { key: 'accrued', label: accruedLabel, value: fmt(accrued) },
        { key: 'carryover', label: carryoverLabel, value: fmt(carryover) },
        { key: 'taken', label: takenLabel, value: fmt(taken) },
        { key: 'remaining', label: remainingLabel, value: remainingText },
    ];
    const spoken = (0, tone_v4_1.spokenLine)([heading, periodLabel, `${remainingLabel} ${remainingText}`]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: heading }), periodLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: periodLabel })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), typeMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: (0, tone_v4_1.chipStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onCard", children: typeMeta.label })] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: meterName, accessibilityValue: { min: 0, max: entitlement, now: metered }, style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: takenLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onCard", numeric: "tabular", children: `${fmt(metered)} / ${fmt(entitlement)}` })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: metered, max: Math.max(entitlement, 1), tone: overdrawn ? 'warn' : 'primary', size: "sm" })] }), !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }, children: figures.map((f) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${f.label}, ${f.value}`, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: f.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: {
                                color: f.key === 'remaining' && overdrawn ? colors.warnText : colors.onCard,
                            }, children: f.value })] }, f.key))) })) : null] }));
}
//# sourceMappingURL=LeaveBalanceV4.js.map