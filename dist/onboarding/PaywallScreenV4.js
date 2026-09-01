"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallScreenV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
const PlanSelectorV4_1 = require("./PlanSelectorV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const TrialBannerV4_1 = require("./TrialBannerV4");
const flow_v4_1 = require("./internal/flow-v4");
const PaywallScreen_1 = require("./PaywallScreen");
/**
 * **V4 paywall** — the web twin of the native `PaywallScreenV4`: the base's
 * props plus the footer slots a shipping paywall actually needs
 * (`reassurance`, `secondaryLabel`, `restoreLabel`, `legalLinks`), the header
 * controls (`stepCount`, `onBack`) and the line's two configuration axes.
 *
 * This is the screen the two reference screenshots are:
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
 *    row — one of those is a store requirement and one is most of the
 *    conversion.
 * 2. **The body scrolls under a fixed header and footer**, so the progress
 *    bars no longer leave the screen as the user reads the plan.
 * 3. **A single plan gets the offer layout by default.** One plan laid out as
 *    a two-up card grid is a grid with a hole in it.
 * 4. **The content arrives**, staggered, and not at all under
 *    `prefers-reduced-motion`.
 * 5. **`dismissLabel` is promoted, not replaced**, so no existing caller moves.
 *
 * Every part is optional and the screen composes without any of them.
 */
exports.PaywallScreenV4 = React.forwardRef(function PaywallScreenV4({ title, subtitle, illustration, logoGlyph = '✦', showHero = true, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', ctaTrailing, onSubscribe, loading = false, footnote, dismissLabel, onDismiss, reassurance, reassuranceIcon, secondaryLabel, onSecondary, restoreLabel, onRestore, legalLinks, onLegalLinkClick, stepCount, stepIndex = 0, onBack, planLayout, ground = 'plain', accent = 'primary', className, ...rest }, ref) {
    const rows = (0, PaywallScreen_1.toFeatureRows)(features, valueProps);
    const framingRows = (0, PaywallScreen_1.toValueFramingRows)(valueFraming);
    // One plan is an offer, not a choice (see `PlanSelectorV4`).
    const layout = planLayout ?? (plans?.length === 1 ? 'offer' : 'cards');
    // `dismissLabel` predates `secondaryLabel` and meant the same thing. The
    // new name wins where both are given. `onDismiss` keeps both jobs it had —
    // the header ✕ and, absent `onSecondary`, the declined link — because in
    // every flow that offers both they escape to the same place.
    const declined = secondaryLabel ?? dismissLabel;
    const onDeclined = onSecondary ?? onDismiss;
    return ((0, jsx_runtime_1.jsxs)(flow_v4_1.FlowScreenV4, { ref: ref, ...rest, ground: ground, accent: accent, center: false, className: className, header: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: stepCount, activeIndex: stepIndex })) : null }), footer: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { footnote: footnote, reassurance: reassurance, reassuranceIcon: reassuranceIcon, secondaryLabel: declined, onSecondary: onDeclined, tertiaryLabel: restoreLabel, onTertiary: onRestore, legalLinks: legalLinks, onLegalLinkClick: onLegalLinkClick, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: ctaLabel, onClick: onSubscribe, loading: loading, trailing: ctaTrailing }) }), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full", ...(0, flow_v4_1.flowRegion)(0), children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { show: showHero, illustration: illustration, logoGlyph: logoGlyph }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full", ...(0, flow_v4_1.flowRegion)(1), children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: subtitle }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full flex-col gap-lg", ...(0, flow_v4_1.flowRegion)(2), children: [trial ? ((0, jsx_runtime_1.jsx)(TrialBannerV4_1.TrialBannerV4, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { rows: rows, heading: featuresTitle, rail: featureRail, accent: accent }), (0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { rows: framingRows, heading: valueFraming?.title, accent: accent }), plans?.length ? ((0, jsx_runtime_1.jsx)(PlanSelectorV4_1.PlanSelectorV4, { plans: plans, layout: layout, accent: accent, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] })] }));
});
//# sourceMappingURL=PaywallScreenV4.js.map