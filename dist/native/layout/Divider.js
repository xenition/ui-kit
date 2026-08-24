"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = Divider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A one-pixel rule in the theme `border` color, horizontal or vertical, with an
 * optional token-bound `inset`. Color and inset trace to the compiled theme; no
 * literal colors. Exposed to assistive tech with the `separator` role.
 */
function Divider({ orientation = 'horizontal', inset, style, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const insetPx = inset ? tokens.spacing[inset] : 0;
    const base = orientation === 'horizontal'
        ? { height: 1, alignSelf: 'stretch', marginHorizontal: insetPx }
        : { width: 1, alignSelf: 'stretch', marginVertical: insetPx };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessible: false, style: [{ backgroundColor: colors.border }, base, style], ...rest }));
}
//# sourceMappingURL=Divider.js.map