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
exports.DiscountRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * A discount line on the ticket — the DOM parity of the native `DiscountRow`. In
 * its resolved state it shows the label, the percent/amount basis, an optional
 * note, the negative money impact (integer **cents** via `formatMoney`, drawn in
 * the `success`/savings tone), and a remove control. With no active discount it
 * collapses to a dashed "Add discount" `<button>` that fires `onAdd`. Token-only
 * colors; real buttons for the actions.
 */
exports.DiscountRow = React.forwardRef(function DiscountRow({ label, type = 'amount', value, amountCents, currency = 'USD', note, active, onEdit, onRemove, onAdd, addLabel = 'Add discount', variant = 'default', testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const isActive = active ?? ((0, internal_1.safeCents)(amountCents) > 0 || (label != null && label !== ''));
    if (!isActive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-discount-row": "", "data-testid": testID, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": addLabel, onClick: onAdd, className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-primary', 'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-bold", children: "\uFF0B" }), (0, jsx_runtime_1.jsx)("span", { children: addLabel })] }) }));
    }
    const basis = type === 'percent' && typeof value === 'number'
        ? `${value}%`
        : type === 'amount' && typeof value === 'number'
            ? (0, internal_1.formatMoney)(value, currency)
            : undefined;
    const editable = typeof onEdit === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-discount-row": "", "data-testid": testID, role: editable ? 'button' : undefined, tabIndex: editable ? 0 : undefined, "aria-label": editable ? `Edit ${label ?? 'discount'}` : undefined, onClick: editable ? onEdit : undefined, onKeyDown: editable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onEdit?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center justify-between gap-[var(--xen-space-md)]', compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]', editable
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-success", children: "\uD83C\uDFF7" }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm font-semibold text-on-surface", children: [label ?? 'Discount', basis ? ` · ${basis}` : ''] })] }), !compact && note ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: note }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold tabular-nums text-success", children: ["\u2212", (0, internal_1.formatMoney)(amountCents ?? 0, currency)] }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${label ?? 'discount'}`, onClick: (e) => {
                            e.stopPropagation();
                            onRemove();
                        }, className: "text-base text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2715" }) })) : null] })] }));
});
//# sourceMappingURL=DiscountRow.js.map