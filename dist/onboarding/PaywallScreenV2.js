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
exports.PaywallScreenV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const PlanSelectorV2_1 = require("./PlanSelectorV2");
const TrialBanner_1 = require("./TrialBanner");
const PaywallScreen_1 = require("./PaywallScreen");
/**
 * PaywallScreen, redesigned (v2): the **editorial** line. The hero runs
 * full-bleed to the top edge with no inset panel, and the content sheet rises
 * over it with a rounded lip so the headline overlaps the artwork. Below sit the
 * trial strip, the §8 feature rows, the value-framing block and the v2 plan
 * cards, with the CTA pinned (§5).
 *
 * The plan cards are the v2 selector, not the base one — an app that picks v2
 * picks it for every surface it sees, and a composite that reaches back into v1
 * breaks that line. {@link TrialBanner} has no alternate, so the base one is the
 * whole line — that is correct, not a gap. Same props, token-only.
 */
exports.PaywallScreenV2 = React.forwardRef(function PaywallScreenV2({ title, subtitle, illustration, logoGlyph = '✦', showHero = true, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest }, ref) {
    const rows = (0, PaywallScreen_1.toFeatureRows)(features, valueProps);
    const framingRows = (0, PaywallScreen_1.toValueFramingRows)(valueFraming);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col overflow-y-auto", children: [showHero ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-[34vh] min-h-[10rem] w-full items-center justify-center overflow-hidden bg-primary-50", children: illustration ?? ((0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph, size: "2xl", color: "onPrimary" }) })) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-6 rounded-t-[var(--xen-radius-lg)] bg-surface px-6 pb-8 pt-8', showHero && '-mt-6'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-center text-2xl font-bold leading-tight text-on-surface", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", align: "center", className: "max-w-prose", children: subtitle })) : null] }), trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: rows, heading: featuresTitle, rail: featureRail }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: framingRows, heading: valueFraming?.title }), plans && plans.length > 0 ? ((0, jsx_runtime_1.jsx)(PlanSelectorV2_1.PlanSelectorV2, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] })] }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFooter, { ctaLabel: ctaLabel, onSubscribe: onSubscribe, loading: loading, footnote: footnote, dismissLabel: dismissLabel, onDismiss: onDismiss })] }));
});
//# sourceMappingURL=PaywallScreenV2.js.map