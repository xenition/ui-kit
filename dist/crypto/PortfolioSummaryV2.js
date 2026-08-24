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
exports.PortfolioSummaryV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DonutChart_1 = require("../charts/DonutChart");
const money_1 = require("../commerce/money");
const format_1 = require("./internal/format");
/** Same cycled palette the DonutChart uses, so the custom legend swatches match. */
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
/** Static `bg-*` token class per chart color slot (literal classes for JIT). */
const SWATCH_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-neutral-400',
};
/**
 * PortfolioSummary, redesigned (v2): a **big total hero over a donut**. The total
 * sits in a filled `primary` hero band (rendered in the guaranteed `on-primary`
 * slot via `formatMoney`, integer cents — no drift) with a translucent on-fill
 * change chip and a soft sheen disc; below, a reused {@link DonutChart} pairs with
 * a custom legend that spells out each asset's share % (guarded against a zero
 * total). Distinct at a glance from the base's plain total + built-in legend.
 * Same props.
 */
exports.PortfolioSummaryV2 = React.forwardRef(function PortfolioSummaryV2({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, className, ...rest }, ref) {
    const safeTotal = Number.isFinite(totalCents) ? Math.trunc(totalCents) : 0;
    const hasChange = changeCents != null || changePct != null;
    const delta = changePct ?? changeCents ?? 0;
    const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading portfolio", className: "h-56 animate-pulse bg-neutral-100" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative overflow-hidden bg-primary p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-[var(--xen-radius-full)] bg-on-primary opacity-10" }), (0, jsx_runtime_1.jsx)("span", { className: "relative block text-xs font-semibold text-on-primary opacity-80", children: "Total balance" }), (0, jsx_runtime_1.jsx)("span", { className: "relative mt-1 block text-3xl font-bold tabular-nums text-on-primary", children: (0, money_1.formatMoney)(safeTotal, currency) }), hasChange ? ((0, jsx_runtime_1.jsxs)("span", { className: "relative mt-[var(--xen-space-sm)] inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] bg-on-primary/20 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-on-primary", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: (0, format_1.changeGlyph)(delta) }), changeCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "tabular-nums", children: (0, money_1.formatMoney)(Math.abs(Math.trunc(changeCents)), currency) })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": `${changePct >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, className: "tabular-nums", children: (0, format_1.formatPct)(changePct) })) : null] })) : null] }), allocations.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-lg)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)(DonutChart_1.DonutChart, { data: allocations.map((a) => ({ label: a.label, value: a.value, color: a.color })), size: 120, "aria-label": `Allocation across ${allocations.length} assets` }), (0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]", children: allocations.map((a, i) => {
                            const swatch = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                            const pct = allocTotal > 0 ? (Math.max(a.value, 0) / allocTotal) * 100 : 0;
                            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-[var(--xen-radius-full)]', SWATCH_BG[swatch]) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: a.label }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm font-semibold tabular-nums text-muted", children: `${pct.toFixed(1)}%` })] }, `${a.label}-${i}`));
                        }) })] })) : null] }));
});
//# sourceMappingURL=PortfolioSummaryV2.js.map