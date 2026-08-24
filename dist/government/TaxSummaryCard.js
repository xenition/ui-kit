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
exports.TaxSummaryCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const format_1 = require("./internal/format");
const tint_1 = require("./internal/tint");
const STATUS = {
    owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
    refund: { label: 'Refund', glyph: '💵', tone: 'success' },
    paid: { label: 'Paid', glyph: '✓', tone: 'success' },
    overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
    filed: { label: 'Filed', glyph: '📄', tone: 'primary' },
};
/**
 * A tax-account summary for one period: the settlement status conveyed by
 * **text + glyph + color** (never color alone), the primary balance / refund as
 * integer cents through `formatMoney`, an optional amount-paid line, and a gated
 * "Pay now" action for owed / overdue balances. The headline amount is toned
 * success for a refund and danger when overdue. Token-bound throughout — no
 * literal colors. Web parity of the native `TaxSummaryCard`.
 */
exports.TaxSummaryCard = React.forwardRef(function TaxSummaryCard({ taxYear, taxType, status = 'owed', amountCents, paidCents, dueDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onPay, className, ...rest }, ref) {
    const sd = STATUS[status] ?? STATUS.owed;
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const isPayable = status === 'owed' || status === 'overdue';
    const amountColor = status === 'refund' || status === 'paid'
        ? 'text-success'
        : status === 'overdue'
            ? 'text-danger'
            : 'text-on-surface';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', tint_1.TONE_TINT[sd.tone]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDDFE", size: "xl", "aria-label": "Tax summary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-base font-bold text-on-surface", children: [taxType ?? 'Tax', " \u00B7 ", taxYear] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, className: "mt-0.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: status === 'refund' ? 'Refund' : 'Balance' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-bold', amountColor), children: format(amount, currency) })] }), paidCents != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Paid" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: format(Math.max(0, Math.trunc(paidCents)), currency) })] })) : null] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-sm)] text-xs text-muted", children: ["Due ", dueDate] })) : null, isPayable && onPay != null && amount > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex justify-end", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: status === 'overdue' ? 'danger' : 'primary', onClick: onPay, children: "Pay now" }) })) : null] }));
});
//# sourceMappingURL=TaxSummaryCard.js.map