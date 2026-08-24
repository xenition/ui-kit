"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreTicker = ScoreTicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_META = {
    live: { label: 'LIVE', live: true },
    final: { label: 'FT', live: false },
    upcoming: { label: 'SOON', live: false },
};
/**
 * A horizontally-scrolling scoreboard strip — compact per-match tiles for a
 * top-of-screen ticker. Each tile shows both codes, the scoreline, and a
 * status marked by text (plus a `danger` dot for live, never color alone).
 * Handles empty and loading states. Tappable via `onSelect`. Token-only
 * colors.
 */
function ScoreTicker({ matches, onSelect, loadingTiles, emptyLabel = 'No matches', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const strip = (children) => ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: tokens.spacing.xs }, children: children }));
    if (loadingTiles && loadingTiles > 0) {
        return strip(Array.from({ length: loadingTiles }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: { busy: true }, style: { width: 128, height: 64, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))));
    }
    if (matches.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                {
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }));
    }
    return strip(matches.map((m) => {
        const status = m.status ?? 'upcoming';
        const sm = STATUS_META[status] ?? STATUS_META.upcoming;
        const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
        const line = (name, score) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: score === undefined ? colors.muted : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: score === undefined ? '–' : score })] }));
        const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                width: 128,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                padding: tokens.spacing.sm,
                gap: 2,
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, children: [sm.live ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: sm.live ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: sm.label }), m.clock ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.clock })) : null] }), line(m.home, m.homeScore), line(m.away, m.awayScore)] }));
        const a11y = `${m.home} versus ${m.away}, ${sm.label}${hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''}`;
        return onSelect ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelect(m), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile }, m.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: tile }, m.id));
    }));
}
//# sourceMappingURL=ScoreTicker.js.map