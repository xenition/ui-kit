"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreenV3 = PaywallScreenV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PlanSelector_1 = require("./PlanSelector");
const TrialBanner_1 = require("./TrialBanner");
const color_1 = require("../primitives/internal/color");
/**
 * Value-first paywall — V3. Frames the upgrade as a comparison table: a
 * prominent trial banner up top, then a two-column "free vs premium" grid where
 * each value prop is a row (— for the free tier, ✓ for the premium one), with
 * the premium column tinted to draw the eye. Plans and the pinned CTA follow.
 * Column names are pulled from `plans` when present. Same props as
 * {@link PaywallScreen}. Token-pure.
 */
function PaywallScreenV3({ title, subtitle, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const freeName = plans?.[0]?.name ?? 'Free';
    const proName = plans?.find((p) => p.highlighted)?.name ?? plans?.[plans.length - 1]?.name ?? 'Premium';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { contentContainerStyle: { padding: tokens.spacing.xl, gap: tokens.spacing.lg }, children: [trial ? (0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.base,
                                    lineHeight: tokens.typography.scale.base * 1.5,
                                }, children: subtitle })) : null] }), valueProps.length ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.lg,
                            overflow: 'hidden',
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.04) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: "WHAT YOU GET" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, alignItems: 'center', padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: freeName }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72, alignItems: 'center', padding: tokens.spacing.md, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: proName }) })] }), valueProps.map((v, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderTopWidth: 1,
                                    borderTopColor: colors.border,
                                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [v.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: v.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: v.text })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, alignItems: 'center', padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u2014" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72, alignItems: 'center', padding: tokens.spacing.md, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06) }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "base", color: "success", accessibilityLabel: `Included in ${proName}` }) })] }, i)))] })) : null, plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanSelector, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.xl, gap: tokens.spacing.sm, borderTopWidth: 1, borderTopColor: colors.border }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", loading: loading, onPress: onSubscribe, accessibilityLabel: ctaLabel, style: { alignSelf: 'stretch' }, children: ctaLabel }), footnote ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: footnote })) : null, dismissLabel && onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: dismissLabel, onPress: onDismiss, style: { alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }, children: dismissLabel }) })) : null] })] }));
}
//# sourceMappingURL=PaywallScreenV3.js.map