"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeBar = RangeBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single-range indicator — token-bound, View-based (no SVG). Draws a `border`
 * track with one filled segment spanning `[start, end]` positioned by its share
 * of `[domainMin, domainMax]`. Good for min–max / percentile bands.
 */
function RangeBar({ start, end, domainMin = 0, domainMax = 100, color = 'primary', height = 10, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const span = Math.max(domainMax - domainMin, 1);
    const lo = Math.min(start, end);
    const hi = Math.max(start, end);
    const left = Math.min(Math.max((lo - domainMin) / span, 0), 1);
    const right = Math.min(Math.max((hi - domainMin) / span, 0), 1);
    const width = Math.max(right - left, 0);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Range bar, ${lo} to ${hi}`, style: [
            {
                height,
                backgroundColor: colors.border,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                position: 'absolute',
                left: `${left * 100}%`,
                width: `${width * 100}%`,
                height: '100%',
                backgroundColor: colors[color],
                borderRadius: tokens.radius.full,
            } }) }));
}
//# sourceMappingURL=RangeBar.js.map