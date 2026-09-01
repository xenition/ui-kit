"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatComparisonV4 = StatComparisonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * StatComparison — **V4** "broadcast" design. The matchday take on a head-to-head:
 * an elevated card of center-split bars, one row per metric, home filling left in
 * the `primary` accent and away filling right in the `accent` token. Big value
 * numerals flank each row and the leading side reads bolder in `primary`, so
 * ranking survives without relying on color. Same props/behavior as
 * {@link StatComparisonProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Empty state built in. 8-pt spacing, one accent.
 */
function StatComparisonV4({ homeLabel, awayLabel, rows, homeCrest, awayCrest, emptyLabel = 'No stats to compare', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: homeCrest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: homeLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: awayLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: awayCrest ?? '🛡' })] })] }));
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.md }, children: emptyLabel })] }));
    }
    const renderRow = (row, i) => {
        const total = row.home + row.away;
        const homePct = total > 0 ? row.home / total : 0.5;
        const awayPct = total > 0 ? row.away / total : 0.5;
        const better = row.better ?? 'higher';
        const homeWins = better === 'higher' ? row.home > row.away : row.home < row.away;
        const awayWins = better === 'higher' ? row.away > row.home : row.away < row.home;
        const fmt = (v) => `${v}${row.suffix ?? ''}`;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${row.label}: ${homeLabel} ${fmt(row.home)}, ${awayLabel} ${fmt(row.away)}`, style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: homeWins ? colors.primary : colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: homeWins ? '800' : '500' }, children: fmt(row.home) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: row.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: awayWins ? colors.accent : colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: awayWins ? '800' : '500' }, children: fmt(row.away) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 8, borderRadius: 4, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${Math.round(homePct * 100)}%`, borderRadius: 4, backgroundColor: homeWins ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.4) } }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 8, borderRadius: 4, backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.1), overflow: 'hidden', flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${Math.round(awayPct * 100)}%`, borderRadius: 4, backgroundColor: awayWins ? colors.accent : (0, color_1.withAlpha)(colors.accent, 0.4) } }) })] })] }, `${row.label}-${i}`));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, rows.map(renderRow)] }));
}
//# sourceMappingURL=StatComparisonV4.js.map