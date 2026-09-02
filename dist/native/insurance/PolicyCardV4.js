"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyCardV4 = PolicyCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../../commerce/money");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const DEFAULT_LABELS = {
    insured: 'Insured',
    coverage: 'Coverage',
    premium: 'Premium',
    renews: 'Renews',
};
const CADENCE_SUFFIX = {
    monthly: '/mo',
    quarterly: '/qtr',
    annual: '/yr',
};
/**
 * **V4 policy card** — same props as {@link PolicyCard} plus `statusReason`,
 * `statusDate` and `labels` (`formatMoney` is already on the base).
 *
 * ## Six changes
 *
 * 1. **A lapsed policy says why, when, and that the coverage is not in
 *    force.** `lapsed` and `cancelled` had nowhere to put a reason, no date and
 *    no next step — and directly underneath, the card kept drawing the full
 *    coverage amount at full weight, in the same ink an active policy uses. A
 *    policyholder whose cover lapsed for non-payment saw a red pill and
 *    "$500,000.00". The reason and the date are props now, and on an adverse
 *    status the coverage figure is drawn muted with the status word beside its
 *    caption, so the number can no longer be read as money that is available.
 * 2. **The card announces its money.** The base named the whole `Pressable`
 *    `"Premier Auto, Auto policy, Active"` and then rendered the coverage, the
 *    premium and the renewal date as children of it. ARIA — and, on native, a
 *    `Pressable`'s default `accessible` flattening — replaces the contents with
 *    the name, so the card announced a status and no figures whatsoever. Every
 *    figure is folded into the spoken name.
 * 3. **The status pill is a sibling of the activation, not a descendant.**
 *    Wrapping the whole card meant the pill, the reason and the renewal line
 *    were all inside one leaf. The card is a plain `CardV4` now; the press
 *    wraps the glyph-and-title region only.
 * 4. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` dimmed the
 *    card's own content, which is the signal M3 spends on *disabled*.
 * 5. **A negative coverage is shown.** `Math.max(0, …)` printed `$0.00` for
 *    `coverageCents={-1}`, indistinguishable from a policy with no benefit.
 * 6. **Ink stops being fill.** `colors.muted` drew every caption and
 *    `colors.primary` drew the premium — both are fill slots with no contrast
 *    promise as text; a rendered audit measured `primary` as low as 1.32:1.
 *    They are `mutedText` and `primaryText` now, and the leading disc's
 *    `withAlpha(primary, 0.12)` is an opaque composite instead of a wash that
 *    changed colour with whatever was behind the card.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function PolicyCardV4({ variant, name, policyNumber, coverageCents, premiumCents, cadence = 'monthly', status = 'active', holder, renewalDate, currency = 'USD', statusReason, statusDate, labels, formatMoney: format = money_1.formatMoney, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const copy = { ...DEFAULT_LABELS, ...labels };
    const line = tone_v4_1.POLICY_LINE_V4[variant] ?? tone_v4_1.POLICY_LINE_V4.auto;
    const meta = tone_v4_1.POLICY_STATUS_V4[status] ?? tone_v4_1.POLICY_STATUS_V4.active;
    const adverse = (0, coverage_v4_1.isAdverse)(status);
    const disc = (0, chrome_v4_1.minTap)(tokens.spacing);
    const coverage = format(Math.trunc(Number.isFinite(coverageCents) ? coverageCents : 0), currency);
    const premium = typeof premiumCents === 'number' && Number.isFinite(premiumCents)
        ? format(Math.trunc(premiumCents), currency)
        : null;
    const spoken = (0, tone_v4_1.spokenLine)([
        name,
        line.label,
        policyNumber,
        meta.label,
        adverse ? statusReason : null,
        adverse ? statusDate : null,
        `${copy.coverage} ${coverage}`,
        premium ? `${copy.premium} ${premium}${CADENCE_SUFFIX[cadence]}` : null,
        holder ? `${copy.insured} ${holder}` : null,
        renewalDate ? `${copy.renews} ${renewalDate}` : null,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            minHeight: disc,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: {
                    width: disc,
                    height: disc,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, tone_v4_1.chipGround)(theme),
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", tone: "onCard", children: line.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: (0, tone_v4_1.metaLine)([line.label, policyNumber]) })] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: (0, tone_v4_1.pillStyle)(theme, meta.tone), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: meta.label })] })] }), adverse && (statusReason || statusDate) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: { gap: tokens.spacing.xs / 2 }, children: [statusReason ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: statusReason })) : null, statusDate ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: statusDate })) : null] })) : null, holder ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { ...tone_v4_1.DECORATIVE, size: "xs", tone: "mutedText", numberOfLines: 1, children: `${copy.insured}: ${holder}` })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: {
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: adverse ? (0, tone_v4_1.metaLine)([copy.coverage, meta.label]) : copy.coverage }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: adverse ? 'mutedText' : 'onCard', numeric: "tabular", children: coverage })] }), premium ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: copy.premium }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: adverse ? 'mutedText' : 'primaryText', numeric: "tabular", children: premium }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: CADENCE_SUFFIX[cadence] })] })] })) : null] }), renewalDate ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { ...tone_v4_1.DECORATIVE, size: "xs", tone: "mutedText", children: `${copy.renews} ${renewalDate}` })) : null] }));
}
//# sourceMappingURL=PolicyCardV4.js.map