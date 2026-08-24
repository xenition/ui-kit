"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabResultRowV3 = LabResultRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', color: 'successText' },
    low: { glyph: '▼', label: 'Low', color: 'warnText' },
    high: { glyph: '▲', label: 'High', color: 'warnText' },
    critical: { glyph: '⚠', label: 'Critical', color: 'dangerText' },
};
/**
 * LabResultRow, redesigned (v3): a **dense scan line**. The analyte name leads
 * one flexible line, the value + unit hug the right edge, and the flag reduces
 * to a leading glyph + word ("▲ High") in an AA-safe status color — never color
 * alone. No card, no reference stack — a lean line tuned for long panels; the
 * reference range collapses under the name only when present. Distinct at a
 * glance from v1's row and v2's value card. Same props, token-pure.
 */
function LabResultRowV3({ name, value, unit, referenceRange, status = 'normal', collectedAt, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const abnormal = status !== 'normal';
    const sub = [referenceRange ? `Ref ${referenceRange}${unit ? ` ${unit}` : ''}` : undefined, collectedAt]
        .filter(Boolean)
        .join(' · ');
    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                minHeight: 44,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3, minWidth: 74 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), sub !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sub })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [value, unit ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '500', color: colors.muted }, children: [" ", unit] }) : null] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=LabResultRowV3.js.map