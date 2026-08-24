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
exports.ProgressDots = ProgressDots;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DOT = { sm: 6, md: 8 };
/**
 * Paged-progress indicator — a row of token-bound dots where the active step is
 * a widened "pill" in the primary color and the rest are muted. Shared by
 * {@link OnboardingSlides}, {@link WelcomeScreen} and the paywall flow so every
 * screen advertises its position identically. Dots are decorative unless
 * `onDotPress` is supplied, in which case each becomes a labelled button. Guards
 * an empty/negative `count`. No literal colors.
 */
function ProgressDots({ count, activeIndex, size = 'md', onDotPress, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(count));
    const d = DOT[size];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: Math.max(0, total - 1), now: activeIndex }, accessibilityLabel: accessibilityLabel ?? `Step ${Math.min(activeIndex + 1, total)} of ${total}`, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: Array.from({ length: total }, (_, i) => {
            const active = i === activeIndex;
            const dot = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: active ? d * 2.5 : d,
                    height: d,
                    borderRadius: tokens.radius.full,
                    backgroundColor: active ? colors.primary : colors.border,
                } }));
            if (!onDotPress)
                return (0, jsx_runtime_1.jsx)(React.Fragment, { children: dot }, i);
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Go to step ${i + 1}`, accessibilityState: { selected: active }, hitSlop: tokens.spacing.sm, onPress: () => onDotPress(i), children: dot }, i));
        }) }));
}
//# sourceMappingURL=ProgressDots.js.map