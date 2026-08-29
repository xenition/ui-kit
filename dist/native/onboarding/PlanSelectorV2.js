"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSelectorV2 = PlanSelectorV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const PlanSelector_1 = require("./PlanSelector");
/* §10.1 geometry: 2px selection ring, 1px hairline outline. */
const RING = 2;
const HAIRLINE = 1;
const COLUMNS = 2;
/** One elevated §7 tier card in the side-by-side pair. */
function TierCard({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const fg = selected ? 'onPrimary' : 'onSurface';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flex: 1, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
                backgroundColor: selected ? colors.primary : colors.surface,
                borderWidth: selected ? RING : HAIRLINE,
                borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
                ...(0, elevation_1.shadow)(plan.highlighted || selected ? 'lg' : 'md', tokens),
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: fg, style: { flexShrink: 1 }, children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", size: "sm", children: plan.badge })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "2xl", weight: "bold", tone: fg, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: selected ? 'onPrimary' : 'success' }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: selected ? 'onPrimary' : 'muted', style: { flex: 1 }, children: f })] }, i))) })) : null] }) }));
}
/**
 * Subscription tier picker — V2, the editorial line. The §7 card pair, lifted:
 * two-up and equal width like the base selector, but shadowed and press-scaled,
 * with the selected card taking the `primary` fill, the 2px ring and the
 * stronger elevation. A lone plan takes the full width rather than half a grid.
 *
 * `layout="list"` still stacks the same cards for a dense context. Keeps the
 * monthly/annual toggle and the `radiogroup`/`radio` semantics; prices stay
 * caller-formatted. Guards an empty list. Token-pure.
 */
function PlanSelectorV2({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'cards', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", children: "No plans available." }) }));
    }
    const priceOf = (plan) => billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    const columns = layout === 'list' || plans.length === 1 ? 1 : COLUMNS;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [showBillingToggle ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.BillingToggle, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { gap: tokens.spacing.md }, children: (0, PlanSelector_1.chunkPlans)(plans, columns).map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, children: [row.map((plan) => ((0, jsx_runtime_1.jsx)(TierCard, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id))), row.length < columns ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }) : null] }, i))) })] }));
}
//# sourceMappingURL=PlanSelectorV2.js.map