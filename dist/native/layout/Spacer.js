"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spacer = Spacer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Inert spacing element: either a fixed square from the token spacing scale or
 * a flexible `'flex'` gap that expands to fill remaining space along the
 * parent's main axis. Sizes trace to the compiled spacing scale; no literal
 * colors. Hidden from accessibility.
 */
function Spacer({ size = 'md', style, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const dimension = size === 'flex'
        ? { flexGrow: 1, flexShrink: 1 }
        : { width: tokens.spacing[size], height: tokens.spacing[size] };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [dimension, style], ...rest }));
}
//# sourceMappingURL=Spacer.js.map