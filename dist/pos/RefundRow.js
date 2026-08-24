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
exports.RefundRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One line of a return / refund — the DOM parity of the native `RefundRow`:
 * item, quantity, amount (integer **cents** via `formatMoney`), the return reason
 * and refund status as **glyph + word** chips (never color alone), and an
 * optional restock flag. In `selectable` mode a token-styled checkbox `<button>`
 * (reflected in `aria-checked`) lets a clerk pick lines to refund. When `onClick`
 * is set the row is a keyboard-operable `role="button"`. Token-only colors.
 */
exports.RefundRow = React.forwardRef(function RefundRow({ name, quantity = 1, amountCents, currency = 'USD', reason, status, restock, variant = 'default', selected = false, onToggle, testID, onClick, onKeyDown, className, ...rest }, ref) {
    const selectable = variant === 'selectable';
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-refund-row": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Refund ${name}, ${(0, internal_1.formatMoney)((0, internal_1.safeCents)(amountCents), currency)}` : undefined, onClick: onClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '', className), ...rest, children: [selectable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": selected, "aria-label": `Refund ${name}`, onClick: (e) => {
                    e.stopPropagation();
                    onToggle?.();
                }, className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected ? 'border-primary bg-primary' : 'border-border bg-transparent'), children: selected ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-bold text-on-primary", children: "\u2713" })) : null })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm font-semibold text-on-surface", children: [quantity > 1 ? `${quantity}× ` : '', name] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [reason ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REFUND_REASON_META[reason], variant: "inline", size: "sm" }) : null, status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REFUND_STATUS_META[status], variant: "soft", size: "sm" }) : null, restock != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: restock ? '↩ Restock' : 'No restock' })) : null] })] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold tabular-nums text-danger", children: ["\u2212", (0, internal_1.formatMoney)((0, internal_1.safeCents)(amountCents), currency)] })] }));
});
//# sourceMappingURL=RefundRow.js.map