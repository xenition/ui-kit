"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabResultRowV4 = LabResultRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', tone: 'success', color: 'success' },
    low: { glyph: '▼', arrow: '↓', label: 'Low', tone: 'warn', color: 'warn' },
    high: { glyph: '▲', arrow: '↑', label: 'High', tone: 'warn', color: 'warn' },
    critical: { glyph: '⚠', arrow: '↑', label: 'Critical', tone: 'danger', color: 'danger' },
};
/**
 * LabResultRow — **V4** "clinic" design. The calm, clinical take on a lab
 * result: an elevated rounded row with a soft shadow, the analyte name, a big
 * legible **tabular-nums** value + unit, and a normal / low / high / critical
 * flag. Out-of-range values are colored by tone and marked with an ↑/↓ arrow
 * plus a labelled status Badge, so an abnormal result is never signalled by
 * color alone (accessibility + the token contract). Honors the V4 `variant` —
 * `full` (default, shows the reference range) and `compact` (a denser single
 * line that hides the reference-range detail) — identical props/behavior to
 * {@link LabResultRowProps}. Token-only colors via `useXenitionTheme()`.
 * Web/native parity of the V4 web component. Informational UI only — not a
 * medical device.
 */
function LabResultRowV4({ name, value, unit, referenceRange, status = 'normal', collectedAt, onPress, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const abnormal = status !== 'normal';
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;
    const valueColor = abnormal ? statusColor : colors.onSurface;
    // ── compact: denser single line ──
    const content = variant === 'compact' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            shell,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 44,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginLeft: 'auto', color: valueColor, fontSize: tokens.typography.scale.base, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [abnormal && meta.arrow ? `${meta.arrow} ` : '', value, unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [" ", unit] }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            shell,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), referenceRange ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Ref ", referenceRange, unit ? ` ${unit}` : ''] }) })) : null, collectedAt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: collectedAt })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: valueColor, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [abnormal && meta.arrow ? `${meta.arrow} ` : '', value, unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: [" ", unit] }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=LabResultRowV4.js.map