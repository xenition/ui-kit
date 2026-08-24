"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AspectRatio = AspectRatio;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Locks its content to a fixed width-to-height `ratio` via RN's `aspectRatio`
 * style. When `rounded`, it clips to the theme's large corner radius token; the
 * `ratio` itself is a numeric layout literal. No literal colors.
 */
function AspectRatio({ ratio, rounded = false, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: '100%',
                aspectRatio: ratio,
                overflow: 'hidden',
                borderRadius: rounded ? tokens.radius.lg : undefined,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=AspectRatio.js.map