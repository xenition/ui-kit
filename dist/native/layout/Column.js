"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = Column;
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
    evenly: 'space-evenly',
};
/**
 * Vertical flex column with a token-bound `gap` plus `align`/`justify`
 * controls — the native mirror of the web vertical stack. Gap traces to the
 * compiled spacing scale; no literal colors.
 */
function Column({ gap, align = 'stretch', justify = 'start', style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'column',
                alignItems: ALIGN[align],
                justifyContent: JUSTIFY[justify],
                gap: gap ? tokens.spacing[gap] : undefined,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Column.js.map