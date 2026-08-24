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
exports.ModifierList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * A selectable list of dish modifiers / add-ons. `mode` picks the semantics:
 * `single` behaves like a radio group (each cell `role="radio"`), `multi` like
 * checkboxes (`role="checkbox"`). Each option is a real `<button>` (keyboard
 * native) carrying `aria-checked` so selected state is not signalled by color
 * alone; a token-drawn check/dot glyph is also shown. Renders an empty row when
 * there are no options. Web parity of the native `ModifierList`; token-only.
 */
exports.ModifierList = React.forwardRef(function ModifierList({ options, mode = 'multi', title, required = false, onToggle, currency = 'USD', emptyLabel = 'No options', formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    const single = mode === 'single';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-heading text-base font-semibold text-on-surface", children: title }), required ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-danger", children: "Required" }) : null] })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { role: single ? 'radiogroup' : 'group', "aria-label": title, className: "overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface", children: options.map((option, index) => {
                    const selected = option.selected === true;
                    const hasDelta = typeof option.priceCents === 'number' && option.priceCents !== 0;
                    const cents = option.priceCents ?? 0;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: single ? 'radio' : 'checkbox', "aria-checked": selected, "aria-label": option.label, disabled: option.disabled, onClick: () => onToggle?.(option.id), className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left transition-colors', index > 0 && 'border-t border-border', 'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300', option.disabled && 'pointer-events-none opacity-50'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center border-2 text-xs font-bold leading-none', single ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]', selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface'), children: selected ? (single ? '●' : '✓') : '' }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-on-surface", children: option.label }), hasDelta ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted tabular-nums", children: [cents > 0 ? '+' : '−', formatMoney(Math.abs(cents), currency)] })) : null] }, option.id));
                }) }))] }));
});
//# sourceMappingURL=ModifierList.js.map