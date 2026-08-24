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
const GetStartedButton_1 = require("./GetStartedButton");
const PlanSelector_1 = require("./PlanSelector");
/**
 * PaywallScreen, redesigned (v3): a **compact upgrade sheet**. A tight title +
 * subtitle, a condensed inline value list, the {@link PlanSelector}, and the CTA
 * + dismiss — sized for a modal/bottom sheet rather than a full page. The
 * opposite of v2's hero paywall. Same props, token-only.
 */
exports.PaywallScreenV3 = React.forwardRef(function PaywallScreenV3({ title, subtitle, valueProps = [], plans, selectedPlanId, onSelectPlan, billingPeriod = 'annual', onBillingPeriodChange, annualSavingsLabel, trial, ctaLabel = 'Start free trial', onSubscribe, loading = false, footnote, dismissLabel, onDismiss, className, ...rest }, ref) {
    void trial;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-5 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-lg font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subtitle }) : null] }), valueProps.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-wrap gap-x-4 gap-y-1", children: valueProps.map((vp, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-1 text-xs text-on-surface", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: vp.icon ?? '✓', size: "xs", color: "primary" }), " ", vp.text] }, i))) })) : null, plans && plans.length > 0 ? ((0, jsx_runtime_1.jsx)(PlanSelector_1.PlanSelector, { plans: plans, selectedPlanId: selectedPlanId, onSelectPlan: onSelectPlan, billingPeriod: billingPeriod, onBillingPeriodChange: onBillingPeriodChange, annualSavingsLabel: annualSavingsLabel })) : null, (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: ctaLabel, onClick: onSubscribe, loading: loading }), footnote ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-muted", children: footnote }) : null, dismissLabel && onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, className: "text-center text-sm font-semibold text-muted", children: dismissLabel })) : null] }));
});
//# sourceMappingURL=PaywallScreenV3.js.map