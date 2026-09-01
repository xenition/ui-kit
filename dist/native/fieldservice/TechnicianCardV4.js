"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianCardV4 = TechnicianCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Availability → word, glyph, chip tone and the presence dot.
 *
 * `en-route` is where a technician is, not something that has gone wrong, so it
 * takes no status colour — the base painted it amber, which is the colour that
 * has to mean "look at this".
 */
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
    'en-route': { label: 'En route', glyph: '→', tone: 'primary', presence: 'away' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};
/**
 * **V4 technician card** — same props as {@link TechnicianCard} plus
 * `callLabel`, `assignLabel` and `formatPhone`.
 *
 * ## Five changes
 *
 * 1. **The phone number is on the card.** The base accepted `phone` and used
 *    it only as a boolean gate, so the number never appeared anywhere — and a
 *    caller who wired `onCall` without one silently got no button at all. It
 *    renders through `formatPhone` now, and the button is gated on `onCall`
 *    alone, which is the thing that decides whether calling is possible.
 * 2. **The presence dot is `Avatar`'s own `status`.** The web twin hand-rolled
 *    a second palette in which `busy` is blue while this twin's `Avatar` draws
 *    it **red** — the same technician, two colours, depending on which
 *    platform you opened.
 * 3. **The card announces its whole state** — name, role, status, jobs today
 *    and the number — instead of leaving a reader to walk loose text nodes.
 * 4. **Skill chips stop inking themselves with a fill token.** They drew
 *    `color: colors.primary` text on a 10% `primary` wash; `primary` is a fill
 *    slot with no contrast promise as text, and a skill is an identity, so the
 *    chips are neutral badges from the module's one badge shape.
 * 5. **Call and Assign clear 44.** `size="sm"` is ~34, on a card a dispatcher
 *    uses one-handed.
 *
 * **Renders nothing without a `name`.**
 */
function TechnicianCardV4({ name, role, status, avatarUrl, skills, jobsToday, phone, callLabel = 'Call', assignLabel = 'Assign', formatPhone = (value) => value, onCall, onAssign, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const meta = STATUS_META[status] ?? STATUS_META.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const jobs = jobsToday != null ? `${Math.max(0, Math.trunc(jobsToday))} jobs today` : null;
    const phoneText = phone != null && phone !== '' ? formatPhone(phone) : null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", style: [{ backgroundColor: colors.card }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, job_v4_1.spokenLine)([name, role, meta.label, jobs, phoneText, ...skillList]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "lg", status: meta.presence }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), role != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: role })) : null, phoneText != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u260E", size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: phoneText })] })) : null, jobs != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDDD2", size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: jobs })] })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${meta.label}` })] }), skillList.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing.xs,
                }, children: skillList.map((skill, i) => ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", ...job_v4_1.BADGE_V4, children: skill }, `${skill}-${i}`))) })) : null, onCall || onAssign ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }, children: [onCall ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "sm", accessibilityLabel: (0, job_v4_1.spokenLine)([callLabel, name, phoneText]), onPress: onCall, style: { flex: 1, minHeight: tap }, children: callLabel })) : null, onAssign ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", accessibilityLabel: (0, job_v4_1.spokenLine)([assignLabel, name]), onPress: onAssign, style: { flex: 1, minHeight: tap }, children: assignLabel })) : null] })) : null] }));
}
//# sourceMappingURL=TechnicianCardV4.js.map