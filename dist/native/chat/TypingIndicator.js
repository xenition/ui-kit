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
exports.TypingIndicator = TypingIndicator;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
function Dot({ delay, size, animate }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (!animate) {
            anim.setValue(0);
            return;
        }
        const loop = react_native_1.Animated.loop(react_native_1.Animated.sequence([
            react_native_1.Animated.delay(delay),
            react_native_1.Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                easing: react_native_1.Easing.inOut(react_native_1.Easing.ease),
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(anim, {
                toValue: 0,
                duration: 400,
                easing: react_native_1.Easing.inOut(react_native_1.Easing.ease),
                useNativeDriver: true,
            }),
        ]));
        loop.start();
        return () => loop.stop();
    }, [anim, animate, delay]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.muted,
            opacity: animate ? anim.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }) : 0.6,
            transform: [
                {
                    translateY: animate
                        ? anim.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.6] })
                        : 0,
                },
            ],
        } }));
}
/**
 * Animated "someone is typing" indicator — three bouncing dots, optionally in a
 * surface bubble with a leading name caption. The animation is gated on the OS
 * "Reduce Motion" setting. Marked as a polite live region so assistive tech
 * announces when typing starts. No literal colors.
 */
function TypingIndicator({ name, bubble = true, size = 6, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const animate = !reduced;
    const dots = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: size * 0.6 }, children: [(0, jsx_runtime_1.jsx)(Dot, { delay: 0, size: size, animate: animate }), (0, jsx_runtime_1.jsx)(Dot, { delay: 150, size: size, animate: animate }), (0, jsx_runtime_1.jsx)(Dot, { delay: 300, size: size, animate: animate })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", accessibilityLabel: name ? `${name} is typing` : 'Typing', style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: name })) : null, bubble ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: dots })) : (dots)] }));
}
//# sourceMappingURL=TypingIndicator.js.map