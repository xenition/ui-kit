"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSelectorV4 = PlanSelectorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const SegmentedV4_1 = require("../primitives/SegmentedV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const surface_v4_1 = require("../primitives/internal/surface-v4");
const flow_v4_1 = require("./internal/flow-v4");
const PlanSelector_1 = require("./PlanSelector");
/* Geometry the spec fixes by number (§10.1): the selected ring is 2px, an
   unselected outline is the 1px hairline. */
const RING = 2;
const HAIRLINE = 1;
/** How many cards sit on one row. A lone plan takes the full width (§7). */
const COLUMNS = 2;
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
/** The monthly/annual toggle plus its savings pill, on the V4 segmented control. */
function BillingToggleV4({ billingPeriod, onBillingPeriodChange, annualSavingsLabel, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(SegmentedV4_1.SegmentedV4, { options: [
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
 * The struck compare-at is **announced**, not just drawn: "$29.99 $23.99" read
 * aloud as a pair tells a screen reader user nothing about which is which.
 */
function OfferCard({ plan, period, selected, onPress, accent, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, elevation } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, 'plain', accent);
    const price = priceFor(plan, period);
    const was = compareAtFor(plan, period);
    const caption = plan.priceCaption ?? (period === 'annual' ? '/ year' : '/ month');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: [
            plan.name,
            plan.savingsLabel,
            was ? `was ${was},` : null,
            `now ${price} ${caption}`,
            plan.perUnitPrice,
        ]
            .filter(Boolean)
            .join(', '), onPress: onPress, style: ({ pressed }) => [
            {
                alignSelf: 'stretch',
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
                // The offer card is the one raised object on the page — the ground
                // is `card`, not `surface`, so it separates from the page in dark
                // mode too, where a shadow alone is nearly invisible.
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card,
                borderWidth: selected ? RING : HAIRLINE,
                borderColor: selected ? grounds.fill : colors.border,
            },
            (0, surface_v4_1.elevationStyle)(elevation.card),
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            flexShrink: 1,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", style: { flexShrink: 1 }, children: plan.name }), plan.savingsLabel ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", size: "sm", children: plan.savingsLabel })) : null] }), was ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", numeric: "tabular", 
                        // A struck price is a fact about the past, and the label is what
                        // carries that to a reader who cannot see the line through it.
                        accessibilityLabel: `Was ${was}`, style: { textDecorationLine: 'line-through' }, children: was })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'baseline',
                            gap: tokens.spacing.xs,
                            flexShrink: 1,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: price }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", tone: "mutedText", children: caption })] }), plan.perUnitPrice ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "mutedText", numeric: "tabular", children: plan.perUnitPrice })) : null] }), plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: plan.features.map((feature) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", color: "successText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", style: { flex: 1 }, children: feature })] }, feature))) })) : null] }));
}
/** One §7 plan card — two-up, selected filled, badge top-right, name never clipped. */
function PlanCardV4({ plan, price, was, selected, onPress, accent, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, 'plain', accent);
    const fill = selected ? grounds.fill : colors.card;
    const ink = selected ? grounds.onFill : colors.onCard;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: [plan.name, was ? `was ${was},` : null, price].filter(Boolean).join(', '), onPress: onPress, style: ({ pressed }) => ({
            flex: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.sm,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
            borderWidth: selected ? RING : HAIRLINE,
            borderColor: selected ? grounds.fill : colors.border,
        }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", style: { color: ink }, children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: selected ? 'neutral' : 'success', variant: "soft", size: "sm", children: plan.badge })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "2xl", weight: "bold", numeric: "tabular", style: { color: ink }, children: price }), was ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", numeric: "tabular", accessibilityLabel: `Was ${was}`, style: { color: ink, opacity: 0.7, textDecorationLine: 'line-through' }, children: was })) : null] }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: ink, opacity: 0.8 }, children: plan.priceCaption })) : null, plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: plan.features.map((feature) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", style: { color: ink }, children: feature }, feature))) })) : null] }));
}
/** The stacked list rendering — the right shape for a settings screen. */
function PlanRowV4({ plan, price, was, selected, onPress, accent, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, 'plain', accent);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: [plan.name, was ? `was ${was},` : null, price].filter(Boolean).join(', '), onPress: onPress, style: ({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card,
            borderWidth: selected ? RING : HAIRLINE,
            borderColor: selected ? grounds.fill : colors.border,
        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: tokens.spacing.lg,
                    height: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    borderWidth: selected ? 0 : HAIRLINE,
                    borderColor: colors.border,
                    backgroundColor: selected ? grounds.fill : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: selected ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "xs", style: { color: grounds.onFill } }) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", children: plan.name }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: plan.priceCaption })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: price }), was ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", accessibilityLabel: `Was ${was}`, style: { textDecorationLine: 'line-through' }, children: was })) : null] })] }));
}
/**
 * **V4 plan selector** — the base's props with `layout` widened to add
 * `'offer'`, plus `accent` and `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **`'offer'`.** The reference paywall does not offer a choice — it offers
 *    a *deal*, on one card, and the base could not draw it: `PlanTier` had one
 *    price per cadence, no compare-at, no savings pill, no per-unit caption.
 *    Those four fields are now on the type (all optional) and this is the
 *    layout that spends them. It renders the **selected** plan, or the first,
 *    and ignores the rest — a screen showing three offers is not an offer.
 * 2. **Cards sit on `card`, not `surface`.** Every card in the base module
 *    painted the same colour as the page behind it, so the border was doing
 *    all the work and a plan pair on a dark page read as one flat sheet.
 * 3. **A fabricated discount is refused.** A compare-at equal to the price is
 *    not drawn (see {@link compareAtFor}).
 * 4. **Both prices are announced.** A struck price carries `Was …`, so a
 *    screen reader handed two numbers knows which is which.
 * 5. **Press is a state layer.** M3's layer over the card's own fill, not
 *    `opacity` on its content — dimming content is what 0.38 means, and it
 *    made a pressed card look disabled.
 *
 * The empty state is a message, not a blank box, and its copy is a prop.
 */
