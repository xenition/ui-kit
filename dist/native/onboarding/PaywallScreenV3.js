"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreenV3 = PaywallScreenV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PlanSelectorV3_1 = require("./PlanSelectorV3");
const TrialBanner_1 = require("./TrialBanner");
const PaywallScreen_1 = require("./PaywallScreen");
/*
  Geometry the onboarding spec fixes by number (§10.1): the leading brand tile
  beside the headline is the 44 minimum tap target, matching every other control
  in the module even though nothing here is tappable.
*/
const TILE = 44;
/**
 * Value-first paywall — V3, the **compact** line. No hero panel: a small
 * leading brand tile sits beside a left-aligned headline, the §8 rows run dense,
 * and the plan tiers stack as rows rather than a card pair. Sized for a bottom
 * sheet or a short screen, with the CTA still pinned (§5) — a paywall's ask must
 * never leave the fold, sheet or not.
 *
 * `showHero` is honoured as an opt-*in* here (it defaults to off for this line),
 * so a host that wants the panel back can ask for it.
 *
 * Stays inside its own design line: the plan rows are {@link PlanSelectorV3},
 * not the base selector, because an app that picks V3 picks it for every surface
 * it sees. {@link TrialBanner} has no alternate, so the base one is the whole
 * line — that is correct, not a gap. Same props as {@link PaywallScreen}.
 * Token-pure.
 */
function PaywallScreenV3({ title, subtitle, illustration, logoGlyph = '✦', showHero = false, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, style, }) {
    const { colors, scheme, tokens } = (0, theme_1.useXenitionTheme)();
    // The native ramps keep their light orientation in both schemes — see the
    // note in `PaywallScreen`'s `PaywallFeatureRows`.
    const tileGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const rows = (0, PaywallScreen_1.toFeatureRows)(features, valueProps);
    const framingRows = (0, PaywallScreen_1.toValueFramingRows)(valueFraming);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { contentContainerStyle: {
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                }, children: [trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: TILE,
                                    height: TILE,
                                    borderRadius: tokens.radius.lg,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: showHero ? tileGround : colors.primary,
                                    overflow: 'hidden',
                                }, children: illustration ?? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: "lg", color: showHero ? 'primary' : 'onPrimary' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "xl", weight: "bold", numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", numberOfLines: 3, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: rows, heading: featuresTitle, rail: featureRail, dense: true }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: framingRows, heading: valueFraming?.title, dense: true }), plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelectorV3_1.PlanSelectorV3, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFooter, { ctaLabel: ctaLabel, onSubscribe: onSubscribe, loading: loading, footnote: footnote, dismissLabel: dismissLabel, onDismiss: onDismiss })] }));
}
//# sourceMappingURL=PaywallScreenV3.js.map