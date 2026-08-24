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
const GetStartedButton_1 = require("./GetStartedButton");
const PlanSelector_1 = require("./PlanSelector");
const TrialBanner_1 = require("./TrialBanner");
/**
 * PaywallScreen, redesigned (v2): a **hero paywall**. A primary-tinted hero band
 * carries the value-first headline + subtitle; below sit the trial banner, the
 * "why upgrade" list, the inline {@link PlanSelector}, a full-width CTA, footnote,
 * and a quiet dismiss. Bolder framing than v1, same paywall-after-value order.
 * Same props, token-only.
 */
exports.PaywallScreenV2 = React.forwardRef(function PaywallScreenV2({ title, subtitle, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded-b-3xl bg-primary/10 px-6 pb-8 pt-12 text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-base text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 p-6", children: [trial ? (0, jsx_runtime_1.jsx)(TrialBanner_1.TrialBanner, { title: trial.title, subtitle: trial.subtitle, daysLeft: trial.daysLeft }) : null, valueProps.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-2", children: valueProps.map((vp, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-2 text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: vp.icon ?? '✓', size: "sm", color: "primary" }) }), vp.text] }, i))) })) : null, plans && plans.length > 0 ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanSelector, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, onClick: onSubscribe, loading: loading }), footnote ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-muted", children: footnote }) : null, dismissLabel && onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, className: "py-1 text-center text-sm font-semibold text-muted", children: dismissLabel })) : null] })] }));
});
//# sourceMappingURL=PaywallScreenV2.js.map