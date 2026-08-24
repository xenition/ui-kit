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
exports.PlanSelectorV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
/**
 * PlanSelector, redesigned (v2): a **stacked plan-card picker**. A pill billing
 * toggle leads; each tier is a full bordered card — name + badge ribbon, a large
 * price with caption, and a checked feature list — and the selected card fills
 * with a primary ring + tint. Bolder than v1's compact list. Same props,
 * token-only.
 */
exports.PlanSelectorV2 = React.forwardRef(function PlanSelectorV2({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, className, ...rest }, ref) {
    if (plans.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCB3" }), title: "No plans available", className: className, ...rest });
    }
    const annual = billingPeriod === 'annual';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3', className), role: "radiogroup", "aria-label": "Plans", ...rest, children: [showBillingToggle ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "inline-flex rounded-full border border-border p-0.5", children: ['monthly', 'annual'].map((p) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": billingPeriod === p, onClick: () => onBillingPeriodChange?.(p), className: (0, cn_1.cn)('rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors', billingPeriod === p ? 'bg-primary text-on-primary' : 'text-muted'), children: p }, p))) }), annual && annualSavingsLabel ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: annualSavingsLabel }) : null] })) : null, plans.map((plan) => {
                const selected = plan.id === selectedPlanId;
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, onClick: () => onSelectPlan?.(plan.id), className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg border-2 p-4 text-left transition-colors', selected ? 'border-primary bg-primary/10' : plan.highlighted ? 'border-primary/40 bg-surface' : 'border-border bg-surface hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: plan.name }), plan.badge ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: plan.badge }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: annual ? plan.annualPrice : plan.monthlyPrice }), plan.priceCaption ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: plan.priceCaption }) : null] }), plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-1", children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-1.5 text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), " ", f] }, i))) })) : null] }, plan.id));
            })] }));
});
//# sourceMappingURL=PlanSelectorV2.js.map