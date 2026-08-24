"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardPodiumV3 = LeaderboardPodiumV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
// Natural order (1 · 2 · 3) with per-rank medal + accent tier.
const RANKS = [
    { index: 0, medal: '🥇', color: 'warn' },
    { index: 1, medal: '🥈', color: 'muted' },
    { index: 2, medal: '🥉', color: 'accent' },
];
/**
 * LeaderboardPodium — design variant **V3**: a **horizontal top-3 strip**. The
 * leaders read left→right (1 · 2 · 3) as equal-width tiles — medal, ringed
 * avatar, name, and score stacked in each — instead of V1/V2's stepped
 * pedestals. Uses **guarded indexing** so a 1–2 entry list renders only the
 * present tiles and an `EmptyState` when there are none. Same props as
 * {@link LeaderboardPodiumProps}. Token-only, minimal (hairline dividers).
 */
function LeaderboardPodiumV3({ entries, emptyLabel = 'No rankings yet', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const palette = colors;
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC6", size: "2xl", color: "muted", accessibilityLabel: "Leaderboard" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                {
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                },
                style,
            ], children: RANKS.map((r, position) => {
                const entry = entries[r.index];
                if (!entry)
                    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }, r.index);
                const rank = r.index + 1;
                const accent = palette[r.color] ?? colors.muted;
                const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        paddingVertical: tokens.spacing.md,
                        paddingHorizontal: tokens.spacing.sm,
                        borderLeftWidth: position === 0 ? 0 : 1,
                        borderColor: colors.border,
                        backgroundColor: (0, types_1.withAlpha)(accent, 0.06),
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: r.medal }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: ["#", rank] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: entry.avatarUrl, name: entry.name, size: "md", ring: true }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', maxWidth: '100%' }, children: entry.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: (0, types_1.formatCount)(entry.score) })] }));
                if (!onPress) {
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, accessible: true, accessibilityLabel: `Rank ${rank}, ${entry.name}, ${entry.score} points`, children: tile }, entry.id));
                }
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: { flex: 1 }, accessibilityRole: "button", accessibilityLabel: `Rank ${rank}, ${entry.name}, ${entry.score} points`, onPress: () => onPress(entry, rank), children: tile }, entry.id));
            }) }) }));
}
//# sourceMappingURL=LeaderboardPodiumV3.js.map