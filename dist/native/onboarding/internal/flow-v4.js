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
exports.FLOW_STAGGER_CAP = exports.FLOW_STAGGER = exports.MEASURE_MAX_WIDTH = exports.HERO_MEDALLION_RATIO = exports.HERO_MAX_HEIGHT_RATIO = exports.HERO_ASPECT = void 0;
exports.flowMetrics = flowMetrics;
exports.flowGrounds = flowGrounds;
exports.useFlowEntrance = useFlowEntrance;
exports.FlowHeaderV4 = FlowHeaderV4;
exports.FlowHeroV4 = FlowHeroV4;
exports.FlowHeadlineV4 = FlowHeadlineV4;
exports.FlowLinkV4 = FlowLinkV4;
exports.FlowFooterV4 = FlowFooterV4;
exports.FlowScreenV4 = FlowScreenV4;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * The spine of the **V4 onboarding line** (native) — the header, the hero, the
 * headline block, the scroll/pin shell and the footer stack that every
 * full-screen V4 in this module is assembled from.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §1 draws one anatomy and says a user moving from
 * sign-in to slide 1 to the paywall must never feel a seam. The 0.9.0 pass
 * honoured that by writing the anatomy out **in each screen** — the same
 * 44×44 header pressable, the same 4:3 hero, the same hairline band, eight
 * times over. That is why the safe-area inset reached exactly one of them and
 * why the hero tint drifted: eight copies of a rule are eight chances to get
 * it wrong. Here it is once.
 *
 * Nothing in this file is exported from the package. It is the module's own
 * vocabulary, in the same position `commerce/internal/money-v4.ts` and
 * `dashboard/internal/row-v4.ts` hold for theirs.
 *
 * Every value is read off `useXenitionTheme()`. The bare numbers are geometric
 * — an aspect ratio, a fraction of the viewport, `1` for a hairline — and each
 * is a named constant with the reason attached, which §10.1 permits and
 * nothing else here does.
 */
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const IconV4_1 = require("../../primitives/IconV4");
const TextV4_1 = require("../../primitives/TextV4");
const AuthStickyFooterV4_1 = require("../../primitives/AuthStickyFooterV4");
const useReducedMotion_1 = require("../../primitives/internal/useReducedMotion");
const motion_v4_1 = require("../../primitives/internal/motion-v4");
const chrome_v4_1 = require("../../primitives/internal/chrome-v4");
const state_v4_1 = require("../../primitives/internal/state-v4");
const v4_depth_1 = require("../../../primitives/internal/v4-depth");
const v4_motion_1 = require("../../../primitives/internal/v4-motion");
/* ────────────────────────────────────────────────────────────────────────
   Metrics
   ──────────────────────────────────────────────────────────────────────── */
/**
 * The hero panel's proportion (spec §3). Fixed, not derived from the artwork:
 * a flow whose hero is a different height on every step makes the headline
 * below it jump as the user advances, which is the loudest "nobody laid this
 * out" signal an onboarding can send.
 */
exports.HERO_ASPECT = 4 / 3;
/**
 * …capped at this fraction of the viewport so the CTA never leaves the fold on
 * a small phone (spec §3). 0.38 is the spec's number, kept.
 */
exports.HERO_MAX_HEIGHT_RATIO = 0.38;
/**
 * How much of the hero panel the fallback medallion fills when the caller
 * ships no artwork. A *ratio*, not a pixel size, because the panel is already
 * viewport-relative — the base pinned 96 and the medallion therefore looked
 * correct on one phone and lost on a tablet.
 */
exports.HERO_MEDALLION_RATIO = 0.34;
/**
 * A comfortable measure for a subhead — roughly 60 characters. Without it the
 * value line runs the full width of a tablet and stops being readable (§4).
 */
exports.MEASURE_MAX_WIDTH = 420;
/** How far apart the body's regions arrive, in ms (brief §8). */
exports.FLOW_STAGGER = 60;
/**
 * How many regions the entrance staggers before every later one arrives at
 * once. Three is where a stagger stops reading as choreography and starts
 * reading as a slow screen.
 */
exports.FLOW_STAGGER_CAP = 3;
/**
 * The tap target and the badge both come from `minTap()` — the same expression
 * `ButtonV4` and the V4 navigation line use — rather than the literal 44 the
 * 0.9.0 screens each wrote out. A seed that scales its spacing now scales the
 * whole line's controls with it instead of drifting away from a number chosen
 * for one scale.
 */
function flowMetrics(theme, viewportHeight) {
    const { spacing } = theme.tokens;
    const heroHeight = viewportHeight * exports.HERO_MAX_HEIGHT_RATIO;
    return {
        tap: (0, chrome_v4_1.minTap)(spacing),
        gutter: spacing.lg,
        badge: (0, chrome_v4_1.minTap)(spacing),
        medallion: Math.round(heroHeight * exports.HERO_MEDALLION_RATIO),
    };
}
/**
 * Resolve the grounds for a screen.
 *
 * The one thing this function exists to prevent: reading `tokens.ramps.*[50]`
 * directly. The ramps carry the **light** orientation in both schemes, so the
 * literal reading of spec §3 paints a near-white hero panel on a near-black
 * page. Every tint here is mixed from resolved *semantic* colours instead, so
 * it lands on the correct side of the page in either scheme by construction.
 */
