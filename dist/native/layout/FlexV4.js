"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexV4 = FlexV4;
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
 * **V4 flex container (native)** — the escape hatch when `RowV4`/`ColumnV4` are
 * too opinionated, and the exact twin of the web `FlexV4`.
 *
 * ## Almost no visual change, by design
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Flex` "structure only" and notes
 * that its twins are already at exact parity. Defaults, style composition and
 * token bindings are unchanged from the base — with `shrink` left off this
 * renders the same style object `Flex` renders, and the spec asserts that
 * against the base.
 *
 * ## What V4 adds
 *
 * **`shrink`.** §5: "add `shrink?: number` to both twins to match the existing
 * `grow`". A flex container that can be told to grow but not to hold its size
 * is half a control, and the half that was missing is the one the row family
 * needs — see the prop's own note.
 *
 * `grow` and `shrink` are flex factors, which §1.1 lists among the geometric
 * bare numbers a component may carry: ratios, not measurements, with no token
 * scale they could come from. They are the caller's numbers either way.
 *
 * The caller's `style` is still applied **last**, exactly as the base does it,
 * so a caller who was already setting `flexGrow` by hand keeps winning.
 */
function FlexV4({ direction = 'row', gap, align = 'stretch', justify = 'start', wrap = false, grow, shrink, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: direction,
                alignItems: ALIGN[align],
                justifyContent: JUSTIFY[justify],
                flexWrap: wrap ? 'wrap' : 'nowrap',
                gap: gap ? tokens.spacing[gap] : undefined,
                flexGrow: grow,
                flexShrink: shrink,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=FlexV4.js.map