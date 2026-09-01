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
exports.ModifierListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 modifier list** — the web twin of the native `ModifierListV4`, same
 * props as {@link ModifierList} plus `requiredLabel`.
 *
 * ## Five changes
 *
 * 1. **A paid extra is no longer added in silence.** `role="checkbox"` and
 *    `role="radio"` are children-presentational exactly as `role="button"` is,
 *    and the option's `aria-label` was the bare label — so the `+$1.50` beside
 *    "Extra cheese" was rendered, was correct, and was pruned. The delta now
 *    goes into the name through `spokenLine`, which is the difference between
 *    knowing what an order will cost and finding out at checkout.
 * 2. **`required` reaches assistive tech.** It was a red word next to the
 *    heading and nothing more; it now joins the group's own name and sets
 *    `aria-required` on the radio group.
 * 3. **Rows clear 44.** They were about 38px — a control whose entire job is
 *    to be tapped, under the HIG floor.
 * 4. **A disabled option is disabled, and does not brighten under the
 *    pointer.** `opacity-50` is not a scale step; M3 disables content at 0.38,
 *    and `V4_DISABLED_CLASS` is where that number lives.
 * 5. **Press is a state layer and focus is the `ring` token.**
 *    `hover:bg-neutral-100` is a light-oriented ramp step that paints a
 *    near-white slab across a dark sheet, and `ring-primary-300` is a ramp
 *    step where the preset ships a `ring` colour corrected against the page.
 */
exports.ModifierListV4 = React.forwardRef(function ModifierListV4({ options, mode = 'multi', title, required = false, requiredLabel = 'Required', onToggle, currency = 'USD', emptyLabel = 'No options', formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const single = mode === 'single';
    // The group's name says it is required, because the visible word beside
    // the heading is not attached to the group in any way a reader can follow.
    const groupLabel = (0, menu_v4_1.spokenLine)([title, required ? requiredLabel : undefined]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-heading text-base font-semibold text-on-surface", children: title }), required ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-semibold text-danger-text", children: requiredLabel })) : null] })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { role: "status", className: "text-sm text-muted-text", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { role: single ? 'radiogroup' : 'group', "aria-label": groupLabel !== '' ? groupLabel : undefined, "aria-required": single && required ? true : undefined, className: "overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-card text-on-card", children: options.map((option, index) => {
                    const selected = option.selected === true;
                    const cents = option.priceCents ?? 0;
                    const hasDelta = typeof option.priceCents === 'number' && option.priceCents !== 0;
                    const deltaText = hasDelta
                        ? `${cents > 0 ? '+' : '−'}${formatMoney(Math.abs(cents), currency)}`
                        : undefined;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: single ? 'radio' : 'checkbox', "aria-checked": selected, "aria-label": (0, menu_v4_1.spokenLine)([option.label, deltaText]), disabled: option.disabled, onClick: () => onToggle?.(option.id), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex w-full items-center gap-sm px-md py-sm text-left', chrome_v4_1.MIN_TAP_CLASS, index > 0 && 'border-t border-border', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-lg w-lg shrink-0 items-center justify-center border-2 text-xs font-bold leading-none', single ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]', selected
                                    ? 'border-primary bg-primary text-on-primary'
                                    : 'border-border bg-card'), children: selected ? (single ? '●' : '✓') : '' }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-on-card", children: option.label }), deltaText ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted-text', menu_v4_1.TABULAR_CLASS), children: deltaText })) : null] }, option.id));
                }) }))] }));
});
//# sourceMappingURL=ModifierListV4.js.map