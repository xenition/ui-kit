"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Histogram = Histogram;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Frequency histogram — token-bound, View/flex-based (no SVG). Like a bar chart
 * but bars sit flush (gapless) to read as a distribution. Bar height is
 * `count / max`; a `muted` baseline stands in for the axis.
 */
function Histogram({ bins, height = 120, color = 'primary', max, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (bins.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const ceiling = Math.max(max ?? Math.max(...bins), 1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Histogram, ${bins.length} bins, max ${ceiling}`, style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', height }, children: bins.map((count, i) => {
                    const ratio = Math.min(Math.max(count / ceiling, 0), 1);
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            height: Math.max(ratio * height, 1),
                            backgroundColor: colors[color],
                            borderColor: colors.surface,
                            borderLeftWidth: i === 0 ? 0 : 1,
                        } }, i));
                }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.muted, marginTop: tokens.spacing.xs } })] }));
}
//# sourceMappingURL=Histogram.js.map