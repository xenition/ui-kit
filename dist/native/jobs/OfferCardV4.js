"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCardV4 = OfferCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const hiring_v4_1 = require("../../jobs/hiring-v4");
const format_1 = require("./format");
const tone_v4_1 = require("./internal/tone-v4");
/** Status → its default word. Never carried by hue alone. */
const STATUS_LABEL = {
    pending: 'Pending',
    accepted: 'Accepted',
    declined: 'Declined',
    expired: 'Expired',
};
/**
 * **V4 offer card** — a new component. There is no base to extend, so the
 * props are plain `OfferCardV4Props`.
 *
 * ## Why it exists
 *
 * `ApplicationStage` ends at `'offer' | 'hired'` and **nothing in the module
 * renders an offer.** The decision screen of the whole funnel — the pay being
 * offered, the start date, the date the offer lapses, and the two buttons that
 * end the process one way or the other — had no component, so an app either
 * built it by hand or dropped the applicant onto a `StatusPipeline` reading
 * "Stage 4 of 5" with nothing to act on.
 *
 * ## What it takes from the pass
 *
 * - **The sibling rule.** Accept and Decline are siblings of the card's
 *   activation, never children of it. This is the one card in the module where
 *   getting that wrong is unrecoverable: on native the outer `Pressable` would
 *   flatten both buttons out of existence for a screen-reader user, and on web
 *   Enter on Accept would fire the card instead — which is not "the wrong
 *   navigation", it is a life decision made by a keyboard user who could not
 *   reach the control.
 * - **The salary goes through `salaryParts`.** An offer with a broken band
 *   says so rather than printing `From $NaN/yr` at the moment it matters most.
 * - **The deadline is a fact, not a colour.** An expired offer is `danger`
 *   *and* the word "Expired"; the countdown itself is plain text, because
 *   colouring a date orange as it approaches is the kind of urgency the reader
 *   cannot hear.
 * - **Nothing is decided twice.** The two buttons appear only while the offer
 *   is `pending`; a decided offer states its outcome instead of offering a
 *   choice that no longer exists.
 *
 * **Renders nothing without a job title** (§4.5).
 */
function OfferCardV4({ offer, onPress, onAccept, onDecline, acceptLabel = 'Accept offer', declineLabel = 'Decline', startLabel = 'Starts', deadlineLabel = 'Respond by', statusLabels, formatDate, formatMoney, periodLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!offer?.jobTitle)
        return null;
    const status = offer.status ?? 'pending';
    const statusWord = statusLabels?.[status] ?? STATUS_LABEL[status];
    // The shared predicate, not a second list of bad words: `declined` and
    // `expired` are adverse everywhere in the module or they are adverse nowhere.
    const statusTone = (0, hiring_v4_1.isAdverse)(status)
        ? 'danger'
        : status === 'accepted'
            ? 'success'
            : 'primary';
    const date = formatDate ?? format_1.formatShortDate;
    const pay = (0, tone_v4_1.salaryText)(offer.salary, { formatMoney, periodLabels });
    const starts = offer.startsAt ? date(offer.startsAt) : '';
    const deadline = offer.respondBy ? date(offer.respondBy) : '';
    const facts = [];
    if (starts)
        facts.push([startLabel, starts]);
    if (deadline)
        facts.push([deadlineLabel, deadline]);
    const name = (0, tone_v4_1.spokenName)([
        offer.jobTitle,
        offer.companyName,
        statusWord,
        pay.text,
        ...facts.map(([caption, value]) => `${caption} ${value}`),
    ]);
    // A decision that has been made is not offered again.
    const decidable = status === 'pending' && (onAccept != null || onDecline != null);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: offer.companyLogoUrl, name: offer.companyName, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", tone: "onCard", numberOfLines: 2, children: offer.jobTitle }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: offer.companyName })] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: statusTone, variant: "soft", size: "sm", children: statusWord })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: pay.text ? 'onCard' : 'mutedText', numeric: "tabular", children: pay.text ?? (pay.broken ? 'Salary range unavailable' : 'Salary not disclosed') }), facts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.lg, flexWrap: 'wrap' }, children: facts.map(([caption, value]) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: value })] }, caption))) })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardSurfaceStyle)(theme), style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(offer), style: ({ pressed }) => ({
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                }), children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { gap: tokens.spacing.md }, children: body })), decidable ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onDecline ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", tone: "danger", size: "md", onPress: () => onDecline(offer), accessibilityLabel: (0, tone_v4_1.spokenName)([declineLabel, offer.jobTitle, offer.companyName]), style: { flex: 1, minHeight: tap }, children: declineLabel })) : null, onAccept ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onPress: () => onAccept(offer), accessibilityLabel: (0, tone_v4_1.spokenName)([acceptLabel, offer.jobTitle, offer.companyName]), style: { flex: 1, minHeight: tap }, children: acceptLabel })) : null] })) : null] }));
}
//# sourceMappingURL=OfferCardV4.js.map