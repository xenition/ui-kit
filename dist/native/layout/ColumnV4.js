"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnV4 = ColumnV4;
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
 * **V4 column (native)** — the vertical stack, on the V4 design line, and the
 * exact twin of the web `ColumnV4`.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Column` "structure only": every gap
 * already comes off `tokens.spacing`, and there is no colour, radius or font
 * size in the file to launder. This renders the same style object the base
 * renders, and the spec asserts that against the base. It ships so the V4 line
 * is complete — a V4 composite composes V4 children (§1.4), and the vertical
 * stack is the skeleton under most of them.
 *
 * ## What it does settle
 *
 * **The `align` type, on both twins.** §5 records native `Column` as accepting
 * the full `Align` while web narrows it; on the source as it now stands the
 * native base already narrows it too, so the fix is to *hold* that agreement
 * rather than make it. Both twins take `Exclude<Align, 'baseline'>` — a column
 * has no shared baseline for its children to sit on — and both take it by
 * importing the base's props rather than restating the union.
 *
 * **`gap` keeps its undefined default** — §4.1's rhythm is the caller's to
 * spend, and a default here would outrank it everywhere at once.
 *
 * The caller's `style` is still applied **last**, exactly as the base does it.
 */
function ColumnV4({ gap, align = 'stretch', justify = 'start', style, children, ...rest }) {
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
//# sourceMappingURL=ColumnV4.js.map