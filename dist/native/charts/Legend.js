"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legend = Legend;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Chart legend — token-bound, View-based (no SVG). Each entry is a color swatch
 * (a theme color, optionally at reduced `opacity`) beside its `onSurface` label.
 */
function Legend({ items, vertical = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Legend: ${items.map((it) => it.label).join(', ')}`, style: [
            {
                flexDirection: vertical ? 'column' : 'row',
                flexWrap: vertical ? 'nowrap' : 'wrap',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 10,
                        height: 10,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors[item.color ?? 'primary'],
                        opacity: item.opacity ?? 1,
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: item.label })] }, i))) }));
}
//# sourceMappingURL=Legend.js.map