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
exports.PolicyCardV2 = void 0;
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
 * PolicyCard, redesigned (**V2**) — an **elevated hero card**. A large tinted
 * glyph tile anchors the top row beside the plan name and a status pill; a
 * full-width tinted **coverage band** makes the benefit amount the visual
 * anchor, with the premium and renewal as a quiet footer. Status is conveyed by
 * glyph + text + color (never color-alone); coverage/premium stay integer cents
 * via `formatMoney`. Becomes a keyboard-operable button only when `onClick` is
 * set. Same `PolicyCardProps`; drops in for `PolicyCard`. Token-pure.
 */
exports.PolicyCardV2 = React.forwardRef(function PolicyCardV2({ variant, name, policyNumber, coverageCents, premiumCents, cadence = 'monthly', status = 'active', holder, renewalDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const vd = (0, status_1.policyVariant)(variant);
    const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "elevated", padding: "lg", radius: "lg", "aria-label": interactive ? `${name}, ${vd.label} policy, ${sd.label}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-primary/10 shadow-sm", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: vd.glyph, size: "3xl", color: "primary", "aria-label": `${vd.label} policy` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-xl font-extrabold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [vd.label, " \u00B7 ", policyNumber] }), holder != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["Insured: ", holder] })) : null] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: "Total coverage" }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `Coverage ${coverage}`, className: "text-2xl font-extrabold text-on-surface", children: coverage })] }), premiumCents != null || renewalDate != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [premiumCents != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary", children: format(Math.max(0, Math.trunc(premiumCents)), currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: CADENCE_SUFFIX[cadence] })] })) : ((0, jsx_runtime_1.jsx)("span", {})), renewalDate != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Renews ", renewalDate] })) : null] })) : null] }));
});
//# sourceMappingURL=PolicyCardV2.js.map