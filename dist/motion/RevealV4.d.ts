import * as React from 'react';
export type RevealV4Effect = 'fade-up' | 'fade' | 'slide-left' | 'slide-right' | 'zoom' | 'blur-in';
export interface RevealV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Entrance effect. */
    effect?: RevealV4Effect;
    /** Transition delay in ms (added to any surrounding `Stagger` delay). */
    delay?: number;
    /**
     * Transition duration in ms. Defaults to `V4_MOTION.enter` (400) — the same
     * number as the native twin, which is the whole point of this file.
     */
    duration?: number;
    /** Animate only on the first intersection (default) or every time. */
    once?: boolean;
    /** IntersectionObserver threshold. */
    threshold?: number;
}
/**
 * **V4 reveal** — same props as {@link Reveal}, on the kit's motion scale.
 *
 * Three things the base got wrong, in the order they matter.
 *
 * 1. **The two twins disagreed about how long an entrance takes.** Web ran
 *    `600ms`, native ran `500ms`, and neither file admitted the other existed
 *    (brief §1 — "the loud one"). A reveal is *something arriving*, which the
 *    scale already has a name for: `V4_MOTION.enter` (400ms) with
 *    {@link EASE_ENTER}, M3's emphasized-decelerate. Both twins default to that
 *    number now, so a marketing page and its app screen animate alike.
 * 2. **The distances were five literals.** `24px` up, `32px` sideways: real
 *    measurements typed into a motion file rather than taken from the spacing
 *    scale (brief §3 rule 2). They are `lg` and `xl` now, and the native twin
 *    reads the same two cells.
 * 3. **Reduced motion removed the transition instead of replacing it.** The
 *    base rendered instantly with no inline motion styles at all — which
 *    `design.md` §36.10 and brief §3 rule 3 both call out as *worse* than the
 *    animation: an element that pops into existence with no transition reads as
 *    a glitch, not as calm. V4 keeps the transition and drops the travel: a
 *    pure opacity fade at `V4_MOTION.standard` (200ms) with
 *    {@link EASE_STANDARD}, because a fade starts and ends in place.
 *
 * A consequence of (3) worth stating out loud: **the observer keeps running
 * under reduced motion.** The base disabled it, because with nothing to animate
 * there was nothing to trigger. Here there is. `v4-motion.ts` puts it exactly
 * right — a preference decides *how* a thing moves, not *whether* it happens —
 * so the trigger is unchanged and only the movement is swapped.
 *
 * Everything else is the base, on purpose: `effect`, `once`, `threshold`, the
 * additive `delay`, and the `Stagger` context it reads for a cascade offset.
 * The context is the one from {@link Stagger}, not a V4 copy, so a `RevealV4`
 * cascades correctly inside either `Stagger` or `StaggerV4`.
 *
 * SSR-safe and dependency-free: CSS transitions plus one `IntersectionObserver`
 * (brief §3 rule 6). With no `IntersectionObserver` — server render, an ancient
 * browser — `useInView` reports visible immediately, so content is never hidden
 * forever; there is simply no entrance to see.
 */
export declare const RevealV4: React.ForwardRefExoticComponent<RevealV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RevealV4.d.ts.map