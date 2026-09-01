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
exports.SalesSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * SalesSummary — the POS V4 "register" daily/shift **sales hero** (web parity of
 * the native twin). A confident brand gradient (`from-primary-500 to-primary-700`)
 * carries the `period` label, the **big near-white gross numeral** (integer cents
 * via `formatMoney`), and an optional signed `deltaPct` pill vs the prior period.
 * Transactions, net, and refunds read as frosted glass stat tiles
 * (`bg-primary-50/15 border-primary-50/30`); `topItems` render as a compact
 * frosted list. Every color derives from the brand ramp via `--xen-*` classes +
 * gradient utilities — no literals, light + dark safe.
 */
exports.SalesSummary = React.forwardRef(function SalesSummary({ grossCents, currency = 'USD', transactions, period = 'Today', netCents, refundsCents, topItems, deltaPct, className, ...rest }, ref) {
    const gross = Math.max(0, Math.trunc(grossCents || 0));
    const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
    const deltaUp = hasDelta && deltaPct >= 0;
    const items = topItems ?? [];
    const Stat = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-extrabold tabular-nums text-primary-50", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sales-summary": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-primary-100", children: period }), hasDelta ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": `${deltaUp ? 'Up' : 'Down'} ${Math.abs(deltaPct)} percent vs prior period`, className: "flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: deltaUp ? '▲' : '▼' }), (0, jsx_runtime_1.jsx)("span", { className: "tabular-nums", children: `${Math.abs(deltaPct)}%` })] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "mt-[var(--xen-space-md)] text-sm font-semibold text-primary-100", children: "Gross sales" }), (0, jsx_runtime_1.jsx)("p", { "aria-label": `Gross sales ${(0, internal_1.formatMoney)(gross, currency)}`, className: "text-4xl font-extrabold tabular-nums tracking-tight text-primary-50", children: (0, internal_1.formatMoney)(gross, currency) }), typeof transactions === 'number' || typeof netCents === 'number' || typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex flex-wrap gap-[var(--xen-space-sm)]", children: [typeof transactions === 'number' ? ((0, jsx_runtime_1.jsx)(Stat, { label: "Transactions", value: String(Math.max(0, Math.trunc(transactions))) })) : null, typeof netCents === 'number' ? (0, jsx_runtime_1.jsx)(Stat, { label: "Net", value: (0, internal_1.formatMoney)(Math.trunc(netCents), currency) }) : null, typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsx)(Stat, { label: "Refunds", value: (0, internal_1.formatMoney)(Math.max(0, Math.trunc(refundsCents)), currency) })) : null] })) : null, items.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-primary-100", children: "Top items" }), items.map((it, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-primary-50", children: it.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tabular-nums text-primary-100", children: `×${Math.max(0, Math.trunc(it.count))}` })] }, `${it.name}-${i}`)))] })) : null] }));
});
//# sourceMappingURL=SalesSummary.js.map