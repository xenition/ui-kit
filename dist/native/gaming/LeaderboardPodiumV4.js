"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardPodiumV4 = LeaderboardPodiumV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
const types_1 = require("./types");
/**
 * Render order (2nd · 1st · 3rd), with each pillar's height composed from the
 * spacing scale rather than typed as 56 / 80 / 40, so a re-scaled seed
 * re-scales the podium instead of leaving it stranded at a size the rest of
 * the product left behind.
 *
 * There is no `color` here any more. A podium place is **identity**: gold was
 * `warn`, bronze was `accent`, and second place spent the `border` hairline as
 * a tier accent. The medal and the height say which place it is, in greyscale
 * and at any colour vision.
 */
const PLACES = [
    { index: 1, steps: ['2xl', 'sm'], medal: '🥈' },
    { index: 0, steps: ['2xl', 'xl'], medal: '🥇' },
    { index: 2, steps: ['2xl'], medal: '🥉' },
];
/**
 * **V4 leaderboard podium** — same props as {@link LeaderboardPodium} plus
 * `formatScore`.
 *
 * ## Four changes
 *
 * 1. **A podium place is identity, not status.** Gold was `warn` and bronze
 *    `accent` — two status slots spent on a ribbon — and each pillar was a
 *    translucent 18% wash of that colour, so the same place was a different
 *    shade on every surface it sat on. The medal glyph and the pillar height
 *    carry the place; the ground is the module's one opaque neutral.
 * 2. **Second place stops wearing the hairline as a tier accent.** `border`
 *    exists to draw a 1px rule; used as a fill it means whatever the ramp
 *    happens to be, and it made silver read as "unstyled" rather than as
 *    second.
 * 3. **The pillar heights come off the spacing scale**, so the podium keeps
 *    its proportions when a seed re-scales its rhythm.
 * 4. **A place is one spoken name including its score**, and `formatScore`
 *    makes the drawn number and the announced one the same string — the base
 *    drew `formatCount(score)` and announced the raw integer, so a reader and
 *    a viewer compared different numbers. A press is a state layer.
 */
function LeaderboardPodiumV4({ entries, emptyLabel = 'No rankings yet', formatScore = types_1.formatCount, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    /** The card's pressed state layer, or nothing — never a dimmed content. */
    const pressGround = (pressed) => pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent';
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDFC6", size: "2xl", color: "mutedText" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: PLACES.map((place) => {
            const entry = entries[place.index];
            if (!entry)
                return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }, place.index);
            const rank = place.index + 1;
            const height = place.steps.reduce((total, step) => total + tokens.spacing[step], 0);
            const name = (0, arcade_v4_1.spokenLine)([`Rank ${rank}`, entry.name, `${formatScore(entry.score)} points`]);
            const column = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressGround(pressed),
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", children: place.medal }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: entry.avatarUrl, name: entry.name, size: place.index === 0 ? 'lg' : 'md', ring: true }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onCard", numberOfLines: 1, align: "center", style: { maxWidth: '100%' }, children: entry.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: '100%',
                            height,
                            borderTopLeftRadius: tokens.radius.md,
                            borderTopRightRadius: tokens.radius.md,
                            backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
                            borderTopWidth: 2,
                            borderColor: colors.border,
                            alignItems: 'center',
                            paddingTop: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: `#${rank}` }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", numeric: "tabular", children: formatScore(entry.score) })] })] }));
            if (!onPress) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1 }, children: column(false) }, entry.id));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(entry, rank), style: { flex: 1 }, children: ({ pressed }) => column(pressed) }, entry.id));
        }) }));
}
//# sourceMappingURL=LeaderboardPodiumV4.js.map