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
exports.CartLineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * CartLine — **V4** "register" design (web parity of the native V4). The tactile
 * checkout take on a ticket line: product name + modifiers on the left, a **big
 * bold line total** in `tabular-nums` on the right (the number a busy counter
 * scans), and a chunky ≥44px −/+ qty stepper with a satisfying press. A `voided`
 * line strikes through and mutes (state by text + style, never color alone). One
 * accent = **primary**; money is integer **cents** via `formatMoney`. Same
 * props/behavior as {@link CartLineProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.CartLineV4 = React.forwardRef(function CartLineV4({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, variant = 'default', testID, onClick, onKeyDown, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const gross = (0, internal_1.safeCents)(unitPriceCents) * quantity;
    const discount = Math.min((0, internal_1.safeCents)(discountCents), gross);
    const lineTotal = gross - discount;
    const interactive = typeof onClick === 'function';
    const nameColor = voided ? 'text-muted' : 'text-on-surface';
    const atMin = quantity <= min;
    const atMax = typeof max === 'number' && quantity >= max;
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };
    const stepBtn = 'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface text-lg font-bold text-on-surface transition-all ' +
        'hover:bg-primary-50 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ' +
        'disabled:pointer-events-none disabled:opacity-40';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-line": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, ${quantity} for ${(0, internal_1.formatMoney)(lineTotal, currency)}` : undefined, onClick: onClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]', compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]', voided ? 'opacity-60' : '', interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-bold', nameColor, voided ? 'line-through' : ''), children: name }), !compact && modifiers && modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: modifiers.join(' · ') })) : null, !compact && note ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs italic text-muted", children: ["\u201C", note, "\u201D"] })) : null, onQuantityChange && !voided ? ((0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-label": `Quantity for ${name}`, className: "mt-[var(--xen-space-xs)] inline-flex w-fit items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Decrease quantity", disabled: atMin, onClick: (e) => {
                                    e.stopPropagation();
                                    onQuantityChange(quantity - 1);
                                }, className: stepBtn, children: "\u2212" }), (0, jsx_runtime_1.jsx)("span", { "aria-live": "polite", className: "min-w-[2ch] text-center text-base font-bold tabular-nums text-on-surface", children: quantity }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Increase quantity", disabled: atMax, onClick: (e) => {
                                    e.stopPropagation();
                                    onQuantityChange(quantity + 1);
                                }, className: stepBtn, children: "+" })] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [quantity, " \u00D7 ", (0, internal_1.formatMoney)(unitPriceCents, currency)] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-extrabold tabular-nums', nameColor, voided ? 'line-through' : ''), children: (0, internal_1.formatMoney)(lineTotal, currency) }), discount > 0 && !voided ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-bold text-success", children: ["\u2212", (0, internal_1.formatMoney)(discount, currency)] })) : null, onVoid ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": voidLabel ?? `Void ${name}`, onClick: (e) => {
                            e.stopPropagation();
                            onVoid();
                        }, className: "text-xs font-bold text-danger underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger", children: voided ? 'Voided' : 'Void' })) : null] })] }));
});
//# sourceMappingURL=CartLineV4.js.map