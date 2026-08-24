"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBar = MiniBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single thin progress-style bar — token-bound, View-based (no SVG). The fill
 * width is `value / max`; the track uses `border`. Handy inline next to a stat.
 */
function MiniBar({ value, max = 100, color = 'primary', height = 6, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const ceiling = Math.max(max, 1);
    const ratio = Math.min(Math.max(value / ceiling, 0), 1);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Progress bar, ${value} of ${max}`, style: [
            {
                height,
                backgroundColor: colors.border,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: `${ratio * 100}%`,
                height: '100%',
                backgroundColor: colors[color],
                borderRadius: tokens.radius.full,
            } }) }));
}
//# sourceMappingURL=MiniBar.js.map