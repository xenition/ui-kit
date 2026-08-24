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
exports.CartLineV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const QuantityStepper_1 = require("../commerce/QuantityStepper");
const internal_1 = require("./internal");
/**
 * CartLine, redesigned (v3): a **dense ticket line**. A leading `N×` quantity, the
 * name inline, and the line total pinned right, with a stepper only when editable
 * and a small void ×. Hairline-bordered for a tight running ticket. The opposite
 * of v2's card. Same props, token-only.
 */
exports.CartLineV3 = React.forwardRef(function CartLineV3({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, variant, testID, className, ...rest }, ref) {
    void variant;
    void note;
    const total = (0, internal_1.safeCents)(unitPriceCents) * quantity - (0, internal_1.safeCents)(discountCents);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-line": "", "data-testid": testID, className: (0, cn_1.cn)('flex items-center gap-2 border-b border-border py-2', voided && 'opacity-60', className), ...rest, children: [!voided && onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange })) : ((0, jsx_runtime_1.jsxs)("span", { className: "w-8 shrink-0 text-sm font-semibold tabular-nums text-muted", children: [quantity, "\u00D7"] })), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm text-on-surface', voided && 'line-through'), children: name }), modifiers && modifiers.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: modifiers.join(', ') }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-surface', voided && 'line-through'), children: (0, internal_1.formatMoney)(total, currency) }), onVoid ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": voidLabel ?? `Void ${name}`, onClick: onVoid, className: "text-base text-muted hover:text-danger", children: "\u00D7" })) : null] }));
});
//# sourceMappingURL=CartLineV3.js.map