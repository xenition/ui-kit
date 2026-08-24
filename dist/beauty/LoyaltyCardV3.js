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
exports.LoyaltyCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TIER = {
    bronze: { label: 'Bronze', glyph: '🥉', text: 'text-warn' },
    silver: { label: 'Silver', glyph: '🥈', text: 'text-muted' },
    gold: { label: 'Gold', glyph: '🥇', text: 'text-accent' },
    platinum: { label: 'Platinum', glyph: '💎', text: 'text-primary' },
};
/**
 * LoyaltyCard, redesigned (v3): a **compact membership row**. The tier glyph, the
 * member name over a tier·id line, and the points balance pinned right — hairline-
 * bordered for a wallet list. The opposite of v2's card face. Same props,
 * token-only.
 */
exports.LoyaltyCardV3 = React.forwardRef(function LoyaltyCardV3({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, className, ...rest }, ref) {
    void nextTierAt;
    void nextTierLabel;
    const t = TIER[tier] ?? TIER.bronze;
    const sub = [`${t.label} member`, memberId].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-loyalty-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: t.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: memberName }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-lg font-bold', t.text), children: points.toLocaleString() }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-muted", children: "points" })] })] }));
});
//# sourceMappingURL=LoyaltyCardV3.js.map