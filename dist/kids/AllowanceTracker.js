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
exports.AllowanceTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
function fmt(currency, amount) {
    return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
/**
 * A child's allowance wallet: a headline balance, an earned/spent split, an
 * optional savings-goal progress bar, and add/withdraw actions. Renders the
 * shared {@link EmptyState} when no balance is set. Earned/spent carry `+`/`−`
 * signs alongside their token color, so the split reads without color alone.
 * Token-bound throughout — no literal colors.
 */
exports.AllowanceTracker = React.forwardRef(function AllowanceTracker({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-allowance-tracker": "", "aria-label": "Loading allowance", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/3 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-7 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" })] }) }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-allowance-tracker": "", "aria-label": emptyLabel, className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDC37" }), title: "Allowance", description: emptyLabel, ...rest }));
    }
    const goalPct = goal && goal.target > 0 ? Math.max(0, Math.min(100, (balance / goal.target) * 100)) : undefined;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-allowance-tracker": "", "aria-label": `Balance ${fmt(currency, balance)}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Balance" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-extrabold text-on-surface", children: fmt(currency, balance) })] }), typeof earned === 'number' || typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex gap-8", children: [typeof earned === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Earned" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-success", children: `+${fmt(currency, earned)}` })] })) : null, typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Spent" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-danger", children: `−${fmt(currency, spent)}` })] })) : null] })) : null, goal && goalPct !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 space-y-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: ["\uD83C\uDFAF ", goal.label] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [fmt(currency, balance), " / ", fmt(currency, goal.target)] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: balance, max: goal.target, tone: "success" })] })) : null, onAdd || onWithdraw ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex gap-2", children: [onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "flex-1", onClick: () => onAdd(), children: "Add" })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", className: "flex-1", onClick: () => onWithdraw(), children: "Spend" })) : null] })) : null] }));
});
//# sourceMappingURL=AllowanceTracker.js.map