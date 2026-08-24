"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingsV2 = StandingsV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const FORM_META = {
    W: { tone: 'success', label: 'win' },
    D: { tone: 'muted', label: 'draw' },
    L: { tone: 'danger', label: 'loss' },
};
/**
 * Standings, design variant 2 — a **styled table** with a rounded elevated
 * frame, zebra rows, a leading zone accent bar (promotion / relegation, always
 * reinforced by an a11y label so meaning never rests on color), and inline
 * form dots on each row. `zones` paint the accent bar; `activeId` tints a row;
 * `variant="compact"` trims to Played + Points. Same props as `Standings`;
 * empty + loading states built in. Token-pure (`shadow`, `withAlpha`).
 */
function StandingsV2({ rows, variant = 'full', showForm = false, zones = [], activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const full = variant === 'full';
    const zoneFor = (pos) => zones.find((z) => pos >= z.from && pos <= z.to);
    const container = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        overflow: 'hidden',
        ...(0, elevation_1.shadow)('sm', tokens),
    };
    const headCell = (label, w) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: w, textAlign: 'right', color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: label }, label));
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingLeft: tokens.spacing.md,
            paddingRight: tokens.spacing.sm,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 24, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "#" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Team" }), headCell('P', 24), full ? headCell('W', 22) : null, full ? headCell('D', 22) : null, full ? headCell('L', 22) : null, full ? headCell('GD', 30) : null, headCell('Pts', 32)] }));
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading standings", style: [container, style], children: [header, Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.spacing.xl,
                        margin: tokens.spacing.sm,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: i % 2 === 0 ? tokens.ramps.neutral[200] : tokens.ramps.neutral[100],
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
            fontWeight: strong ? '800' : '500',
        }, children: value }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, rows.map((row, i) => {
                const pos = i + 1;
                const zone = zoneFor(pos);
                const active = row.id === activeId;
                const gd = row.goalDiff ?? row.won - row.lost;
                const gdLabel = gd > 0 ? `+${gd}` : String(gd);
                const zoneColor = zone?.tone === 'success' ? colors.success : zone?.tone === 'danger' ? colors.danger : colors.primary;
                const zebra = i % 2 === 1;
                const bg = active ? (0, color_1.withAlpha)(colors.primary, 0.1) : zebra ? tokens.ramps.neutral[50] : colors.surface;
                const label = `${pos}. ${row.team}, ${row.points} points, played ${row.played}` + (zone ? `, ${zone.label}` : '');
                const rowInner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingVertical: tokens.spacing.sm,
                                paddingLeft: tokens.spacing.md,
                                paddingRight: tokens.spacing.sm,
                                backgroundColor: bg,
                                borderBottomWidth: i === rows.length - 1 ? 0 : 1,
                                borderColor: colors.border,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        position: 'absolute',
                                        left: 0,
                                        top: tokens.spacing.xs,
                                        bottom: tokens.spacing.xs,
                                        width: 4,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: zone ? zoneColor : 'transparent',
                                    } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 24, textAlign: 'center', color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pos }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: row.crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: row.team }), valueCell(row.played, 24), full ? valueCell(row.won, 22) : null, full ? valueCell(row.drawn, 22) : null, full ? valueCell(row.lost, 22) : null, full ? valueCell(gdLabel, 30) : null, valueCell(row.points, 32, true)] }), showForm && full && row.form && row.form.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                gap: 3,
                                paddingLeft: tokens.spacing.md + 24,
                                paddingBottom: tokens.spacing.xs,
                                backgroundColor: bg,
                            }, children: row.form.slice(-5).map((f, fi) => {
                                const fm = FORM_META[f] ?? FORM_META.D;
                                const c = fm.tone === 'success' ? colors.success : fm.tone === 'danger' ? colors.danger : colors.muted;
                                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: fm.label, style: { width: 8, height: 8, borderRadius: 4, backgroundColor: c } }, fi));
                            }) })) : null] }));
                return onSelectTeam ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => onSelectTeam(row), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: rowInner }, row.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, children: rowInner }, row.id));
            })] }));
}
//# sourceMappingURL=StandingsV2.js.map