"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientSurface = GradientSurface;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
/**
 * A token-fed gradient ground for the weather V4 line.
 *
 * `expo-linear-gradient` is an **optional** peer of the kit — every Expo app
 * already ships it, but a bare React Native app may not. So we resolve it
 * lazily: when present, a real vertical `LinearGradient`; when absent, a solid
 * fill of the gradient's last stop (the deepest color), so nothing crashes and
 * the surface still reads. Either way every color is a compiled theme token
 * passed in by the caller — no literal colors here.
 */
// Resolve the optional dep once, guarded — a missing module must not throw.
let LinearGradient = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    LinearGradient = require('expo-linear-gradient').LinearGradient;
}
catch {
    LinearGradient = null;
}
/** Vertical (top→bottom) by default — the sky look. */
function GradientSurface({ colors, start = { x: 0, y: 0 }, end = { x: 0, y: 1 }, locations, style, children, }) {
    if (LinearGradient) {
        return ((0, jsx_runtime_1.jsx)(LinearGradient, { colors: colors, start: start, end: end, locations: locations, style: style, children: children }));
    }
    const fallback = colors[colors.length - 1];
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ backgroundColor: fallback }, style], children: children });
}
//# sourceMappingURL=GradientSurface.js.map