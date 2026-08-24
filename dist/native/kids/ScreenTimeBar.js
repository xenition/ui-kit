"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenTimeBar = ScreenTimeBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
function fmtMinutes(mins, unit) {
    if (unit !== 'min')
        return `${mins} ${unit}`;
    if (mins < 60)
        return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
/**
 * Screen-time usage against a daily limit: a labelled readout plus a progress
 * bar that shifts tone as usage climbs (primary → warn near the cap → danger
 * once over). The over/near state is conveyed in the readout text + a11y label,
 * not by color alone. Renders a "no limit set" state when `limit <= 0`. Bar and
 * text colors are `SemanticColors` tokens — no literals.
 */
function ScreenTimeBar({ used, limit, unit = 'min', label = 'Screen time', loading = false, emptyLabel = 'No screen-time limit set', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.sm,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading screen time", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '100%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    if (!(limit > 0)) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const safeUsed = Math.max(0, used);
    const pct = (safeUsed / limit) * 100;
    const over = safeUsed > limit;
    const near = !over && pct >= 80;
    const tone = over ? 'danger' : near ? 'warn' : 'primary';
    const readoutColor = over ? colors.danger : near ? colors.warn : colors.onSurface;
    const stateNote = over
        ? `over by ${fmtMinutes(safeUsed - limit, unit)}`
        : `${fmtMinutes(Math.max(0, limit - safeUsed), unit)} left`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}, ${fmtMinutes(safeUsed, unit)} of ${fmtMinutes(limit, unit)}, ${stateNote}`, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: readoutColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [fmtMinutes(safeUsed, unit), " / ", fmtMinutes(limit, unit)] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: safeUsed, max: limit, tone: tone }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: over ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: over ? '700' : '400' }, children: over ? `⚠️ ${stateNote}` : stateNote })] }));
}
//# sourceMappingURL=ScreenTimeBar.js.map