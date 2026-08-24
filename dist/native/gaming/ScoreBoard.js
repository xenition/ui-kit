"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreBoard = ScoreBoard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
function Crest({ entry, size }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (entry.avatarUrl) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: entry.avatarUrl }, accessibilityIgnoresInvertColors: true, style: { width: size, height: size, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }));
    }
    return (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: entry.name, size: size >= 48 ? 'lg' : 'sm' });
}
/**
 * A scoreboard — a `ranked` ordered standings list (leader highlighted in
 * weight + a badge, not color alone) or a `versus` head-to-head between the
 * first two entries. Renders an `EmptyState` when there are no entries. Uses
 * guarded indexing for the versus sides. Composes `Card`, `Avatar`. Token-only.
 */
function ScoreBoard({ entries, variant = 'ranked', title, emptyLabel = 'No scores yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC1", size: "2xl", color: "muted", accessibilityLabel: "Scores" }), title: emptyLabel, style: style }));
    }
    const header = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null;
    if (variant === 'versus') {
        const home = entries[0];
        const away = entries[1];
        const homeWins = home != null && away != null && home.score > away.score;
        const awayWins = home != null && away != null && away.score > home.score;
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md }, style], children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(VersusSide, { entry: home, score: home?.score, winner: homeWins, align: "flex-start" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "VS" }), (0, jsx_runtime_1.jsx)(VersusSide, { entry: away, score: away?.score, winner: awayWins, align: "flex-end" })] })] }));
    }
    const ranked = [...entries].sort((a, b) => b.score - a.score);
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.xs }, style], children: [header, ranked.map((e, i) => {
                const leader = i === 0;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, accessible: true, accessibilityLabel: `Rank ${i + 1}, ${e.name}, ${e.score} points`, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 22, color: leader ? colors.primary : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: i + 1 }), (0, jsx_runtime_1.jsx)(Crest, { entry: e, size: 28 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: leader ? '700' : '500' }, children: e.name }), e.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: e.detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: e.score })] }, e.id));
            })] }));
}
function VersusSide({ entry, score, winner, align, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, accessible: true, accessibilityLabel: `${entry?.name ?? 'TBD'}, ${score ?? 0}${winner ? ', leading' : ''}`, children: [entry ? (0, jsx_runtime_1.jsx)(Crest, { entry: entry, size: 48 }) : (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: "?", size: "lg" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: winner ? '700' : '500',
                    textAlign: align === 'flex-start' ? 'left' : 'right',
                }, children: entry?.name ?? 'TBD' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: winner ? colors.primary : colors.muted, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: score ?? 0 })] }));
}
//# sourceMappingURL=ScoreBoard.js.map