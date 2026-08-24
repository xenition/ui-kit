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
exports.AllowanceTrackerV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
function fmt(currency, amount) {
    return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
/**
 * AllowanceTracker, redesigned (v3): a **compact balance row**. A piggy glyph, a
 * tiny "Balance" caption over the figure, an optional goal-percent chip, and a
 * small Add/Spend pair — all on one dense line for embedding in a list. The
 * opposite of v2's tall hero card. Same props, same empty state, token-only.
 */
exports.AllowanceTrackerV3 = React.forwardRef(function AllowanceTrackerV3({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, className, ...rest }, ref) {
    void earned;
    void spent;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-allowance-tracker": "", "aria-label": "Loading allowance", className: (0, cn_1.cn)('flex items-center gap-3 rounded-md border border-border p-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-24 animate-pulse rounded-sm bg-neutral-200" })] }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-allowance-tracker": "", "aria-label": emptyLabel, className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDC37" }), title: "Allowance", description: emptyLabel, ...rest }));
    }
    const pct = goal && goal.target > 0 ? Math.min(100, Math.round((balance / goal.target) * 100)) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-allowance-tracker": "", className: (0, cn_1.cn)('flex items-center gap-3 rounded-md border border-border p-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-2xl leading-none", children: "\uD83D\uDC37" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs uppercase tracking-wide text-muted", children: "Balance" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: fmt(currency, balance) })] }), pct !== null ? ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary", children: [pct, "%"] })) : null, onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: onAdd, children: "Add" })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onWithdraw, children: "Spend" })) : null] }));
});
//# sourceMappingURL=AllowanceTrackerV3.js.map