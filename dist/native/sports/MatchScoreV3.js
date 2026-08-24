"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchScoreV3 = MatchScoreV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true },
    halftime: { label: 'HT', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
    postponed: { label: 'Postponed', glyph: '⚠', live: false },
};
/**
 * MatchScore, design variant 3 — a **compact fixture line**. Everything sits on
 * one row: a leading status block (a `danger` dot + minute when live, otherwise
 * a glyph + short label), the home side right-aligned, a tight `2 - 1` (or
 * `vs`) score in the middle, and the away side left-aligned. Built for dense
 * lists. Same props as `MatchScore`; token-pure, reduced-motion press scale.
 */
function MatchScoreV3({ home, away, status, minute, kickoffLabel, competition, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = STATUS_META[status] ?? STATUS_META.upcoming;
    const container = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        backgroundColor: colors.surface,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading match", accessibilityState: { busy: true }, style: [container, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flex: 1,
                    height: tokens.typography.scale.base,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[200],
                } }) }));
    }
    const bothScored = home.score !== undefined && away.score !== undefined;
    const scored = bothScored ? `${home.score} - ${away.score}` : 'vs';
    const statusLabel = status === 'live' && minute
        ? minute
        : status === 'upcoming' && kickoffLabel
            ? kickoffLabel
            : meta.label;
    const sideName = (t) => t.short ?? t.name;
    const a11y = `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
        (status === 'live' && minute ? `, ${minute}` : '');
    const statusBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 52, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [meta.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.danger } })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xs", color: "muted" })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: meta.live ? colors.dangerText : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                }, children: statusLabel })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [statusBlock, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'right' }, children: sideName(home) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: home.crest ?? '🛡' })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: bothScored ? colors.onSurface : colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '800',
                    textAlign: 'center',
                    minWidth: 44,
                }, children: scored }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: away.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: sideName(away) })] }), competition ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { maxWidth: 72, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: competition })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=MatchScoreV3.js.map