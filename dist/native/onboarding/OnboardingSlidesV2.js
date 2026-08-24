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
const ProgressDots_1 = require("./ProgressDots");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
/**
 * The hero + copy for a single slide, isolated so a `key={slide.id}` remount
 * re-runs {@link useEnter} and cross-fades on every advance.
 */
function SlideHero({ slide }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 10 });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    opacity: enter.opacity,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 160,
                        height: 160,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.16),
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: slide.icon ?? '✦', size: 96, color: "primaryText" }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: {
                    paddingHorizontal: tokens.spacing.xl,
                    paddingTop: tokens.spacing.xl,
                    gap: tokens.spacing.sm,
                    opacity: enter.opacity,
                    transform: enter.transform,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                            textAlign: 'center',
                        }, children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.lg,
                            textAlign: 'center',
                            lineHeight: tokens.typography.scale.lg * 1.5,
                        }, children: slide.description })) : null] })] }));
}
/**
 * Onboarding intro — V2. A full-bleed illustration hero fills the top of the
 * screen per slide, with the headline/description below and a pinned footer of
 * {@link ProgressDots} plus a big Next/Done button. Same controlled/uncontrolled
 * indexing and clamping as {@link OnboardingSlides}; empty list guarded. Token-pure.
 */
function OnboardingSlidesV2({ slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(0);
    const count = slides.length;
    const controlled = index != null;
    const rawActive = controlled ? index : internal;
    const active = count === 0 ? 0 : Math.min(Math.max(0, rawActive), count - 1);
    const isLast = active >= count - 1;
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
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "Nothing to show yet." }) }));
    }
    const slide = slides[active];
    if (!slide)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [showSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip intro", onPress: onSkip, hitSlop: tokens.spacing.sm, style: {
                    position: 'absolute',
                    top: tokens.spacing.lg,
                    right: tokens.spacing.lg,
                    zIndex: 1,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.06),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Skip" }) })) : null, (0, jsx_runtime_1.jsx)(SlideHero, { slide: slide }, slide.id), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    paddingHorizontal: tokens.spacing.xl,
                    paddingBottom: tokens.spacing.xl,
                    paddingTop: tokens.spacing.lg,
                    gap: tokens.spacing.lg,
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { count: count, activeIndex: active, onDotPress: goTo }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onPress: onNext, accessibilityLabel: isLast ? finishLabel : 'Next slide', style: { alignSelf: 'stretch' }, children: isLast ? finishLabel : 'Next' })] })] }));
}
//# sourceMappingURL=OnboardingSlidesV2.js.map