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
exports.AccountHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
/**
 * The account home header (web parity): a calm brand-gradient panel with the
 * account name, the current balance (integer cents via `formatMoney`), the next
 * due date + an optional AutoPay chip, and a pay CTA. When the balance is `<= 0`
 * it flips to an "all paid up" state. Near-white ink (`text-on-primary` /
 * `text-primary-100`) and the gradient both derive from the brand ramp; the
 * frosted chips are `bg-primary-500` and the pay pill is near-white
 * (`bg-on-primary text-primary`). Token-only colors — the one vivid surface on
 * an otherwise clean, trust-first screen.
 */
exports.AccountHeader = React.forwardRef(function AccountHeader({ accountName, address, balanceCents, currency = 'USD', dueDate, autoPay = false, formatMoney: format = format_1.formatMoney, payLabel = 'Pay bill', onPay, onProfile, avatarGlyph = '👤', className, ...rest }, ref) {
    const owed = Math.max(0, Math.trunc(balanceCents || 0));
    const settled = owed <= 0;
    const Chip = ({ glyph, text }) => ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-primary", children: text })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-extrabold text-on-primary", children: accountName }), address ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 truncate text-sm text-primary-100", children: address }) : null] }), onProfile ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Open profile", onClick: onProfile, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: avatarGlyph }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: settled ? 'Balance' : 'Current balance' }), (0, jsx_runtime_1.jsx)("span", { className: "text-4xl font-extrabold tracking-tight text-on-primary", children: settled ? format(0, currency) : format(owed, currency) })] }), settled || dueDate || autoPay ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-sm)]", children: [settled ? ((0, jsx_runtime_1.jsx)(Chip, { glyph: "\u2713", text: "All paid up" })) : dueDate ? ((0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDDD3\uFE0F", text: `Due ${dueDate}` })) : null, autoPay ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDD01", text: "AutoPay on" }) : null] })) : null, onPay && !settled ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${payLabel}, ${format(owed, currency)}`, onClick: onPay, className: "mt-[var(--xen-space-lg)] flex w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: `${payLabel} · ${format(owed, currency)}` })) : null] }));
});
//# sourceMappingURL=AccountHeader.js.map