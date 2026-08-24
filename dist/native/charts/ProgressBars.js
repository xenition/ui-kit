"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBars = ProgressBars;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MiniBar_1 = require("./MiniBar");
/**
 * Stack of labelled progress bars — token-bound, View-based (no SVG). Each row
 * is a label + value over a {@link MiniBar} sized to `value / max`.
 */
function ProgressBars({ items, max, color = 'primary', showValues = true, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const ceiling = Math.max(max ?? Math.max(...items.map((i) => i.value)), 1);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Progress bars, ${items.length} items`, style: [{ gap: tokens.spacing.sm }, style], children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, flex: 1 }, children: item.label }), showValues ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.value })) : null] }), (0, jsx_runtime_1.jsx)(MiniBar_1.MiniBar, { value: item.value, max: ceiling, color: item.color ?? color })] }, i))) }));
}
//# sourceMappingURL=ProgressBars.js.map