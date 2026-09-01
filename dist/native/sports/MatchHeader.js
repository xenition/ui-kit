"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchHeader = MatchHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const broadcast_1 = require("./internal/broadcast");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true },
    halftime: { label: 'HT', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
    postponed: { label: 'Postponed', glyph: '⚠', live: false },
};
/**
 * MatchHeader — the sports module's **live-match peak**. A full brand-gradient
 * hero: the competition + venue read in near-white / frosted ink at the top, a
 * big crest·score·score·crest line dominates the middle, and a live pulse +
 * minute sit in a frosted pill (`broadcastTile`) — the "LIVE" state is announced
 * to assistive tech via `accessibilityLiveRegion` and reinforced by a dot plus
 * text, never color alone. Presentational only: shaped `home`/`away` teams, a
 * `status`, and an optional `onBack`; nothing fetches. Token-only colors via
 * `useXenitionTheme()` + `broadcast*(tokens.ramps)` — no literals, dark-safe.
 */
function MatchHeader({ home, away, status, minute, competition, venue, onBack, style, }) {
    const { tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, broadcast_1.broadcastInk)(r);
    const inkSoft = (0, broadcast_1.broadcastInkSoft)(r);
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const statusRight = status === 'live' && minute ? minute : meta.label;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
    const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;
    const renderCrest = (team, isWinner) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: team.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: ink,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: isWinner ? '800' : '500',
                    textAlign: 'center',
                }, children: team.name })] }));
    const scoreText = (score) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
            color: score === undefined ? inkSoft : ink,
            fontSize: tokens.typography.scale['3xl'] * 1.4,
            fontWeight: '800',
            letterSpacing: -1,
        }, children: score === undefined ? '–' : score }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, broadcast_1.broadcastGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Go back", onPress: onBack, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, broadcast_1.broadcastTile)(r),
                                borderWidth: 1,
                                borderColor: (0, broadcast_1.broadcastBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.xl }, children: "\u2039" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [competition ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.5 }, children: competition.toUpperCase() })) : null, venue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: venue })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLiveRegion: meta.live ? 'polite' : 'none', style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 6,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, broadcast_1.broadcastTile)(r),
                                borderWidth: 1,
                                borderColor: (0, broadcast_1.broadcastBorder)(r),
                            }, children: [meta.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: ink } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.xs }, children: meta.glyph })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: statusRight })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.md,
                        marginTop: tokens.spacing.lg,
                    }, children: [renderCrest(home, homeWins), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [scoreText(home.score), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: inkSoft, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: ":" }), scoreText(away.score)] }), renderCrest(away, awayWins)] })] }) }));
}
//# sourceMappingURL=MatchHeader.js.map