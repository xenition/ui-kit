"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentBracket = TournamentBracket;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
function Side({ name, score, isWinner, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    color: name ? colors.onSurface : colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: isWinner ? '700' : '400',
                }, children: name ?? 'TBD' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: isWinner ? colors.primary : colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: isWinner ? '700' : '400',
                }, children: score == null ? '–' : String(score) })] }));
}
/**
 * A single-elimination bracket — rounds render as horizontally scrollable
 * columns of match cards, each showing two sides, scores, and the advancing
 * team (marked in weight + color, never color alone). `onMatchPress` fires with
 * the match and its guarded `[round, match]` indices. Renders an `EmptyState`
 * when there are no matches. Composes `Card`. Token-only.
 */
function TournamentBracket({ rounds, emptyLabel = 'No matches scheduled', onMatchPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const totalMatches = rounds.reduce((n, r) => n + (r.matches?.length ?? 0), 0);
    if (rounds.length === 0 || totalMatches === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC6", size: "2xl", color: "muted", accessibilityLabel: "Bracket" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.lg, padding: tokens.spacing.xs }, style: style, children: rounds.map((round, ri) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, minWidth: 176 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: round.name }), (round.matches ?? []).map((match, mi) => {
                    const decided = match.winner != null;
                    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { padding: "sm", style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Side, { name: match.home, score: match.homeScore, isWinner: match.winner === 'home' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(Side, { name: match.away, score: match.awayScore, isWinner: match.winner === 'away' })] }));
                    if (!onMatchPress)
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: body }, match.id);
                    const winnerName = match.winner === 'home' ? match.home : match.winner === 'away' ? match.away : undefined;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${match.home ?? 'TBD'} versus ${match.away ?? 'TBD'}`, accessibilityState: { selected: decided }, accessibilityHint: winnerName ? `${winnerName} advanced` : undefined, onPress: () => onMatchPress(match, ri, mi), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }, match.id));
                })] }, `${round.name}-${ri}`))) }));
}
//# sourceMappingURL=TournamentBracket.js.map