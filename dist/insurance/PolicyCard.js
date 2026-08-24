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
exports.PolicyCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const pressable_1 = require("./internal/pressable");
const POLICY_STATUS = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
const CADENCE_SUFFIX = {
    monthly: '/mo',
    quarterly: '/qtr',
    annual: '/yr',
};
/**
 * A summary card for a single insurance policy. The `variant` (auto/home/life/
 * health) picks a tinted leading glyph disc; a status pill conveys the policy
 * lifecycle by **text + glyph + color** (never color alone). Coverage and
 * premium are integer cents funnelled through `formatMoney`, so printed values
 * never drift. Becomes a keyboard-operable button only when `onClick` is
 * supplied. Token-bound throughout — no literal colors. Web parity of the
 * native `PolicyCard`.
 */
exports.PolicyCard = React.forwardRef(function PolicyCard({ variant, name, policyNumber, coverageCents, premiumCents, cadence = 'monthly', status = 'active', holder, renewalDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const vd = (0, status_1.policyVariant)(variant);
    const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": interactive ? `${name}, ${vd.label} policy, ${sd.label}` : undefined, className: (0, cn_1.cn)(interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: vd.glyph, size: "xl", color: "primary", "aria-label": `${vd.label} policy` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [vd.label, " \u00B7 ", policyNumber] })] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] }), holder != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-sm)] text-xs text-muted", children: ["Insured: ", holder] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Coverage" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: format(Math.max(0, Math.trunc(coverageCents || 0)), currency) })] }), premiumCents != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Premium" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-primary", children: format(Math.max(0, Math.trunc(premiumCents)), currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal text-muted", children: CADENCE_SUFFIX[cadence] })] })] })) : null] }), renewalDate != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-sm)] text-xs text-muted", children: ["Renews ", renewalDate] })) : null] }));
});
//# sourceMappingURL=PolicyCard.js.map