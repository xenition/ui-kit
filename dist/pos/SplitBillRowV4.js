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
exports.SplitBillRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * SplitBillRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a split-bill row: a guest/share label with its item
 * count, this party's **share drawn big and bold** in `tabular-nums`, and a clear
 * **paid/unpaid** state — settled parties get a soft-success glow with a `✓ Paid`
 * flag (word, not color alone); unpaid parties get a large (≥44px) primary "pay"
 * settle control. `selected` draws an accent ring reflected in `aria-pressed`;
 * when `onClick` is set the row is a keyboard-operable `role="button"`. Same
 * props/behavior as {@link SplitBillRowProps}; all colors from `--xen-*` token
 * classes (no literals). Dark-mode safe.
 */
exports.SplitBillRowV4 = React.forwardRef(function SplitBillRowV4({ label, amountCents, currency = 'USD', itemCount, paid = false, selected = false, paidCents, onTogglePaid, variant = 'even', testID, onClick, onKeyDown, className, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-split-bill-row": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-pressed": interactive ? selected : undefined, "aria-label": interactive ? `${label}, ${(0, internal_1.formatMoney)(amount, currency)}${settled ? ', paid' : ''}` : undefined, onClick: onClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border-2 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] transition-all', selected
            ? 'border-primary bg-primary-50 shadow-sm'
            : settled
                ? (0, cn_1.cn)('border-transparent shadow-sm', internal_1.TONE_SOFT_BG.success)
                : 'border-border bg-surface', interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [variant === 'custom' ? 'Custom' : 'Even split', typeof itemCount === 'number' && itemCount > 0
                                ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}`
                                : ''] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(amount, currency) }), settled ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-success", children: "\u2713 Paid" })) : typeof paidCents === 'number' && (0, internal_1.safeCents)(paidCents) > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-warn", children: [(0, internal_1.formatMoney)(remaining, currency), " left"] })) : null] }), onTogglePaid ? (settled ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": true, "aria-label": `Mark ${label} unpaid`, onClick: (e) => {
                    e.stopPropagation();
                    onTogglePaid();
                }, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-success bg-success focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base font-bold text-on-success", children: "\u2713" }) })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": false, "aria-label": `Mark ${label} paid`, onClick: (e) => {
                    e.stopPropagation();
                    onTogglePaid();
                }, className: "flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-full bg-primary px-[var(--xen-space-md)] text-sm font-bold text-on-primary transition-colors hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Pay" }))) : null] }));
});
//# sourceMappingURL=SplitBillRowV4.js.map