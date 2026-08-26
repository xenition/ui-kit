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
exports.ButtonGroupV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * **V4 button group** — the web twin of the native `ButtonGroupV4`, same props
 * as {@link ButtonGroup}, a different design line. Still purely structural: it
 * adds one colour, the `border` hairline, and lets every child keep its own.
 *
 * 1. **One row, one height.** Nothing made the cells the same height, so a
 *    group mixing an `sm` and an `md` button had a ragged bottom edge inside a
 *    single border, and the divider between them stopped short. `items-stretch`
 *    makes the seam full-bleed and the row square.
 * 2. **A joined control is still a row of tap targets.** Fusing buttons into
 *    one shape is a visual decision; it does not shrink a finger. The row keeps
 *    a 44px floor.
 * 3. **The two twins agree on what this is.** Native claimed
 *    `accessibilityRole="toolbar"` — a role that promises arrow-key navigation
 *    this component does not provide — while the web said `group`. `group` is
 *    the honest one, and it stays.
 *
 * The children keep `[&>*]:rounded-none`, which is what actually closes the
 * seams; the container's `overflow-hidden` only ever clipped its own corners,
 * and the native twin had been relying on it to do more.
 *
 * No fill, no gradient, no shadow. A segmented control groups by adjacency and
 * a hairline (§9, §11); the buttons inside it are what carry colour.
 */
exports.ButtonGroupV4 = React.forwardRef(function ButtonGroupV4({ children, fill = false, className, ...rest }, ref) {
    const items = React.Children.toArray(children).filter(React.isValidElement);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", "data-xen-v4-button-group": "", className: (0, cn_1.cn)('inline-flex items-stretch overflow-hidden', 'min-h-[44px] rounded-[var(--xen-radius-md)] border border-border', fill && 'flex w-full', className), ...rest, children: items.map((child, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "w-px self-stretch bg-border" }) : null, (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-stretch [&>*]:rounded-none', fill && 'flex-1 [&>*]:w-full'), children: child })] }, i))) }));
});
//# sourceMappingURL=ButtonGroupV4.js.map