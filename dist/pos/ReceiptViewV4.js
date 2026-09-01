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
exports.ReceiptViewV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyState_1 = require("../commerce/EmptyState");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
function Row({ label, value, tone }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm tabular-nums', tone === 'success' ? 'text-success' : 'text-on-surface'), children: value })] }));
}
/**
 * ReceiptView — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a printed receipt: a monospace-feel item list, a clean
 * subtotal / discount / tax / tip block, and — after a **dashed tear line** — the
 * **grand total big and bold** in `tabular-nums` (the number that closes the
 * sale). Header (merchant + address + order ref), tenders with derived change,
 * and a footer are preserved. Money is integer **cents** throughout via
 * `formatMoney`. An empty item list renders a labelled {@link EmptyState}. Same
 * props/behavior as {@link ReceiptViewProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.ReceiptViewV4 = React.forwardRef(function ReceiptViewV4({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant = 'full', emptyLabel = 'No items on this receipt', testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const rule = (0, jsx_runtime_1.jsx)("div", { className: "my-[var(--xen-space-sm)] h-px bg-border" });
    const tendered = (tenders ?? []).reduce((acc, t) => acc + (0, internal_1.safeCents)(t.amountCents), 0);
    const changeDue = tenders && tenders.length > 0 ? tendered - (0, internal_1.safeCents)(totalCents) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-receipt-view": "", "data-testid": testID, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] font-mono', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [merchant ? ((0, jsx_runtime_1.jsx)("span", { className: "text-center text-lg font-extrabold uppercase tracking-wide text-on-surface", children: merchant })) : null, !compact && addressLines
                        ? addressLines.map((line, i) => ((0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs text-muted", children: line }, i)))
                        : null, orderNumber || timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs text-muted", children: [orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ') })) : null] }), rule, items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: items.map((item, i) => {
                    const qty = item.quantity ?? 1;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "block truncate text-sm text-on-surface", children: [qty > 1 ? `${qty}× ` : '', item.name] }), !compact && item.detail ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: item.detail })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(item.amountCents, currency) })] }, i));
                }) })), rule, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [typeof subtotalCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", value: (0, internal_1.formatMoney)(subtotalCents, currency) })) : null, typeof discountCents === 'number' && discountCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Discount", value: `−${(0, internal_1.formatMoney)(discountCents, currency)}`, tone: "success" })) : null, typeof taxCents === 'number' ? ((0, jsx_runtime_1.jsx)(Row, { label: "Tax", value: (0, internal_1.formatMoney)(taxCents, currency) })) : null, typeof tipCents === 'number' && tipCents > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Tip", value: (0, internal_1.formatMoney)(tipCents, currency) })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "my-[var(--xen-space-md)] border-t-2 border-dashed border-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold uppercase tracking-wide text-on-surface", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(totalCents, currency) })] }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [rule, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [tenders.map((t, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYMENT_METHOD_META[t.method], variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(t.amountCents, currency) })] }, i))), changeDue > 0 ? ((0, jsx_runtime_1.jsx)(Row, { label: "Change", value: (0, internal_1.formatMoney)(changeDue, currency) })) : null] })] })) : null, footer ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-md)] text-center text-xs text-muted", children: footer })) : null] }));
});
//# sourceMappingURL=ReceiptViewV4.js.map