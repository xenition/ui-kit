"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreenV2 = PaywallScreenV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PlanSelectorV2_1 = require("./PlanSelectorV2");
const TrialBanner_1 = require("./TrialBanner");
const PaywallScreen_1 = require("./PaywallScreen");
/*
  Geometry the onboarding spec fixes by number (§10.1). The editorial hero is
  taller than the base one because it runs full-bleed to the top edge with no
  panel inset; the cap still keeps the sticky CTA in the fold (§3).
*/
const MEDALLION = 56;
const HERO_HEIGHT_RATIO = 0.34;
/**
 * Value-first paywall — V2, the **editorial** line. The hero runs full-bleed to
 * the top edge with no inset panel, and the content sheet rises over it with a
 * rounded lip so the headline overlaps the artwork. Below the fold line sit the
 * trial strip, the §8 feature rows, the value-framing block and the V2 plan
 * cards, with the CTA pinned (§5).
 *
 * Stays inside its own design line: the plan cards are {@link PlanSelectorV2},
 * not the base selector, because an app that picks V2 picks it for every
 * surface it sees. {@link TrialBanner} has no alternate, so the base one is the
 * whole line — that is correct, not a gap. Same props as {@link PaywallScreen}.
 * Token-pure.
 */
function PaywallScreenV2({ title, subtitle, illustration, logoGlyph = '✦', showHero = true, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, style, }) {
    const { colors, scheme, tokens } = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    // The native ramps keep their light orientation in both schemes — see the
    // note in `PaywallScreen`'s `PaywallFeatureRows`.
    const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const rows = (0, PaywallScreen_1.toFeatureRows)(features, valueProps);
    const framingRows = (0, PaywallScreen_1.toValueFramingRows)(valueFraming);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { contentContainerStyle: { paddingBottom: tokens.spacing.xl }, children: [showHero ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: Math.round(height * HERO_HEIGHT_RATIO),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: heroGround,
                            overflow: 'hidden',
                        }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: MEDALLION,
                                height: MEDALLION,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.primary,
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: "2xl", color: "onPrimary" }) })) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            marginTop: showHero ? -tokens.spacing.xl : 0,
                            borderTopLeftRadius: tokens.radius.lg,
                            borderTopRightRadius: tokens.radius.lg,
                            backgroundColor: colors.surface,
                            paddingHorizontal: tokens.spacing.lg,
                            paddingTop: tokens.spacing.xl,
                            gap: tokens.spacing.lg,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", align: "center", numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, children: subtitle })) : null] }), trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: rows, heading: featuresTitle, rail: featureRail }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: framingRows, heading: valueFraming?.title }), plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelectorV2_1.PlanSelectorV2, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] })] }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFooter, { ctaLabel: ctaLabel, onSubscribe: onSubscribe, loading: loading, footnote: footnote, dismissLabel: dismissLabel, onDismiss: onDismiss })] }));
}
//# sourceMappingURL=PaywallScreenV2.js.map