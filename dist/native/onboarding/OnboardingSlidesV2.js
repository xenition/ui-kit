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
exports.OnboardingSlidesV2 = OnboardingSlidesV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
const motion_1 = require("../primitives/internal/motion");
/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;
/**
 * The editorial hero runs to the top edge and takes a little under half the
 * screen — bigger than the base line's 38% cap because nothing insets it
 * (spec §11, V2).
 */
const HERO_HEIGHT_RATIO = 0.46;
/** The slide glyph promoted to hero size (spec §3). */
const HERO_MEDALLION = 104;
/** Comfortable measure for the description, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;
/**
 * The hero + copy for a single slide, isolated so a `key={slide.id}` remount
 * re-runs {@link useEnter} and cross-fades on every advance.
 */
function SlideBody({ slide, illustration, heroHeight, heroGround, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 10 });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                    height: heroHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: heroGround,
                    overflow: 'hidden',
                    opacity: enter.opacity,
                }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: HERO_MEDALLION,
                        height: HERO_MEDALLION,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary,
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: slide.icon ?? '✦', size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: {
                    flex: 1,
                    marginTop: -tokens.spacing.xl,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.xl,
                    gap: tokens.spacing.sm,
                    justifyContent: 'center',
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    opacity: enter.opacity,
                    transform: enter.transform,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, style: { maxWidth: MEASURE_MAX_WIDTH, alignSelf: 'center' }, children: slide.description })) : null] })] }));
}
/**
 * Onboarding intro — V2, the **editorial** line.
 *
 * Same shell as {@link OnboardingSlides} — header · hero · headline · sticky
 * footer — but the hero is not a panel sitting under the header: it runs
 * full-bleed to the very top edge, the header controls float over it, and a
 * `colors.surface` content sheet lifts up over the bottom of the art. Each
 * advance remounts the body so the art and copy cross-fade in together.
 *
 * Identical props to {@link OnboardingSlides}, including the §3 `illustration`
 * slot and its medallion fallback. Same controlled/uncontrolled indexing and
 * clamping; an empty list is guarded. Token-pure.
 */
function OnboardingSlidesV2({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip = true, finishLabel = 'Get started', style, }) {
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
    /* See {@link OnboardingSlides}: `tokens.ramps` is not scheme-inverted. */
    const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const showBack = onBack != null || !isFirst;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsx)(SlideBody, { slide: slide, illustration: illustration, heroHeight: height * HERO_HEIGHT_RATIO, heroGround: heroGround }, slide.id), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.lg,
                }, children: [showBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous slide", onPress: goBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: count, activeIndex: active }) }), showSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip intro", onPress: onSkip, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                }, children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: isLast ? finishLabel : 'Next', accessibilityLabel: isLast ? finishLabel : 'Next slide', onPress: onNext }) })] }));
}
//# sourceMappingURL=OnboardingSlidesV2.js.map