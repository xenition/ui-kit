"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inset = Inset;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Pads its children inward by a token-bound amount — uniform via `space`, or
 * per-axis via `horizontal`/`vertical`. All padding traces to the compiled
 * spacing scale; no literal colors.
 */
function Inset({ space = 'md', horizontal, vertical, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                paddingHorizontal: tokens.spacing[horizontal ?? space],
                paddingVertical: tokens.spacing[vertical ?? space],
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Inset.js.map