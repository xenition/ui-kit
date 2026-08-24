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
exports.SplitBillRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * One party's slice when a bill is split — the DOM parity of the native
 * `SplitBillRow`: label, item count, this party's amount (integer **cents** via
 * `formatMoney`), a remaining/paid indicator, and a settle toggle. `paid` is
 * conveyed by a **glyph + word** flag, never color alone; `selected` draws an
 * accent ring reflected in `aria-pressed`. When `onClick` is set the row is a
 * keyboard-operable `role="button"`. Token-only.
 */
exports.SplitBillRow = React.forwardRef(function SplitBillRow({ label, amountCents, currency = 'USD', itemCount, paid = false, selected = false, paidCents, onTogglePaid, variant = 'even', testID, onClick, onKeyDown, className, ...rest }, ref) {
    const amount = (0, internal_1.safeCents)(amountCents);
    const settled = paid || (typeof paidCents === 'number' && (0, internal_1.safeCents)(paidCents) >= amount && amount > 0);
    const remaining = typeof paidCents === 'number' ? Math.max(0, amount - (0, internal_1.safeCents)(paidCents)) : amount;
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-split-bill-row": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-pressed": interactive ? selected : undefined, "aria-label": interactive
            ? `${label}, ${(0, internal_1.formatMoney)(amount, currency)}${settled ? ', paid' : ''}`
            : undefined, onClick: onClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', selected ? 'border-2 border-primary bg-primary-50' : 'border-border bg-surface', interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [variant === 'custom' ? 'Custom' : 'Even split', typeof itemCount === 'number' && itemCount > 0
                                ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}`
                                : ''] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(amount, currency) }), settled ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-success", children: "\u2713 Paid" })) : typeof paidCents === 'number' && (0, internal_1.safeCents)(paidCents) > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-warn", children: [(0, internal_1.formatMoney)(remaining, currency), " left"] })) : null] }), onTogglePaid ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": settled, "aria-label": settled ? `Mark ${label} unpaid` : `Mark ${label} paid`, onClick: (e) => {
                    e.stopPropagation();
                    onTogglePaid();
                }, className: (0, cn_1.cn)('flex h-6 w-6 items-center justify-center rounded-[var(--xen-radius-sm)] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', settled ? 'border-success bg-success' : 'border-border bg-transparent'), children: settled ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-bold text-on-success", children: "\u2713" })) : null })) : null] }));
});
//# sourceMappingURL=SplitBillRow.js.map