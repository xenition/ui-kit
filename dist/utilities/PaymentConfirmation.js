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
exports.PaymentConfirmation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * The payment success surface (web parity) — the module's peak moment and the
 * one full brand-gradient ground beyond the account header. A frosted check
 * badge, the headline, and the paid amount (integer cents via `formatMoney`)
 * sit centered in near-white ink over the gradient; the confirmation #, method,
 * and date read as frosted rows (`bg-primary-500`). "Done" (a near-white
 * `bg-on-primary text-primary` pill) and "View receipt" (a ghost button) each
 * appear only when their handler is set. Every color derives from the brand
 * ramp — token-only, no literals.
 */
exports.PaymentConfirmation = React.forwardRef(function PaymentConfirmation({ amountCents, currency = 'USD', confirmationNumber, method, date, formatMoney: format = format_1.formatMoney, title = 'Payment successful', onDone, onViewReceipt, className, ...rest }, ref) {
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const Row = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-shrink truncate text-right text-sm font-bold text-on-primary", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": title, className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary-500", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-md)] text-center text-xl font-extrabold text-on-primary", children: title }), (0, jsx_runtime_1.jsx)("p", { "aria-label": `Paid ${format(amount, currency)}`, className: "mt-[var(--xen-space-xs)] text-3xl font-extrabold tracking-tight text-on-primary", children: format(amount, currency) }), confirmationNumber || method || date ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]", children: [confirmationNumber ? (0, jsx_runtime_1.jsx)(Row, { label: "Confirmation", value: confirmationNumber }) : null, method ? (0, jsx_runtime_1.jsx)(Row, { label: "Method", value: method }) : null, date ? (0, jsx_runtime_1.jsx)(Row, { label: "Date", value: date }) : null] })) : null, onDone || onViewReceipt ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]", children: [onDone ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Done", onClick: onDone, className: "flex w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Done" })) : null, onViewReceipt ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "View receipt", onClick: onViewReceipt, className: "flex w-full items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-300 py-[var(--xen-space-md)] text-base font-bold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "View receipt" })) : null] })) : null] }));
});
//# sourceMappingURL=PaymentConfirmation.js.map