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
exports.OnboardingSlides = OnboardingSlides;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;
/** The hero panel is roughly 4:3 (spec §3). */
const HERO_ASPECT = 4 / 3;
/** …capped at ~38% of screen height so the CTA never leaves the fold (spec §3). */
const HERO_MAX_HEIGHT_RATIO = 0.38;
/** The slide glyph promoted to hero size (spec §3). */
const HERO_MEDALLION = 96;
/** Comfortable measure for the description, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;
/**
 * Paged intro carousel — the first-run "here's the value" sequence, rebuilt on
 * the shell from §1 of the onboarding spec.
 *
 * The version this replaces put a "Skip" link alone at the top, a medallion and
 * two lines of text in the middle, and dots above a button at the bottom. The
 * shell gives it structure instead: a **header** carrying back · segmented
 * progress · dismiss (§1–2), a **hero slot** that takes the caller's
 * `illustration` or falls back to the slide's glyph at hero size (§3), a
 * **centred headline block** on a readable measure (§4), and the **sticky
 * footer CTA** every other screen in the funnel ends on (§5). The numbered
 * position captions are gone: the bars say where you are without them.
 *
 * Works controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash, and an empty `slides` list
 * renders the empty state rather than a blank screen. No literal colors.
 */
function OnboardingSlides({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip = true, finishLabel = 'Get started', variant = 'default', style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    const [internal, setInternal] = React.useState(0);
    const count = slides.length;
    const controlled = index != null;
    const rawActive = controlled ? index : internal;
    const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
    const isLast = active >= count - 1;
    const isFirst = active <= 0;
    const goTo = (next) => {
        const clamped = Math.min(Math.max(0, next), Math.max(0, count - 1));
        if (!controlled)
            setInternal(clamped);
        onIndexChange?.(clamped);
    };
    const onNext = () => {
        if (isLast) {
            onComplete?.();
            return;
        }
        goTo(active + 1);
    };
    const goBack = () => {
        if (onBack) {
            onBack();
            return;
        }
        goTo(active - 1);
    };
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", children: "Nothing to show yet." }) }));
    }
    const slide = slides[active];
    if (!slide)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    /*
      §3's `primary[50]` ground, read for the dark scheme too: `tokens.ramps` is
      not scheme-inverted, so step 50 would be near-white on a near-black page.
    */
    const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const showBack = onBack != null || !isFirst;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.lg,
                }, children: [showBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous slide", onPress: goBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : (
                    // A spacer, not a missing element — the bars must not jump sideways
                    // the moment the back chevron appears on slide two.
                    (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: count, activeIndex: active }) }), showSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip intro", onPress: onSkip, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: tokens.spacing.lg,
                    gap: tokens.spacing.lg,
                }, children: [variant === 'default' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'stretch',
                            aspectRatio: HERO_ASPECT,
                            maxHeight: height * HERO_MAX_HEIGHT_RATIO,
                            borderRadius: tokens.radius.lg,
                            backgroundColor: heroGround,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: HERO_MEDALLION,
                                height: HERO_MEDALLION,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.primary,
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: slide.icon ?? '✦', size: "3xl", color: "onPrimary" }) })) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, style: { maxWidth: MEASURE_MAX_WIDTH, alignSelf: 'center' }, children: slide.description })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                }, children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: isLast ? finishLabel : 'Next', accessibilityLabel: isLast ? finishLabel : 'Next slide', onPress: onNext }) })] }));
}
//# sourceMappingURL=OnboardingSlides.js.map