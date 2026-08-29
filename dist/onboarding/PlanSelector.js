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
exports.BillingToggle = BillingToggle;
exports.PlanCard = PlanCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Segmented_1 = require("../primitives/Segmented");
const Text_1 = require("../primitives/Text");
const commerce_1 = require("../commerce");
/**
 * The monthly/annual cadence toggle plus its savings pill — identical across
 * the three lines, so it lives in one place.
 */
function BillingToggle({ billingPeriod, onBillingPeriodChange, annualSavingsLabel, spread = false, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-2', spread && 'justify-between'), children: [(0, jsx_runtime_1.jsx)(Segmented_1.Segmented, { options: [
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Annual', value: 'annual' },
                ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: annualSavingsLabel })) : null] }));
}
/**
 * One §7 plan card. Selected takes the `primary` fill plus the 2px ring;
 * unselected stays outlined. The "BEST"/"SAVE 20%" badge sits top-right of the
 * card it belongs to.
 */
function PlanCard({ plan, price, selected, onSelect, }) {
    const fg = selected ? 'onPrimary' : 'onSurface';
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${plan.name}, ${price}`, onClick: onSelect, className: (0, cn_1.cn)('flex w-full flex-col gap-2 rounded-[var(--xen-radius-lg)] p-5 text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected
            ? 'border-2 border-primary bg-primary'
            : plan.highlighted
                ? 'border border-accent bg-surface'
                : 'border border-border bg-surface'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-start justify-between gap-1", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", tone: fg, className: "min-w-0", children: plan.name }), plan.badge ? (
                    // §7 asks for the badge "in colors.success on successText". The
                    // compiled palette has no legible form of that pair on a card: on web
                    // the soft-success badge is a NEUTRAL ground with success text, and
                    // successText is tuned for `surface`, not for a primary fill. The
                    // solid success/onSuccess pair is the one that reads as "success" on
                    // both an outlined and a filled card, and it is identical on both
                    // twins — so that is what both use.
                    (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: plan.badge })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: fg, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-col gap-1", children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-start gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "sm", color: selected ? 'onPrimary' : 'success' }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', children: f })] }, i))) })) : null] }));
}
/** The original stacked row — kept for `layout="list"`. */
function PlanRow({ plan, price, selected, onSelect, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${plan.name}, ${price}`, onClick: onSelect, className: (0, cn_1.cn)('flex flex-col gap-1 rounded-[var(--xen-radius-lg)] bg-surface p-5 text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', selected
            ? 'border-2 border-primary'
            : plan.highlighted
                ? 'border-2 border-accent'
                : 'border border-border'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "bold", children: plan.name }), plan.badge ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: plan.badge }) : null] }), selected ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "base", color: "primary", "aria-label": "Selected" }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-1 flex flex-col gap-1", children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: f })] }, i))) })) : null] }));
}
/**
 * Subscription tier picker — a `radiogroup` of plan cards plus an optional
 * monthly/annual {@link Segmented} toggle that swaps every card's price.
 *
 * The default is the reference pair (§7): two-up, equal width, `radius.lg`, the
 * selected card taking the `primary` fill and a 2px ring while the others stay
 * outlined, with a tier's "BEST"/"SAVE 20%" badge top-right of its own card. A
 * lone plan takes the full width rather than sitting in half a grid.
 * `layout="list"` restores the older stacked rows for dense contexts.
 *
 * Each card is a `radio` announcing its `checked` state; prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list with the {@link EmptyState}. No literal colors.
 */
exports.PlanSelector = React.forwardRef(function PlanSelector({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'cards', className, ...rest }, ref) {
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "No plans available." }) }));
    }
    const priceOf = (plan) => billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-4', className), ...rest, children: [showBillingToggle ? ((0, jsx_runtime_1.jsx)(BillingToggle, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": "Choose a plan", className: (0, cn_1.cn)('gap-4', layout === 'list'
                    ? 'flex flex-col'
                    : // A lone plan takes the full width rather than half a grid.
                        (0, cn_1.cn)('grid', plans.length === 1 ? 'grid-cols-1' : 'grid-cols-2')), children: plans.map((plan) => layout === 'list' ? ((0, jsx_runtime_1.jsx)(PlanRow, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id)) : ((0, jsx_runtime_1.jsx)(PlanCard, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id))) })] }));
});
//# sourceMappingURL=PlanSelector.js.map