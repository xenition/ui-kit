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
exports.PayslipRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * PayslipRow, design **V3** — a dense statement line for a payroll list. Period
 * (and pay date) on the left, net pay pinned right with a leading status glyph +
 * word beneath it (never color alone). Money stays integer **cents** through
 * `formatMoney`. Same Props as {@link PayslipRow}; the gross/deductions
 * breakdown is dropped for density, on a borderless divider row. Token-pure.
 */
exports.PayslipRowV3 = React.forwardRef(function PayslipRowV3({ period, netCents, currency = 'USD', status, payDate, onClick, className, }, ref) {
    const interactive = onClick != null;
    const statusMeta = status ? internal_1.PAYSLIP_STATUS_META[status] : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Payslip ${period}, net ${(0, internal_1.formatMoney)(netCents, currency)}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center justify-between gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: period }), payDate ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Paid ", payDate] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatMoney)(netCents, currency) }), statusMeta ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": statusMeta.label, className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT_CLASS[statusMeta.tone]), children: statusMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT_CLASS[statusMeta.tone]), children: statusMeta.label })] })) : null] })] }));
});
//# sourceMappingURL=PayslipRowV3.js.map