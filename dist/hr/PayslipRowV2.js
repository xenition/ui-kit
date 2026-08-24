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
exports.PayslipRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * PayslipRow, design **V2** — an expanded pay-statement card. A hero net figure
 * sits above a gross → deductions → net breakdown, with a take-home meter
 * showing net as a share of gross. Money stays integer **cents** through
 * `formatMoney`; payment status is a glyph + word pill (never color alone).
 * Same Props as {@link PayslipRow}. Elevated with a subtle hover lift;
 * token-pure (no literals).
 */
exports.PayslipRowV2 = React.forwardRef(function PayslipRowV2({ period, netCents, grossCents, deductionsCents, currency = 'USD', status, payDate, onClick, className, }, ref) {
    const interactive = onClick != null;
    const takeHomePct = grossCents != null && grossCents > 0
        ? Math.max(0, Math.min(100, Math.round((netCents / grossCents) * 100)))
        : null;
    const hasBreakdown = grossCents != null || deductionsCents != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, variant: "elevated", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Payslip ${period}, net ${(0, internal_1.formatMoney)(netCents, currency)}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 transition duration-200 motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs font-semibold text-muted", children: period }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-on-surface", children: (0, internal_1.formatMoney)(netCents, currency) }), payDate ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Paid ", payDate] }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYSLIP_STATUS_META[status], size: "sm" }) : null] }), hasBreakdown ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1.5 rounded-md bg-neutral-100 p-3", children: [grossCents != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Gross" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: (0, internal_1.formatMoney)(grossCents, currency) })] })) : null, deductionsCents != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Deductions" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-danger", children: ["\u2212", (0, internal_1.formatMoney)(deductionsCents, currency)] })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "my-0.5 h-px bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: "Net" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: (0, internal_1.formatMoney)(netCents, currency) })] }), takeHomePct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: takeHomePct, max: 100, size: "sm", tone: "success" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Take-home ", takeHomePct, "% of gross"] })] })) : null] })) : null] }));
});
//# sourceMappingURL=PayslipRowV2.js.map