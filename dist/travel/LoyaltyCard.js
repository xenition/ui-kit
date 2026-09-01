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
/**
 * LoyaltyCard — a **V4** "journey" loyalty card (web parity of the native twin).
 * A miles / points membership card on the brand gradient: the program name and a
 * frosted tier chip up top, the balance (formatted via `toLocaleString()`) in
 * near-white ink, an optional token-driven progress bar toward the next tier, and
 * the member name / id as a frosted footer row. All colors from `--xen-*` token
 * classes and gradient utilities — no literals; dark-mode safe.
 */
exports.LoyaltyCard = React.forwardRef(function LoyaltyCard({ program, memberName, tier, points, memberId, nextTierPoints, unitLabel = 'points', className, ...rest }, ref) {
    const balance = Math.max(0, Math.trunc(points || 0));
    const hasNext = typeof nextTierPoints === 'number' && nextTierPoints > balance;
    const remaining = hasNext ? nextTierPoints - balance : 0;
    const pct = hasNext ? Math.min(100, Math.max(0, Math.round((balance / nextTierPoints) * 100))) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-loyalty-card": "", "aria-label": `${program} loyalty card, ${tier}, ${balance.toLocaleString()} ${unitLabel}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50", children: "\u2726" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-base font-extrabold text-primary-50", children: program })] }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-primary-50", children: tier })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: "Balance" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-3xl font-extrabold tracking-tight text-primary-50", children: [balance.toLocaleString(), (0, jsx_runtime_1.jsx)("span", { className: "ml-1.5 text-base font-semibold text-primary-100", children: unitLabel })] })] }), hasNext ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, "aria-label": `${remaining.toLocaleString()} ${unitLabel} to next tier`, className: "h-2 w-full overflow-hidden rounded-full bg-primary-50/20", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-on-primary", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-primary-100", children: [remaining.toLocaleString(), " ", unitLabel, " to next tier"] })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: "Member" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-sm font-bold text-primary-50", children: memberName })] }), memberId ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: "Member ID" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tracking-wide text-primary-50", children: memberId })] })) : null] })] }));
});
//# sourceMappingURL=LoyaltyCard.js.map