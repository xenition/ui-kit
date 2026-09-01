"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingInfoCardV4 = VotingInfoCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const civic_v4_1 = require("./internal/civic-v4");
const REG_V4 = {
    registered: { label: 'Registered', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
    inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};
/**
 * **V4 voting information** — same props as {@link VotingInfoCard} plus
 * `statusLabels` and `electionLabel`.
 *
 * ## Four changes
 *
 * 1. **The election date gets a relationship to its label.** "Next election"
 *    and "Municipal general · Nov 4" were two sibling text nodes with nothing
 *    tying them together, so a reader heard a heading, then a date, and had to
 *    infer the connection. Label and value are one announced pair now.
 * 2. **No empty labelled blocks.** The card rendered the election section
 *    whenever either field was non-`null` and then joined them with a filter
 *    that drops `''` — so two empty strings produced a "Next election" heading
 *    with nothing under it, where the web twin renders nothing at all. Same
 *    for the polling place.
 * 3. **Both actions clear 44.** `size="sm"` renders about 34 here, and
 *    "Register to vote" is the whole point of the card.
 * 4. **One badge shape and one card variant**, the mail-ballot badge stops
 *    being `accent` — how you vote is an arrangement, not a status — and the
 *    registration disc takes a ground composited opaquely rather than a
 *    translucent wash of a fill slot, which is a different colour on every
 *    surface it lands on.
 */
function VotingInfoCardV4({ registration, electionDate, electionName, pollingPlace, pollingAddress, mailBallot = false, statusLabels, electionLabel = 'Next election', onRegister, onFindPolling, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reg = REG_V4[registration] ?? REG_V4['not-registered'];
    const statusWord = statusLabels?.[registration] ?? reg.label;
    const isRegistered = registration === 'registered';
    const election = (0, tone_v4_1.metaLine)([electionName, electionDate]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const disc = tokens.spacing['2xl'];
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, civic_v4_1.spokenLine)(['Voter status', statusWord]), style: {
                            flex: 1,
                            minWidth: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: disc,
                                    height: disc,
                                    borderRadius: tokens.radius.md,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, civic_v4_1.tintGround)(theme, reg.tone),
                                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDDF3\uFE0F", size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", children: "Voter status" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: reg.tone, ...civic_v4_1.BADGE_V4, children: `${reg.glyph} ${statusWord}` }) })] })] }), mailBallot ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: civic_v4_1.IDENTITY_TONE, ...civic_v4_1.BADGE_V4, children: "\uD83D\uDCEE Mail ballot" })) : null] }), election !== '' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${electionLabel}, ${election}`, style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: tokens.spacing.xs / 2,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: electionLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: election })] })) : null, pollingPlace ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, civic_v4_1.spokenLine)(['Polling place', pollingPlace, pollingAddress]), style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "Polling place" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", children: `📍 ${pollingPlace}` }), pollingAddress ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: pollingAddress })) : null] })) : null, onRegister != null || onFindPolling != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [onFindPolling != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", onPress: onFindPolling, style: { minHeight: tap }, children: "Find polling place" })) : null, onRegister != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", onPress: onRegister, style: { minHeight: tap }, children: isRegistered ? 'Update registration' : 'Register to vote' })) : null] })) : null] }));
}
//# sourceMappingURL=VotingInfoCardV4.js.map