"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = Row;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ALIGN = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
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
 * Horizontal flex row with a token-bound `gap` plus `align`/`justify`/`wrap`
 * controls — the native mirror of the web horizontal stack. Gap traces to the
 * compiled spacing scale; no literal colors.
 */
function Row({ gap, align = 'center', justify = 'start', wrap = false, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: ALIGN[align],
                justifyContent: JUSTIFY[justify],
                flexWrap: wrap ? 'wrap' : 'nowrap',
                gap: gap ? tokens.spacing[gap] : undefined,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Row.js.map