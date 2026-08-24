"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchScoreV2 = MatchScoreV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true },
    halftime: { label: 'HT', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
    postponed: { label: 'Postponed', glyph: '⚠', live: false },
};
/**
 * MatchScore, design variant 2 — a **big scoreboard card**. The two crests sit
 * in flanking columns around an oversized centered scoreline, with the
 * competition caption above and a pill "live band" below. The band carries a
 * `danger` dot for live states and a glyph + label otherwise, so lifecycle is
 * conveyed by text + glyph and never color alone. Same props as `MatchScore`;
 * token-pure (elevation via `shadow`, tints via `withAlpha`), reduced-motion
 * aware (enter + press scale). `loading` swaps in a token skeleton.
 */
function MatchScoreV2({ home, away, status, minute, kickoffLabel, competition, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const container = {
        backgroundColor: colors.surface,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading match", accessibilityState: { busy: true }, style: [container, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.typography.scale.sm,
                        width: '40%',
                        alignSelf: 'center',
                        borderRadius: tokens.radius.sm,
                        backgroundColor: tokens.ramps.neutral[100],
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            height: tokens.typography.scale['3xl'],
                            borderRadius: tokens.radius.sm,
                            backgroundColor: tokens.ramps.neutral[200],
                        } }, i))) })] }));
    }
    const bothScored = home.score !== undefined && away.score !== undefined;
    const homeWins = bothScored && (home.score ?? 0) > (away.score ?? 0);
    const awayWins = bothScored && (away.score ?? 0) > (home.score ?? 0);
    const rightLabel = status === 'live' && minute
        ? minute
        : status === 'upcoming' && kickoffLabel
            ? kickoffLabel
            : meta.label;
    const scoreText = (t) => (t.score === undefined ? '–' : String(t.score));
    const bigScore = tokens.typography.scale['3xl'] * 1.4;
    const side = (t, wins) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: t.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: wins ? '700' : '600',
                    textAlign: 'center',
                }, children: t.short ?? t.name })] }));
    const scoreCell = (t, align) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            color: t.score === undefined ? colors.muted : colors.onSurface,
            fontSize: bigScore,
            fontWeight: '800',
            minWidth: tokens.typography.scale['3xl'],
            textAlign: align,
        }, children: scoreText(t) }));
    const band = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: meta.live
                ? (0, color_1.withAlpha)(colors.danger, 0.12)
                : tokens.ramps.neutral[100],
        }, children: [meta.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger } })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xs", color: "muted" })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: meta.live ? colors.dangerText : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                }, children: rightLabel })] }));
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [competition ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    alignSelf: 'center',
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                }, children: competition })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [side(home, homeWins), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [scoreCell(home, 'right'), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: "-" }), scoreCell(away, 'left')] }), side(away, awayWins)] }), band] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }) }));
}
//# sourceMappingURL=MatchScoreV2.js.map