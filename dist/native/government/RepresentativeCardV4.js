"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativeCardV4 = RepresentativeCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const civic_v4_1 = require("./internal/civic-v4");
const PARTY_V4 = {
    democratic: 'Democratic',
    republican: 'Republican',
    independent: 'Independent',
    green: 'Green',
    other: 'Other',
    nonpartisan: 'Nonpartisan',
};
/**
 * **V4 representative card** — same props as {@link RepresentativeCard} plus
 * `partyLabels` and `officeLabels`.
 *
 * ## Four changes
 *
 * 1. **Being in office stops being `success`.** Holding a seat is a factual
 *    attribute, not an outcome, and this is a component careful enough to keep
 *    the party badge deliberately neutral — then spent the kit's "this went
 *    well" colour on one of the two sides of a political fact. Both states are
 *    `IDENTITY_TONE` now and are told apart by their glyph and their word.
 * 2. **One badge shape.** The party badge was `outline` and the term badge
 *    `soft` in the same row, so two attributes of one person read as two
 *    different kinds of thing.
 * 3. **The card is one announced object** — name, office, party, term,
 *    district — instead of five loose text nodes, with the Call and Email
 *    buttons kept outside that name so they stay focus stops.
 * 4. **Both actions clear 44**, and the district and term lines are tested for
 *    content rather than for `!= null`, so an empty string no longer draws an
 *    empty block the web twin does not draw.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function RepresentativeCardV4({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, partyLabels, officeLabels, onCall, onEmail, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const partyWord = party ? (partyLabels?.[party] ?? PARTY_V4[party] ?? PARTY_V4.other) : undefined;
    const inOfficeWord = officeLabels?.inOffice ?? 'In office';
    const formerWord = officeLabels?.former ?? 'Former';
    const termWord = inOffice == null ? undefined : inOffice ? inOfficeWord : formerWord;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const spoken = (0, civic_v4_1.spokenLine)([name, office, partyWord, termWord, district, termInfo]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: office }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.xs,
                                    flexWrap: 'wrap',
                                }, children: [partyWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: partyWord })) : null, termWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: `${inOffice === true ? '✓' : '—'} ${termWord}` })) : null] })] })] }), district || termInfo ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.xs / 2 }, children: [district ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `📍 ${district}` })) : null, termInfo ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: `🗳️ ${termInfo}` })) : null] })) : null, showCall || showEmail ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [showCall ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", onPress: onCall, style: { minHeight: tap }, children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", onPress: onEmail, style: { minHeight: tap }, children: "Email" })) : null] })) : null] }));
}
//# sourceMappingURL=RepresentativeCardV4.js.map