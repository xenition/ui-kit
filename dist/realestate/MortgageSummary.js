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
exports.MortgageSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * Opacity step (of near-white `primary-50`) that distinguishes each stacked
 * segment while keeping every fill token-derived and legible on the gradient.
 */
const TONE_FILL = {
    primary: 'bg-primary-50',
    accent: 'bg-primary-50/70',
    warn: 'bg-primary-50/45',
    success: 'bg-primary-50/25',
};
/**
 * MortgageSummary — a brand-gradient mortgage-results hero for the real-estate
 * V4 "listing" line (web parity of the native twin). A big near-white monthly
 * payment numeral sits on the brand gradient (`from-primary-500 to-primary-700`);
 * the `breakdown` renders as a single stacked bar of near-white opacity steps
 * plus frosted legend tiles, and the down/rate/term lines read as frosted chips.
 * Presentational — shaped data only, nothing fetches or computes amortization.
 * Money is integer cents via `formatMoney`. Token-only colors (`--xen-*` classes
 * + gradient utilities), dark-mode safe.
 */
exports.MortgageSummary = React.forwardRef(function MortgageSummary({ monthlyCents, currency = 'USD', breakdown, downLabel, rateLabel, termLabel, className, ...rest }, ref) {
    const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
    const segments = (breakdown ?? []).filter((b) => Math.trunc(b.cents || 0) > 0);
    const total = segments.reduce((sum, b) => sum + Math.trunc(b.cents), 0);
    const chips = [];
    if (downLabel)
        chips.push(downLabel);
    if (rateLabel)
        chips.push(rateLabel);
    if (termLabel)
        chips.push(termLabel);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-primary-100", children: "Estimated monthly payment" }), (0, jsx_runtime_1.jsxs)("p", { "aria-label": `Estimated monthly payment ${(0, commerce_1.formatMoney)(monthly, currency)} per month`, className: "text-4xl font-extrabold tracking-tight text-primary-50", children: [(0, commerce_1.formatMoney)(monthly, currency), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary-100", children: "/mo" })] })] }), segments.length > 0 && total > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": "Payment breakdown", className: "flex h-3 w-full overflow-hidden rounded-full bg-primary-50/15", children: segments.map((b) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-full', TONE_FILL[b.tone ?? 'primary']), style: { width: `${(Math.trunc(b.cents) / total) * 100}%` } }, b.label))) }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-[var(--xen-space-sm)]", children: segments.map((b) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-3 w-3 flex-shrink-0 rounded-full', TONE_FILL[b.tone ?? 'primary']) }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs font-semibold text-primary-100", children: b.label }), (0, jsx_runtime_1.jsx)("span", { className: "block text-sm font-bold text-primary-50", children: (0, commerce_1.formatMoney)(Math.trunc(b.cents), currency) })] })] }, b.label))) })] })) : null, chips.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: chips.map((c) => ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-primary-50", children: c }, c))) })) : null] }));
});
//# sourceMappingURL=MortgageSummary.js.map