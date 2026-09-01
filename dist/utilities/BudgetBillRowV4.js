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
exports.BudgetBillRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * BudgetBillRow — **V4** design. A clean, elevated row: the budget-billing glyph
 * in the signature brand-gradient disc, the flat monthly charge, a settle-up
 * balance shown as a signed credit/shortfall (credit → success, shortfall →
 * danger, by sign + label + color, never color alone), and an optional
 * plan-vs-actual progress bar (denominator guarded against zero). All amounts are
 * integer cents via `formatMoney`. Same props/behavior as
 * {@link BudgetBillRowProps}; token-only colors.
 */
exports.BudgetBillRowV4 = React.forwardRef(function BudgetBillRowV4({ label = 'Budget billing', monthlyCents, balanceCents, actualToDateCents, plannedToDateCents, reviewDate, currency = 'USD', formatMoney: format = format_1.formatMoney, className, ...rest }, ref) {
    const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
    const balance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
    const isCredit = balance != null && balance >= 0;
    const planned = plannedToDateCents != null ? Math.max(0, Math.trunc(plannedToDateCents)) : 0;
    const actual = actualToDateCents != null ? Math.max(0, Math.trunc(actualToDateCents)) : 0;
    const showBar = planned > 0;
    const overPlan = actual > planned;
    const barTone = overPlan ? 'warn' : 'primary';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCC5", size: "xl", color: "onPrimary", "aria-label": "Budget billing" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: label }), reviewDate != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: reviewDate }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: format(monthly, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "per month" })] })] }), balance != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: isCredit ? 'Account credit' : 'Settle-up balance' }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', isCredit ? 'text-success' : 'text-danger'), children: [isCredit ? '' : '−', format(Math.abs(balance), currency)] })] })) : null, showBar ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: Math.min(actual, planned * 1.5), max: planned, tone: barTone, size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [format(actual, currency), " actual vs ", format(planned, currency), " planned"] })] })) : null] }));
});
//# sourceMappingURL=BudgetBillRowV4.js.map