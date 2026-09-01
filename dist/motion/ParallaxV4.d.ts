import * as React from 'react';
export interface ParallaxV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Parallax intensity. Positive values scroll slower than the page, negative
     * values faster. Clamped to ±{@link PARALLAX_MAX_SPEED}. Defaults to `0.2`,
     * the same default the native twin takes.
     */
    speed?: number;
}
/**
 * The clamp, kept from the base with its reason intact.
 *
 * At `|speed| > 0.5` the layer moves more than half as far as the page does,
 * and the eye stops reading it as *depth* and starts reading it as *detached* —
 * the content visibly slides out of the section it belongs to, and on a long
 * page it can leave its container entirely. Half the page's travel is the point
 * where "behind the page" turns into "not on the page".
 */
export declare const PARALLAX_MAX_SPEED = 0.5;
/** `speed`, clamped to ±{@link PARALLAX_MAX_SPEED}. */
export declare function clampParallaxSpeed(speed: number): number;
/**
 * `Parallax`, V4 — scroll-linked depth, and the one component in this module
 * that takes nothing at all from the motion scale.
 *
 * ## Why there is no duration and no easing here
 *
 * Brief §2 splits the module into *transitions* (which take `V4_MOTION`
 * outright) and *playback* (which derives its own duration and says why).
 * Parallax is **neither**. It is a continuous mapping from scroll position to
 * offset — the user's finger is the clock. There is no duration to pick, and
 * an easing would be a lie: the curve is whatever the reader's scroll does.
 *
 * This is worth stating because the absence looks like an omission. A future
 * pass adding a `transition: transform 200ms` here would not be tightening the
 * component onto the scale; it would be adding 200ms of lag between the scroll
 * and the layer, which is the exact defect `design.md` §36.4 names — a
 * direct-manipulation gesture must track the input, not replay an animation
 * about it.
 *
 * ## Why reduced motion removes it rather than fading it
 *
 * §3.3 says reduced motion replaces a large spatial move with a fade instead of
 * removing it. That rule is about *transitions*, and it exists because an
 * element that pops into place with no transition reads as a glitch. Parallax
 * has no transition to replace and no arrival to soften: switching the mapping
 * off leaves the layer exactly where the page's own layout put it, which is a
 * correct, complete, un-glitchy frame. Scroll-linked movement is also squarely
 * what the setting is for.
 *
 * So, like `MarqueeV4` and for a different reason, this is one of the two
 * places in the module where reduced motion legitimately means *off*. Under the
 * setting no listener is attached at all — not a listener that computes zero.
 *
 * ## What this fixes over the base
 *
 *   - **The clamp is a named constant with its reason** ({@link
 *     PARALLAX_MAX_SPEED}) instead of two bare `0.5`s inside a `Math.min`.
 *   - **A caller's `transform` survives.** The base wrote
 *     `el.style.transform = 'translate3d(…)'` on every frame, so any transform
 *     the caller passed in `style` was live until the first scroll event and
 *     gone after it. V4 declares the transform once and animates a custom
 *     property inside it; `style` is spread last, so a caller who genuinely
 *     wants to override the transform still can, deliberately, and one who does
 *     not is no longer surprised.
 *   - **Resize is handled.** The offset is a function of viewport height, so a
 *     rotation or a window resize changes it with no scroll event to notice.
 *     The base only listened to `scroll` and drifted until the next one.
 *   - **`will-change` is scoped to the active case**, so a reduced-motion or
 *     server-rendered page does not pay for a compositing layer it never uses.
 *
 * ## SSR
 *
 * Dependency-free and server-safe: the effect is the only thing that touches
 * `window`, so the server renders the layer at its natural position with the
 * custom property unset (`var(…, 0px)` supplies the fallback), and the first
 * client frame is identical.
 *
 * ## The native twin
 *
 * There now is one — `native/motion/ParallaxV4.tsx`, which the native barrel
 * previously declared impossible. Same `speed` prop, same `0.2` default, same
 * clamp; it takes the scroll offset as an `Animated.Value` because on native
 * the caller owns the `ScrollView`.
 */
export declare const ParallaxV4: React.ForwardRefExoticComponent<ParallaxV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ParallaxV4.d.ts.map