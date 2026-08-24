"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreen = PaywallScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PlanSelector_1 = require("./PlanSelector");
const TrialBanner_1 = require("./TrialBanner");
/**
 * Value-first paywall — leads with outcomes and the value list, then the plans,
 * then the price and CTA, so the ask lands only after the value is clear
 * (paywall-after-value, design.md §27-28). Composes {@link TrialBanner},
 * {@link PlanSelector} and the primary CTA, with an optional "Maybe later"
 * escape. Everything scrolls for small screens. All colors token-bound. No
 * literal colors.
 */
function PaywallScreen({ title, subtitle, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { contentContainerStyle: { padding: tokens.spacing.xl, gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.5 }, children: subtitle })) : null] }), trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, valueProps.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: valueProps.map((v, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 28,
                                        height: 28,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.success,
                                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: v.icon ?? '✓', size: "sm", color: "onSuccess" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: v.text })] }, i))) })) : null, plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanSelector, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.xl, gap: tokens.spacing.sm, borderTopWidth: 1, borderTopColor: colors.border }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", loading: loading, onPress: onSubscribe, accessibilityLabel: ctaLabel, style: { alignSelf: 'stretch' }, children: ctaLabel }), footnote ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: footnote })) : null, dismissLabel && onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: dismissLabel, onPress: onDismiss, style: { alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }, children: dismissLabel }) })) : null] })] }));
}
//# sourceMappingURL=PaywallScreen.js.map