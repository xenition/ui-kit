"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitCardV4 = BenefitCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const civic_v4_1 = require("./internal/civic-v4");
const format_1 = require("./internal/format");
/** What the case number identifies. */
const CASE_LABEL = 'Case';
const TYPE_V4 = {
    food: { label: 'Food assistance', glyph: '🥫' },
    unemployment: { label: 'Unemployment', glyph: '💼' },
    housing: { label: 'Housing', glyph: '🏘️' },
    medical: { label: 'Medical', glyph: '⚕️' },
    disability: { label: 'Disability', glyph: '♿' },
    family: { label: 'Family support', glyph: '👪' },
    other: { label: 'Benefit', glyph: '🤝' },
};
const STATUS_V4 = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
    expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
    suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};
/**
 * **V4 benefit case card** — same props as {@link BenefitCard} plus `reason`,
 * `typeLabels`, `statusLabels` and `nextLabel`.
 *
 * ## Four changes
 *
 * 1. **A denied or suspended case says why.** The status that stops someone's
 *    food assistance was a pill with no field behind it — the card could say
 *    "Suspended" and nothing else, on the screen a claimant opens to find out
 *    what happened. `isAdverse()` gates the `reason`, which is an assertive
 *    live region.
 * 2. **The card's own controls are reachable.** The base wrapped the whole
 *    card in one `Pressable`, which is `accessible` by default and carries the
 *    card's name, so the status pill and the amount were flattened out of the
 *    tree. The activation now wraps only the glyph-and-text region; the pill
 *    sits beside it.
 * 3. **The case number is not glued to the programme name.** It was
 *    `` `${type} · ${caseNumber}` `` on one truncating line, so a long
 *    programme name took the number off the end of the card — and it was
 *    unlabelled, and it never reached the spoken name along with the next
 *    payment date.
 * 4. **The amount takes the contrast-corrected ink**, not the `primary` fill
 *    slot drawn as text; the programme disc stops wearing `primary` too,
 *    because which programme this is is identity rather than a state; and the
 *    press is a state layer rather than `opacity: 0.85`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function BenefitCardV4({ name, benefitType, status = 'active', amountCents, cadence = '/mo', caseNumber, nextDate, currency = 'USD', formatMoney: format = format_1.formatMoney, reason, typeLabels, statusLabels, nextLabel = 'Next', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const bt = TYPE_V4[benefitType] ?? TYPE_V4.other;
    const typeWord = typeLabels?.[benefitType] ?? bt.label;
    const sd = STATUS_V4[status] ?? STATUS_V4.active;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const showReason = adverse && Boolean(reason);
    const idLine = (0, civic_v4_1.labelledId)(CASE_LABEL, caseNumber);
    const disc = tokens.spacing['2xl'];
    const amount = amountCents != null ? format(Math.max(0, Math.trunc(amountCents)), currency) : undefined;
    const nextLine = nextDate ? `${nextLabel}: ${nextDate}` : undefined;
    const spoken = (0, civic_v4_1.spokenLine)([
        name,
        typeWord,
        statusWord,
        idLine,
        amount != null ? `${amount}${cadence}` : null,
        nextLine,
        showReason ? reason : null,
    ]);
    const head = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: disc,
                    height: disc,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, civic_v4_1.tintGround)(theme, civic_v4_1.IDENTITY_TONE),
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: bt.glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: typeWord }), idLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: idLine })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, minWidth: 0 }, children: ({ pressed }) => head(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1, minWidth: 0 }, children: head(false) })), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` })] }), showReason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", accessibilityLiveRegion: "assertive", style: { marginTop: tokens.spacing.sm, color: (0, civic_v4_1.tintInk)(theme, sd.tone) }, children: reason })) : null, amount != null || nextLine != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.sm,
                }, children: [amount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", numeric: "tabular", style: { color: (0, civic_v4_1.tintInk)(theme, 'primary') }, children: amount }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: cadence })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), nextLine != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: nextLine })) : null] })) : null] }));
}
//# sourceMappingURL=BenefitCardV4.js.map