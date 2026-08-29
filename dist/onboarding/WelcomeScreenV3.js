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
exports.WelcomeScreenV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Text_1 = require("../primitives/Text");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
/**
 * 44×44 header tap targets (spec §2) — `h-11` is 44px. The leading badge sits
 * on the same module so header and headline row share one grid. Geometric, per
 * §10.1.
 */
const TAP_TARGET_CLASS = 'h-11 w-11';
/**
 * First-launch welcome — V3, the **compact** line.
 *
 * No hero panel at all. The brand mark drops to a small leading badge beside
 * the headline and the whole screen collapses to header · title row · sticky
 * footer, for a bottom-sheet presentation or a short screen where a 38%-tall
 * illustration would push the CTA off the fold. That is the §11 idea: the three
 * lines differ in what they *are*, not in how they are painted.
 *
 * Identical props to {@link WelcomeScreen}. An `illustration` is still honoured
 * (§3) — it just occupies the leading badge rather than a hero panel, clipped
 * to the badge's circle — and the medallion is the fallback when there is none,
 * so an empty hero slot still reads as composed. Token-only.
 */
exports.WelcomeScreenV3 = React.forwardRef(function WelcomeScreenV3({ title, subtitle, logoGlyph, illustration, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex = 0, loading = false, variant, className, ...rest }, ref) {
    void variant;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md px-lg pt-md", children: [onBack ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Go back", onClick: onBack, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0', TAP_TARGET_CLASS) })), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: stepCount, activeIndex: stepIndex })) : null }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', TAP_TARGET_CLASS), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0', TAP_TARGET_CLASS) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col justify-center px-lg py-md", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full', TAP_TARGET_CLASS, illustration ? 'bg-primary-50' : 'bg-primary'), children: illustration ?? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph ?? '✦', size: "xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("h1", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "2xl", weight: "bold", tone: "onSurface", numberOfLines: 2, className: "block", children: title }) }), subtitle ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", numberOfLines: 3, className: "block max-w-prose", children: subtitle })) : null] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "sticky bottom-0 flex flex-col gap-sm border-t border-border bg-surface px-lg pb-lg pt-md", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onClick: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": secondaryLabel, onClick: onSecondary, className: "inline-flex min-h-11 items-center justify-center", children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "medium", tone: "muted", children: secondaryLabel }) })) : null] })] }));
});
//# sourceMappingURL=WelcomeScreenV3.js.map