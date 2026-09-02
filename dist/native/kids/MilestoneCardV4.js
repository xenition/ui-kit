"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneCardV4 = MilestoneCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const family_v4_1 = require("../../kids/family-v4");
const tone_v4_1 = require("./internal/tone-v4");
const CATEGORY_GLYPH = {
    physical: '🏃',
    cognitive: '🧠',
    social: '🤝',
    language: '💬',
    emotional: '❤️',
    other: '🌟',
};
const CATEGORY_LABEL = {
    physical: 'Physical',
    cognitive: 'Cognitive',
    social: 'Social',
    language: 'Language',
    emotional: 'Emotional',
    other: 'Milestone',
};
const STATUS_MARK = {
    upcoming: { glyph: '◦', tone: 'neutral' },
    achieved: { glyph: '✓', tone: 'success' },
    delayed: { glyph: '…', tone: 'warn' },
};
const STATUS_LABEL = {
    upcoming: 'Upcoming',
    achieved: 'Achieved',
    delayed: 'Taking longer',
};
/**
 * **V4 milestone card** — same props as {@link MilestoneCard} plus `status`,
 * `note` and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A milestone has three states, not two.** `achieved` was a boolean, so a
 *    milestone a child had not reached at the expected age was indistinguishable
 *    from one whose age band has not arrived yet — the single fact a parent
 *    most needs from this screen. `status` adds `delayed`, and it is `warn`
 *    with a glyph and a word: **never `danger`**, because a child developing on
 *    their own schedule is not a fault and this module does not paint children
 *    in the error colour. `status` defaults from `achieved`, so a caller who
 *    passes neither sees exactly today's card.
 * 2. **A `delayed` milestone can explain itself.** `needsExplanation('delayed')`
 *    is what invites `note`, and the note is an explanation rather than a
 *    verdict.
 * 3. **The card is a card.** It painted `colors.surface` — the *page* colour —
 *    so it never read as raised, and its skeleton painted `colors.border`, the
 *    hairline colour used as a fill.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1`, which sits
 *    inside M3's disabled band and made a pressed card read as unavailable.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function MilestoneCardV4({ title, category = 'other', date, ageLabel, description, achieved = false, loading = false, status, note, statusLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const container = [(0, tone_v4_1.cardStyle)(theme), { gap: tokens.spacing.sm }, style];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading milestone", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.base, width: '55%' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.xs, width: '40%' }) })] }));
    }
    if (!title)
        return null;
    const glyph = CATEGORY_GLYPH[category] ?? CATEGORY_GLYPH.other;
    const categoryWord = CATEGORY_LABEL[category] ?? CATEGORY_LABEL.other;
    const state = status ?? (achieved ? 'achieved' : 'upcoming');
    const mark = STATUS_MARK[state];
    const word = statusLabels?.[state] ?? STATUS_LABEL[state];
    const explanation = (0, family_v4_1.needsExplanation)(state) ? note : undefined;
    const caption = (0, tone_v4_1.metaLine)([categoryWord, ageLabel, date]);
    const name = (0, tone_v4_1.spokenLine)([title, categoryWord, ageLabel, date, word, explanation]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.xs,
            marginHorizontal: -tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: mark.tone, variant: "soft", size: "sm", children: `${mark.glyph} ${word}` })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, children: ({ pressed }) => body(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) })), explanation ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: explanation })) : null, description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: description })) : null] }));
}
//# sourceMappingURL=MilestoneCardV4.js.map