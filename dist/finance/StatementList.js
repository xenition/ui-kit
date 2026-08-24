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
exports.StatementList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EmptyState_1 = require("../commerce/EmptyState");
const TransactionRow_1 = require("./TransactionRow");
/**
 * A statement feed: an optional section header over a token-divided list of
 * {@link TransactionRow}s. Handles the three list states explicitly —
 * `loading` renders skeleton rows, an empty `items` array renders an
 * {@link EmptyState}, and otherwise each entry becomes a clickable row (row
 * keys guard against a missing `id` by falling back to the index). No fetching;
 * purely presentational and token-bound. Web parity of the native
 * `StatementList`.
 */
exports.StatementList = React.forwardRef(function StatementList({ items, header, onSelectItem, loading = false, loadingRows = 4, emptyTitle = 'No transactions', emptyDescription, className, ...rest }, ref) {
    const headerNode = header != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mb-[var(--xen-space-xs)] text-xs font-semibold uppercase tracking-wide text-muted", children: header })) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [headerNode, Array.from({ length: Math.max(1, loadingRows) }).map((_, index) => ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading transaction", className: "my-[var(--xen-space-xs)] h-11 rounded-[var(--xen-radius-sm)] bg-border opacity-50" }, index)))] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [headerNode, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyTitle, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [headerNode, items.map((entry, index) => ((0, jsx_runtime_1.jsx)("div", { className: index < items.length - 1 ? 'border-b border-border' : undefined, children: (0, jsx_runtime_1.jsx)(TransactionRow_1.TransactionRow, { title: entry.title, subtitle: entry.subtitle, amountCents: entry.amountCents, currency: entry.currency, direction: entry.direction, date: entry.date, icon: entry.icon, onClick: onSelectItem ? () => onSelectItem(entry, index) : undefined }) }, entry.id ?? String(index))))] }));
});
//# sourceMappingURL=StatementList.js.map