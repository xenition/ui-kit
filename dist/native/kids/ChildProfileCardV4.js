"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProfileCardV4 = ChildProfileCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 child profile card** — same props as {@link ChildProfileCard} plus
 * `moodLabels`.
 *
 * ## Four changes
 *
 * 1. **The card's summary is not silently dropped.** The non-pressable branch
 *    wrapped the card in a bare `View` carrying `accessibilityLabel` and no
 *    `accessible`, which Android ignores outright — so a child's whole profile
 *    read as one name on iOS and as six loose fragments on Android. It is now
 *    explicitly `accessible`, and it carries the birthday and the interests it
 *    used to leave off.
 * 2. **A sad or unwell child is not a system fault, and is not coloured like
 *    one.** Mood is a glyph and a word, on no chip at all — this module does
 *    not grade a child by hue.
 * 3. **The card is a card and its skeleton is a skeleton.** It painted
 *    `colors.surface` — the *page* colour — so it never read as raised and dark
 *    mode went flat; the skeleton painted `colors.border`, the hairline colour
 *    used as a fill, which on a dark seed is very nearly invisible.
 * 4. **Press is a state layer** over a `card` ground rather than
 *    `opacity: pressed ? 0.85 : 1`, which sits inside M3's *disabled* band, and
 *    the pressable region clears the 44 floor.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function ChildProfileCardV4({ name, photoUrl, age, grade, birthday, mood, interests, loading = false, moodLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const container = [(0, tone_v4_1.cardStyle)(theme), style];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading child profile", style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, {
                            height: (0, chrome_v4_1.minTap)(tokens.spacing),
                            width: (0, chrome_v4_1.minTap)(tokens.spacing),
                            round: true,
                        }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, {
                                    height: tokens.typography.scale.base,
                                    width: '55%',
                                }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.xs, width: '40%' }) })] })] }) }));
    }
    if (!name)
        return null;
    const moodWord = mood ? (moodLabels?.[mood] ?? tone_v4_1.MOOD_LABEL[mood]) : null;
    const moodGlyph = mood ? tone_v4_1.MOOD_GLYPH[mood] : null;
    const caption = (0, tone_v4_1.metaLine)([age, grade]);
    const spoken = (0, tone_v4_1.spokenLine)([
        name,
        age,
        grade,
        birthday,
        moodWord,
        interests && interests.length > 0 ? interests.join(', ') : null,
    ]);
    const header = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
            padding: tokens.spacing.xs,
            marginHorizontal: -tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: caption })) : null, birthday ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: `🎂 ${birthday}` })) : null] }), moodGlyph && moodWord ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: moodGlyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: moodWord })] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, children: ({ pressed }) => header(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: header(false) })), interests && interests.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: interests.map((interest, i) => (
                /* `accent` is a brand colour, not a status one, so an interest may
                   wear it — the rule bans success/warn/danger on identity. */
                (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "accent", variant: "soft", size: "sm", children: interest }, `${interest}-${i}`))) })) : null] }));
}
//# sourceMappingURL=ChildProfileCardV4.js.map