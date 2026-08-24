"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchScore = MatchScore;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true },
    halftime: { label: 'HT', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
    postponed: { label: 'Postponed', glyph: '⚠', live: false },
};
/**
 * A single fixture's scoreline — the native anchor of the sports module.
 * Renders both teams, their scores, and a status chip that distinguishes
 * live / final / upcoming by **text + glyph**, not color alone (a `danger`
 * dot merely reinforces the "LIVE" label). Presentational only: shaped data
 * plus an optional `onPress`; nothing fetches. `loading` swaps in a token
 * skeleton. All colors resolve from the compiled theme — no literals.
 */
function MatchScore({ home, away, status, minute, kickoffLabel, competition, variant = 'row', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const feature = variant === 'feature';
    const scoreSize = feature ? tokens.typography.scale['3xl'] : tokens.typography.scale.xl;
    const container = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading match", accessibilityState: { busy: true }, style: [container, style], children: [0, 1].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale.xl,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[200],
                } }, i))) }));
    }
    const statusRight = status === 'live' && minute
        ? minute
        : status === 'upcoming' && kickoffLabel
            ? kickoffLabel
            : meta.label;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const renderSide = (team, isWinner) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: scoreSize * 0.7 }, allowFontScaling: false, children: team.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: isWinner ? '700' : '500',
                }, children: team.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: team.score === undefined ? colors.muted : colors.onSurface,
                    fontSize: scoreSize,
                    fontWeight: '700',
                    minWidth: scoreSize,
                    textAlign: 'right',
                }, children: team.score === undefined ? '–' : team.score })] }));
    const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [competition ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: competition })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [meta.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: colors.danger,
                                } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta.glyph })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: meta.live ? colors.danger : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '700',
                                }, children: statusRight })] })] }), renderSide(home, homeWins), renderSide(away, awayWins)] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=MatchScore.js.map