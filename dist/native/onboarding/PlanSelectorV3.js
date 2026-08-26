"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanSelectorV3 = PlanSelectorV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const PlanSelector_1 = require("./PlanSelector");
/* §10.1 geometry: 2px selection ring, 1px hairline outline, 44 tap target. */
const RING = 2;
const HAIRLINE = 1;
const CONTROL = 44;
const COLUMNS = 2;
/** One dense comparison row. */
function PlanRow({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)(0.99);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: CONTROL,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                backgroundColor: selected ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.surface,
                borderWidth: selected ? RING : HAIRLINE,
                borderColor: selected ? colors.primary : colors.border,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: tokens.spacing.lg,
                        height: tokens.spacing.lg,
                        borderRadius: tokens.radius.full,
                        borderWidth: RING,
                        borderColor: selected ? colors.primary : colors.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: selected ? colors.primary : colors.surface,
                    }, children: selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "xs", color: "onPrimary" }) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", size: "sm", children: plan.badge })) : null] }), plan.features?.length ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", numberOfLines: 1, children: plan.features.join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "lg", weight: "bold", children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: "muted", children: plan.priceCaption })) : null] })] }) }));
}
/** One §7 card, used when a V3 host explicitly asks for `layout="cards"`. */
function TierCard({ plan, price, selected, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fg = selected ? 'onPrimary' : 'onSurface';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${plan.name}, ${price}`, onPress: onPress, style: {
            flex: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            gap: tokens.spacing.xs,
            backgroundColor: selected ? colors.primary : colors.surface,
            borderWidth: selected ? RING : HAIRLINE,
            borderColor: selected ? colors.primary : colors.border,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: fg, style: { flexShrink: 1 }, children: plan.name }), plan.badge ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", size: "sm", children: plan.badge })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "lg", weight: "bold", tone: fg, children: price }), plan.priceCaption ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: selected ? 'onPrimary' : 'muted', children: plan.priceCaption })) : null] }));
}
/**
 * Subscription tier picker — V3, the compact line. Dense selectable rows that
 * align a radio indicator, the name (+ its badge), a one-line feature summary
 * and the price into scannable columns; the selected row keeps the 2px ring and
 * a faint primary tint. This is the one selector whose `layout` defaults to
 * `'list'` — a dense sheet is what the V3 line is *for* — and passing
 * `layout="cards"` gives the §7 pair at compact sizing.
 *
 * Same `radiogroup` semantics and caller-formatted prices as
 * {@link PlanSelector}; empty list guarded. Token-pure.
 */
function PlanSelectorV3({ plans, selectedPlanId, onSelectPlan, billingPeriod = 'monthly', onBillingPeriodChange, showBillingToggle = true, annualSavingsLabel, layout = 'list', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (plans.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", children: "No plans available." }) }));
    }
    const priceOf = (plan) => billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
    const columns = plans.length === 1 ? 1 : COLUMNS;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [showBillingToggle ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.BillingToggle, { billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel, spread: true })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Choose a plan", style: { gap: tokens.spacing.sm }, children: layout === 'cards'
                    ? (0, PlanSelector_1.chunkPlans)(plans, columns).map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.sm }, children: [row.map((plan) => ((0, jsx_runtime_1.jsx)(TierCard, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id))), row.length < columns ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }) : null] }, i)))
                    : plans.map((plan) => ((0, jsx_runtime_1.jsx)(PlanRow, { plan: plan, price: priceOf(plan), selected: plan.id === selectedPlanId, onPress: () => onSelectPlan?.(plan.id) }, plan.id))) })] }));
}
//# sourceMappingURL=PlanSelectorV3.js.map