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
exports.AllowanceTrackerV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const ProgressRing_1 = require("../charts/ProgressRing");
const commerce_1 = require("../commerce");
function fmt(currency, amount) {
    return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
/**
 * AllowanceTracker, redesigned (v2): a **wallet hero card**. A big centered
 * balance leads; the savings goal renders as a circular ring medallion showing
 * percent to target; earned and spent sit in two tinted stat pills below;
 * Add/Spend anchor the card. Elevated. Distinct from v1's stacked layout. Same
 * props, same empty state, token-only.
 */
exports.AllowanceTrackerV2 = React.forwardRef(function AllowanceTrackerV2({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-allowance-tracker": "", "aria-label": "Loading allowance", className: (0, cn_1.cn)('flex flex-col items-center gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-1/2 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 animate-pulse rounded-full bg-neutral-200" })] }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-allowance-tracker": "", "aria-label": emptyLabel, className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDC37" }), title: "Allowance", description: emptyLabel, ...rest }));
    }
    const pct = goal && goal.target > 0 ? Math.min(100, Math.round((balance / goal.target) * 100)) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-allowance-tracker": "", className: (0, cn_1.cn)('flex flex-col items-center gap-3 rounded-lg bg-surface p-md text-center shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs uppercase tracking-wide text-muted", children: "Balance" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-on-surface", children: fmt(currency, balance) })] }), goal && pct !== null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)(ProgressRing_1.ProgressRing, { value: pct, max: 100, size: 92, thickness: 10, color: "primary", showValue: true }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [goal.label, " \u00B7 ", fmt(currency, goal.target)] })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "grid w-full grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded-md bg-success/10 px-3 py-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Earned" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-bold text-success", children: ["+", fmt(currency, earned ?? 0)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-md bg-danger/10 px-3 py-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Spent" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-bold text-danger", children: ["\u2212", fmt(currency, spent ?? 0)] })] })] }), (onAdd || onWithdraw) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full gap-2", children: [onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onAdd, children: "Add" })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onWithdraw, children: "Spend" })) : null] })) : null] }));
});
//# sourceMappingURL=AllowanceTrackerV2.js.map