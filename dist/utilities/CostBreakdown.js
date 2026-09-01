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
exports.CostBreakdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
const TONE_CYCLE = ['primary', 'accent', 'success', 'warn', 'danger'];
/**
 * Where the bill goes (web parity) — the clean, trust-first breakdown card: the
 * title + the summed total (integer cents via `formatMoney`), a single
 * horizontal stacked bar whose segments are widthed by each slice's share, and a
 * legend listing a tone dot, the label, the amount, and its `formatPct` share.
 * Color-coding is meaningful here — each slice carries a soft, semantic tone.
 * Token-only colors.
 */
exports.CostBreakdown = React.forwardRef(function CostBreakdown({ title = 'Cost breakdown', slices, currency = 'USD', formatMoney: format = format_1.formatMoney, className, ...rest }, ref) {
    const items = slices.map((s, i) => ({
        label: s.label,
        amount: Math.max(0, Math.trunc(s.amountCents || 0)),
        tone: (s.tone ?? TONE_CYCLE[i % TONE_CYCLE.length]),
    }));
    const total = items.reduce((sum, s) => sum + s.amount, 0);
    const share = (amount) => (total > 0 ? (amount / total) * 100 : 0);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${title}, total ${format(total, currency)}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: format(total, currency) })] })] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "mt-[var(--xen-space-lg)] flex h-3 overflow-hidden rounded-full bg-neutral-100", children: items.map((s, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', format_1.SOLID_TINT[s.tone]), style: { width: `${share(s.amount)}%` } }, `${s.label}-${i}`))) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-lg)] flex flex-col gap-[var(--xen-space-md)]", children: items.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${s.label}, ${format(s.amount, currency)}, ${(0, format_1.formatPct)(share(s.amount))}`, className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', format_1.SOLID_TINT[s.tone]) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-sm font-semibold text-on-surface", children: s.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: (0, format_1.formatPct)(share(s.amount)) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-[64px] text-right text-sm font-bold text-on-surface", children: format(s.amount, currency) })] }, `${s.label}-${i}`))) })] }));
});
//# sourceMappingURL=CostBreakdown.js.map