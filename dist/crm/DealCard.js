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
exports.DealCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const WinLossBadge_1 = require("./WinLossBadge");
const internal_1 = require("./internal");
/**
 * Summary card for a single deal / opportunity: name, account, value, stage,
 * win-probability meter, owner avatar and outcome badge. `compact` drops the
 * meter and secondary meta for list use; `highlighted` tints the surface with
 * the `primary-50` token wash for the focused deal. Value is integer cents run
 * through the shared `formatMoney`. Outcome is conveyed by {@link WinLossBadge}
 * (glyph + word), so it never depends on color alone. When `onClick` is set the
 * card becomes a `role="button"` div with Enter/Space activation. All colors are
 * `--xen-*` token classes — no literals.
 */
exports.DealCard = React.forwardRef(function DealCard({ name, company, valueCents, currency = 'USD', stage, probability, owner, closeDate, outcome = 'open', variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const pct = (0, internal_1.clampPct)(probability);
    const showMeter = !compact && probability != null;
    const interactive = onClick && !loading ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "aria-label": onClick && !loading ? `Deal ${name}${company ? `, ${company}` : ''}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', highlighted && 'bg-primary-50 border-primary', onClick && !loading && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading deal", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[70%] rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[40%] rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-bold text-on-surface", children: name }), company ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: company }) : null] }), (0, jsx_runtime_1.jsx)(WinLossBadge_1.WinLossBadge, { outcome: outcome, size: "sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: (0, commerce_1.formatMoney)(valueCents, currency) }), stage ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-muted", children: stage }) : null] }), showMeter ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: "Probability" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-semibold", children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, className: "h-1.5 overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-primary", style: { width: `${pct}%` } }) })] })) : null, !compact && (owner || closeDate) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [owner ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: owner.name, src: owner.avatarUrl }), owner.name ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: owner.name }) : null] })) : ((0, jsx_runtime_1.jsx)("span", {})), closeDate ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: closeDate }) : null] })) : null] })) }));
});
//# sourceMappingURL=DealCard.js.map