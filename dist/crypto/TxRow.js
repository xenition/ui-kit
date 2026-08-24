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
exports.TxList = exports.TxRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const EmptyState_1 = require("../commerce/EmptyState");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
const STATUS = {
    pending: { label: 'Pending', glyph: '◷', text: 'text-warn' },
    confirmed: { label: 'Confirmed', glyph: '✓', text: 'text-success' },
    failed: { label: 'Failed', glyph: '✕', text: 'text-danger' },
};
const AMOUNT_TEXT = {
    send: 'text-danger',
    receive: 'text-success',
    none: 'text-on-surface',
};
/**
 * One transaction in a history feed: a status pill (glyph + label, so state is
 * never color-only), a truncated hash, an optional signed token amount + fiat
 * value, and a timestamp. Send reads `danger`, receive reads `success`. Amounts
 * are fixed-precision — no float drift. Becomes a keyboard-operable button when
 * `onClick` is set. Web parity of the native `TxRow`.
 */
exports.TxRow = React.forwardRef(function TxRow({ hash, status = 'confirmed', direction, amount, symbol, decimals = 4, valueCents, currency = 'USD', timestamp, hashLead = 6, hashTail = 4, onClick, className, ...rest }, ref) {
    const meta = STATUS[status];
    const short = (0, format_1.truncateHash)(hash, hashLead, hashTail);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const signedAmount = direction && amount != null ? (direction === 'send' ? -Math.abs(amount) : Math.abs(amount)) : amount;
    const amountText = AMOUNT_TEXT[direction ?? 'none'];
    const amountPrefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Transaction ${short}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5", "aria-label": meta.label, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', meta.text), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', meta.text), children: meta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold tabular-nums text-on-surface", children: short }), timestamp != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timestamp }) : null] }), signedAmount != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-base font-bold tabular-nums', amountText), children: [amountPrefix, (0, format_1.formatToken)(Math.abs(signedAmount), { decimals, symbol })] }), valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "muted", size: "sm" })) : null] })) : null] }));
});
/**
 * A token-divided list of {@link TxRow}s with an explicit empty state. Row keys
 * fall back to the index when a `hash` collides. Purely presentational. Web
 * parity of the native `TxList`.
 */
exports.TxList = React.forwardRef(function TxList({ items, emptyTitle = 'No transactions', emptyDescription, onSelectItem, className, ...rest }, ref) {
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyTitle, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: items.map((item, index) => ((0, jsx_runtime_1.jsx)("div", { className: index < items.length - 1 ? 'border-b border-border' : undefined, children: (0, jsx_runtime_1.jsx)(exports.TxRow, { ...item, onClick: onSelectItem ? () => onSelectItem(item, index) : item.onClick }) }, `${item.hash}-${index}`))) }));
});
//# sourceMappingURL=TxRow.js.map