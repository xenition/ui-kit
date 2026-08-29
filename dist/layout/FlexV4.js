"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
const DIRECTION_CLASSES = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
};
/**
 * **V4 flex container** — the escape hatch when `RowV4`/`ColumnV4` are too
 * opinionated, on the V4 design line.
 *
 * ## Almost no visual change, by design
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Flex` "structure only" and notes
 * that its twins are already at exact parity. Defaults, class composition and
 * token bindings are unchanged from the base — with `shrink` left off, this
 * renders byte-for-byte what `Flex` renders, and the spec asserts that against
 * the base.
 *
 * ## What V4 adds
 *
 * **`shrink`.** §5: "add `shrink?: number` to both twins to match the existing
 * `grow`". A flex container that can be told to grow but not to hold its size
 * is half a control, and the half that was missing is the one the row family
 * needs — see the prop's own note.
 *
 * `grow` and `shrink` are flex factors, which §1.1 lists among the geometric
 * bare numbers a component may carry: they are ratios, not measurements, and
 * there is no token scale they could come from. They are the caller's numbers
 * either way.
 *
 * The caller's `style` is still merged **last**, exactly as the base does it,
 * so a caller who was already overriding `flexGrow` by hand keeps winning.
 *
 * The `data-xen-v4-flex` marker carries no styling; it is the house handle for
 * finding a V4 flex container in the tree.
 */
exports.FlexV4 = React.forwardRef(function FlexV4({ direction = 'row', gap, align = 'stretch', justify = 'start', wrap = false, grow, shrink, className, style, ...rest }, ref) {
    const flexStyle = grow !== undefined || shrink !== undefined
        ? {
            ...(grow !== undefined ? { flexGrow: grow } : null),
            ...(shrink !== undefined ? { flexShrink: shrink } : null),
            ...style,
        }
        : style;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-flex": "", className: (0, cn_1.cn)('flex', DIRECTION_CLASSES[direction], wrap ? 'flex-wrap' : 'flex-nowrap', _tokens_1.ALIGN_CLASSES[align], _tokens_1.JUSTIFY_CLASSES[justify], gap ? _tokens_1.SPACE_GAP[gap] : undefined, className), style: flexStyle, ...rest }));
});
//# sourceMappingURL=FlexV4.js.map