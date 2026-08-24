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
exports.PremiumSummaryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
const CADENCE_LABEL = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annual: 'per year',
};
/**
 * PremiumSummary, redesigned (**V3**) — **total-first and chrome-free**. The
 * amount due leads at the top in large type with its cadence; the itemized lines
 * follow as quiet secondary rows (discounts as `text-success` credits). The
 * total still defaults to the sum of `items`, so the headline can never disagree
 * with the breakdown. No card border — separation is spacing. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
exports.PremiumSummaryV3 = React.forwardRef(function PremiumSummaryV3({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, className, ...rest }, ref) {
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce((sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0), 0);
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading premium", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100 motion-reduce:animate-none" }), [0, 1].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100 motion-reduce:animate-none', i === 1 ? 'w-2/5' : 'w-3/5') }, i)))] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-label": `Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`, className: "text-3xl font-extrabold text-on-surface", children: format(total, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: rows.map((it, i) => {
                    const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
                    const isCredit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: it.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isCredit ? 'text-success' : 'text-muted'), children: [isCredit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${it.label}-${i}`));
                }) })] }));
});
//# sourceMappingURL=PremiumSummaryV3.js.map