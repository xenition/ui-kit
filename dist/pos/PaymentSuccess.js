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
exports.PaymentSuccess = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * PaymentSuccess — the POS V4 "register" **peak-end** (web parity of the native
 * twin): the payment-complete celebration. A two-hue celebratory gradient
 * (`from-accent-400 to-primary-600`) carries a big frosted ✓ glyph, the headline,
 * and the **big near-white amount** (integer cents via `formatMoney`). The tender
 * `method` and any cash `changeDueCents` read as frosted glass tiles
 * (`bg-primary-50/15 border-primary-50/30`); "Print receipt" / "Email receipt"
 * and "New sale" appear only when their handler is set. Every color derives from
 * the brand ramp via `--xen-*` classes + gradient utilities — no literals, light
 * + dark safe.
 */
exports.PaymentSuccess = React.forwardRef(function PaymentSuccess({ amountCents, currency = 'USD', method, changeDueCents, title = 'Payment complete', onReceipt, onEmailReceipt, onNewSale, className, ...rest }, ref) {
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const change = Math.max(0, Math.trunc(changeDueCents || 0));
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-extrabold text-primary-50", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-payment-success": "", className: (0, cn_1.cn)('flex flex-col items-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": title, className: "flex h-16 w-16 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/20", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "2xl", className: "text-primary-50" }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-md)] text-center text-xl font-extrabold text-primary-50", children: title }), (0, jsx_runtime_1.jsx)("p", { "aria-label": `Charged ${(0, internal_1.formatMoney)(amount, currency)}`, className: "mt-[var(--xen-space-xs)] text-4xl font-extrabold tabular-nums tracking-tight text-primary-50", children: (0, internal_1.formatMoney)(amount, currency) }), method || change > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex w-full gap-[var(--xen-space-sm)]", children: [method ? (0, jsx_runtime_1.jsx)(Tile, { label: "Method", value: method }) : null, change > 0 ? (0, jsx_runtime_1.jsx)(Tile, { label: "Change due", value: (0, internal_1.formatMoney)(change, currency) }) : null] })) : null, onReceipt || onEmailReceipt || onNewSale ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex w-full flex-col gap-[var(--xen-space-sm)]", children: [onReceipt ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Print receipt", onClick: onReceipt, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Print receipt" })) : null, onEmailReceipt ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Email receipt", onClick: onEmailReceipt, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Email receipt" })) : null, onNewSale ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "New sale", onClick: onNewSale, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] py-[var(--xen-space-md)] text-base font-bold text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "New sale" })) : null] })) : null] }));
});
//# sourceMappingURL=PaymentSuccess.js.map