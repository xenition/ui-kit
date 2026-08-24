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
const color_1 = require("../primitives/internal/color");
/**
 * Onboarding intro — V3. A minimal, text-forward take: a slim top progress bar
 * (fraction of slides completed) with a "Skip" link, centered headline/body, and
 * a Back / Next(Done) control pair at the base. No hero medallion — quieter and
 * faster to read. Same indexing/clamping and empty guard as
 * {@link OnboardingSlides}. Token-pure.
 */
function OnboardingSlidesV3({ slides, index, onIndexChange, onSkip, onComplete, showSkip = true, finishLabel = 'Get started', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
    if (count === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "Nothing to show yet." }) }));
    }
    const slide = slides[active];
    if (!slide)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    const filled = active + 1;
    const remaining = Math.max(0, count - filled);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flex: 1, paddingHorizontal: tokens.spacing.xl, paddingVertical: tokens.spacing.lg, backgroundColor: colors.surface },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: count, now: filled }, style: {
                            flex: 1,
                            flexDirection: 'row',
                            height: 4,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                            overflow: 'hidden',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: filled, height: 4, borderRadius: tokens.radius.full, backgroundColor: colors.primary } }), remaining > 0 ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: remaining } }) : null] }), showSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip intro", onPress: onSkip, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Skip" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700', letterSpacing: 1 }, children: `STEP ${active + 1} / ${count}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                            textAlign: 'center',
                        }, children: slide.title }), slide.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.base,
                            textAlign: 'center',
                            lineHeight: tokens.typography.scale.base * 1.6,
                        }, children: slide.description })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "lg", onPress: () => goTo(active - 1), disabled: isFirst, accessibilityLabel: "Previous slide", style: { flex: 1 }, children: "Back" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onPress: onNext, accessibilityLabel: isLast ? finishLabel : 'Next slide', style: { flex: 1 }, children: isLast ? finishLabel : 'Next' })] })] }));
}
//# sourceMappingURL=OnboardingSlidesV3.js.map