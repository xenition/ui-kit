"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flex = Flex;
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
 * General-purpose flex container exposing `direction`/`align`/`justify`/`wrap`
 * plus a token-bound `gap` — the escape hatch when `Row`/`Column` are too
 * opinionated. Gap traces to the compiled spacing scale; no literal colors.
 */
function Flex({ direction = 'row', gap, align = 'stretch', justify = 'start', wrap = false, grow, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: direction,
                alignItems: ALIGN[align],
                justifyContent: JUSTIFY[justify],
                flexWrap: wrap ? 'wrap' : 'nowrap',
                gap: gap ? tokens.spacing[gap] : undefined,
                flexGrow: grow,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=Flex.js.map