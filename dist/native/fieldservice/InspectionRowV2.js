"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionRowV2 = InspectionRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const RESULT = {
    pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
    fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
    na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
    pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};
function InspectionRowV2({ label, result, code, note, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const rd = RESULT[result] ?? RESULT.pending;
    const tint = colors[rd.slot];
    const surface = {
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        padding: tokens.spacing.md,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: surface, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 52,
                    height: 52,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: rd.glyph, size: "2xl", color: rd.slot, accessibilityLabel: rd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: label }), code != null ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 0.5 }, children: code }) : null, note != null ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: rd.tone, variant: "soft", children: `${rd.glyph} ${rd.label}` }) })] }));
    const a11y = `${label}, ${rd.label}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, style], children: onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: inner })) }));
}
//# sourceMappingURL=InspectionRowV2.js.map