function flowGrounds(theme, ground = 'plain', accent = 'primary') {
    const { colors } = theme;
    const fill = accent === 'accent' ? colors.accent : colors.primary;
    const onFill = accent === 'accent' ? colors.onAccent : colors.onPrimary;
    const ink = accent === 'accent' ? colors.accentText : colors.primaryText;
    // How far a tint travels from the page toward the brand. Low on purpose: a
    // tint that reads as a *colour* competes with the CTA, which is the one
    // thing on the screen allowed to be loud.
    const PAGE_TINT = 0.05;
    const PANEL_TINT = 0.12;
    const BADGE_TINT = 0.16;
    const page = ground === 'tinted' ? (0, v4_depth_1.mixToken)(colors.surface, fill, PAGE_TINT) : colors.surface;
    return {
        page,
        hero: ground === 'brand' ? fill : (0, v4_depth_1.mixToken)(page, fill, PANEL_TINT),
        onHero: ground === 'brand' ? onFill : ink,
        badge: (0, v4_depth_1.mixToken)(page, fill, BADGE_TINT),
        fill,
        onFill,
        ink,
    };
}
/* ────────────────────────────────────────────────────────────────────────
   Entrance
   ──────────────────────────────────────────────────────────────────────── */
/**
 * The line's one entrance: a short fade-and-rise, on the M3 scale, staggered
 * by region.
 *
 * `useReducedMotion()` collapses it to **no** animation rather than a faster
 * one — a user who asked for less motion asked for less motion, not for the
 * same motion hurried (§36).
 */
function useFlowEntrance(index = 0) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const progress = React.useRef(new react_native_1.Animated.Value(reduced ? 1 : 0)).current;
    const rise = tokens.spacing.md;
    React.useEffect(() => {
        if (reduced) {
            progress.setValue(1);
            return;
        }
        const animation = react_native_1.Animated.timing(progress, {
            toValue: 1,
            duration: v4_motion_1.V4_MOTION.enter,
            delay: Math.min(index, exports.FLOW_STAGGER_CAP) * exports.FLOW_STAGGER,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        animation.start();
        return () => animation.stop();
    }, [progress, reduced, index]);
    if (reduced)
        return { opacity: 1, transform: [{ translateY: 0 }] };
    return {
        opacity: progress,
        transform: [
            { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [rise, 0] }) },
        ],
    };
}
/* ────────────────────────────────────────────────────────────────────────
   Header
   ──────────────────────────────────────────────────────────────────────── */
/** A header control — 44×44 whatever the glyph, with an M3 press layer. */
function HeaderControl({ label, icon, onPress, tint, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tap } = flowMetrics(theme, 0);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: tap,
            height: tap,
            borderRadius: theme.tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            // A layer over the container, not `opacity` on the glyph: dimming the
            // content is what M3 spends 0.38 on to mean *disabled*.
            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, size: "lg", color: tint }) }));
}
/**
 * The header row from §1: back · progress · dismiss, each optional, each a
 * 44×44 tap target, with **spacers** where a control is absent so the progress
 * bars do not slide sideways the moment one appears.
 *
 * Renders nothing when all three slots are empty — an empty 44pt strip at the
 * top of a screen is a gap the user has to explain to themselves (§4.5).
 */
function FlowHeaderV4({ onBack, onDismiss, progress, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const { tap, gutter } = flowMetrics(theme, 0);
    if (!onBack && !onDismiss && !progress)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingHorizontal: gutter,
            paddingTop: tokens.spacing.md,
        }, children: [onBack ? ((0, jsx_runtime_1.jsx)(HeaderControl, { label: "Go back", icon: "chevron-left", onPress: onBack, tint: "onSurface" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tap, height: tap } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(HeaderControl, { label: "Dismiss", icon: "close", onPress: onDismiss, tint: "mutedText" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tap, height: tap } }))] }));
}
/**
 * The hero slot (§3): a tinted 4:3 panel, capped at 38% of the viewport,
 * holding the caller's artwork — or, when there is none, the brand medallion
 * at hero size. **Never empty space**: a screen with nothing in the hero slot
 * must still look composed.
 */
function FlowHeroV4({ illustration, logoGlyph, grounds, show = true, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    const { medallion } = flowMetrics(theme, height);
    if (!show)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            alignSelf: 'stretch',
            aspectRatio: exports.HERO_ASPECT,
            maxHeight: height * exports.HERO_MAX_HEIGHT_RATIO,
            borderRadius: theme.tokens.radius.lg,
            backgroundColor: grounds.hero,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: medallion,
                height: medallion,
                borderRadius: theme.tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: grounds.fill,
            }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: logoGlyph ?? '✦', size: "3xl", style: { color: grounds.onFill } }) })) }));
}
/**
 * The headline block (§4): `2xl` bold over a muted value line held to a
 * readable measure.
 *
 * The subhead takes `mutedText`, not `muted`. `muted` is a ramp step with no
 * contrast promise against `surface`, and it is the token every 0.9.0 screen
 * reached for — which is how a value proposition ended up at 3.1:1 on a
 * light page.
 */
