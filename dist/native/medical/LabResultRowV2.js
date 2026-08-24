"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabResultRowV2 = LabResultRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', color: 'successText', fill: 'success' },
    low: { glyph: '▼', label: 'Low', color: 'warnText', fill: 'warn' },
    high: { glyph: '▲', label: 'High', color: 'warnText', fill: 'warn' },
    critical: { glyph: '⚠', label: 'Critical', color: 'dangerText', fill: 'danger' },
};
/**
 * LabResultRow, redesigned (v2): an **elevated result card**. The measured value
 * is set very large as the centrepiece, and a full-width status band across the
 * foot carries the glyph + word flag (Normal / Low / High / Critical) over a
 * tinted fill — so an abnormal result reads instantly yet never on color alone.
 * Analyte name and reference range head the card. Lifted with a shadow and a
 * fade-in mount — distinct at a glance from v1's dense line. Same props,
 * token-pure.
 */
function LabResultRowV2({ name, value, unit, referenceRange, status = 'normal', collectedAt, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const bandFill = colors[meta.fill];
    const abnormal = status !== 'normal';
    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                opacity: enter.opacity,
                transform: enter.transform,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), referenceRange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Ref ", referenceRange, unit ? ` ${unit}` : ''] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: [value, unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '500', color: colors.muted }, children: [" ", unit] }) : null] }), collectedAt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: collectedAt })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.lg,
                    backgroundColor: (0, color_1.withAlpha)(bandFill, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.label })] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: card });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, children: card }));
}
//# sourceMappingURL=LabResultRowV2.js.map