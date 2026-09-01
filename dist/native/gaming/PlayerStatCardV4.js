"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCardV4 = PlayerStatCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * **V4 player stat card** — same props as {@link PlayerStatCard} plus
 * `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **The stats grid survives the card being tappable.** `detailed` exists
 *    entirely to show K/D, wins and hours — and the moment `onPress` was
 *    supplied, the whole card became one `accessible` `Pressable` named
 *    `` `${name}, ${rank}` ``, which prunes every one of those cells. (On web
 *    the same shape means the grid is inside `role="button"`, where its
 *    content is presentational.) The activation now wraps the header only and
 *    the grid is its sibling, announced as one line.
 * 2. **Presence is a word, on both twins.** It was a coloured dot on the
 *    avatar and nothing else — the one state in the card that a colour-blind
 *    or blind user could not read at all, and the twins disagreed about
 *    whether it was announced.
 * 3. **A rank is identity, not a status.** `Diamond II` was a `primary` badge;
 *    a tier is a category, and the whole point of this module's `IDENTITY_TONE`
 *    is that a category does not spend a status slot.
 * 4. **A press is a state layer**, not `opacity: 0.9`, and the empty
 *    `detailed` grid still says so in words rather than collapsing.
 */
function PlayerStatCardV4({ player, variant = 'compact', online, onlineLabel = 'Online', offlineLabel = 'Offline', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const detailed = variant === 'detailed';
    const stats = player.stats ?? [];
    const presence = online === undefined ? null : online ? onlineLabel : offlineLabel;
    const header = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: player.avatarUrl, name: player.name, size: detailed ? 'lg' : 'md', status: online === undefined ? undefined : online ? 'online' : 'offline' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 1, children: player.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            flexWrap: 'wrap',
                        }, children: [player.rank ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: player.rank })) : null, player.level != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `Level ${player.level}` })) : null, presence ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: presence })) : null] })] })] }));
    const headerName = (0, arcade_v4_1.spokenLine)([
        player.name,
        player.rank,
        player.level != null ? `Level ${player.level}` : null,
        presence,
    ]);
    const statsName = (0, arcade_v4_1.spokenLine)(stats.map((s) => `${s.label} ${s.value}`));
    const grid = detailed ? (stats.length > 0 ? (
    // Change 1: a sibling of the activation, so naming the card cannot
    // delete the numbers the variant exists to show.
    (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: statsName, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexGrow: 1,
                flexBasis: '30%',
                minWidth: tokens.spacing['2xl'] + tokens.spacing.xl,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                gap: tokens.spacing.xs / 2,
            }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numeric: "tabular", children: s.value }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: s.label })] }, `${s.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: "No stats yet" }))) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: detailed ? tokens.spacing.md : 0,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: headerName, onPress: () => onPress(player), children: ({ pressed }) => header(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: headerName, children: header(false) })), grid] }));
}
//# sourceMappingURL=PlayerStatCardV4.js.map