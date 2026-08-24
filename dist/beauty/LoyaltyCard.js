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
exports.LoyaltyCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TIER_META = {
    bronze: { label: 'Bronze', glyph: '🥉', text: 'text-warn', fill: 'bg-warn' },
    silver: { label: 'Silver', glyph: '🥈', text: 'text-muted', fill: 'bg-muted' },
    gold: { label: 'Gold', glyph: '🥇', text: 'text-accent', fill: 'bg-accent' },
    platinum: { label: 'Platinum', glyph: '💎', text: 'text-primary', fill: 'bg-primary' },
};
/**
 * A membership loyalty card: tier badge, member name/id, a large points balance,
 * and (when `nextTierAt` is set) a progress bar toward the next tier with a
 * remaining-points caption. `tier` drives the accent, glyph, and label — never
 * color alone. Progress is clamped and guards a zero/invalid target. Token-only
 * colors.
 */
exports.LoyaltyCard = React.forwardRef(function LoyaltyCard({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, className, ...rest }, ref) {
    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
    const pct = hasTarget ? Math.max(0, Math.min(1, points / nextTierAt)) : 1;
    const remaining = hasTarget ? nextTierAt - points : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-loyalty-card": tier, "aria-label": `${meta.label} member ${memberName}, ${points} points${hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: memberName }), memberId ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: memberId }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)] rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', meta.text), children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-extrabold', meta.text), children: points }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "points" })] }), hasTarget ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2 overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full rounded-full', meta.fill), style: { width: `${pct * 100}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [remaining, " points to ", nextTierLabel ?? 'next tier'] })] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-success", children: "Top tier reached" }))] }));
});
//# sourceMappingURL=LoyaltyCard.js.map