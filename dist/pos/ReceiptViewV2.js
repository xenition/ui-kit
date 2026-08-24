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
exports.ReceiptViewV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyState_1 = require("../commerce/EmptyState");
const internal_1 = require("./internal");
/**
 * ReceiptView, redesigned (v2): a **printed paper receipt**. Centered merchant +
 * address, a dashed tear rule, monospace-tabular item lines, a totals ledger, the
 * tenders with method glyphs + derived change, and a centered footer. A literal
 * till-roll look distinct from v1. Same props, token-only.
 */
exports.ReceiptViewV2 = React.forwardRef(function ReceiptViewV2({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel = 'No items', testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    if (items.length === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83E\uDDFE" }), title: emptyLabel, className: className, "data-testid": testID, ...rest });
    }
    const tendered = (tenders ?? []).reduce((sum, t) => sum + (0, internal_1.safeCents)(t.amountCents), 0);
    const change = tendered - totalCents;
    const Row = ({ label, cents, strong }) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex justify-between tabular-nums', strong ? 'text-base font-bold text-on-surface' : 'text-xs text-muted'), children: [(0, jsx_runtime_1.jsx)("span", { children: label }), (0, jsx_runtime_1.jsx)("span", { children: (0, internal_1.formatMoney)(cents, currency) })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-receipt-view": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-md border border-border bg-surface p-4', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [merchant ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: merchant }) : null, !compact && addressLines ? addressLines.map((l, i) => (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: l }, i)) : null, (orderNumber || timestamp) ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-muted", children: [orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "border-t border-dashed border-border pt-2", children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-2 text-sm tabular-nums text-on-surface", children: [(0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 truncate", children: [it.quantity && it.quantity > 1 ? `${it.quantity}× ` : '', it.name] }), (0, jsx_runtime_1.jsx)("span", { children: (0, internal_1.formatMoney)(it.amountCents, currency) })] }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 border-t border-dashed border-border pt-2", children: [typeof subtotalCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Subtotal", cents: subtotalCents }) : null, (0, internal_1.safeCents)(discountCents) > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Discount", cents: -(0, internal_1.safeCents)(discountCents) }) : null, typeof taxCents === 'number' ? (0, jsx_runtime_1.jsx)(Row, { label: "Tax", cents: taxCents }) : null, (0, internal_1.safeCents)(tipCents) > 0 ? (0, jsx_runtime_1.jsx)(Row, { label: "Tip", cents: tipCents }) : null, (0, jsx_runtime_1.jsx)(Row, { label: "Total", cents: totalCents, strong: true })] }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 border-t border-dashed border-border pt-2", children: [tenders.map((t, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs tabular-nums text-muted", children: [(0, jsx_runtime_1.jsxs)("span", { children: [internal_1.PAYMENT_METHOD_META[t.method].glyph, " ", internal_1.PAYMENT_METHOD_META[t.method].label] }), (0, jsx_runtime_1.jsx)("span", { children: (0, internal_1.formatMoney)(t.amountCents, currency) })] }, i))), change > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs font-semibold tabular-nums text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { children: "Change" }), (0, jsx_runtime_1.jsx)("span", { children: (0, internal_1.formatMoney)(change, currency) })] })) : null] })) : null, footer ? (0, jsx_runtime_1.jsx)("p", { className: "border-t border-dashed border-border pt-2 text-center text-xs text-muted", children: footer }) : null] }));
});
//# sourceMappingURL=ReceiptViewV2.js.map