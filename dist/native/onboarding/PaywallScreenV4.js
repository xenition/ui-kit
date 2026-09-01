"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreenV4 = PaywallScreenV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
const PlanSelectorV4_1 = require("./PlanSelectorV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const TrialBannerV4_1 = require("./TrialBannerV4");
const flow_v4_1 = require("./internal/flow-v4");
const PaywallScreen_1 = require("./PaywallScreen");
/**
 * **V4 paywall** — the base's props plus the footer slots a shipping paywall
 * actually needs (`reassurance`, `secondaryLabel`, `restoreLabel`,
 * `legalLinks`), the header controls (`stepCount`, `onBack`) and the line's two
 * configuration axes (`ground`, `accent`).
 *
 * This is the screen the two reference screenshots are, and rebuilding it is
 * what surfaced most of this pass:
 *
 * ```
 *  ‹   ▬▬▬ ▬▬▬ ▬▬▬                              ✕     header
 *  ┌───────────────────────────────────────────┐
 *  │              hero artwork                 │      body (scrolls)
 *  └───────────────────────────────────────────┘
 *              You're all set to save
 *      Start hunting the best prices — your …
 *  ┌───────────────────────────────────────────┐
 *  │ Yearly plan [20% OFF]             $̶2̶9̶.̶9̶9̶  │      PlanSelectorV4 'offer'
 *  │ $23.99 / year                  $0.07/day  │
 *  └───────────────────────────────────────────┘
 *      Payment is charged to your store …            footnote
 *  ───────────────────────────────────────────────    hairline
 *      ✓ No commitment · Cancel anytime               reassurance
 *  ▓▓▓▓▓ Claim 20% off Yearly            ✨ ▓▓▓▓▓     CTA
 *      No thanks, start my 7-day free trial           secondary
 *              Restore Purchases                      restore
 *              Terms  ·  Privacy                      legal
 * ```
 *
 * ## Five changes
 *
 * 1. **The footer is the whole bottom of the screen, and it is pinned.** The
 *    base drew a CTA and a footnote in a band with no safe-area inset, and had
 *    nowhere at all for the reassurance line, the restore link or the legal
 *    row — the three things a store requires or a conversion depends on.
 * 2. **The body scrolls under a fixed header and footer.** The base scrolled
 *    the whole page including the header, so the progress bars left the screen
 *    as the user read the plan.
 * 3. **A single plan gets the offer layout by default.** One plan laid out as
 *    a two-up card grid is a grid with a hole in it.
 * 4. **The content arrives.** One staggered entrance, on the M3 scale,
 *    collapsed entirely under `useReducedMotion()`.
 * 5. **`dismissLabel` is promoted, not replaced.** It still works and still
 *    lands in the secondary slot, so no existing caller moves; `secondaryLabel`
 *    is the name that says what it is.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no features, no plans, no footer links.
 */
function PaywallScreenV4({ title, subtitle, illustration, logoGlyph = '✦', showHero = true, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', ctaTrailing, onSubscribe, loading = false, footnote, dismissLabel, onDismiss, reassurance, reassuranceIcon, secondaryLabel, onSecondary, restoreLabel, onRestore, legalLinks, onLegalLinkPress, stepCount, stepIndex = 0, onBack, planLayout, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const rows = (0, PaywallScreen_1.toFeatureRows)(features, valueProps);
    const framingRows = (0, PaywallScreen_1.toValueFramingRows)(valueFraming);
    // One plan is an offer, not a choice (see `PlanSelectorV4`).
    const layout = planLayout ?? (plans?.length === 1 ? 'offer' : 'cards');
    // `dismissLabel` predates `secondaryLabel` and meant the same thing. The new
    // name wins where both are given; neither is required. `onDismiss` keeps
    // both jobs it had — the header ✕ and, absent `onSecondary`, the declined
    // link — because in every flow that offers both they escape to the same
    // place, and giving them separate callbacks would invite them not to.
    const declined = secondaryLabel ?? dismissLabel;
    const onDeclined = onSecondary ?? onDismiss;
    const hero = (0, flow_v4_1.useFlowEntrance)(0);
    const heading = (0, flow_v4_1.useFlowEntrance)(1);
    const content = (0, flow_v4_1.useFlowEntrance)(2);
    return ((0, jsx_runtime_1.jsxs)(flow_v4_1.FlowScreenV4, { grounds: grounds, center: false, style: style, header: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: stepCount, activeIndex: stepIndex })) : null }), footer: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { footnote: footnote, reassurance: reassurance, reassuranceIcon: reassuranceIcon, secondaryLabel: declined, onSecondary: onDeclined, tertiaryLabel: restoreLabel, onTertiary: onRestore, legalLinks: legalLinks, onLegalLinkPress: onLegalLinkPress, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: ctaLabel, onPress: onSubscribe, loading: loading, trailing: ctaTrailing }) }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ alignSelf: 'stretch' }, hero], children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { show: showHero, illustration: illustration, logoGlyph: logoGlyph, grounds: grounds }) }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ alignSelf: 'stretch' }, heading], children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: subtitle }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [{ alignSelf: 'stretch', gap: tokens.spacing.lg }, content], children: [trial ? ((0, jsx_runtime_1.jsx)(TrialBannerV4_1.TrialBannerV4, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { rows: rows, heading: featuresTitle, rail: featureRail, accent: accent }), (0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { rows: framingRows, heading: valueFraming?.title, accent: accent }), plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelectorV4_1.PlanSelectorV4, { plans: plans, layout: layout, accent: accent, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] })] }));
}
//# sourceMappingURL=PaywallScreenV4.js.map