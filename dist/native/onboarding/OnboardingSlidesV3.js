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
exports.OnboardingSlidesV3 = OnboardingSlidesV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;
/**
 * The compact line has no hero panel; the slide glyph shrinks to a leading
 * badge beside the headline (spec §11, V3), on the same 44 module as the header
 * controls.
 */
const LEADING_BADGE = 44;
/** Comfortable measure for the description, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;
/**
 * Onboarding intro — V3, the **compact** line.
 *
 * No hero panel. The slide glyph drops to a small leading badge beside the
 * headline and the screen collapses to header · title row · sticky footer — for
 * a sheet presentation, or a short intro where a 38%-tall illustration would
 * push the CTA off the fold. Same shell, different idea (§11), not a reskin.
 *
 * The "STEP 1 / 3" caption this line used to carry is gone: §2 replaced it with
 * the header's segmented bars, which say the same thing without asking anyone
 * to read 12px of tracking-heavy uppercase.
 *
 * Identical props to {@link OnboardingSlides}. An `illustration` is honoured
 * (§3) — it takes the leading badge rather than a hero panel — and the slide
 * glyph is the fallback. Same indexing/clamping and empty guard. Token-pure.
 */
function OnboardingSlidesV3({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip = true, finishLabel = 'Get started', style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
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
    const badgeGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const showBack = onBack != null || !isFirst;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                }, children: [showBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous slide", onPress: goBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: count, activeIndex: active }) }), showSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip intro", onPress: onSkip, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.md,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: LEADING_BADGE,
                                height: LEADING_BADGE,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                backgroundColor: illustration ? badgeGround : colors.primary,
                            }, children: illustration ?? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: slide.icon ?? '✦', size: "xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", numberOfLines: 2, children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", numberOfLines: 3, style: { maxWidth: MEASURE_MAX_WIDTH }, children: slide.description })) : null] })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                }, children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: isLast ? finishLabel : 'Next', accessibilityLabel: isLast ? finishLabel : 'Next slide', onPress: onNext }) })] }));
}
//# sourceMappingURL=OnboardingSlidesV3.js.map