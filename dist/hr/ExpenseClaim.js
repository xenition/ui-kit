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
exports.ExpenseClaim = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * An expense-claim card: merchant, category, amount (integer **cents** via
 * `formatMoney`), date, and lifecycle status. Status is a glyph + word pill
 * (approved → success, rejected → danger, never color alone) and a missing
 * receipt is flagged by a glyph + word. When `actionable` and still `submitted`,
 * approve / reject `<button>`s render for an approver. `compact` drops the memo.
 * All colors are `--xen-*` token classes — no literals. `forwardRef` to the
 * root `<div>`.
 */
exports.ExpenseClaim = React.forwardRef(function ExpenseClaim({ merchant, category, amountCents, currency = 'USD', date, status, description, hasReceipt, actionable = false, variant = 'default', onApprove, onReject, onClick, className, }, ref) {
    const compact = variant === 'compact';
    const catMeta = internal_1.EXPENSE_CATEGORY_META[category];
    const showActions = actionable && status === 'submitted';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive
            ? `Expense ${merchant}, ${(0, internal_1.formatMoney)(amountCents, currency)}, ${internal_1.EXPENSE_STATUS_META[status].label}`
            : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: merchant }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: catMeta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [catMeta.label, date ? ` · ${date}` : ''] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: (0, internal_1.formatMoney)(amountCents, currency) }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EXPENSE_STATUS_META[status], variant: "inline", size: "sm" })] })] }), !compact && description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-xs text-muted", children: description }) : null, hasReceipt != null ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs font-semibold', hasReceipt ? 'text-muted' : 'text-danger'), children: hasReceipt ? '📎 Receipt attached' : '⚠ No receipt' })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "flex-1", onClick: (e) => {
                            e.stopPropagation();
                            onApprove?.();
                        }, children: "Approve" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "danger", className: "flex-1", onClick: (e) => {
                            e.stopPropagation();
                            onReject?.();
                        }, children: "Reject" })] })) : null] }));
});
//# sourceMappingURL=ExpenseClaim.js.map