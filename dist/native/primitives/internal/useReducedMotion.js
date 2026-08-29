"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = useReducedMotion;
/**
 * `prefers-reduced-motion` for React Native — the OS "Reduce Motion" toggle,
 * read via `AccessibilityInfo`. Components that animate (StatusDot's echo,
 * future motion) gate their animation on this, exactly as the web layer gates
 * on the CSS media query. SSR/native-safe: the async read never throws and the
 * initial value is the motion-on default.
 *
 * Two paths, chosen by whether a `XenitionNativeThemeProviderV4` is mounted
 * above:
 *
 * - **With a V4 root** — the provider has already resolved the preference once
 *   for the whole tree, so this hook reads it off context. No second listener,
 *   no second async read, and no motion-on frame before the answer lands (the
 *   provider holds the first paint until it knows).
 * - **Without one** — the standalone behaviour below, unchanged: own listener,
 *   own read, `false` until the promise resolves. Every existing caller keeps
 *   exactly the behaviour it has today.
 *
 * `useContext` is called unconditionally and before the other hooks, so hook
 * order is identical on both paths.
 */
const react_1 = require("react");
const react_native_1 = require("react-native");
const XenitionNativeThemeProviderV4_1 = require("../XenitionNativeThemeProviderV4");
function useReducedMotion() {
    const shared = (0, react_1.useContext)(XenitionNativeThemeProviderV4_1.XenitionNativeMotionContext);
    const [reduced, setReduced] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // A V4 root owns the subscription for the whole tree; do not open a second.
        if (shared !== null)
            return;
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
        // `shared` is stable for the life of a tree in practice (a provider does
        // not appear and disappear above a mounted component), so with no V4 root
        // this effect still runs exactly once, as it always did.
    }, [shared]);
    return shared !== null ? shared.reducedMotion : reduced;
}
//# sourceMappingURL=useReducedMotion.js.map