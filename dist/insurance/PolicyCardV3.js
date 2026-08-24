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
exports.PolicyCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const pressable_1 = require("./internal/pressable");
/** Decorative per-line category tint for the leading disc (not a status signal). */
const VARIANT_DISC = {
    auto: 'bg-primary/10',
    home: 'bg-accent/20',
    life: 'bg-success/10',
    health: 'bg-warn/10',
};
const STATUS_META = {
    active: { label: 'Active', glyph: '✓', text: 'text-success' },
    pending: { label: 'Pending', glyph: '⋯', text: 'text-warn' },
    lapsed: { label: 'Lapsed', glyph: '!', text: 'text-danger' },
    cancelled: { label: 'Cancelled', glyph: '✕', text: 'text-muted' },
};
/**
 * PolicyCard, redesigned (**V3**) — a **minimal single line**. A tinted category
 * disc (a decorative hue, reinforced by the glyph and the line label — never
 * color-alone) leads into the plan name and number; the coverage sits quietly on
 * the right, with the policy status shown as a small glyph + label. No card
 * chrome — separation comes from spacing. Becomes a keyboard-operable button
 * only when `onClick` is set. Same `PolicyCardProps`; drops in for dense policy
 * lists. Token-pure.
 */
exports.PolicyCardV3 = React.forwardRef(function PolicyCardV3({ variant, name, policyNumber, coverageCents, status = 'active', currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, 
// Consume the base props unused by this dense layout so they are not
// forwarded onto the DOM node.
premiumCents: _premiumCents, cadence: _cadence, holder: _holder, renewalDate: _renewalDate, ...rest }, ref) {
    const vd = (0, status_1.policyVariant)(variant);
    const sm = STATUS_META[status] ?? STATUS_META.active;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${name}, ${vd.label} policy, ${sm.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border', VARIANT_DISC[variant] ?? VARIANT_DISC.auto), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: vd.glyph, size: "sm", "aria-label": `${vd.label} policy` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: policyNumber }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-semibold', sm.text), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sm.glyph }), " ", sm.label] })] })] }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `Coverage ${coverage}`, className: "shrink-0 text-sm font-bold text-on-surface", children: coverage })] }));
});
//# sourceMappingURL=PolicyCardV3.js.map