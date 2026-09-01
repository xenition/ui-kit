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
exports.CartBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
/** "1 items" is the tell that a count was interpolated and never read. */
function defaultCount(count) {
    return count === 1 ? '1 item' : `${count} items`;
}
/**
 * **V4 cart bar** — the web twin of the native `CartBarV4`, same props as
 * {@link CartBar} plus `updatingLabel` and `formatItemCount`.
 *
 * ## Five changes
 *
 * 1. **The bar is a real button.** It was a `div` with `role="button"`,
 *    `tabIndex` and a hand-written Enter/Space handler — three approximations
 *    of what a `<button>` already does, and the one that has to be re-derived
 *    on every card in this module.
 * 2. **The count pill stops using an ink slot as a fill.** It painted
 *    `bg-on-primary text-primary`: `on-primary` is the ink *guaranteed against*
 *    `primary`, not a surface, and nothing promises `primary` is readable on
 *    it. The pill is now a hairline ring in the bar's own ink, which needs no
 *    second guarantee at all.
 * 3. **`formatItemCount` fixes "1 items".**
 * 4. **`updatingLabel` is a prop**, where "Updating…" was an English string
 *    compiled into the component.
 * 5. **Disabled and hover stop fighting.** `opacity-60` and
 *    `hover:opacity-90` shared a node, so an empty or updating bar got
 *    *brighter* under the pointer. Press is the M3 state layer over the bar's
 *    own fill; unavailable is the 0.38 band and a real `disabled`.
 */
exports.CartBarV4 = React.forwardRef(function CartBarV4({ itemCount, totalCents, currency = 'USD', label = 'View cart', onClick, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', updatingLabel = 'Updating…', formatItemCount = defaultCount, formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const empty = itemCount <= 0;
    if (empty) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-card px-lg py-md text-center text-sm text-muted-text', className), ...rest, children: emptyLabel }));
    }
    const accent = variant === 'accent';
    const totalText = formatMoney(totalCents, currency);
    const countText = formatItemCount(itemCount);
    const action = loading ? updatingLabel : label;
    const barClass = (0, cn_1.cn)('flex w-full items-center justify-between gap-md px-lg py-md text-left', chrome_v4_1.MIN_TAP_CLASS, 'rounded-[var(--xen-radius-lg)]', accent ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary');
    const barState = (0, v4_state_1.stateGroundVars)(accent ? 'var(--xen-accent)' : 'var(--xen-primary)', accent ? 'var(--xen-on-accent)' : 'var(--xen-on-primary)');
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)(
                        // A ring in the bar's own ink — never `on-primary` as a fill.
                        'inline-flex h-lg min-w-lg items-center justify-center rounded-full border border-current px-xs text-xs font-bold', menu_v4_1.TABULAR_CLASS), children: itemCount }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: countText }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold", children: action })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-base font-bold', menu_v4_1.TABULAR_CLASS), children: totalText })] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex', className), ...rest, children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", 
            // Rule E: `loading` means the handler does not fire, rather than
            // `aria-disabled` alongside a live `onClick`.
            disabled: loading, "aria-busy": loading || undefined, "aria-label": (0, menu_v4_1.spokenLine)([action, countText, totalText]), onClick: onClick, "data-xen-v4-state": "", style: barState, className: (0, cn_1.cn)(barClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: content })) : (
        // No name of its own: with the count spelled out beside the pill the
        // bar's own text already reads as one line, and a label here would
        // announce the same words twice.
        (0, jsx_runtime_1.jsx)("div", { "aria-busy": loading || undefined, className: barClass, children: content })) }));
});
//# sourceMappingURL=CartBarV4.js.map