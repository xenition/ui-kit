"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardPodiumV2 = LeaderboardPodiumV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
// Render order (2nd · 1st · 3rd) with per-place pedestal heights + medal tiers.
const PLACES = [
    { index: 1, height: 84, medal: '🥈', color: 'muted' },
    { index: 0, height: 120, medal: '🥇', color: 'warn' },
    { index: 2, height: 60, medal: '🥉', color: 'accent' },
];
/**
 * LeaderboardPodium — design variant **V2**: a **classic 3-column podium with
 * medal tiers**. A titled, elevated card frames three pedestals (2nd · 1st ·
 * 3rd) whose heights and tinted risers escalate to the champion, each carrying a
 * medal, ringed avatar, name, a rank chip, and score. Where V1 is a bare compact
 * podium, V2 is a taller, ceremonial stand with a crown on first and stronger
 * tier tints. Uses **guarded indexing** so a 1–2 entry list omits missing places
 * and renders an `EmptyState` when empty. Same props as
 * {@link LeaderboardPodiumProps}. Token-only.
 */
function LeaderboardPodiumV2({ entries, emptyLabel = 'No rankings yet', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const palette = colors;
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC6", size: "2xl", color: "muted", accessibilityLabel: "Leaderboard" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                    ...(0, elevation_1.shadow)('md', tokens),
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC6", size: "lg", color: "warn", accessibilityLabel: "Top players" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Top Players" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: tokens.spacing.sm }, children: PLACES.map((place) => {
                        const entry = entries[place.index];
                        if (!entry)
                            return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }, place.index);
                        const rank = place.index + 1;
                        const accent = palette[place.color] ?? colors.muted;
                        const champion = place.index === 0;
                        const column = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [champion ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDC51" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: place.medal }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: entry.avatarUrl, name: entry.name, size: champion ? 'lg' : 'md', ring: true }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', maxWidth: '100%' }, children: entry.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        width: '100%',
                                        height: place.height,
                                        borderTopLeftRadius: tokens.radius.md,
                                        borderTopRightRadius: tokens.radius.md,
                                        backgroundColor: (0, types_1.withAlpha)(accent, 0.24),
                                        borderTopWidth: 3,
                                        borderColor: accent,
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        paddingTop: tokens.spacing.sm,
                                        gap: 2,
                                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                paddingHorizontal: tokens.spacing.sm,
                                                paddingVertical: 1,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: (0, types_1.withAlpha)(accent, 0.28),
                                            }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ["#", rank] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: (0, types_1.formatCount)(entry.score) })] })] }));
                        if (!onPress) {
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, accessible: true, accessibilityLabel: `Rank ${rank}, ${entry.name}, ${entry.score} points`, children: column }, entry.id));
                        }
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: { flex: 1 }, accessibilityRole: "button", accessibilityLabel: `Rank ${rank}, ${entry.name}, ${entry.score} points`, onPress: () => onPress(entry, rank), children: column }, entry.id));
                    }) })] }) }));
}
//# sourceMappingURL=LeaderboardPodiumV2.js.map