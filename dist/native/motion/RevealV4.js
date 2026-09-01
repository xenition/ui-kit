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
exports.RevealV4 = RevealV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const theme_1 = require("../theme");
const Stagger_1 = require("./Stagger");
/**
 * The zoom's start scale — a ratio, not a distance, so brief §3 rule 2 exempts
 * it from the spacing scale. The same 0.92 as the web twin.
 */
const ZOOM_FROM_SCALE = 0.92;
/**
 * **V4 reveal (native)** — the twin of the web `RevealV4`, and the reason that
 * file exists.
 *
 * 1. **The duration.** This component ran `500ms` while its web twin ran
 *    `600ms`: the same component, two numbers, neither of them on the scale,
 *    and no comment in either file admitting the other existed. Brief §1 calls
 *    it the headline bug of this pass. A reveal is something arriving, so both
 *    twins now default to `V4_MOTION.enter` (400).
 * 2. **The easing.** The base passed no `easing` at all, taking
 *    `Animated.timing`'s default `Easing.inOut(Easing.ease)` — a symmetric
 *    curve, which is the wrong shape for an arrival: it decelerates into place
 *    *and* accelerates out of nothing. {@link EASING_ENTER} is M3's
 *    emphasized-decelerate, the same four control points the web twin hands to
 *    `cubic-bezier()`.
 * 3. **The distance.** `translateY: 16` was a literal in a `FROM` table. It is
 *    `spacing.lg` now, off the same compiled scale the web twin reaches through
 *    `var(--xen-space-lg)`, and the slides take `spacing.xl` — so the two twins
 *    travel the same pixels, not merely similar ones.
 * 4. **Reduced motion is a fade, not a jump.** The base returned a static
 *    `<View style={{ opacity: 1 }}>`: the content simply existed, with no
 *    transition of any kind. `design.md` §36.10 and brief §3 rule 3 both say
 *    that is the wrong reduction — an element that appears with no transition
 *    reads as a glitch. V4 keeps the animation and removes the *travel*: opacity
 *    only, at `V4_MOTION.standard` (200ms) with {@link EASING_STANDARD}, since a
 *    fade starts and ends in place.
 *
 * **This component needs a theme provider above it, and the base did not.**
 * That is the cost of (3) — the spacing scale lives in the compiled theme and
 * React Native cannot read a CSS variable — and it is the same requirement
 * every other V4 native component already carries (the base `AnimatedCounter`
 * included, for its colour).
 *
 * `useNativeDriver: true`: opacity and transform are the two things the native
 * driver handles, so the entrance runs off the JS thread even while a list is
 * still mounting. No colors are painted here — motion only.
 */
function RevealV4({ children, effect = 'fade-up', delay = 0, duration = motion_v4_1.V4_MOTION.enter, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const { spacing } = tokens;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const staggerConfig = React.useContext(Stagger_1.StaggerConfigContext);
    const staggerIndex = React.useContext(Stagger_1.StaggerIndexContext);
    const totalDelay = delay +
        (staggerConfig !== null ? staggerConfig.delay + staggerIndex * staggerConfig.interval : 0);
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        anim.setValue(0);
        const animation = react_native_1.Animated.timing(anim, {
            toValue: 1,
            // Reduced motion shortens the movement to a plain fade; it does not
            // remove it. The travel is dropped below, not here.
            duration: reduced ? motion_v4_1.V4_MOTION.standard : duration,
            delay: totalDelay,
            easing: reduced ? motion_v4_1.EASING_STANDARD : motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        animation.start();
        return () => animation.stop();
    }, [reduced, anim, duration, totalDelay]);
    const transform = reduced
        ? []
        : effect === 'fade-up'
            ? [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [spacing.lg, 0] }) }]
            : effect === 'slide-left'
                ? [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [-spacing.xl, 0] }) }]
                : effect === 'slide-right'
                    ? [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [spacing.xl, 0] }) }]
                    : effect === 'zoom'
                        ? [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [ZOOM_FROM_SCALE, 1] }) }]
                        : [];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-v4-reveal", style: [{ opacity: anim, transform }, style], children: children }));
}
//# sourceMappingURL=RevealV4.js.map