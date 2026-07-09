"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = useReducedMotion;
/**
 * `prefers-reduced-motion` for React Native — the OS "Reduce Motion" toggle,
 * read via `AccessibilityInfo`. Components that animate (StatusDot's echo,
 * future motion) gate their animation on this, exactly as the web layer gates
 * on the CSS media query. SSR/native-safe: the async read never throws and the
 * initial value is the motion-on default.
 */
const react_1 = require("react");
const react_native_1 = require("react-native");
function useReducedMotion() {
    const [reduced, setReduced] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        react_native_1.AccessibilityInfo.isReduceMotionEnabled()
            .then((value) => {
            if (mounted)
                setReduced(value);
        })
            .catch(() => {
            /* older platforms may reject; treat as motion-on */
        });
        const sub = react_native_1.AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => setReduced(value));
        return () => {
            mounted = false;
            // RN >= 0.65 returns a subscription with `.remove()`.
            sub?.remove?.();
        };
    }, []);
    return reduced;
}
//# sourceMappingURL=useReducedMotion.js.map