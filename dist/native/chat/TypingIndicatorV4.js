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
exports.TypingIndicatorV4 = TypingIndicatorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const appearance_1 = require("../primitives/internal/appearance");
const v4_motion_1 = require("../../primitives/internal/v4-motion");
const thread_v4_1 = require("./internal/thread-v4");
/** How far apart the three dots start, in ms. Geometric — it is a stagger. */
const STAGGER = 150;
/** One breathing dot. */
function Dot({ delay, size, animate, color, radius, }) {
    const value = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!animate) {
            value.setValue(0);
            return;
        }
        const loop = react_native_1.Animated.loop(react_native_1.Animated.sequence([
            react_native_1.Animated.delay(delay),
            react_native_1.Animated.timing(value, {
                toValue: 1,
                duration: v4_motion_1.V4_MOTION.standard,
                easing: react_native_1.Easing.inOut(react_native_1.Easing.ease),
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(value, {
                toValue: 0,
                duration: v4_motion_1.V4_MOTION.standard,
                easing: react_native_1.Easing.inOut(react_native_1.Easing.ease),
                useNativeDriver: true,
            }),
        ]));
        loop.start();
        return () => loop.stop();
    }, [value, animate, delay]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor: color,
            transform: [
                { translateY: value.interpolate({ inputRange: [0, 1], outputRange: [0, -size / 2] }) },
            ],
        } }));
}
/**
 * **V4 typing indicator** — same props as {@link TypingIndicator} plus
 * `scale` and `formatLabel`.
 *
 * ## Three changes
 *
 * 1. **The loop is on the M3 motion scale.** The base timed its own dots; a
 *    breathing dot is a state change, so it takes `standard`.
 * 2. **The name line is a prop.** `'Ada is typing'` was assembled inside the
 *    component, out of a localizing host's reach — and the word order is not
 *    universal.
 * 3. **The dots are hidden from the reader.** The live region carries the
 *    message; three unlabelled circles beside it are three extra stops.
 *
 * `useReducedMotion()` still collapses the animation entirely — the base did
 * this correctly and it is kept.
 */
function TypingIndicatorV4({ name, bubble = true, size, scale = 'sm', appearance = 'classic', formatLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const dot = size ?? (0, thread_v4_1.chatSize)(theme, scale) / 2;
    const spoken = (formatLabel ?? ((n) => (n ? `${n} is typing` : 'Typing')))(name);
    const dots = ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', alignItems: 'flex-end', gap: dot * 0.6 }, children: [0, STAGGER, STAGGER * 2].map((delay) => ((0, jsx_runtime_1.jsx)(Dot, { delay: delay, size: dot, animate: !reduced, color: colors.mutedText, radius: tokens.radius.full }, delay))) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", accessibilityLabel: spoken, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
            style,
        ], children: [name ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: name })) : null, bubble ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                    borderRadius: tokens.radius.lg,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: dots })) : (dots)] }));
}
//# sourceMappingURL=TypingIndicatorV4.js.map