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
exports.Reveal = Reveal;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const Stagger_1 = require("./Stagger");
// Starting offset/scale for each effect (the animated value drives 0→1).
const FROM = {
    translateY: 16,
    scale: 0.92,
};
/**
 * Mount-entrance wrapper — the native mirror of the web `Reveal`, adapted to
 * mobile: content animates **in on mount** via `Animated` (no
 * IntersectionObserver / scroll trigger — those are web-only). Under the OS
 * "Reduce Motion" setting the animation is skipped entirely and children render
 * immediately in their final state. A surrounding `Stagger` adds
 * `base + index * interval` to the `delay`. No literal colors (motion only).
 */
function Reveal({ children, effect = 'fade-up', delay = 0, duration = 500, style, }) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const staggerConfig = React.useContext(Stagger_1.StaggerConfigContext);
    const staggerIndex = React.useContext(Stagger_1.StaggerIndexContext);
    const totalDelay = delay +
        (staggerConfig !== null ? staggerConfig.delay + staggerIndex * staggerConfig.interval : 0);
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (reduced) {
            anim.setValue(1);
            return undefined;
        }
        anim.setValue(0);
        const animation = react_native_1.Animated.timing(anim, {
            toValue: 1,
            duration,
            delay: totalDelay,
            useNativeDriver: true,
        });
        animation.start();
        return () => animation.stop();
    }, [reduced, anim, duration, totalDelay]);
    // Reduced motion: render immediately, statically, at full visibility.
    if (reduced) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-reveal", style: [{ opacity: 1 }, style], children: children }));
    }
    // Inline literals (mirrors the StatusDot echo pattern) so the Animated
    // transform types line up; `fade` carries no transform.
    const transform = effect === 'fade-up'
        ? [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [FROM.translateY, 0] }) }]
        : effect === 'zoom'
            ? [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [FROM.scale, 1] }) }]
            : [];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-reveal", style: [{ opacity: anim, transform }, style], children: children }));
}
//# sourceMappingURL=Reveal.js.map