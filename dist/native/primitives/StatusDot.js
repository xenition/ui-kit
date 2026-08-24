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
exports.StatusDot = StatusDot;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("./internal/useReducedMotion");
/**
 * Pulsing semantic status dot — the native mirror of the web `StatusDot`. A
 * solid token-colored dot with an expanding, fading echo driven by `Animated`.
 * The echo is disabled under the OS "Reduce Motion" setting (the solid dot
 * still communicates state). No literal colors.
 */
function StatusDot({ tone = 'success', pulse = true, label, size = 8, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const color = colors[tone];
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    const animate = pulse && !reduced;
    React.useEffect(() => {
        if (!animate) {
            anim.setValue(0);
            return;
        }
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: react_native_1.Easing.out(react_native_1.Easing.ease),
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [animate, anim]);
    const echoStyle = {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.75, 0, 0] }),
        transform: [
            { scale: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 2.4, 2.4] }) },
        ],
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: label !== undefined, accessibilityRole: label !== undefined ? 'image' : undefined, accessibilityLabel: label, importantForAccessibility: label === undefined ? 'no-hide-descendants' : 'yes', style: [{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style], children: [animate ? ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-status-echo", pointerEvents: "none", style: echoStyle })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: size, height: size, borderRadius: size / 2, backgroundColor: color } })] }));
}
//# sourceMappingURL=StatusDot.js.map