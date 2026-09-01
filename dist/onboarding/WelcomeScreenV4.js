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
exports.WelcomeScreenV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 first-launch welcome** — the web twin of the native `WelcomeScreenV4`:
 * the base's props plus `features`, `reassurance`, the two extra footer slots,
 * and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The body scrolls under a pinned footer.** The base centred its content
 *    in one column; add three feature rows on a short viewport and the bottom
 *    of the copy was unreachable. `min-h-0` on the scrolling region is the part
 *    that is easy to get wrong — without it the page scrolls instead of the
 *    body, which un-pins the CTA.
 * 2. **The CTA clears the safe-area inset**, via `AuthStickyFooterV4`.
 * 3. **It can carry the value proposition** — `features`.
 * 4. **The secondary action reads as a choice** — underlined, `on-surface`,
 *    its own tap target — instead of muted text the eye files as a caption.
 * 5. **The hero tint inverts with the scheme** rather than being a light ramp
 *    step painted on a dark page.
 *
 * `variant="bottomSheet"` still left-aligns the headline block — the one place
 * §4 allows it — and now also stops centring the body, because a sheet is
 * anchored to its top edge.
 */
exports.WelcomeScreenV4 = React.forwardRef(function WelcomeScreenV4({ title, subtitle, logoGlyph, illustration, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex = 0, loading = false, variant = 'centered', features, featuresTitle, featureRail, reassurance, reassuranceIcon, tertiaryLabel, onTertiary, legalLinks, onLegalLinkClick, ctaTrailing, ground = 'plain', accent = 'primary', className, ...rest }, ref) {
    const sheet = variant === 'bottomSheet';
    return ((0, jsx_runtime_1.jsxs)(flow_v4_1.FlowScreenV4, { ref: ref, ...rest, ground: ground, accent: accent, center: !sheet, className: className, header: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: stepCount, activeIndex: stepIndex })) : null }), footer: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { reassurance: reassurance, reassuranceIcon: reassuranceIcon, secondaryLabel: onSecondary ? secondaryLabel : undefined, onSecondary: onSecondary, tertiaryLabel: tertiaryLabel, onTertiary: onTertiary, legalLinks: legalLinks, onLegalLinkClick: onLegalLinkClick, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: primaryLabel, onClick: onGetStarted, loading: loading, trailing: ctaTrailing }) }), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full", ...(0, flow_v4_1.flowRegion)(0), children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { show: !sheet, illustration: illustration, logoGlyph: logoGlyph }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full", ...(0, flow_v4_1.flowRegion)(1), children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: subtitle, align: sheet ? 'left' : 'center' }) }), features?.length ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full", ...(0, flow_v4_1.flowRegion)(2), children: (0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { rows: features, heading: featuresTitle, rail: featureRail, accent: accent }) })) : null] }));
});
//# sourceMappingURL=WelcomeScreenV4.js.map