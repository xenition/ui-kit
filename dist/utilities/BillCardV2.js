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
exports.BillCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * BillCard, redesigned (v2): a **lifted hero card**. A tinted header band carries
 * a large utility glyph tile, provider, and a status pill; the body sets the
 * amount big on the left with a bordered **due-date block** (calendar-style tile,
 * tinted danger when overdue) on the right; a full-width pay CTA anchors the
 * bottom. Distinct at a glance from v1's flat horizontal disc row and v3's dense
 * line. Same props, integer cents, status by glyph+text+tone (never color
 * alone), token-pure.
 */
exports.BillCardV2 = React.forwardRef(function BillCardV2({ kind, provider, accountNumber, amountCents, dueDate, status = 'due', currency = 'USD', formatMoney: format = format_1.formatMoney, payLabel = 'Pay now', onPay, paying = false, onClick, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.billStatus)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const settled = status === 'paid';
    const overdue = status === 'overdue';
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface text-on-surface shadow-md', interactive &&
            'cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
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
            : {}), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)] bg-primary/10 px-[var(--xen-space-lg)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-[52px] w-[52px] items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "2xl", "aria-label": `${kd.label} bill` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: provider }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted", children: [kd.label, " \u00B7 ", accountNumber] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-md)] px-[var(--xen-space-lg)] pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: settled ? 'Paid' : 'Amount due' }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold text-on-surface", children: format(amount, currency) })] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-[88px] flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', overdue ? 'border-danger bg-danger/10' : 'border-border'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: settled ? 'Paid on' : 'Due' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', overdue ? 'text-danger' : 'text-on-surface'), children: dueDate })] })) : null] }), onPay != null && !settled ? ((0, jsx_runtime_1.jsx)("div", { className: "px-[var(--xen-space-lg)] pb-[var(--xen-space-lg)] pt-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: overdue ? 'danger' : 'default', onClick: onPay, disabled: paying, "aria-busy": paying, className: "w-full", children: `${payLabel} · ${format(amount, currency)}` }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-[var(--xen-space-lg)]" }))] }));
});
//# sourceMappingURL=BillCardV2.js.map