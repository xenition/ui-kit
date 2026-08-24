"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackedBar = StackedBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Single horizontal stacked bar — token-bound, View-based (no SVG). Each
 * segment is a `View` flexed by its share of the sum; distinguish series by
 * varying the `opacity` of one theme color rather than inventing hex values.
 */
function StackedBar({ segments, height = 16, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (segments.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const total = Math.max(segments.reduce((sum, s) => sum + Math.max(s.value, 0), 0), 1);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                height,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
                backgroundColor: colors.border,
            },
            style,
        ], children: segments.map((s, i) => {
            const ratio = Math.min(Math.max(s.value, 0) / total, 1);
            if (ratio <= 0)
                return null;
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexGrow: ratio,
                    flexBasis: 0,
                    backgroundColor: colors[s.color ?? 'primary'],
                    opacity: s.opacity ?? 1,
                } }, i));
        }) }));
}
//# sourceMappingURL=StackedBar.js.map