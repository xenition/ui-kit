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
exports.RatePlanCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const VARIANT = {
    fixed: { label: 'Fixed rate', glyph: '🔒' },
    variable: { label: 'Variable', glyph: '📈' },
    'time-of-use': { label: 'Time-of-use', glyph: '⏱️' },
    tiered: { label: 'Tiered', glyph: '📊' },
    green: { label: '100% renewable', glyph: '🌱' },
};
/**
 * A selectable rate-plan card: a per-unit price headline (integer cents via
 * `formatMoney`, so it never drifts), a rate-structure glyph + label, an optional
 * feature list, and a select action. The `selected` state is conveyed by **a
 * badge + label + an accent ring** (never color alone). The select `Button`
 * renders only when `onSelect` is supplied. Every color traces to a `--xen-*`
 * token — no literals. Web parity of the native `RatePlanCard`.
 */
exports.RatePlanCard = React.forwardRef(function RatePlanCard({ name, variant = 'fixed', rateCents, unit, term, features, selected = false, currency = 'USD', formatMoney: format = format_1.formatMoney, selectLabel = 'Choose plan', onSelect, className, ...rest }, ref) {
    const vd = VARIANT[variant] ?? VARIANT.fixed;
    const rate = Math.max(0, Math.trunc(rateCents || 0));
    const rows = Array.isArray(features) ? features : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, variant: selected ? 'elevated' : 'outlined', className: (0, cn_1.cn)(selected && 'border-2 border-primary bg-primary/5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: vd.glyph, size: "lg", "aria-label": vd.label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [vd.label, term != null ? ` · ${term}` : ''] })] }), selected ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: "\u2713 Current" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-primary", children: format(rate, currency) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["/", unit] })] }), rows.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: rows.map((f, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success", "aria-label": "included" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-on-surface", children: f })] }, `${f}-${i}`))) })) : null, onSelect != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: selected ? 'outline' : 'primary', onClick: selected ? undefined : onSelect, disabled: selected, className: "mt-[var(--xen-space-md)] w-full", children: selected ? 'Current plan' : selectLabel })) : null] }));
});
//# sourceMappingURL=RatePlanCard.js.map