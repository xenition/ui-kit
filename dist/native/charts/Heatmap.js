"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heatmap = Heatmap;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Grid heatmap — token-bound, View-based (no SVG). Every cell paints ONE theme
 * color and varies only its `opacity` (`value / max`), so no literal colors are
 * introduced. Empty cells fall back to a `border`-tinted blank.
 */
function Heatmap({ data, color = 'primary', max, cellSize = 16, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0 || data.every((row) => row.length === 0)) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const flat = data.flat();
    const ceiling = Math.max(max ?? Math.max(...flat), 1);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: 2 }, style], children: data.map((row, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 2 }, children: row.map((value, c) => {
                const intensity = Math.min(Math.max(value / ceiling, 0), 1);
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: cellSize,
                        height: cellSize,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors[color],
                        // Floor so a zero cell still shows a faint tile edge.
                        opacity: 0.08 + intensity * 0.92,
                    } }, c));
            }) }, r))) }));
}
//# sourceMappingURL=Heatmap.js.map