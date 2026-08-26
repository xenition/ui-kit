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
const Text_1 = require("../primitives/Text");
const commerce_1 = require("../commerce");
const PlanSelector_1 = require("./PlanSelector");
/** One elevated §7 tier card in the side-by-side pair. */
function TierCard({ plan, price, selected, onSelect, }) {
    const fg = selected ? 'onPrimary' : 'onSurface';
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${plan.name}, ${price}`, onClick: onSelect, className: (0, cn_1.cn)('flex w-full flex-col gap-2 rounded-[var(--xen-radius-lg)] p-5 text-left transition-shadow', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected || plan.highlighted ? 'shadow-lg' : 'shadow-md hover:shadow-lg', selected
            ? 'border-2 border-primary bg-primary'
            : plan.highlighted
                ? 'border border-accent bg-surface'
                : 'border border-border bg-surface'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-start justify-between gap-1", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", tone: fg, className: "min-w-0", children: plan.name }), plan.badge ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: plan.badge }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: fg, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-col gap-1", children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-start gap-1.5", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "sm", color: selected ? 'onPrimary' : 'success' }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', children: f })] }, i))) })) : null] }));
}
/**
 * PlanSelector, redesigned (v2): the editorial line. The §7 card pair, lifted —
 * two-up and equal width like the base selector, but shadowed, with the selected
 * card taking the `primary` fill, the 2px ring and the stronger elevation. A
 * lone plan takes the full width rather than half a grid. `layout="list"` stacks
 * the same cards for a dense context. Same props, token-only.
 */
exports.PlanSelectorV2 = React.forwardRef(function PlanSelectorV2({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'cards', className, ...rest }, ref) {
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "card", size: "2xl", color: "muted" }), title: "No plans available", className: className, ...rest }));
    }
    const priceOf = (plan) => billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-6', className), ...rest, children: [showBillingToggle ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.BillingToggle, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": "Choose a plan", className: (0, cn_1.cn)('gap-4', layout === 'list'
                    ? 'flex flex-col'
                    : (0, cn_1.cn)('grid', plans.length === 1 ? 'grid-cols-1' : 'grid-cols-2')), children: plans.map((plan) => ((0, jsx_runtime_1.jsx)(TierCard, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id))) })] }));
});
//# sourceMappingURL=PlanSelectorV2.js.map