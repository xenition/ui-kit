"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingsV3 = StandingsV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * Movement derived from the newest form result (the props carry no prior
 * position). Newest `W` reads as moving up, `L` as moving down, `D`/none as
 * holding — a recent-momentum proxy shown as a delta arrow + label.
 */
function movement(form) {
    const latest = form && form.length > 0 ? form[form.length - 1] : undefined;
    if (latest === 'W')
        return { glyph: '▲', slot: 'success', label: 'moving up' };
    if (latest === 'L')
        return { glyph: '▼', slot: 'danger', label: 'moving down' };
    return { glyph: '–', slot: 'muted', label: 'holding' };
}
/**
 * Standings, design variant 3 — a **compact ranked list** (not a grid). Each
 * item leads with a large position number, then crest + team + a Played caption,
 * and trails with the points total and a position-delta arrow derived from the
 * newest form result (up / down / holding), announced in words so it never reads
 * by color alone. Zones show a leading accent stripe + a11y label. Same props as
 * `Standings`; empty + loading built in. Token-pure (`withAlpha`).
 */
function StandingsV3({ rows, showForm = false, zones = [], activeId, loadingRows, onSelectTeam, emptyLabel = 'No standings yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const zoneFor = (pos) => zones.find((z) => pos >= z.from && pos <= z.to);
    const container = {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        overflow: 'hidden',
    };
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading standings", style: [container, style], children: Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.spacing.xl,
                    margin: tokens.spacing.sm,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[100],
                } }, i))) }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.xl, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Rows appear once the table is published." })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [container, style], children: rows.map((row, i) => {
            const pos = i + 1;
            const zone = zoneFor(pos);
            const active = row.id === activeId;
            const mv = showForm ? movement(row.form) : undefined;
            const zoneColor = zone?.tone === 'success' ? colors.success : zone?.tone === 'danger' ? colors.danger : colors.primary;
            const mvColor = mv?.slot === 'success' ? colors.successText : mv?.slot === 'danger' ? colors.dangerText : colors.muted;
            const label = `${pos}. ${row.team}, ${row.points} points, played ${row.played}` +
                (zone ? `, ${zone.label}` : '') +
                (mv ? `, ${mv.label}` : '');
            const rowInner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingLeft: tokens.spacing.md,
                    paddingRight: tokens.spacing.md,
                    backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.1) : colors.surface,
                    borderBottomWidth: i === rows.length - 1 ? 0 : 1,
                    borderColor: colors.border,
                }, children: [zone ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 4,
                            backgroundColor: zoneColor,
                        } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 28, textAlign: 'center', color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: pos }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: row.crest ?? '🛡' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: row.team }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Played ${row.played}` })] }), mv ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, accessibilityLabel: mv.label, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: mvColor, fontSize: tokens.typography.scale.xs }, children: mv.glyph }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', minWidth: 40 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: row.points }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Pts" })] })] }));
            return onSelectTeam ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: () => onSelectTeam(row), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: rowInner }, row.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, children: rowInner }, row.id));
        }) }));
}
//# sourceMappingURL=StandingsV3.js.map