function FlowHeadlineV4({ title, subtitle, align = 'center', }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (!title && !subtitle)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", face: "heading", size: "2xl", weight: "bold", tone: "onSurface", align: align, numberOfLines: 2, children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: align, numberOfLines: 3, style: {
                    maxWidth: exports.MEASURE_MAX_WIDTH,
                    alignSelf: align === 'center' ? 'center' : 'flex-start',
                }, children: subtitle })) : null] }));
}
/**
 * A footer text link.
 *
 * **Underlined**, which is the whole point. §31 asks for familiar
 * interactions, and a centred un-underlined label sitting under a filled
 * button is indistinguishable from a caption — the 0.9.0 footers rendered
 * "No thanks, start my free trial" as `tone="muted"` text and users read it as
 * fine print rather than as the other option.
 */
function FlowLinkV4({ label, onPress, emphasis = 'secondary', disabled = false, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tap } = flowMetrics(theme, 0);
    if (!label)
        return null;
    const secondary = emphasis === 'secondary';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled || !onPress, onPress: onPress, style: ({ pressed }) => ({
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: tap,
            borderRadius: theme.tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: secondary ? 'base' : 'sm', weight: secondary ? 'semibold' : 'medium', tone: secondary ? 'onSurface' : 'mutedText', align: "center", style: { textDecorationLine: 'underline' }, children: label }) }));
}
/**
 * The footer stack from brief §4, in a fixed order so it cannot drift between
 * screens: footnote · reassurance · CTA · secondary · tertiary · legal.
 *
 * Built on `AuthStickyFooterV4` rather than a band of its own, because that
 * component already pays `insets.bottom` — and the reason this file exists is
 * that eight screens each drawing their own bottom band meant seven of them
 * did not.
 *
 * Renders nothing when every slot is empty (§4.5).
 */
function FlowFooterV4({ children, reassurance, reassuranceIcon = 'success', secondaryLabel, onSecondary, tertiaryLabel, onTertiary, legalLinks, onLegalLinkPress, footnote, safeArea = true, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const hasCta = React.Children.toArray(children).length > 0;
    const legal = legalLinks?.filter((link) => link.label) ?? [];
    if (!hasCta && !secondaryLabel && !tertiaryLabel && !reassurance && legal.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(AuthStickyFooterV4_1.AuthStickyFooterV4, { safeArea: safeArea, style: style, children: [footnote ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: footnote })) : null, reassurance ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: reassuranceIcon, size: "base", color: "successText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: reassurance })] })) : null, children, secondaryLabel ? ((0, jsx_runtime_1.jsx)(FlowLinkV4, { label: secondaryLabel, onPress: onSecondary, emphasis: "secondary" })) : null, tertiaryLabel ? ((0, jsx_runtime_1.jsx)(FlowLinkV4, { label: tertiaryLabel, onPress: onTertiary, emphasis: "tertiary" })) : null, legal.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.sm,
                }, children: legal.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "\u00B7" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: link.label, onPress: onLegalLinkPress ? () => onLegalLinkPress(link.id) : undefined, 
                            // Not 44 tall: a legal link is not a control the flow asks the
                            // user to hit, and a 44pt strip of them would out-weigh the
                            // restore link above it. It stays reachable, just not loud.
                            hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { textDecorationLine: 'underline' }, children: link.label }) })] }, link.id))) })) : null] }));
}
/**
 * The scroll/pin shell (brief §3) — the structural fix of this whole pass.
 *
 * Every 0.9.0 screen laid its body out with `flex: 1` and centred it. That is
 * correct for a welcome screen and **broken** for a paywall: four feature rows
 * plus a plan card plus fine print does not fit a small phone, and with no
 * scroll view in the tree the overflow was simply not reachable. A user on a
 * 5.4" device could not read the terms they were being asked to accept.
 *
 * `flexGrow: 1` on the content container is what lets one component be both:
 * a short body still centres in the leftover space, a long one scrolls, and no
 * screen has to choose in advance which it is.
 */
function FlowScreenV4({ grounds, header, children, footer, center = true, keyboardAware = false, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: grounds.page }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: { flex: 1 }, contentContainerStyle: {
                    flexGrow: 1,
                    justifyContent: center ? 'center' : 'flex-start',
                    alignItems: 'center',
                    gap: tokens.spacing.lg,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.lg,
                    paddingBottom: tokens.spacing.lg,
                }, showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: keyboardAware ? 'handled' : 'never', children: children }), footer] }));
}
//# sourceMappingURL=flow-v4.js.map