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
exports.usePressScale = usePressScale;
exports.useEnter = useEnter;
/**
 * Motion helpers — the kit was 98.3% static (audit Part C). These give every
 * component the two motions it most often needs, both reduced-motion-aware by
 * construction, so adding animation is a one-liner instead of hand-rolling
 * `Animated` (and forgetting `useReducedMotion`) each time.
 *
 * Timings follow design.md §36.2: micro-feedback 100–180ms, enter 160–240ms.
 * When the OS asks for reduced motion, every hook here degrades to an instant,
 * final value — no movement, never a broken interaction.
 */
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const useReducedMotion_1 = require("./useReducedMotion");
/**
 * A press-scale spring for tap targets. Returns the animated `scale` value plus
 * `onPressIn`/`onPressOut` handlers to spread onto a `Pressable`. Under reduced
 * motion the scale stays at 1 and the handlers are no-ops.
 *
 * ```tsx
 * const press = usePressScale();
 * <Animated.View style={{ transform: [{ scale: press.scale }] }}>
 *   <Pressable onPressIn={press.onPressIn} onPressOut={press.onPressOut} …/>
 * </Animated.View>
 * ```
 */
function usePressScale(to = 0.97) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const scale = React.useRef(new react_native_1.Animated.Value(1)).current;
    const spring = React.useCallback((value) => {
        if (reduced) {
            scale.setValue(1);
            return;
        }
        react_native_1.Animated.spring(scale, {
            toValue: value,
            useNativeDriver: true,
            speed: 40,
            bounciness: 0,
        }).start();
    }, [reduced, scale]);
    return {
        scale,
        onPressIn: React.useCallback(() => spring(to), [spring, to]),
        onPressOut: React.useCallback(() => spring(1), [spring]),
    };
}
/**
 * A mount enter transition: fade in (and optionally rise a few px). Returns a
 * style object to spread onto an `Animated.View`. Under reduced motion the
 * element is simply visible from the first frame.
 *
 * `translateY` defaults to 6px (a gentle rise); pass 0 for a pure fade.
 */
function useEnter(opts) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const rise = opts?.translateY ?? 6;
    const duration = opts?.duration ?? 200;
    const progress = React.useRef(new react_native_1.Animated.Value(reduced ? 1 : 0)).current;
    React.useEffect(() => {
        if (reduced) {
            progress.setValue(1);
            return;
        }
        const anim = react_native_1.Animated.timing(progress, {
            toValue: 1,
            duration,
            easing: react_native_1.Easing.out(react_native_1.Easing.cubic),
            useNativeDriver: true,
        });
        anim.start();
        // Stop the animation if the component unmounts mid-transition, so the timer
        // doesn't fire into a torn-down tree (avoids leaked-timer warnings in tests
        // and a setState-after-unmount in production).
        return () => anim.stop();
    }, [reduced, duration, progress]);
    return {
        opacity: progress,
        transform: [
            {
                translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [rise, 0],
                }),
            },
        ],
    };
}
//# sourceMappingURL=motion.js.map