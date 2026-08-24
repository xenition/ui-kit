"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSelectorV2 = PlanSelectorV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/** One elevated tier card in the side-by-side row. */
function TierCard({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const emphasized = selected || plan.highlighted;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flex: 1, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderWidth: emphasized ? 2 : 1,
                borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
                ...(0, elevation_1.shadow)(plan.highlighted ? 'lg' : 'md', tokens),
            }, children: [plan.badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: plan.badge }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: plan.name }), selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "base", color: "primary", accessibilityLabel: "Selected" }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: f })] }, i))) })) : null] }) }));
}
/**
 * Subscription tier picker — V2. The tiers sit side-by-side as elevated,
 * shadowed cards (rather than a stacked list), with the "popular"/highlighted
 * tier lifted by a stronger shadow, an accent border and its ribbon badge. Keeps
 * the monthly/annual {@link Segmented} toggle and the `radiogroup`/`radio`
 * semantics; prices stay caller-formatted. Guards an empty list. Token-pure.
 */
function PlanSelectorV2({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "No plans available." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [showBillingToggle ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Segmented, { options: [
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Annual', value: 'annual' },
                        ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: annualSavingsLabel })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, children: plans.map((plan) => ((0, jsx_runtime_1.jsx)(TierCard, { plan: plan, price: billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice, selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id))) })] }));
}
//# sourceMappingURL=PlanSelectorV2.js.map