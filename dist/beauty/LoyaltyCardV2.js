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
exports.LoyaltyCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TIER = {
    bronze: { label: 'Bronze', glyph: '🥉', tint: 'bg-warn/10', text: 'text-warn', fill: 'bg-warn' },
    silver: { label: 'Silver', glyph: '🥈', tint: 'bg-neutral-100', text: 'text-muted', fill: 'bg-neutral-400' },
    gold: { label: 'Gold', glyph: '🥇', tint: 'bg-accent/10', text: 'text-accent', fill: 'bg-accent' },
    platinum: { label: 'Platinum', glyph: '💎', tint: 'bg-primary/10', text: 'text-primary', fill: 'bg-primary' },
};
/**
 * LoyaltyCard, redesigned (v2): a **membership card face**. A tier-tinted card with
 * the tier glyph + label, member name/id, a big points balance, and a next-tier
 * progress bar. Bolder than v1. Same props, token-only.
 */
exports.LoyaltyCardV2 = React.forwardRef(function LoyaltyCardV2({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, className, ...rest }, ref) {
    const t = TIER[tier] ?? TIER.bronze;
    const pct = typeof nextTierAt === 'number' && nextTierAt > 0 ? Math.min(100, Math.round((points / nextTierAt) * 100)) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-loyalty-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-xl p-md shadow-md', t.tint, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5 text-sm font-bold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: t.glyph }), " ", t.label, " member"] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", "aria-hidden": true, children: "\uD83D\uDC96" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: memberName }), memberId ? (0, jsx_runtime_1.jsx)("p", { className: "font-mono text-xs text-muted", children: memberId }) : null] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-3xl font-bold', t.text), children: points.toLocaleString() }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "points" })] }), pct !== null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-2 w-full overflow-hidden rounded-full bg-surface/60", role: "progressbar", "aria-valuenow": points, "aria-valuemin": 0, "aria-valuemax": nextTierAt, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', t.fill), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: [nextTierAt - points, " pts to ", nextTierLabel ?? 'next tier'] })] })) : null] }));
});
//# sourceMappingURL=LoyaltyCardV2.js.map