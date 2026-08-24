"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSelector = PlanSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Subscription tier picker — a `radiogroup` of pressable plan cards plus an
 * optional monthly/annual {@link Segmented} toggle that swaps every card's
 * price. The selected card lifts to the primary border and shows a check; each
 * card is a `radio` announcing its `selected` state to screen readers. Prices
 * are caller-formatted strings so the component never does currency math. Guards
 * an empty plan list. No literal colors.
 */
function PlanSelector({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "No plans available." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [showBillingToggle ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Segmented, { options: [
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Annual', value: 'annual' },
                        ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: annualSavingsLabel })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { gap: tokens.spacing.sm }, children: plans.map((plan) => {
                    const selected = plan.id === selectedPlanId;
                    const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: () => onSelectPlan?.(plan.id), style: {
                            borderWidth: selected || plan.highlighted ? 2 : 1,
                            borderColor: selected ? colors.primary : plan.highlighted ? colors.accent : colors.border,
                            borderRadius: tokens.radius.lg,
                            padding: tokens.spacing.lg,
                            backgroundColor: colors.surface,
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: plan.name }), plan.badge ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: plan.badge }) : null] }), selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "base", color: "primary", accessibilityLabel: "Selected" }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.priceCaption })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: plan.features.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: f })] }, i))) })) : null] }, plan.id));
                }) })] }));
}
//# sourceMappingURL=PlanSelector.js.map