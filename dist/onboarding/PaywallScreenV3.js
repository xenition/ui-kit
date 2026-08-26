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
exports.PaywallScreenV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const PlanSelectorV3_1 = require("./PlanSelectorV3");
const TrialBanner_1 = require("./TrialBanner");
const PaywallScreen_1 = require("./PaywallScreen");
/**
 * PaywallScreen, redesigned (v3): the **compact** line. No hero panel — a small
 * leading brand tile sits beside a left-aligned headline, the §8 rows run dense,
 * and the tiers stack as {@link PlanSelectorV3} rows. Sized for a modal or
 * bottom sheet rather than a full page; the CTA closes the sheet, which is the
 * fold here, so the ask still never scrolls away (§5).
 *
 * `showHero` is honoured as an opt-*in* on this line (it defaults to off).
 *
 * The plan rows are the v3 selector, not the base one — an app that picks v3
 * picks it for every surface it sees. {@link TrialBanner} has no alternate, so
 * the base one is the whole line. Same props, token-only.
 */
exports.PaywallScreenV3 = React.forwardRef(function PaywallScreenV3({ title, subtitle, illustration, logoGlyph = '✦', showHero = false, features, featuresTitle, featureRail, valueFraming, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest }, ref) {
    const rows = (0, PaywallScreen_1.toFeatureRows)(features, valueProps);
    const framingRows = (0, PaywallScreen_1.toValueFramingRows)(valueFraming);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 p-5", children: [trial ? ((0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)]', showHero ? 'bg-primary-50' : 'bg-primary'), children: illustration ?? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph, size: "lg", color: showHero ? 'primary' : 'onPrimary' })) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold leading-tight text-on-surface", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: rows, heading: featuresTitle, rail: featureRail, dense: true }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFeatureRows, { rows: framingRows, heading: valueFraming?.title, dense: true }), plans && plans.length > 0 ? ((0, jsx_runtime_1.jsx)(PlanSelectorV3_1.PlanSelectorV3, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null] }), (0, jsx_runtime_1.jsx)(PaywallScreen_1.PaywallFooter, { ctaLabel: ctaLabel, onSubscribe: onSubscribe, loading: loading, footnote: footnote, dismissLabel: dismissLabel, onDismiss: onDismiss, sticky: false })] }));
});
//# sourceMappingURL=PaywallScreenV3.js.map