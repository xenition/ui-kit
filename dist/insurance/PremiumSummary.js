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
exports.PremiumSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const format_1 = require("./internal/format");
const CADENCE_LABEL = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annual: 'per year',
};
/**
 * An itemized premium breakdown card: labelled lines (discounts shown as
 * `text-success` credits with a leading `−`) summing to a bold total. The total
 * defaults to the sum of `items` so it can never disagree with the lines. All
 * amounts are integer cents via `formatMoney` (two decimals, no drift), and
 * every color traces to a semantic token slot. Supports a `loading` state. Web
 * parity of the native `PremiumSummary`.
 */
exports.PremiumSummary = React.forwardRef(function PremiumSummary({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, className, ...rest }, ref) {
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce((sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0), 0);
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading premium", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('mb-[var(--xen-space-sm)] h-4 rounded-[var(--xen-radius-sm)] bg-border', i === 2 ? 'w-1/2' : 'w-full') }, i))) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: rows.map((it, i) => {
                    const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
                    const isCredit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-muted", children: it.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', isCredit ? 'text-success' : 'text-on-surface'), children: [isCredit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${it.label}-${i}`));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-baseline justify-between border-t border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`, className: "text-2xl font-bold text-primary", children: format(total, currency) })] })] }));
});
//# sourceMappingURL=PremiumSummary.js.map