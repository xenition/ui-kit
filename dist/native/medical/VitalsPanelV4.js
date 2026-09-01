"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalsPanelV4 = VitalsPanelV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', color: 'success' },
    low: { glyph: '↓', label: 'Low', color: 'warn' },
    high: { glyph: '↑', label: 'High', color: 'warn' },
    critical: { glyph: '⚠', label: 'Critical', color: 'danger' },
};
/**
 * VitalsPanel — **V4** "clinic" design. The calm, clinical take on a vitals
 * dashboard: an elevated rounded surface with a soft shadow holding a responsive
 * grid of reading tiles (heart rate, blood pressure, SpO₂, temperature, …). Each
 * tile shows a big legible **tabular-nums** value + unit; when a reading is
 * abnormal it is flagged by an ↑/↓ (or ⚠) glyph + a text label + a warn/danger
 * token tone, so severity is never color alone. Renders a loading skeleton and an
 * empty note. Identical props/behavior to {@link VitalsPanelProps}. Token-only
 * colors via `useXenitionTheme()`. Informational UI only — not a medical device.
 */
function VitalsPanelV4({ vitals, title, loading = false, emptyLabel = 'No vitals recorded', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const header = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null;
    const shellStyle = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const shell = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shellStyle, style], children: [header, children] }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading vitals", style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexBasis: '47%', flexGrow: 1, height: 80, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }, i))) }));
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
                    gap: tokens.spacing.xs,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [v.glyph ? `${v.glyph} ` : '', v.label] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [v.value, v.unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [" ", v.unit] }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: abnormal ? (0, color_1.withAlpha)(colors.primary, 0.1) : tokens.ramps.neutral[100],
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })) : null] }, `${v.label}-${i}`));
        }) }));
}
//# sourceMappingURL=VitalsPanelV4.js.map