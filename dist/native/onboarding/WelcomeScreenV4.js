"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenV4 = WelcomeScreenV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
const ProgressDotsV4_1 = require("./ProgressDotsV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 first-launch welcome** — the base's props plus `features`,
 * `reassurance`, the two extra footer slots, and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It scrolls.** The base centred its body with `flex: 1`. Add three
 *    feature rows to a 5.4" phone and the bottom of the copy was simply
 *    unreachable. `FlowScreenV4` keeps the centring for a short screen and
 *    scrolls a long one, with the header and footer pinned either way.
 * 2. **The CTA clears the home indicator.** Via `AuthStickyFooterV4`, which
 *    the base's hand-rolled band did not use, so on a notched phone the button
 *    sat under the home bar.
 * 3. **It can carry the value proposition.** `features` — see above.
 * 4. **The secondary action reads as a choice.** Underlined, `onSurface`, its
 *    own tap target, instead of muted text the eye files as a caption.
 * 5. **The hero tint survives dark mode without a branch**, and the medallion
 *    scales with the viewport instead of sitting at a fixed 96 on a tablet.
 *
 * `variant="bottomSheet"` still left-aligns the headline block — the one place
 * §4 allows it — and now also stops centring the body, because a sheet is
 * anchored to its top edge. Every part is optional; the screen composes with
 * no illustration, no subtitle, no header controls and no secondary action.
 */
function WelcomeScreenV4({ title, subtitle, logoGlyph, illustration, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex = 0, loading = false, variant = 'centered', features, featuresTitle, featureRail, reassurance, reassuranceIcon, tertiaryLabel, onTertiary, legalLinks, onLegalLinkPress, ctaTrailing, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const sheet = variant === 'bottomSheet';
    const hero = (0, flow_v4_1.useFlowEntrance)(0);
    const heading = (0, flow_v4_1.useFlowEntrance)(1);
    const rows = (0, flow_v4_1.useFlowEntrance)(2);
    return ((0, jsx_runtime_1.jsxs)(flow_v4_1.FlowScreenV4, { grounds: grounds, center: !sheet, style: style, header: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDotsV4_1.ProgressDotsV4, { variant: "bars", accent: accent, count: stepCount, activeIndex: stepIndex })) : null }), footer: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { reassurance: reassurance, reassuranceIcon: reassuranceIcon, secondaryLabel: onSecondary ? secondaryLabel : undefined, onSecondary: onSecondary, tertiaryLabel: tertiaryLabel, onTertiary: onTertiary, legalLinks: legalLinks, onLegalLinkPress: onLegalLinkPress, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: primaryLabel, onPress: onGetStarted, loading: loading, trailing: ctaTrailing }) }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ alignSelf: 'stretch' }, hero], children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { show: !sheet, illustration: illustration, logoGlyph: logoGlyph, grounds: grounds }) }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ alignSelf: 'stretch' }, heading], children: (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: subtitle, align: sheet ? 'left' : 'center' }) }), features?.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ alignSelf: 'stretch', gap: tokens.spacing.lg }, rows], children: (0, jsx_runtime_1.jsx)(PaywallFeatureRowsV4_1.PaywallFeatureRowsV4, { rows: features, heading: featuresTitle, rail: featureRail, accent: accent }) })) : null] }));
}
//# sourceMappingURL=WelcomeScreenV4.js.map