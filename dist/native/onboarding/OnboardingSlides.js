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
const ProgressDots_1 = require("./ProgressDots");
/**
 * Paged intro carousel — the first-run "here's the value" sequence
 * (design.md §41-42). Renders one {@link OnboardingSlide} at a time with a
 * hero medallion, a {@link ProgressDots} indicator, a "Skip" escape hatch and a
 * Next/Done primary action that walks to `onComplete` on the last slide. Works
 * controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash. No literal colors.
 */
function OnboardingSlides({ slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', variant = 'default', style, }) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: [{ flex: 1, paddingHorizontal: tokens.spacing.xl, paddingVertical: tokens.spacing.lg }, style], children: [showSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip intro", onPress: onSkip, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: "Skip" }) }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.lg }, children: [variant === 'default' && slide.icon ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 96,
                            height: 96,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.accent,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: slide.icon, size: "3xl", color: "onAccent" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                            textAlign: 'center',
                        }, children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.base,
                            textAlign: 'center',
                            lineHeight: tokens.typography.scale.base * 1.5,
                        }, children: slide.description })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.lg, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { count: count, activeIndex: active, onDotPress: goTo }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onPress: onNext, accessibilityLabel: isLast ? finishLabel : 'Next slide', style: { alignSelf: 'stretch' }, children: isLast ? finishLabel : 'Next' })] })] }));
}
//# sourceMappingURL=OnboardingSlides.js.map