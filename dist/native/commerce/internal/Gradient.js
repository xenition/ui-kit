"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gradient = Gradient;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
// Resolved once. Jest maps this specifier to a mock; Expo apps supply the real
// module; anything else falls back to a solid fill.
let LinearGradient = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    LinearGradient = require('expo-linear-gradient').LinearGradient ?? null;
}
catch {
    LinearGradient = null;
}
function Gradient({ colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, style, children, }) {
    if (LinearGradient) {
        return ((0, jsx_runtime_1.jsx)(LinearGradient, { colors: colors, start: start, end: end, style: style, children: children }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ backgroundColor: colors[0] }, style], children: children });
}
//# sourceMappingURL=Gradient.js.map