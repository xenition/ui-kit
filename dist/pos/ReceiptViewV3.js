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
exports.ReceiptViewV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyState_1 = require("../commerce/EmptyState");
const internal_1 = require("./internal");
/**
 * ReceiptView, redesigned (v3): a **compact total-first summary**. The grand total
 * leads as a hero figure with the merchant + reference beneath; item lines fold
 * into a quiet list and tenders sit as small method chips. A digital-receipt card
 * distinct from v1/v2's ledger. Same props, token-only.
 */
exports.ReceiptViewV3 = React.forwardRef(function ReceiptViewV3({ merchant, addressLines, orderNumber, timestamp, items, currency = 'USD', subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel = 'No items', testID, className, ...rest }, ref) {
    void variant;
    void addressLines;
    void subtotalCents;
    void discountCents;
    void taxCents;
    void tipCents;
    if (items.length === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83E\uDDFE" }), title: emptyLabel, className: className, "data-testid": testID, ...rest });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-receipt-view": "", "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs uppercase tracking-wide text-muted", children: "Total" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(totalCents, currency) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [merchant, orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ') })] }), (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-0.5 border-t border-border pt-2", children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex justify-between text-xs tabular-nums text-muted", children: [(0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 truncate", children: [it.quantity && it.quantity > 1 ? `${it.quantity}× ` : '', it.name] }), (0, jsx_runtime_1.jsx)("span", { children: (0, internal_1.formatMoney)(it.amountCents, currency) })] }, i))) }), tenders && tenders.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5", children: tenders.map((t, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: [internal_1.PAYMENT_METHOD_META[t.method].glyph, " ", (0, internal_1.formatMoney)((0, internal_1.safeCents)(t.amountCents), currency)] }, i))) })) : null, footer ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: footer }) : null] }));
});
//# sourceMappingURL=ReceiptViewV3.js.map