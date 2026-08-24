"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardPodium = LeaderboardPodium;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
// Podium render order (2nd, 1st, 3rd) with per-place heights + accent slots.
const PLACES = [
    { index: 1, height: 56, medal: '🥈', color: 'muted' },
    { index: 0, height: 80, medal: '🥇', color: 'warn' },
    { index: 2, height: 40, medal: '🥉', color: 'accent' },
];
/**
 * A top-3 leaderboard podium — the first three `entries` render as centered
 * columns (2nd · 1st · 3rd) with medals, avatars, names, and scores; the tallest
 * block marks the leader. Uses **guarded indexing** so a 1- or 2-entry list
 * simply omits the missing places, and renders an `EmptyState` when there are
 * none. `onPress(entry, rank)` opens a place. Composes `Card`, `Avatar`, `Icon`.
 * Token-only.
 */
function LeaderboardPodium({ entries, emptyLabel = 'No rankings yet', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC6", size: "2xl", color: "muted", accessibilityLabel: "Leaderboard" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { style: [{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: tokens.spacing.sm }, style], children: PLACES.map((place) => {
            const entry = entries[place.index];
            if (!entry)
                return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }, place.index);
            const rank = place.index + 1;
            const accent = colors[place.color];
            const column = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: place.medal }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: entry.avatarUrl, name: entry.name, size: place.index === 0 ? 'lg' : 'md', ring: true }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', maxWidth: '100%' }, children: entry.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: '100%',
                            height: place.height,
                            borderTopLeftRadius: tokens.radius.md,
                            borderTopRightRadius: tokens.radius.md,
                            backgroundColor: (0, types_1.withAlpha)(accent, 0.18),
                            borderTopWidth: 2,
                            borderColor: accent,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingTop: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ["#", rank] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatCount)(entry.score) })] })] }));
            if (!onPress) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, accessible: true, accessibilityLabel: `Rank ${rank}, ${entry.name}, ${entry.score} points`, children: column }, entry.id));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { style: { flex: 1 }, accessibilityRole: "button", accessibilityLabel: `Rank ${rank}, ${entry.name}, ${entry.score} points`, onPress: () => onPress(entry, rank), children: column }, entry.id));
        }) }));
}
//# sourceMappingURL=LeaderboardPodium.js.map