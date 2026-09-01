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
exports.BillCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * BillCard — **V4** design. The clean, trust-first bill card: an elevated rounded
 * surface, the utility-kind glyph in a small brand-gradient disc (the signature
 * V4 touch), a status pill carrying text + glyph + color, and the amount due in
 * integer cents via `formatMoney`. Restraint by design — the money stays on the
 * calm surface; only the small disc is gradient. An optional pay `Button` (danger
 * tone when overdue) and whole-card click are preserved. Same props/behavior as
 * {@link BillCardProps}; token-only colors.
 */
exports.BillCardV4 = React.forwardRef(function BillCardV4({ kind, provider, accountNumber, amountCents, dueDate, status = 'due', currency = 'USD', formatMoney: format = format_1.formatMoney, payLabel = 'Pay now', onPay, paying = false, onClick, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.billStatus)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const settled = status === 'paid';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "xl", color: "onPrimary", "aria-label": `${kd.label} bill` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: provider }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted", children: [kd.label, " \u00B7 ", accountNumber] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: settled ? 'Paid' : 'Amount due' }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: format(amount, currency) })] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: settled ? 'Paid on' : 'Due' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', status === 'overdue' ? 'text-danger' : 'text-on-surface'), children: dueDate })] })) : null] }), onPay != null && !settled ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: status === 'overdue' ? 'danger' : 'default', onClick: onPay, disabled: paying, "aria-busy": paying, className: "mt-[var(--xen-space-md)] w-full", children: `${payLabel} · ${format(amount, currency)}` })) : null] }));
});
//# sourceMappingURL=BillCardV4.js.map