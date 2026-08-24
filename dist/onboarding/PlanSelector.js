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
exports.PlanSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Segmented_1 = require("../primitives/Segmented");
const commerce_1 = require("../commerce");
/**
 * Subscription tier picker — a `radiogroup` of clickable plan cards plus an
 * optional monthly/annual {@link Segmented} toggle that swaps every card's
 * price. The selected card lifts to the primary border and shows a check; each
 * card is a `radio` announcing its `checked` state to screen readers. Prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list with the {@link EmptyState}. No literal colors.
 */
exports.PlanSelector = React.forwardRef(function PlanSelector({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, className, ...rest }, ref) {
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "No plans available." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-4', className), ...rest, children: [showBillingToggle ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Segmented_1.Segmented, { options: [
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Annual', value: 'annual' },
                        ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: annualSavingsLabel })) : null] })) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": "Choose a plan", className: "flex flex-col gap-2", children: plans.map((plan) => {
                    const selected = plan.id === selectedPlanId;
                    const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${plan.name}, ${price}`, onClick: () => onSelectPlan?.(plan.id), className: (0, cn_1.cn)('flex flex-col gap-1 rounded-[var(--xen-radius-lg)] bg-surface p-5 text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected
                            ? 'border-2 border-primary'
                            : plan.highlighted
                                ? 'border-2 border-accent'
                                : 'border border-border'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: plan.name }), plan.badge ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: plan.badge }) : null] }), selected ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "base", color: "primary", "aria-label": "Selected" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-col gap-1", children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: f })] }, i))) })) : null] }, plan.id));
                }) })] }));
});
//# sourceMappingURL=PlanSelector.js.map