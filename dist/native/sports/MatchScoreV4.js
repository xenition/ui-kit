"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchScoreV4 = MatchScoreV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const broadcast_1 = require("./internal/broadcast");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true, slot: 'danger' },
    halftime: { label: 'HT', glyph: '●', live: true, slot: 'danger' },
    final: { label: 'FT', glyph: '✓', live: false, slot: 'muted' },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false, slot: 'primary' },
    postponed: { label: 'Postponed', glyph: '⚠', live: false, slot: 'warn' },
};
/**
 * MatchScore — **V4** "broadcast" design. The matchday take on a scoreline: an
 * elevated card with a soft-tint status pill (a pulsing danger dot reinforces
 * "LIVE" — never color alone) and bold score numerals; the `feature` variant
 * becomes a full brand-gradient hero with near-white ink. Same props/behavior as
 * {@link MatchScoreProps}; token-only colors via `useXenitionTheme()`. `loading`
 * swaps in a token skeleton.
 */
function MatchScoreV4({ home, away, status, minute, kickoffLabel, competition, variant = 'row', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const feature = variant === 'feature';
    const scoreSize = feature ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
    const container = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading match", accessibilityState: { busy: true }, style: [container, style], children: [0, 1].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xl, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }, i))) }));
    }
    const statusRight = status === 'live' && minute ? minute : status === 'upcoming' && kickoffLabel ? kickoffLabel : meta.label;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;
    // Ink resolves to near-white on the gradient hero, or the theme colors on the row.
    const ink = feature ? (0, broadcast_1.broadcastInk)(r) : colors.onSurface;
    const inkSoft = feature ? (0, broadcast_1.broadcastInkSoft)(r) : colors.muted;
    const pillBg = feature ? (0, broadcast_1.broadcastTile)(r) : (0, color_1.withAlpha)(colors[meta.slot], 0.12);
    const pillFg = feature ? (0, broadcast_1.broadcastInk)(r) : colors[meta.slot];
    const dotColor = feature ? (0, broadcast_1.broadcastInk)(r) : colors.danger;
    const renderSide = (team, isWinner) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: scoreSize * 0.6 }, allowFontScaling: false, children: team.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: ink, fontSize: tokens.typography.scale.base, fontWeight: isWinner ? '800' : '500' }, children: team.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: team.score === undefined ? inkSoft : ink, fontSize: scoreSize, fontWeight: '800', minWidth: scoreSize, textAlign: 'right' }, children: team.score === undefined ? '–' : team.score })] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [competition ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: competition })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: pillBg,
                        }, children: [meta.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: dotColor } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: pillFg, fontSize: tokens.typography.scale.xs }, children: meta.glyph })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: pillFg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: statusRight })] })] }), renderSide(home, homeWins), renderSide(away, awayWins)] }));
    const body = feature ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, broadcast_1.broadcastGradient)(r), style: [container, { backgroundColor: undefined, borderWidth: 0, overflow: 'hidden' }, style], children: inner })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], children: inner }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=MatchScoreV4.js.map