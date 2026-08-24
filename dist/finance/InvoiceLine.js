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
exports.InvoiceLine = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const MoneyAmount_1 = require("./MoneyAmount");
/**
 * One invoice / receipt line: a description with a `qty × unit` sub-line and a
 * right-aligned line total. The total defaults to `unitPriceCents * quantity`
 * (integer cents — exact), rendered neutral-toned through {@link MoneyAmount}.
 * `emphasized` styles it as the grand-total row. Token-bound throughout. Web
 * parity of the native `InvoiceLine`.
 */
exports.InvoiceLine = React.forwardRef(function InvoiceLine({ description, unitPriceCents, quantity = 1, currency = 'USD', amountCents, emphasized = false, className, ...rest }, ref) {
    const qty = Number.isFinite(quantity) ? quantity : 1;
    const total = typeof amountCents === 'number' ? amountCents : Math.trunc(unitPriceCents) * qty;
    const showBreakdown = !emphasized && qty !== 1;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm text-on-surface', emphasized ? 'font-bold' : 'font-medium'), children: description }), showBreakdown ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [qty, " \u00D7 ", (0, money_1.formatMoney)(Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0, currency)] })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: total, currency: currency, tone: "neutral", size: emphasized ? 'md' : 'sm', className: emphasized ? 'font-bold' : undefined })] }));
});
//# sourceMappingURL=InvoiceLine.js.map