"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalsPanel = VitalsPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', color: 'success' },
    low: { glyph: '▼', label: 'Low', color: 'warn' },
    high: { glyph: '▲', label: 'High', color: 'warn' },
    critical: { glyph: '⚠', label: 'Critical', color: 'danger' },
};
/**
 * A vitals dashboard panel: a responsive grid of reading tiles (heart rate,
 * blood pressure, SpO₂, temperature, …). Each tile shows value + unit and, when
 * flagged, a normal / low / high / critical marker drawn as a glyph + label +
 * warn/danger token color so it is never color-only. Renders a loading skeleton
 * and an empty note. Informational UI only — not a medical device. Token-only
 * colors.
 */
function VitalsPanel({ vitals, title, loading = false, emptyLabel = 'No vitals recorded', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const header = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null;
    const shell = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [header, children] }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading vitals", style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexBasis: '47%', flexGrow: 1, height: 64, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))) }));
    }
    if (vitals.length === 0) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }));
    }
    return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: vitals.map((v, i) => {
            const meta = v.status ? STATUS_META[v.status] : undefined;
            const abnormal = v.status != null && v.status !== 'normal';
            const statusColor = meta ? colors[meta.color] : colors.onSurface;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${v.label}: ${String(v.value)}${v.unit ? ` ${v.unit}` : ''}${meta ? `, ${meta.label}` : ''}`, style: {
                    flexBasis: '47%',
                    flexGrow: 1,
                    gap: 2,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [v.glyph ? `${v.glyph} ` : '', v.label] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: [v.value, v.unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [" ", v.unit] }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })) : null] }, `${v.label}-${i}`));
        }) }));
}
//# sourceMappingURL=VitalsPanel.js.map