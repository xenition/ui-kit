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
exports.PlanSelectorV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * PlanSelector, redesigned (v3): a **compact plan list**. A small billing toggle,
 * then each tier as one selectable row — a radio dot, the name (+ a badge chip),
 * and the price pinned right. Dense for a settings/checkout context. The opposite
 * of v2's stacked cards. Same props, token-only.
 */
exports.PlanSelectorV3 = React.forwardRef(function PlanSelectorV3({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, className, ...rest }, ref) {
    if (plans.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCB3" }), title: "No plans available", className: className, ...rest });
    }
    const annual = billingPeriod === 'annual';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col', className), role: "radiogroup", "aria-label": "Plans", ...rest, children: [showBillingToggle ? ((0, jsx_runtime_1.jsxs)("div", { className: "mb-1 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "inline-flex rounded-md border border-border p-0.5 text-xs", children: ['monthly', 'annual'].map((p) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": billingPeriod === p, onClick: () => onBillingPeriodChange?.(p), className: (0, cn_1.cn)('rounded px-2 py-0.5 font-semibold capitalize', billingPeriod === p ? 'bg-primary text-on-primary' : 'text-muted'), children: p }, p))) }), annual && annualSavingsLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-success", children: annualSavingsLabel }) : null] })) : null, plans.map((plan) => {
                const selected = plan.id === selectedPlanId;
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, onClick: () => onSelectPlan?.(plan.id), className: "flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors hover:bg-neutral-50", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-4 w-4 shrink-0 items-center justify-center rounded-full border', selected ? 'border-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }) : null }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 truncate text-sm font-medium text-on-surface", children: [plan.name, plan.badge ? (0, jsx_runtime_1.jsx)("span", { className: "ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary", children: plan.badge }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: annual ? plan.annualPrice : plan.monthlyPrice })] }, plan.id));
            })] }));
});
//# sourceMappingURL=PlanSelectorV3.js.map