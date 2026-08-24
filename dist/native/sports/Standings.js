"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standings = Standings;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const FORM_META = {
    W: { tone: 'success', label: 'win' },
    D: { tone: 'muted', label: 'draw' },
    L: { tone: 'danger', label: 'loss' },
};
/**
 * A league table — the classic standings grid built from `View`/`Text` (RN has
 * no `<table>`). Rows are tappable (`onSelectTeam`); `zones` paint promotion /
 * relegation bands as a leading accent bar reinforced by an a11y label so the
 * meaning never rests on color alone. Empty and loading states are built in.
 * `compact` trims to Played + Points for narrow layouts. Token-only colors.
 */
function Standings({ rows, variant = 'full', showForm = false, zones = [], activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const full = variant === 'full';
    const zoneFor = (pos) => zones.find((z) => pos >= z.from && pos <= z.to);
    const headCell = (label, w, align = 'right') => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            width: w,
            textAlign: align,
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
        }, children: label }, label));
    const container = {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: tokens.radius.md,
        backgroundColor: colors.surface,
        overflow: 'hidden',
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            gap: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderColor: colors.border,
        }, children: [headCell('#', 22, 'center'), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Team" }), headCell('P', 24), full ? headCell('W', 24) : null, full ? headCell('D', 24) : null, full ? headCell('L', 24) : null, full ? headCell('GD', 32) : null, headCell('Pts', 32)] }));
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading standings", style: [container, style], children: [header, Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.spacing.xl,
                        margin: tokens.spacing.sm,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: tokens.ramps.neutral[200],
                    } }, i)))] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.xl, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Rows appear once the table is published." })] })] }));
    }
    const valueCell = (value, w, strong = false) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            width: w,
            textAlign: 'right',
            color: strong ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: strong ? '700' : '500',
        }, children: value }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, rows.map((row, i) => {
                const pos = i + 1;
                const zone = zoneFor(pos);
                const active = row.id === activeId;
                const gd = row.goalDiff ?? row.won - row.lost;
                const gdLabel = gd > 0 ? `+${gd}` : String(gd);
                const zoneColor = zone?.tone === 'success' ? colors.success : zone?.tone === 'danger' ? colors.danger : colors.primary;
                const rowBody = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.sm,
                        backgroundColor: active ? tokens.ramps.primary[50] : colors.surface,
                        borderBottomWidth: i === rows.length - 1 ? 0 : 1,
                        borderColor: colors.border,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, children: [zone ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        position: 'absolute',
                                        left: -tokens.spacing.sm,
                                        top: -tokens.spacing.sm,
                                        bottom: -tokens.spacing.sm,
                                        width: 3,
                                        backgroundColor: zoneColor,
                                    } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: pos })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: row.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: row.team }), valueCell(row.played, 24), full ? valueCell(row.won, 24) : null, full ? valueCell(row.drawn, 24) : null, full ? valueCell(row.lost, 24) : null, full ? valueCell(gdLabel, 32) : null, valueCell(row.points, 32, true)] }));
                const label = `${pos}. ${row.team}, ${row.points} points, played ${row.played}` +
                    (zone ? `, ${zone.label}` : '');
                if (showForm && full && row.form && row.form.length > 0) {
                    const formRow = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 2, paddingLeft: tokens.spacing.sm, paddingBottom: tokens.spacing.xs }, children: row.form.slice(-5).map((f, fi) => {
                            const fm = FORM_META[f] ?? FORM_META.D;
                            const c = fm.tone === 'success' ? colors.success : fm.tone === 'danger' ? colors.danger : colors.muted;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: fm.label, style: {
                                    width: 16,
                                    height: 16,
                                    borderRadius: tokens.radius.sm,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: tokens.ramps.neutral[100],
                                    borderWidth: 1,
                                    borderColor: c,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: c, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: f }) }, fi));
                        }) }));
                    const wrapped = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [rowBody, formRow] }, row.id));
                    return onSelectTeam ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => onSelectTeam(row), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: wrapped }, row.id)) : (wrapped);
                }
                return onSelectTeam ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => onSelectTeam(row), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: rowBody }, row.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, children: rowBody }, row.id));
            })] }));
}
//# sourceMappingURL=Standings.js.map