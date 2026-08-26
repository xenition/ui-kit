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
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const commerce_1 = require("../commerce");
const PlanSelector_1 = require("./PlanSelector");
/** One dense comparison row. */
function PlanRow({ plan, price, selected, onSelect, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${plan.name}, ${price}`, onClick: onSelect, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-lg)] px-4 py-2 text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected ? 'border-2 border-primary bg-primary/10' : 'border border-border bg-surface'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-primary bg-primary' : 'border-border bg-surface'), children: selected ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "xs", color: "onPrimary" }) : null }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", size: "sm", children: plan.badge })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", numberOfLines: 1, children: plan.features.join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "muted", children: plan.priceCaption })) : null] })] }));
}
/**
 * PlanSelector, redesigned (v3): the compact line. Dense selectable rows that
 * align a radio indicator, the name (+ its badge), a one-line feature summary
 * and the price into scannable columns; the selected row keeps the 2px ring and
 * a faint primary tint. This is the one selector whose `layout` defaults to
 * `'list'` — a dense sheet is what the v3 line is *for* — and passing
 * `layout="cards"` gives the §7 pair instead. Same props, token-only.
 */
exports.PlanSelectorV3 = React.forwardRef(function PlanSelectorV3({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'list', className, ...rest }, ref) {
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "card", size: "2xl", color: "muted" }), title: "No plans available", className: className, ...rest }));
    }
    const priceOf = (plan) => billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3', className), ...rest, children: [showBillingToggle ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.BillingToggle, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel, spread: true })) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": "Choose a plan", className: (0, cn_1.cn)('gap-2', layout === 'cards'
                    ? (0, cn_1.cn)('grid', plans.length === 1 ? 'grid-cols-1' : 'grid-cols-2')
                    : 'flex flex-col'), children: plans.map((plan) => layout === 'cards' ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanCard, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id)) : ((0, jsx_runtime_1.jsx)(PlanRow, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id))) })] }));
});
//# sourceMappingURL=PlanSelectorV3.js.map