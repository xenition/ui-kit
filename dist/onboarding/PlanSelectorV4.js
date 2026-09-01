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
exports.PlanSelectorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const SegmentedV4_1 = require("../primitives/SegmentedV4");
const TextV4_1 = require("../primitives/TextV4");
const flow_v4_1 = require("./internal/flow-v4");
/** The price a plan shows for the active cadence. */
function priceFor(plan, period) {
    return period === 'annual' ? plan.annualPrice : plan.monthlyPrice;
}
/**
 * The undiscounted price for the active cadence — **only** when it is
 * genuinely different from the price being charged.
 *
 * A "was" price equal to the "now" price is a fabricated discount, and this is
 * the one place the component gets to refuse to draw one. It cannot compare
 * magnitudes, because both are already-formatted strings in the host's
 * currency and locale, so it compares them as the host wrote them: identical
 * strings are not a discount.
 */
function compareAtFor(plan, period) {
    const was = period === 'annual' ? plan.compareAtAnnualPrice : plan.compareAtMonthlyPrice;
    if (!was)
        return null;
    return was === priceFor(plan, period) ? null : was;
}
/**
 * The step a struck "was" price takes. Whole class names, because Tailwind's
 * content scanner reads source text and cannot follow `text-${size}`.
 */
const COMPARE_SIZE = { xs: 'text-xs', sm: 'text-sm', base: 'text-base' };
/** The struck "was" price — announced, never only drawn. */
function ComparePrice({ was, size, }) {
    return ((0, jsx_runtime_1.jsx)("s", { "aria-label": `Was ${was}`, className: (0, cn_1.cn)('text-muted-text [font-variant-numeric:tabular-nums]', COMPARE_SIZE[size]), children: was }));
}
/** The monthly/annual toggle plus its savings pill. */
function BillingToggleV4({ billingPeriod, onBillingPeriodChange, annualSavingsLabel, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(SegmentedV4_1.SegmentedV4, { options: [
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Annual', value: 'annual' },
                ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", children: annualSavingsLabel })) : null] }));
}
/**
 * The `'offer'` card — the reference paywall's plan block, exactly.
 *
 * ```
 * ┌──────────────────────────────────────────────┐
 * │ Yearly plan  [20% OFF]              $̶2̶9̶.̶9̶9̶   │
 * │ $23.99 / year                   $0.07/day    │
 * └──────────────────────────────────────────────┘
 * ```
 *
 * The price is the largest thing on it, because the price is the decision.
 */
function OfferCard({ plan, period, onSelect, }) {
    const price = priceFor(plan, period);
    const was = compareAtFor(plan, period);
    const caption = plan.priceCaption ?? (period === 'annual' ? '/ year' : '/ month');
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": true, onClick: onSelect, "data-xen-v4-chrome": "on-surface", 
        // The ground is `card`, not `surface`: on a dark page a shadow alone is
        // nearly invisible, and a card that paints the page colour leaves its
        // border doing all the work.
        className: "flex w-full flex-col gap-sm rounded-[var(--xen-radius-lg)] border-2 border-[var(--flow-fill)] bg-card p-lg text-left shadow-[var(--xen-elevation-card)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: plan.name }), plan.savingsLabel ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", size: "sm", children: plan.savingsLabel })) : null] }), was ? (0, jsx_runtime_1.jsx)(ComparePrice, { was: was, size: "base" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-3xl font-bold text-on-card [font-variant-numeric:tabular-nums]", children: price }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", tone: "mutedText", children: caption })] }), plan.perUnitPrice ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "mutedText", className: "[font-variant-numeric:tabular-nums]", children: plan.perUnitPrice })) : null] }), plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "mt-xs flex flex-col gap-xs", children: plan.features.map((feature) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", className: "text-success-text" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: feature })] }, feature))) })) : null] }));
}
/** One §7 plan card — two-up, selected filled, badge top-right, name never clipped. */
function PlanCardV4({ plan, price, was, selected, onSelect, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, onClick: onSelect, "data-xen-v4-chrome": selected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex flex-1 flex-col gap-sm rounded-[var(--xen-radius-lg)] p-lg text-left', selected
            ? 'border-2 border-[var(--flow-fill)] bg-[var(--flow-fill)] text-[var(--flow-on-fill)]'
            : 'border border-border bg-card text-on-card'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-start justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold", children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: selected ? 'neutral' : 'success', variant: "soft", size: "sm", children: plan.badge })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-2xl font-bold [font-variant-numeric:tabular-nums]", children: price }), was ? ((0, jsx_runtime_1.jsx)("s", { "aria-label": `Was ${was}`, className: "text-sm opacity-70 [font-variant-numeric:tabular-nums]", children: was })) : null] }), plan.priceCaption ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs opacity-80", children: plan.priceCaption }) : null, plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-xs text-sm", children: plan.features.map((feature) => ((0, jsx_runtime_1.jsx)("li", { children: feature }, feature))) })) : null] }));
}
/** The stacked list rendering — the right shape for a settings screen. */
function PlanRowV4({ plan, price, was, selected, onSelect, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, onClick: onSelect, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] bg-card p-md text-left', selected ? 'border-2 border-[var(--flow-fill)]' : 'border border-border'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-lg w-lg shrink-0 items-center justify-center rounded-full', selected ? 'bg-[var(--flow-fill)] text-[var(--flow-on-fill)]' : 'border border-border'), children: selected ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "xs" }) : null }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", children: plan.name }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: plan.priceCaption })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-bold text-on-card [font-variant-numeric:tabular-nums]", children: price }), was ? (0, jsx_runtime_1.jsx)(ComparePrice, { was: was, size: "xs" }) : null] })] }));
}
/** How many cards sit on one row. A lone plan takes the full width (§7). */
const COLUMNS = 2;
/** Split `plans` into rows of `columns`, so every card keeps an equal width. */
function chunk(plans, columns) {
    const rows = [];
    for (let i = 0; i < plans.length; i += columns)
        rows.push(plans.slice(i, i + columns));
    return rows;
}
/**
 * **V4 plan selector** — the web twin of the native `PlanSelectorV4`, the
 * base's props with `layout` widened to add `'offer'`, plus `accent` and
 * `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **`'offer'`.** The reference paywall does not offer a choice — it offers
 *    a *deal*, on one card, and the base could not draw it: `PlanTier` had one
 *    price per cadence, no compare-at, no savings pill, no per-unit caption.
 *    Those four fields are now on the type (all optional). It renders the
 *    **selected** plan, or the first, and ignores the rest.
 * 2. **Cards sit on `card`, not `surface`.**
 * 3. **A fabricated discount is refused** (see {@link compareAtFor}).
 * 4. **Both prices are announced** (see {@link ComparePrice}).
 * 5. **Hover and press are the shared chrome state layers**, not per-card
 *    opacity.
 *
 * The empty state is a message, not a blank box, and its copy is a prop.
 */
