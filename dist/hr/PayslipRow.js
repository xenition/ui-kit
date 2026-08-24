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
exports.PayslipRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One payroll line: pay period, net pay, and optional gross / deductions
 * breakdown. Money is carried as integer **cents** and rendered through the
 * shared `formatMoney` for stable 2-decimal output. Payment status is a glyph +
 * word pill so it never rests on color alone. `compact` shows only period + net.
 * When `onClick` is set the row becomes a keyboard-operable `role="button"`.
 * All colors are `--xen-*` token classes — no literals. `forwardRef` to the
 * root `<div>`.
 */
exports.PayslipRow = React.forwardRef(function PayslipRow({ period, netCents, grossCents, deductionsCents, currency = 'USD', status, payDate, variant = 'default', onClick, className, }, ref) {
    const compact = variant === 'compact';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Payslip ${period}, net ${(0, internal_1.formatMoney)(netCents, currency)}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-1.5 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2', interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: period }), payDate ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Paid ", payDate] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: (0, internal_1.formatMoney)(netCents, currency) }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYSLIP_STATUS_META[status], variant: "inline", size: "sm" }) : null] })] }), !compact && (grossCents != null || deductionsCents != null) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-6", children: [grossCents != null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Gross" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: (0, internal_1.formatMoney)(grossCents, currency) })] })) : null, deductionsCents != null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Deductions" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-semibold text-on-surface", children: ["\u2212", (0, internal_1.formatMoney)(deductionsCents, currency)] })] })) : null] })) : null] }));
});
//# sourceMappingURL=PayslipRow.js.map