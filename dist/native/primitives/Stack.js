"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = Stack;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ALIGN = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
};
const JUSTIFY = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
};
/**
 * Flexbox layout helper — the native mirror of the web `Stack` (`direction`,
 * `gap`, `align`), with an additive `justify`. Gap comes from the theme
 * spacing scale (RN `gap` is supported on modern React Native).
 */
function Stack({ direction = 'column', gap = 'md', align = 'stretch', justify, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: direction,
                gap: tokens.spacing[gap],
                alignItems: ALIGN[align],
                ...(justify ? { justifyContent: JUSTIFY[justify] } : null),
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Stack.js.map