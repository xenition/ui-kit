"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenewalBannerV4 = RenewalBannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const money_1 = require("../../commerce/money");
const tone_v4_1 = require("./internal/tone-v4");
/** Default renewal sentence — the base's own copy, now overridable. */
function renewalLine(date) {
    return `Your policy renews on ${date}`;
}
/**
 * **V4 renewal banner** — same props as {@link RenewalBanner} plus
 * `amountDueCents`, `graceDate`, `amountDueLabel`, `graceLabel` and
 * `formatRenewal` (`formatMoney` is already on the base).
 *
 * ## Five changes
 *
 * 1. **An overdue renewal announces itself.** The banner is the one component
 *    in this module that appears *because something changed*, and it had no
 *    live region on either twin — so a policyholder using a screen reader was
 *    told their cover had lapsed only if they happened to swipe back up to the
 *    top of the screen. `overdue` is now `accessibilityRole="alert"` with an
 *    assertive live region; `due` is polite; `upcoming` announces nothing,
 *    because a renewal three weeks out is not an interruption. Announcing
 *    everything is how a user learns to ignore everything.
 * 2. **The heading is a heading.** The label sat on a roleless `View` and the
 *    headline was drawn as ordinary body text — on the web twin, literally a
 *    `<p>` — so nothing in the banner was reachable by heading navigation.
 * 3. **The money owed has somewhere to live.** `premiumCents` is the recurring
 *    price; what is actually due at renewal, plus how long the grace period
 *    runs, are the two facts that decide whether a person acts today. Neither
 *    had a prop, so an app that knew both had to draw its own banner.
 * 4. **The band is opaque and its ink is ink.** `withAlpha(tint, 0.1)` over a
 *    `tint` border was a translucent wash that changed colour with whatever was
 *    behind it, and `colors.muted` drew the body copy — a ramp step with no
 *    contrast promise. Composited once, `mutedText` for the copy.
 * 5. **Renew clears 44 and says what it renews.** The button was a bare
 *    `Button` with no minimum height and the word "Renew now" for a name; two
 *    policies on one screen gave a reader two identical actions.
 *
 * **Renders nothing without a `renewalDate`** (§4.5).
 */
function RenewalBannerV4({ renewalDate, urgency = 'due', premiumCents, currency = 'USD', amountDueCents, graceDate, amountDueLabel = 'Amount due', graceLabel = 'Grace period ends', formatRenewal = renewalLine, renewLabel = 'Renew now', loading = false, formatMoney: format = money_1.formatMoney, onRenew, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!renewalDate)
        return null;
    const meta = tone_v4_1.RENEWAL_URGENCY_V4[urgency] ?? tone_v4_1.RENEWAL_URGENCY_V4.due;
    const urgent = urgency === 'overdue';
    const money = (cents) => typeof cents === 'number' && Number.isFinite(cents)
        ? format(Math.trunc(cents), currency)
        : null;
    const premium = money(premiumCents);
    const due = money(amountDueCents);
    const sentence = formatRenewal(renewalDate);
    const dueLine = due ? `${amountDueLabel}: ${due}` : null;
    const graceLine = graceDate ? `${graceLabel} ${graceDate}` : null;
    const spoken = (0, tone_v4_1.spokenLine)([meta.heading, sentence, premium, dueLine, graceLine]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.bandStyle)(theme, meta.tone), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, 
                // Only the genuinely urgent interrupts — see change 1.
                accessibilityRole: urgent ? 'alert' : 'header', accessibilityLiveRegion: urgent ? 'assertive' : urgency === 'due' ? 'polite' : 'none', accessibilityLabel: spoken, style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { ...tone_v4_1.DECORATIVE, size: "xl", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: meta.heading }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: premium ? `${sentence} · ${premium}` : sentence }), dueLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: dueLine })) : null, graceLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: graceLine })) : null] })] }), onRenew ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", tone: urgent ? 'danger' : 'default', onPress: onRenew, loading: loading, accessibilityLabel: `${renewLabel}, ${renewalDate}`, style: { minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) }, children: renewLabel })) : null] }));
}
//# sourceMappingURL=RenewalBannerV4.js.map