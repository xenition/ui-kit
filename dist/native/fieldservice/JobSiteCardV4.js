"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSiteCardV4 = JobSiteCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Site status → word, glyph and tone.
 *
 * `active` and `scheduled` say where a site sits in the week, not how it went,
 * so they take no status colour — the base painted "On site" green, which is
 * the colour that has to mean "this went well". `completed` is a real outcome
 * and keeps `success`; `blocked` keeps `danger`.
 */
const STATUS_META = {
    active: { label: 'On site', glyph: '▶', tone: 'primary' },
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'neutral' },
    completed: { label: 'Completed', glyph: '✓', tone: 'success' },
    blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};
/**
 * **V4 job site card** — same props as {@link JobSiteCard} plus
 * `directionsLabel`.
 *
 * ## Four changes
 *
 * 1. **Directions is reachable.** The base nested the button inside the card's
 *    own activation. On the web twin the card's `onKeyDown` swallowed the
 *    Enter that a `<button>` needs to fire its click, so pressing Enter on
 *    "Directions" opened the site instead of routing to it; here the outer
 *    `Pressable` was `accessible` with the site's name as its label, which
 *    flattens the card to one leaf and makes the button **unreachable** to
 *    VoiceOver entirely. Every path that is not a sighted tap was broken. The
 *    card's activation now wraps only the identity region and the action is
 *    its **sibling** — the shape §1.2 asks for, after this bug turned up in
 *    four components.
 * 2. **The card announces its meta.** `"name, address, status"` replaced the
 *    subtree, dropping the crew count, the open orders and — on a card whose
 *    point is getting a technician to a site — the distance.
 * 3. **A press is a state layer** and the identity region clears 44;
 *    `opacity: 0.85` is deleted rather than translated.
 * 4. **The disc is decorative** and the badge is the module's one shape, so a
 *    reader stops once and the same screen looks the same on both platforms.
 *
 * **Renders nothing without a `name`.**
 */
function JobSiteCardV4({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', directionsLabel = 'Directions', onNavigate, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const meta = STATUS_META[status] ?? STATUS_META.scheduled;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const crew = crewCount != null ? `${Math.max(0, Math.trunc(crewCount))} crew` : null;
    const open = openOrders != null ? `${Math.max(0, Math.trunc(openOrders))} open` : null;
    const metaLines = [
        crew != null ? { glyph: '👷', text: crew } : null,
        open != null ? { glyph: '🗒', text: open } : null,
        distance != null ? { glyph: '📍', text: distance } : null,
    ].filter((line) => line != null);
    const spoken = (0, job_v4_1.spokenLine)([name, address, meta.label, crew, open, distance]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: tap,
                    height: tap,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, job_v4_1.discGround)(theme, 'accent'),
                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: address })] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${meta.label}` })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: onPress ? 'interactive' : 'elevated', style: [{ backgroundColor: colors.card }, style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: identity(false) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: metaLines.map((line) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: line.glyph, size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: line.text })] }, line.glyph))) }), onNavigate ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "sm", accessibilityLabel: (0, job_v4_1.spokenLine)([directionsLabel, name]), onPress: onNavigate, style: { minHeight: tap }, children: directionsLabel })) : null] })] }));
}
//# sourceMappingURL=JobSiteCardV4.js.map