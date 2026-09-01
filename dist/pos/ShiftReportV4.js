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
exports.ShiftReportV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/** A single big-numeral stat tile — the headline number reads at a glance. */
function StatTile({ label, value, accent }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]', accent ? internal_1.TONE_SOFT_BG.primary : 'bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-extrabold tabular-nums', accent ? 'text-primary' : 'text-on-surface'), children: value })] }));
}
/**
 * ShiftReport — **V4** "register" design (web parity of the native V4). The
 * tactile end-of-shift Z-report: the headline numbers (gross sales,
 * transactions, cash counted, variance) become a crisp **grid of big-numeral
 * stat tiles** you can read across the counter, gross sales carrying the one
 * accent. Refunds / discounts / tax / net stay as a compact ledger beneath. The
 * variance tile is colored by over/short (icon + word pill, never color alone).
 * Optional per-tender breakdown; a shift with no sales renders an
 * {@link EmptyState}. All money is integer **cents** via `formatMoney`. Same
 * props/behavior as {@link ShiftReportProps}; token-only colors.
 */
exports.ShiftReportV4 = React.forwardRef(function ShiftReportV4({ cashier, registerId, period, grossSalesCents, refundsCents, discountsCents, taxCents, netSalesCents, transactionCount, expectedCashCents, countedCashCents, currency = 'USD', breakdown, variant = 'detailed', emptyLabel = 'No sales this shift', testID, className, ...rest }, ref) {
    const detailed = variant === 'detailed';
    const gross = (0, internal_1.safeCents)(grossSalesCents);
    const net = typeof netSalesCents === 'number' ? (0, internal_1.safeCents)(netSalesCents) : gross - (0, internal_1.safeCents)(refundsCents);
    const empty = gross === 0 && (!breakdown || breakdown.length === 0) && (transactionCount ?? 0) === 0;
    const hasVariance = detailed && typeof expectedCashCents === 'number' && typeof countedCashCents === 'number';
    const variance = hasVariance
        ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCashCents), (0, internal_1.safeCents)(countedCashCents))
        : null;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-shift-report": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: "Shift report" }), cashier || registerId || period ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [cashier, registerId ? `Reg ${registerId}` : null, period]
                            .filter(Boolean)
                            .join(' · ') })) : null] }), empty ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(StatTile, { label: "Gross sales", value: (0, internal_1.formatMoney)(gross, currency), accent: true }), typeof transactionCount === 'number' ? ((0, jsx_runtime_1.jsx)(StatTile, { label: "Transactions", value: String(transactionCount) })) : ((0, jsx_runtime_1.jsx)(StatTile, { label: "Net sales", value: (0, internal_1.formatMoney)(net, currency) })), typeof countedCashCents === 'number' ? ((0, jsx_runtime_1.jsx)(StatTile, { label: "Cash counted", value: (0, internal_1.formatMoney)((0, internal_1.safeCents)(countedCashCents), currency) })) : null, variance ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]', internal_1.TONE_SOFT_BG[variance.meta.tone]), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted", children: "Variance" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "inline", size: "sm" })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xl font-extrabold tabular-nums', internal_1.TONE_TEXT[variance.meta.tone]), children: [variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : '', (0, internal_1.formatMoney)(Math.abs(variance.deltaCents), currency)] })] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Refunds" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium tabular-nums text-on-surface", children: `−${(0, internal_1.formatMoney)(refundsCents, currency)}` })] })) : null, typeof discountsCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Discounts" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium tabular-nums text-on-surface", children: `−${(0, internal_1.formatMoney)(discountsCents, currency)}` })] })) : null, typeof taxCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Tax" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(taxCents, currency) })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "my-[var(--xen-space-xs)] h-px bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-muted", children: "Net sales" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(net, currency) })] })] }), detailed && breakdown && breakdown.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: "By tender" }), breakdown.map((b, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[b.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm tabular-nums text-on-surface", children: [(0, internal_1.formatMoney)(b.amountCents, currency), typeof b.count === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `  (${b.count})` })) : null] })] }, i)))] })) : null] }))] }));
});
//# sourceMappingURL=ShiftReportV4.js.map