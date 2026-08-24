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
exports.PaymentRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * PaymentRow, redesigned (v2): a **method card**. The whole payment is a Card: a
 * tinted method-glyph tile leads, the method and reference stack in the middle,
 * and the right column sets the amount big above a status pill. A failed /
 * refunded amount is muted + struck so it reads non-current. Distinct at a glance
 * from v1's bare dense row and v3's line. Same props; state is glyph + label +
 * tone (never color alone); integer cents; token-pure.
 */
exports.PaymentRowV2 = React.forwardRef(function PaymentRowV2({ amountCents, date, status, method, reference, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const sd = (0, status_1.paymentState)(status);
    const slot = (0, format_1.tintSlot)(sd.tone);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const voided = status === 'failed' || status === 'refunded';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, variant: interactive ? 'interactive' : 'elevated', className: (0, cn_1.cn)(interactive && 'cursor-pointer', className), ...(interactive
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
            : {}), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT[slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sd.glyph, size: "lg", "aria-label": sd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: method ?? 'Payment' }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: reference != null ? `${date} · ${reference}` : date })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold', voided ? 'text-muted line-through' : 'text-on-surface'), children: format(amount, currency) }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] })] }) }));
});
//# sourceMappingURL=PaymentRowV2.js.map