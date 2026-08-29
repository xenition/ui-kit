"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowV4 = RowV4;
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
 * **V4 row (native)** — the horizontal stack, on the V4 design line, and the
 * exact twin of the web `RowV4`.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Row` "structure only": every gap
 * already comes off `tokens.spacing`, and there is not a colour, radius or font
 * size in the file to launder. So this renders the same style object the base
 * renders, and the spec asserts that against the base rather than trusting the
 * claim. It exists so the V4 line is complete — a V4 composite composes V4
 * children (§1.4).
 *
 * ## What it does settle
 *
 * **The `align` type.** §5 asks the twins' align vocabularies to agree.
 * `baseline` *is* meaningful on a row — it is how a title and a trailing
 * timestamp sit on one optical line — so both twins take the full `Align`, and
 * both take it from `RowProps` so they cannot drift. (`Column` is the
 * mirror-image decision: `baseline` is meaningless there, so both twins narrow
 * it away.)
 *
 * **`gap` stays optional with no default.** §4.1 owns the spacing rhythm and it
 * is the caller's to spend; a default here would quietly outrank it everywhere.
 *
 * The caller's `style` is still applied **last**, exactly as the base does it.
 */
function RowV4({ gap, align = 'center', justify = 'start', wrap = false, style, children, ...rest }) {
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
//# sourceMappingURL=RowV4.js.map