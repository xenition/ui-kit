"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollArea = ScrollArea;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed `ScrollView` with token-bound content padding and an optional theme
 * `surface` background — the native mirror of the web scroll container. Padding
 * and color trace to the compiled theme; no literal colors.
 */
function ScrollArea({ padding = 'lg', filled = false, style, contentContainerStyle, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: [filled ? { backgroundColor: colors.surface } : null, style], contentContainerStyle: [{ padding: tokens.spacing[padding] }, contentContainerStyle], ...rest, children: children }));
}
//# sourceMappingURL=ScrollArea.js.map