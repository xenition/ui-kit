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
exports.ShiftReport = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
function Metric({ label, value, strong }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-muted', strong ? 'text-base font-semibold' : 'text-sm'), children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('tabular-nums text-on-surface', strong ? 'text-base font-bold' : 'text-sm font-medium'), children: value })] }));
}
/**
 * End-of-shift Z-report card — the DOM parity of the native `ShiftReport`:
 * header (cashier / register / window), the headline metrics (gross, refunds,
 * discounts, tax, net, transactions), an optional per-tender breakdown, and a
 * cash-count variance drawn as a **glyph + word** pill (over/short/balanced —
 * never color alone). All money is integer **cents** via `formatMoney`. A shift
 * with no sales renders an {@link EmptyState}. Composed from `Card` +
 * `StatusPill`; token-only colors.
 */
exports.ShiftReport = React.forwardRef(function ShiftReport({ cashier, registerId, period, grossSalesCents, refundsCents, discountsCents, taxCents, netSalesCents, transactionCount, expectedCashCents, countedCashCents, currency = 'USD', breakdown, variant = 'detailed', emptyLabel = 'No sales this shift', testID, className, ...rest }, ref) {
    const detailed = variant === 'detailed';
    const gross = (0, internal_1.safeCents)(grossSalesCents);
    const net = typeof netSalesCents === 'number' ? (0, internal_1.safeCents)(netSalesCents) : gross - (0, internal_1.safeCents)(refundsCents);
    const empty = gross === 0 && (!breakdown || breakdown.length === 0) && (transactionCount ?? 0) === 0;
    const hasVariance = detailed && typeof expectedCashCents === 'number' && typeof countedCashCents === 'number';
    const variance = hasVariance
        ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCashCents), (0, internal_1.safeCents)(countedCashCents))
        : null;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-shift-report": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: "Shift report" }), cashier || registerId || period ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [cashier, registerId ? `Reg ${registerId}` : null, period].filter(Boolean).join(' · ') })) : null] }), empty ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)(Metric, { label: "Gross sales", value: (0, internal_1.formatMoney)(gross, currency) }), typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Refunds", value: `−${(0, internal_1.formatMoney)(refundsCents, currency)}` })) : null, typeof discountsCents === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Discounts", value: `−${(0, internal_1.formatMoney)(discountsCents, currency)}` })) : null, typeof taxCents === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "my-[var(--xen-space-xs)] h-px bg-border" }), (0, jsx_runtime_1.jsx)(Metric, { label: "Net sales", value: (0, internal_1.formatMoney)(net, currency), strong: true }), typeof transactionCount === 'number' ? ((0, jsx_runtime_1.jsx)(Metric, { label: "Transactions", value: String(transactionCount) })) : null] }), detailed && breakdown && breakdown.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: "By tender" }), breakdown.map((b, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[b.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm tabular-nums text-on-surface", children: [(0, internal_1.formatMoney)(b.amountCents, currency), typeof b.count === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `  (${b.count})` })) : null] })] }, i)))] })) : null, variance ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-t border-border pt-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Cash variance" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "soft", size: "sm" })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold tabular-nums', internal_1.TONE_TEXT[variance.meta.tone]), children: [variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : '', (0, internal_1.formatMoney)(Math.abs(variance.deltaCents), currency)] })] })) : null] }))] }));
});
//# sourceMappingURL=ShiftReport.js.map