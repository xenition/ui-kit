"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabResultRow = LabResultRow;
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
 * A single lab-result row: analyte name, measured value + unit, reference
 * range, and a normal / low / high / critical flag. The flag is rendered as a
 * glyph (`✓ ▼ ▲ ⚠`) plus a text label plus a warn/danger token color, so an
 * abnormal result is never signalled by color alone (accessibility + the
 * project token contract). Informational UI only — not a medical device.
 * Token-only colors.
 */
function LabResultRow({ name, value, unit, referenceRange, status = 'normal', collectedAt, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const abnormal = status !== 'normal';
    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), referenceRange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Ref ", referenceRange, unit ? ` ${unit}` : ''] })) : null, collectedAt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: collectedAt })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: [value, unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [" ", unit] }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=LabResultRow.js.map