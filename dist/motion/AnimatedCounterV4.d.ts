import * as React from 'react';
export interface AnimatedCounterV4Props extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Final value. */
    to: number;
    /** Starting value. */
    from?: number;
    /** Count duration in ms. See {@link COUNT_MS} for why this one is not on the scale. */
    duration?: number;
    /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
    format?: (value: number) => string;
    /** IntersectionObserver threshold. */
    threshold?: number;
}
/**
 * The default count duration, in ms — **deliberately not from the scale**.
 *
 * Brief §2 draws the line this constant sits on. The M3 scale governs a
 * *transition*: a thing moving from one state to another, where the duration is
 * a property of the interface. A counter is *playback*: the duration is a
 * property of the content. A count from 0 to 12 and a count from 0 to 4,000,000
 * are not the same event, and forcing both onto `enter` (400ms) would make the
 * first feel frantic and the second illegible. So the number stays a caller
 * decision and this is only a starting point — the base's 1500, kept because it
 * is defensible and because the native twin has to agree with it (rule 4).
 *
 * The **easing** is a different question and does come from the scale: see the
 * component note.
 */
export declare const COUNT_MS = 1500;
/**
 * **V4 animated counter** — same props as {@link AnimatedCounter}, with the
 * kit's arrival curve and a screen reader that is not read four thousand
 * numbers.
 *
 * 1. **The easing comes from the scale; the duration does not.** Brief §2 rules
 *    that the scale governs transitions, not playback, and a counter is
 *    playback with an easing on it. The duration therefore stays the caller's
 *    (see {@link COUNT_MS}) while the curve becomes M3's emphasized-decelerate
 *    — a number arriving at its value is an arrival — replacing the
 *    hand-written `easeOutCubic` the base carried. The native twin gets the
 *    identical arc from `EASING_ENTER`, which is the same four control points
 *    handed to `Easing.bezier`.
 * 2. **The value is announced once, at the end.** The base said nothing to
 *    assistive tech at all — and the naive fix is worse than the silence: a
 *    counter re-rendering sixty times a second inside a polite live region is
 *    a screen reader reading hundreds of intermediate numbers, and it is
 *    exactly the case `aria-live="off"` exists for. So the ticking text is
 *    `aria-hidden` — it is decoration, and the number it shows is wrong for all
 *    but the last frame of its life — and a visually hidden polite region,
 *    empty until the count completes, carries the one value that was ever true:
 *    "4,182", once. Under reduced motion it is populated on the first render,
 *    because that is when the value becomes true.
 *
 * Reduced motion keeps the base's behaviour and does **not** take brief §3
 * rule 3's fade: that rule replaces a *spatial move* with a fade so nothing
 * appears without a transition. Nothing appears here — the element is on screen
 * throughout and only its text changes — so the honest reduction is to skip the
 * playback and show the final value, which is also what the number is for.
 *
 * SSR-safe: with no `IntersectionObserver` the counter is treated as in view,
 * so the value counts (or, on the server, renders at `from` and counts on
 * hydration) rather than sitting at its start forever.
 */
export declare const AnimatedCounterV4: React.ForwardRefExoticComponent<AnimatedCounterV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=AnimatedCounterV4.d.ts.map