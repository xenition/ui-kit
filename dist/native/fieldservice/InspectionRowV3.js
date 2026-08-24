"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionRowV3 = InspectionRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const RESULT = {
    pass: { label: 'Pass', glyph: '✓', tone: 'success', textSlot: 'successText', iconSlot: 'success' },
    fail: { label: 'Fail', glyph: '✕', tone: 'danger', textSlot: 'dangerText', iconSlot: 'danger' },
    na: { label: 'N/A', glyph: '–', tone: 'neutral', textSlot: 'muted', iconSlot: 'muted' },
    pending: { label: 'Pending', glyph: '○', tone: 'primary', textSlot: 'primaryText', iconSlot: 'primary' },
};
function InspectionRowV3({ label, result, code, note, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const rd = RESULT[result] ?? RESULT.pending;
    const rowStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    };
    const a11y = `${label}, ${rd.label}`;
    const Container = onPress ? react_native_1.Pressable : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { accessible: true, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11y, onPress: onPress, style: onPress ? ({ pressed }) => [rowStyle, style, { opacity: pressed ? 0.7 : 1 }] : [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: rd.glyph, size: "sm", color: rd.iconSlot, accessibilityLabel: rd.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [label, code != null ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '400' }, children: `   ${code}` }) : null] }), note != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[rd.textSlot], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: `${rd.glyph} ${rd.label}` })] }));
}
//# sourceMappingURL=InspectionRowV3.js.map