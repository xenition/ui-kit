"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientSurface = GradientSurface;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
/**
 * A token-fed gradient ground for the wellness module.
 *
 * `expo-linear-gradient` is an **optional** peer of the kit — resolved lazily so
 * a bare React Native app without it degrades to a solid fill of the gradient's
 * last (deepest) stop rather than crashing. Every color is a compiled theme
 * token passed in by the caller — no literal colors here.
 */
let LinearGradient = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    LinearGradient = require('expo-linear-gradient').LinearGradient;
}
catch {
    LinearGradient = null;
}
/** Diagonal by default — a softer, calmer wash than a hard vertical. */
function GradientSurface({ colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, locations, style, children, }) {
    if (LinearGradient) {
        return ((0, jsx_runtime_1.jsx)(LinearGradient, { colors: colors, start: start, end: end, locations: locations, style: style, children: children }));
    }
    const fallback = colors[colors.length - 1];
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ backgroundColor: fallback }, style], children: children });
}
//# sourceMappingURL=GradientSurface.js.map