"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionRow = InspectionRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const INSPECTION_RESULT = {
    pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
    fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
    na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
    pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};
/**
 * One line in an inspection checklist: a tinted result glyph disc, a
 * label/code/note stack, and a result pill. The result is conveyed redundantly
 * (glyph + label + a color that traces to a `SemanticColors` slot: pass →
 * success, fail → danger) so it is never color-alone. Becomes a button only
 * when `onPress` is supplied. No literal colors.
 */
function InspectionRow({ label, result, code, note, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const rd = INSPECTION_RESULT[result] ?? INSPECTION_RESULT.pending;
    const tint = rd.slot === 'muted' ? colors.muted : colors[rd.slot];
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: rd.glyph, color: rd.slot, accessibilityLabel: rd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), code != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: code })) : null, note != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: rd.tone, variant: "soft", size: "sm", children: `${rd.glyph} ${rd.label}` })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}, ${rd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=InspectionRow.js.map