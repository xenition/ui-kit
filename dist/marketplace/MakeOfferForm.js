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
exports.MakeOfferForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/** Parse a currency string ("1,250.50") into integer cents, or null. */
function parseCents(raw) {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    if (cleaned === '' || cleaned === '.')
        return null;
    const value = Number.parseFloat(cleaned);
    if (!Number.isFinite(value) || value <= 0)
        return null;
    return Math.round(value * 100);
}
/**
 * A make-an-offer form for a listing — an amount field (major units, parsed to
 * integer cents), an optional message, and a submit action. Self-contained
 * validation: empty/invalid amounts and amounts below `minOfferCents` disable
 * submit and surface an inline, token-styled error (state carried by text, not
 * color alone). Presentational: nothing is sent; a valid submit calls
 * `onSubmit(offerCents, message?)`. Reuses `Input`, `Button`, and the shared
 * `formatMoney`; token-only colors.
 */
exports.MakeOfferForm = React.forwardRef(function MakeOfferForm({ listPriceCents, currency = 'USD', minOfferCents, withMessage = false, submitLabel = 'Send offer', loading = false, onSubmit, testId = 'xen-mkt-offer-amount', className, ...rest }, ref) {
    const [amount, setAmount] = React.useState('');
    const [message, setMessage] = React.useState('');
    const cents = parseCents(amount);
    const belowMin = cents != null && typeof minOfferCents === 'number' && cents < minOfferCents;
    const valid = cents != null && !belowMin;
    const error = amount.length > 0 && cents == null
        ? 'Enter a valid amount'
        : belowMin && typeof minOfferCents === 'number'
            ? `Offer must be at least ${(0, commerce_1.formatMoney)(minOfferCents, currency)}`
            : undefined;
    const submit = () => {
        if (!valid || loading || cents == null)
            return;
        onSubmit?.(cents, withMessage && message.trim() ? message.trim() : undefined);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [typeof listPriceCents === 'number' ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: `Asking ${(0, commerce_1.formatMoney)(listPriceCents, currency)}` })) : null, (0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-on-surface", children: "Your offer" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { "data-testid": testId, inputMode: "decimal", placeholder: "0.00", value: amount, onChange: (e) => setAmount(e.target.value), invalid: error != null, "aria-label": "Offer amount" })] }), withMessage ? ((0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-on-surface", children: "Message (optional)" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { "data-testid": "xen-mkt-offer-message", placeholder: "Add a note to the seller", value: message, onChange: (e) => setMessage(e.target.value) })] })) : null, error ? ((0, jsx_runtime_1.jsx)("p", { role: "alert", className: "text-sm text-danger", children: error })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: submit, disabled: !valid || loading, children: loading ? 'Sending…' : submitLabel })] }));
});
//# sourceMappingURL=MakeOfferForm.js.map