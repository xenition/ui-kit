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
exports.CartLineV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const QuantityStepper_1 = require("../commerce/QuantityStepper");
const internal_1 = require("./internal");
/**
 * CartLine, redesigned (v2): an **elevated ticket card**. The quantity stepper
 * leads on the left, the name + modifier chips + note fill the middle, and the
 * line total (with a struck discount) anchors the right — a chunky order-ticket
 * row. Voided lines strike through. Distinct from v1. Same props, token-only.
 */
exports.CartLineV2 = React.forwardRef(function CartLineV2({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, variant, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const gross = (0, internal_1.safeCents)(unitPriceCents) * quantity;
    const total = gross - (0, internal_1.safeCents)(discountCents);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-line": "", "data-testid": testID, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', voided && 'opacity-60', className), ...rest, children: [!voided && onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-sm font-bold text-on-surface", children: quantity })), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-surface', voided && 'line-through'), children: name }), !compact && modifiers && modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-0.5 flex flex-wrap gap-1", children: modifiers.map((m, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-1.5 py-0.5 text-xs text-muted", children: m }, i))) })) : null, !compact && note ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs italic text-muted", children: note }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-bold text-on-surface', voided && 'line-through'), children: (0, internal_1.formatMoney)(total, currency) }), (0, internal_1.safeCents)(discountCents) > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted line-through", children: (0, internal_1.formatMoney)(gross, currency) }) : null] }), onVoid ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": voidLabel ?? `Void ${name}`, onClick: onVoid, className: "text-lg text-muted hover:text-danger", children: "\u00D7" })) : null] }));
});
//# sourceMappingURL=CartLineV2.js.map