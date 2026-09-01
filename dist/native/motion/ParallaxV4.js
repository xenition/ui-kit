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
exports.PARALLAX_MAX_SPEED = void 0;
exports.clampParallaxSpeed = clampParallaxSpeed;
exports.ParallaxV4 = ParallaxV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/**
 * The clamp, carried over from the web base with its reason intact.
 *
 * At `|speed| > 0.5` the layer moves more than half as far as the list does,
 * and the eye stops reading it as *depth* and starts reading it as *detached* —
 * the content visibly slides out of the section it belongs to, and on a long
 * screen it can leave its container entirely. Half the page's travel is the
 * point where "behind the page" turns into "not on the page".
 */
exports.PARALLAX_MAX_SPEED = 0.5;
/** `speed`, clamped to ±{@link PARALLAX_MAX_SPEED}. */
function clampParallaxSpeed(speed) {
    return Math.max(-exports.PARALLAX_MAX_SPEED, Math.min(exports.PARALLAX_MAX_SPEED, speed));
}
/**
 * `Parallax`, V4 on native — **a component the native barrel says cannot
 * exist.**
 *
 * ## The correction
 *
 * `src/native/motion/index.ts` groups `Parallax` with `TiltCard` and excludes
 * both because they "depend on scroll position / pointer events that have no
 * direct React Native analogue". Half of that sentence is wrong. Pointer tilt
 * really has no touch analogue (there is no hover), so `TiltCard` stays web-only
 * on purpose — but scroll position is not only available on React Native, it is
 * the single most common thing animated on it. An `Animated.ScrollView` whose
 * `onScroll` is mapped into an `Animated.Value` through `useNativeDriver`, with
 * layers interpolating off that value, *is* the canonical RN parallax; it is
 * what every collapsing header and hero image on the platform is built from.
 *
 * The barrel's blanket sentence needs replacing with `TiltCard`'s specific
 * reason. That reason is written out in `motion/TiltCardV4.tsx`.
 *
 * ## Why the caller owns the `ScrollView`
 *
 * The obvious shape — a `Parallax` that renders its own `Animated.ScrollView` —
 * is the wrong one. A screen has *one* scroll container and usually several
 * parallax layers in it; a component that brought its own would nest scrollers,
 * break the screen's own `contentContainerStyle`, `refreshControl`,
 * `onEndReached` and keyboard handling, and make two layers on one screen
 * impossible. So this component owns exactly what it can: the mapping from an
 * offset it is *given* to a transform on itself.
 *
 * ```tsx
 * const scrollY = React.useRef(new Animated.Value(0)).current;
 *
 * <Animated.ScrollView
 *   scrollEventThrottle={16}
 *   onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
 *     useNativeDriver: true,
 *   })}
 * >
 *   <ParallaxV4 scrollY={scrollY} speed={0.3}>
 *     <Image … />
 *   </ParallaxV4>
 * </Animated.ScrollView>
 * ```
 *
 * The whole path is native-driver-safe: `translateY` is a transform, so the
 * mapping runs on the UI thread and keeps up with a fling that JS would not.
 *
 * ## Why there is no duration and no easing here
 *
 * Brief §2 splits the module into *transitions* (which take `V4_MOTION` /
 * `EASING_*` outright) and *playback* (which derives its own duration and says
 * why). Parallax is **neither** — it is a continuous mapping from scroll
 * position to offset, and the user's finger is the clock. There is no duration
 * to pick, and an easing would be a lie.
 *
 * That absence is deliberate and worth stating, because it looks like an
 * omission. Wrapping this in an `Animated.timing` to "put it on the scale"
 * would insert lag between the finger and the layer, which is exactly the
 * defect `design.md` §36.4 names: a direct-manipulation gesture must track the
 * input, not replay an animation about it.
 *
 * ## Reduced motion removes it rather than fading it
 *
 * §3.3 says reduced motion replaces a large spatial move with a fade rather
 * than deleting it, because an element that pops into place reads as a glitch.
 * That rule is about transitions. Parallax has no transition to replace and no
 * arrival to soften: switching the mapping off leaves the layer exactly where
 * the layout put it, which is a complete, correct frame — and scroll-linked
 * movement is squarely what the OS setting is for. So, like `MarqueeV4` and for
 * a different reason, this is one of the two places in the module where reduced
 * motion legitimately means *off*: a plain `Animated.View` with no transform,
 * not an interpolation that resolves to zero.
 *
 * ## The offset the layer resolves to
 *
 * `0` when the layer is centred on screen, matching the web twin exactly, so a
 * marketing page and its app screen rest in the same place. That needs the
 * layer's own position, which arrives from `onLayout` — `y` relative to the
 * scroll content, which is what a direct child of the scroll container gets.
 * Until the first layout the transform is omitted entirely rather than applied
 * with a half-measured offset, which would place the layer wrong for one frame
 * and then jump it.
 */
function ParallaxV4({ scrollY, speed = 0.2, style, testID, children, }) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const { height: windowHeight } = (0, react_native_1.useWindowDimensions)();
    const [layout, setLayout] = React.useState({ y: 0, height: 0 });
    const onLayout = React.useCallback((event) => {
        const { y, height } = event.nativeEvent.layout;
        setLayout((prev) => (prev.y === y && prev.height === height ? prev : { y, height }));
    }, []);
    const measured = layout.height > 0;
    const factor = clampParallaxSpeed(speed);
    const translateY = React.useMemo(() => {
        if (reduced || !measured)
            return null;
        // offset = (viewportCentre − layerCentreOnScreen) × factor, and
        // layerCentreOnScreen = layout.y + layout.height / 2 − scrollY.
        // That is affine in scrollY, so two points define it exactly.
        const atZero = (windowHeight / 2 - layout.y - layout.height / 2) * factor;
        return scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [atZero, atZero + factor],
            // The mapping is valid for the whole scroll range, not just [0, 1].
            extrapolate: 'extend',
        });
    }, [reduced, measured, scrollY, factor, windowHeight, layout.y, layout.height]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: testID, onLayout: onLayout, style: [style, translateY === null ? null : { transform: [{ translateY }] }], children: children }));
}
//# sourceMappingURL=ParallaxV4.js.map