function PlanSelectorV4({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'cards', accent = 'primary', emptyMessage = 'No plans available.', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (!plans || plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: emptyMessage }) }));
    }
    const offer = layout === 'offer';
    // An offer screen shows one offer. `selectedPlanId` picks it so a host can
    // still swap the deal without changing the array it passes. `plans[0]` is
    // reachable — the empty case returned above — but the index signature does
    // not know that, so the fallback is explicit rather than asserted.
    const featured = plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];
    const columns = plans.length === 1 ? 1 : COLUMNS;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ alignSelf: 'stretch', gap: tokens.spacing.md }, style], children: [showBillingToggle && !offer ? ((0, jsx_runtime_1.jsx)(BillingToggleV4, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { gap: tokens.spacing.md }, children: offer ? ((0, jsx_runtime_1.jsx)(OfferCard, { plan: featured, period: billingPeriod, selected: true, accent: accent, onPress: () => onSelectPlan?.(featured.id) })) : layout === 'list' ? (plans.map((plan) => ((0, jsx_runtime_1.jsx)(PlanRowV4, { plan: plan, price: priceFor(plan, billingPeriod), was: compareAtFor(plan, billingPeriod), selected: plan.id === selectedPlanId, accent: accent, onPress: () => onSelectPlan?.(plan.id) }, plan.id)))) : ((0, PlanSelector_1.chunkPlans)(plans, columns).map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, children: [row.map((plan) => ((0, jsx_runtime_1.jsx)(PlanCardV4, { plan: plan, price: priceFor(plan, billingPeriod), was: compareAtFor(plan, billingPeriod), selected: plan.id === selectedPlanId, accent: accent, onPress: () => onSelectPlan?.(plan.id) }, plan.id))), row.length < columns ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }) : null] }, i)))) })] }));
}
//# sourceMappingURL=PlanSelectorV4.js.map