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
exports.PremiumSummaryV2 = void 0;
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
 * PremiumSummary, redesigned (**V2**) — an **elevated receipt**. Line items are
 * laid out ledger-style with a hairline rule under each row (discounts as
 * `text-success` credits with a leading `−`), then a full-width highlighted
 * **total band** — a tinted footer that makes the amount due the anchor. The
 * total defaults to the sum of `items`, so it always reconciles with the lines.
 * Same `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
exports.PremiumSummaryV2 = React.forwardRef(function PremiumSummaryV2({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, className, ...rest }, ref) {
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce((sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0), 0);
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "elevated", padding: "none", radius: "md", className: (0, cn_1.cn)('overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading premium", className: "p-[var(--xen-space-lg)]", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('mb-[var(--xen-space-sm)] h-4 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100 motion-reduce:animate-none', i === 2 ? 'w-1/2' : 'w-full') }, i))) }), (0, jsx_runtime_1.jsx)("div", { className: "h-14 bg-primary/10" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "elevated", padding: "none", radius: "md", className: (0, cn_1.cn)('overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "px-[var(--xen-space-lg)] pt-[var(--xen-space-lg)]", children: rows.map((it, i) => {
                    const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
                    const isCredit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-muted", children: it.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', isCredit ? 'text-success' : 'text-on-surface'), children: [isCredit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${it.label}-${i}`));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-md)] bg-primary/10 px-[var(--xen-space-lg)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-on-surface", children: "Total due" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`, className: "text-2xl font-extrabold text-primary", children: format(total, currency) })] })] }));
});
//# sourceMappingURL=PremiumSummaryV2.js.map