"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkPlans = chunkPlans;
exports.BillingToggle = BillingToggle;
exports.PlanSelector = PlanSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/*
  Geometry the onboarding spec fixes by number (§10.1): the selected card's ring
  is 2px, an unselected card's outline is the 1px hairline. Everything else —
  radius, padding, colour — is a token.
*/
const RING = 2;
const HAIRLINE = 1;
/** How many cards sit on one row. A lone plan takes the full width (§7). */
const COLUMNS = 2;
/** Split `plans` into rows of `columns`, so every card keeps an equal width. */
function chunkPlans(plans, columns) {
    const rows = [];
    for (let i = 0; i < plans.length; i += columns)
        rows.push(plans.slice(i, i + columns));
    return rows;
}
/**
 * The monthly/annual cadence toggle plus its savings pill — identical across
 * the three lines, so it lives in one place.
 */
function BillingToggle({ billingPeriod, onBillingPeriodChange, annualSavingsLabel, spread = false, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: spread ? 'space-between' : 'flex-start',
            gap: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Segmented, { options: [
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Annual', value: 'annual' },
                ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: annualSavingsLabel })) : null] }));
}
/**
 * One §7 plan card. Selected takes the `primary` fill plus the 2px ring;
 * unselected stays outlined. The "BEST"/"SAVE 20%" badge sits top-right of the
 * card it belongs to.
 */
function PlanCard({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fg = selected ? 'onPrimary' : 'onSurface';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, style: {
            flex: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.sm,
            backgroundColor: selected ? colors.primary : colors.surface,
            borderWidth: selected ? RING : HAIRLINE,
            borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: fg, children: plan.name }), plan.badge ? (
                    // §7 asks for the badge "in colors.success on successText". The
                    // compiled palette has no legible form of that pair on a card: on web
                    // the soft-success badge is a NEUTRAL ground with success text, and
                    // successText is tuned for `surface`, not for a primary fill. The
                    // solid success/onSuccess pair is the one that reads as "success" on
                    // both an outlined and a filled card, and it is identical on both
                    // twins — so that is what both use.
                    (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", size: "sm", children: plan.badge })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "2xl", weight: "bold", tone: fg, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: selected ? 'onPrimary' : 'success' }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', style: { flex: 1 }, children: f })] }, i))) })) : null] }));
}
/** The original stacked row — kept for `layout="list"`. */
function PlanRow({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, style: {
            borderWidth: selected || plan.highlighted ? RING : HAIRLINE,
            borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            backgroundColor: colors.surface,
            gap: tokens.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "lg", weight: "bold", children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", size: "sm", children: plan.badge })) : null] }), selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "base", color: "primary", accessibilityLabel: "Selected" }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "2xl", weight: "bold", children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: f })] }, i))) })) : null] }));
}
/**
 * Subscription tier picker — a `radiogroup` of plan cards plus an optional
 * monthly/annual {@link Segmented} toggle that swaps every card's price.
 *
 * The default is the reference pair (§7): two-up, equal width, `radius.lg`,
 * the selected card taking the `primary` fill and a 2px ring while the others
 * stay outlined, with a tier's "BEST"/"SAVE 20%" badge top-right of its own
 * card. A lone plan takes the full width rather than sitting in half a grid.
 * `layout="list"` restores the older stacked rows for dense contexts.
 *
 * Each card is a `radio` announcing its `selected` state; prices are
 * caller-formatted strings so the component never does currency math. Guards an
 * empty plan list. No literal colors.
 */
function PlanSelector({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'cards', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", children: "No plans available." }) }));
    }
    const priceOf = (plan) => billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    const columns = plans.length === 1 ? 1 : COLUMNS;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [showBillingToggle ? ((0, jsx_runtime_1.jsx)(BillingToggle, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { gap: tokens.spacing.md }, children: layout === 'list'
                    ? plans.map((plan) => ((0, jsx_runtime_1.jsx)(PlanRow, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id)))
                    : chunkPlans(plans, columns).map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, children: [row.map((plan) => ((0, jsx_runtime_1.jsx)(PlanCard, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id))), row.length < columns ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }) : null] }, i))) })] }));
}
//# sourceMappingURL=PlanSelector.js.map