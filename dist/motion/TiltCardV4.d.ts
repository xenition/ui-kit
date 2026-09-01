import * as React from 'react';
export interface TiltCardV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Maximum tilt angle in degrees. Clamped to {@link MAX_TILT_DEG}. */
    maxTilt?: number;
}
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
export declare const TiltCardV4: React.ForwardRefExoticComponent<TiltCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TiltCardV4.d.ts.map