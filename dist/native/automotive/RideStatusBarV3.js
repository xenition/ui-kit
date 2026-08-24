"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideStatusBarV3 = RideStatusBarV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Canonical stage order + glyph + human label. */
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '🔍' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🧭' },
    { key: 'completed', label: 'Completed', glyph: '🏁' },
];
function RideStatusBarV3({ stage, detail, cancelled = false, style }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const barStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
    };
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Ride cancelled", style: [barStyle, { borderColor: (0, color_1.withAlpha)(colors.danger, 0.5), backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.1) }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: "\u2715 Cancelled" }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }));
    }
    const current = STAGES[activeIndex] ?? STAGES[0];
    const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${detail ? `, ${detail}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [barStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: current.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: current.label })] }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: STAGES.map((s, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: i === activeIndex ? 14 : 6,
                        height: 6,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i <= activeIndex ? colors.primary : (0, color_1.withAlpha)(colors.muted, 0.3),
                    } }, s.key))) })] }));
}
//# sourceMappingURL=RideStatusBarV3.js.map