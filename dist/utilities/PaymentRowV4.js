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
exports.PaymentRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * PaymentRow — **V4** design. The clean, trust-first payment line: an elevated
 * rounded surface, the settlement-state glyph in a small brand-gradient disc (the
 * signature V4 touch), a method/date stack with a status pill, and a right-aligned
 * amount. The state is still conveyed redundantly (glyph + label + a color that
 * traces to a semantic token: paid → success, failed → danger) so it is never
 * color-alone, and a refunded/failed amount stays muted with a strike. Amount is
 * integer cents via `formatMoney`; becomes a `role="button"` row only when
 * `onClick` is supplied. Same props/behavior as {@link PaymentRowProps};
 * token-only colors.
 */
exports.PaymentRowV4 = React.forwardRef(function PaymentRowV4({ amountCents, date, status, method, reference, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const sd = (0, status_1.paymentState)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const voided = status === 'failed' || status === 'refunded';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `Payment ${format(amount, currency)}, ${date}, ${sd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sd.glyph, color: "onPrimary", "aria-label": sd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: method ?? 'Payment' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: date }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', voided ? 'text-muted line-through' : 'text-on-surface'), children: format(amount, currency) }), reference != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: reference }) : null] })] }));
});
//# sourceMappingURL=PaymentRowV4.js.map