exports.PlanSelectorV4 = React.forwardRef(function PlanSelectorV4({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'cards', accent = 'primary', emptyMessage = 'No plans available.', className, style, ...rest }, ref) {
    const vars = { ...(0, flow_v4_1.flowGroundVars)('plain', accent), ...style };
    if (!plans || plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: vars, className: (0, cn_1.cn)('flex justify-center p-lg', className), ...rest, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: emptyMessage }) }));
    }
    const offer = layout === 'offer';
    // An offer screen shows one offer. `selectedPlanId` picks it so a host can
    // still swap the deal without changing the array it passes.
    const featured = plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];
    const columns = plans.length === 1 ? 1 : COLUMNS;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: vars, className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: [showBillingToggle && !offer ? ((0, jsx_runtime_1.jsx)(BillingToggleV4, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": "Choose a plan", className: "flex flex-col gap-md", children: offer ? ((0, jsx_runtime_1.jsx)(OfferCard, { plan: featured, period: billingPeriod, onSelect: () => onSelectPlan?.(featured.id) })) : layout === 'list' ? (plans.map((plan) => ((0, jsx_runtime_1.jsx)(PlanRowV4, { plan: plan, price: priceFor(plan, billingPeriod), was: compareAtFor(plan, billingPeriod), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id)))) : (chunk(plans, columns).map((row, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-stretch gap-md", children: [row.map((plan) => ((0, jsx_runtime_1.jsx)(PlanCardV4, { plan: plan, price: priceFor(plan, billingPeriod), was: compareAtFor(plan, billingPeriod), selected: plan.id === selectedPlanId, onSelect: () => onSelectPlan?.(plan.id) }, plan.id))), row.length < columns ? (0, jsx_runtime_1.jsx)("span", { className: "flex-1" }) : null] }, i)))) })] }));
});
//# sourceMappingURL=PlanSelectorV4.js.map