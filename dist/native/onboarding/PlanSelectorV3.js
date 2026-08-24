"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSelectorV3 = PlanSelectorV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/** One full-width comparison row. */
function PlanRow({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)(0.99);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                backgroundColor: selected ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.surface,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 22,
                        height: 22,
                        borderRadius: tokens.radius.full,
                        borderWidth: 2,
                        borderColor: selected ? colors.primary : colors.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected ? colors.primary : 'transparent',
                    }, children: selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "xs", color: "onPrimary" }) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: plan.name }), plan.badge ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: plan.badge }) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.features.join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: plan.priceCaption })) : null] })] }) }));
}
/**
 * Subscription tier picker — V3. A stacked comparison layout: a monthly/annual
 * {@link Segmented} toggle over full-width rows that align name, feature summary
 * and price into columns for easy scanning, each row a `radio` with a circular
 * indicator. The selected row fills with a faint primary tint. Same
 * `radiogroup` semantics and caller-formatted prices as {@link PlanSelector};
 * empty list guarded. Token-pure.
 */
function PlanSelectorV3({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "No plans available." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [showBillingToggle ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Segmented, { options: [
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Annual', value: 'annual' },
                        ], value: billingPeriod, onChange: (v) => onBillingPeriodChange?.(v) }), annualSavingsLabel && billingPeriod === 'annual' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: annualSavingsLabel })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { gap: tokens.spacing.sm }, children: plans.map((plan) => ((0, jsx_runtime_1.jsx)(PlanRow, { plan: plan, price: billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice, selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id))) })] }));
}
//# sourceMappingURL=PlanSelectorV3.js.map