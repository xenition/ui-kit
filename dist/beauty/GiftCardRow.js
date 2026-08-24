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
exports.GiftCardRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATUS_META = {
    active: { label: 'Active', tone: 'success' },
    redeemed: { label: 'Redeemed', tone: 'muted' },
    expired: { label: 'Expired', tone: 'danger' },
    pending: { label: 'Pending', tone: 'warn' },
};
/**
 * A gift-card wallet row: a gift glyph, the face value with remaining balance,
 * the (masked) code and expiry, and a status `Badge`. `status` carries the state
 * word and tone (never color alone) — `redeemed`/`expired` dim the row. When
 * balance differs from the face value both are shown. Amounts are integer cents
 * via {@link formatMoney}. Token-only colors.
 */
exports.GiftCardRow = React.forwardRef(function GiftCardRow({ amountCents, balanceCents, currency = 'USD', code, status = 'active', expires, note, formatMoney: format = commerce_1.formatMoney, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const balance = typeof balanceCents === 'number' ? balanceCents : amountCents;
    const spent = balance < amountCents;
    const dim = status === 'redeemed' || status === 'expired';
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-gift-card-row": status, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `Gift card ${format(balance, currency)}${spent ? ` of ${format(amountCents, currency)}` : ''}, ${meta.label}${expires ? `, ${expires}` : ''}`, "aria-disabled": dim || undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', interactive && !dim && 'cursor-pointer transition-opacity hover:opacity-95', dim && 'opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 text-lg", children: "\uD83C\uDF81" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-on-surface", children: format(balance, currency) }), spent ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["of ", format(amountCents, currency)] })) : null] }), code ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: code }) : null, note ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: note }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label }), expires ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: expires }) : null] })] }));
});
//# sourceMappingURL=GiftCardRow.js.map