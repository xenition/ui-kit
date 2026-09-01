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
exports.TiltCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("./internal/reduced-motion");
const v4_motion_1 = require("../primitives/internal/v4-motion");
/**
 * Geometry, not motion — §3.2 keeps these as named constants rather than
 * pushing them onto a scale that has nothing to say about them.
 *
 * `perspective(800px)` is the distance from the notional camera to the card.
 * It is what turns two rotations into a readable 3D object: shorter and the
 * foreshortening becomes a fish-eye, longer and the rotation flattens into a
 * skew. 800px is roughly a hand's-length viewing distance for a card-sized
 * element and is the value the base already used.
 */
const PERSPECTIVE_PX = 800;
/**
 * The hard ceiling on `maxTilt`. Past ~15° the card's near edge grows enough
 * that text on it visibly stretches and the drop shadow separates from the
 * element, and the effect reads as a broken layout rather than as depth.
 */
const MAX_TILT_DEG = 15;
/**
 * The reset. This is the one transition in the component, and it takes the
 * scale: `standard` (200ms) with `EASE_STANDARD`, replacing the base's
 * hand-picked `200ms ease-out`. The number happens to match; the point is that
 * it is now the kit's number rather than a coincidence, and the curve is M3's
 * standard rather than the browser's `ease-out` (§3.1, and the seven-durations
 * finding in `v4-motion.ts`).
 */
const RESET_TRANSITION = (0, v4_motion_1.transitionCss)(['transform'], v4_motion_1.V4_MOTION.standard, v4_motion_1.EASE_STANDARD);
/**
 * `TiltCard`, V4 — pointer-tracked 3D tilt, on the scale where it has a
 * transition and off it where it does not.
 *
 * ## This component is web-only, and that is a design decision
 *
 * The native barrel currently excludes `Parallax` and `TiltCard` together, with
 * one blanket sentence: they "depend on scroll position / pointer events that
 * have no direct React Native analogue". **That sentence is half wrong and
 * needs replacing.** Scroll position has an excellent native analogue — an
 * `Animated.ScrollView` mapped through `useNativeDriver` is the canonical RN
 * parallax and now ships as `native/motion/ParallaxV4.tsx`.
 *
 * `TiltCard` is the half that is genuinely correct, for a reason worth writing
 * down properly:
 *
 *   - **The input does not exist on touch.** This component maps a *hovering*
 *     pointer's position over the card onto two rotations. A touch screen has
 *     no hover state: the finger is either not there or it is pressing, and
 *     while it is pressing it is covering the card it would be tilting. There
 *     is no continuous, non-committal position to read.
 *   - **The obvious substitute is a different component.** Device tilt from the
 *     accelerometer is a real and lovely effect, but it is driven by the phone's
 *     orientation rather than by a pointer, it applies to the whole screen
 *     rather than to the element under the cursor, and on React Native it needs
 *     a sensors peer dependency this kit does not take (§3.6, dependency-free).
 *     It should ship one day as `GyroCard`, with its own name, its own props
 *     and its own permission story — not as `TiltCard` pretending to be
 *     portable.
 *
 * So: `ParallaxV4` closes a gap that should never have been called impossible,
 * and `TiltCard` stays web-only on purpose. That is the sentence the native
 * barrel should carry.
 *
 * ## Motion
 *
 * Two different things happen here and they must not share a curve:
 *
 *   - **Tracking the pointer is not a transition.** While the pointer is over
 *     the card, the rotation *is* the pointer position — a direct manipulation
 *     (`design.md` §36.4), so it must be applied with no transition at all.
 *     **The base got this wrong**: it left `transform 200ms ease-out` on the
 *     element permanently, so every pointer move was eased and the card
 *     followed the cursor 200ms late. That reads as lag, not as smoothing.
 *   - **The reset is a transition** — the card returning from a held rotation
 *     to flat, starting and ending in place, which is exactly what
 *     `EASE_STANDARD` describes. It takes {@link RESET_TRANSITION}.
 *
 * So the transition is switched off on the first pointer move and back on for
 * the leave, rather than being left on for both.
 *
 * ## Reduced motion
 *
 * §3.3's rule — replace a spatial move with a fade rather than removing it —
 * is about transitions that *arrive*. There is nothing here to fade: the tilt
 * is an optional embellishment on a card that is already fully rendered and
 * legible without it, and the card's resting state is the un-tilted one. Under
 * `prefers-reduced-motion` the pointer is simply not tracked, no transition is
 * declared, and no compositing layer is requested.
 *
 * Touch pointers are ignored for the same reason the component is web-only: a
 * `pointertype: 'touch'` move is a drag, not a hover.
 *
 * SSR-safe and dependency-free — state is written straight to the element's
 * style, so a pointer move costs no React render.
 */
exports.TiltCardV4 = React.forwardRef(function TiltCardV4({ maxTilt = 8, style, children, onPointerMove, onPointerLeave, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const clampedMax = Math.max(0, Math.min(MAX_TILT_DEG, maxTilt));
    const handlePointerMove = (event) => {
        onPointerMove?.(event);
        const el = localRef.current;
        if (el === null || reduced || event.pointerType === 'touch')
            return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0)
            return;
        const px = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateY = (px * 2 * clampedMax).toFixed(2);
        const rotateX = (-py * 2 * clampedMax).toFixed(2);
        // Direct manipulation: the rotation IS the pointer position, so it lands
        // untransitioned. Easing it here would put the card 200ms behind the
        // cursor, which is the base's bug.
        el.style.transition = 'none';
        el.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handlePointerLeave = (event) => {
        onPointerLeave?.(event);
        const el = localRef.current;
        if (el === null || reduced)
            return;
        // The return to flat IS a transition, and takes the scale.
        el.style.transition = RESET_TRANSITION;
        el.style.transform = '';
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: localRef, "data-xen-tilt-v4": "", onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave, style: {
            transition: reduced ? undefined : RESET_TRANSITION,
            willChange: reduced ? undefined : 'transform',
            ...style,
        }, ...rest, children: children }));
});
//# sourceMappingURL=TiltCardV4.js.map