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
exports.BillCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * BillCard, redesigned (v3): a **dense scan line**. A small state dot leads, the
 * provider and a middot-joined `status · line · due · account` caption share the
 * flexible middle, and the amount hugs the right with an optional compact pay
 * button beneath it. No card, no glyph tile — tuned for long bill lists. Distinct
 * at a glance from v1/v2. Same props; status is dot + glyph + label text (never
 * color alone); integer cents; token-pure.
 */
exports.BillCardV3 = React.forwardRef(function BillCardV3({ kind, provider, accountNumber, amountCents, dueDate, status = 'due', currency = 'USD', formatMoney: format = format_1.formatMoney, payLabel = 'Pay', onPay, paying = false, onClick, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.billStatus)(status);
    const slot = (0, format_1.tintSlot)(sd.tone);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const settled = status === 'paid';
    const overdue = status === 'overdue';
    const interactive = onClick != null;
    const caption = [`${sd.glyph} ${sd.label}`, kd.label, dueDate].filter((s) => s != null).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
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
            : {}), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', format_1.SOLID_TINT[slot]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "sm", "aria-label": `${kd.label} bill` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: provider }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: `${caption} · ${accountNumber}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', overdue ? 'text-danger' : 'text-on-surface'), children: format(amount, currency) }), onPay != null && !settled ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", tone: overdue ? 'danger' : 'default', onClick: onPay, disabled: paying, "aria-busy": paying, children: payLabel })) : null] })] }));
});
//# sourceMappingURL=BillCardV3.js.map