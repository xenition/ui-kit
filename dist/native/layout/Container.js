"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = Container;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Centered content column with a token-bound horizontal padding and a numeric
 * `maxWidth` cap — the native mirror of the web page container. Colors/padding
 * come from the compiled theme; only the numeric `maxWidth` is a layout literal.
 */
function Container({ maxWidth = 480, padding = 'lg', style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: '100%',
                maxWidth,
                alignSelf: 'center',
                paddingHorizontal: tokens.spacing[padding],
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Container.js.map