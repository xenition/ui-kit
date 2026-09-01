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
exports.CheckoutSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * CheckoutSummary — **V4** "register" design. The tactile close-of-sale panel:
 * a compact **breakdown list** (subtotal, optional discount/tax/tip) in calm
 * `tabular-nums`, a hairline, then the **grand total big and bold** — the
 * number the counter is built around. A full-width primary **Charge** button
 * (≥44px) repeats the total so the tap target reads the amount. Money is
 * integer **cents** throughout via `formatMoney`; all colors come from
 * `--xen-*` token classes (no literals), dark-mode safe.
 */
exports.CheckoutSummary = React.forwardRef(function CheckoutSummary({ subtotalCents, taxCents, discountCents, tipCents, totalCents, currency = 'USD', itemCount, onCharge, chargeLabel, charging = false, testID, className, ...rest }, ref) {
    const rows = [
        { key: 'subtotal', label: 'Subtotal', amountCents: subtotalCents, muted: true },
    ];
    if (typeof discountCents === 'number' && discountCents > 0) {
        rows.push({ key: 'discount', label: 'Discount', amountCents: discountCents, negative: true, muted: true });
    }
    if (typeof taxCents === 'number') {
        rows.push({ key: 'tax', label: 'Tax', amountCents: taxCents, muted: true });
    }
    if (typeof tipCents === 'number' && tipCents > 0) {
        rows.push({ key: 'tip', label: 'Tip', amountCents: tipCents, muted: true });
    }
    const formattedTotal = (0, internal_1.formatMoney)(totalCents, currency);
    const label = chargeLabel ? chargeLabel(formattedTotal) : `Charge ${formattedTotal}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-checkout-summary": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]', 'border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-[var(--xen-space-xs)]", "aria-label": "Order breakdown", children: rows.map((row) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: row.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm tabular-nums', row.negative ? 'text-success' : 'text-on-surface'), children: [row.negative ? '−' : '', (0, internal_1.formatMoney)(row.amountCents, currency)] })] }, row.key))) }), (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold uppercase tracking-wide text-on-surface", children: "Total" }), typeof itemCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-medium text-muted", children: [itemCount, " item", itemCount === 1 ? '' : 's'] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold tabular-nums text-on-surface", children: formattedTotal })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onClick: onCharge, disabled: charging, "aria-label": label, className: "min-h-[44px] w-full text-base font-extrabold tabular-nums", children: charging ? 'Charging…' : label })] }));
});
//# sourceMappingURL=CheckoutSummary.js.map