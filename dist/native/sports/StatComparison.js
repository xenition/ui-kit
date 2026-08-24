"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatComparison = StatComparison;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A two-team stat comparison — mirrored horizontal bars sharing a center line,
 * one row per metric (possession, shots, …). Each bar is proportional to its
 * share of the pair total; the winning side is emphasised by weight (leading
 * side reads bolder) so ranking survives without relying on color. Home uses
 * the `primary` slot, away the `accent` slot. Empty state built in.
 * Token-only colors; bars are plain `View`s (no chart dependency).
 */
function StatComparison({ homeLabel, awayLabel, rows, homeCrest, awayCrest, emptyLabel = 'No stats to compare', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.md,
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: homeCrest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: homeLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: awayLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: awayCrest ?? '🛡' })] })] }));
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.md }, children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, rows.map((row, i) => {
                const total = row.home + row.away;
                const homePct = total > 0 ? row.home / total : 0.5;
                const awayPct = total > 0 ? row.away / total : 0.5;
                const better = row.better ?? 'higher';
                const homeWins = better === 'higher' ? row.home > row.away : row.home < row.away;
                const awayWins = better === 'higher' ? row.away > row.home : row.away < row.home;
                const fmt = (v) => `${v}${row.suffix ?? ''}`;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${row.label}: ${homeLabel} ${fmt(row.home)}, ${awayLabel} ${fmt(row.away)}`, style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: homeWins ? '700' : '500' }, children: fmt(row.home) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: row.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: awayWins ? '700' : '500' }, children: fmt(row.away) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 8, borderRadius: 4, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${Math.round(homePct * 100)}%`, backgroundColor: colors.primary } }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 8, borderRadius: 4, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden', flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${Math.round(awayPct * 100)}%`, backgroundColor: colors.accent } }) })] })] }, `${row.label}-${i}`));
            })] }));
}
//# sourceMappingURL=StatComparison.js.map