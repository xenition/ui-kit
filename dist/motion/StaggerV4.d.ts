import * as React from 'react';
/**
 * The cap on the accumulated cascade offset, in ms.
 *
 * `interval * index` is unbounded, which is the bug brief §4 asks for a guard
 * against: at the default 100ms interval a list of forty items puts the last
 * one four seconds behind the first, and a cascade that outlives the reader's
 * attention has stopped being a cascade and become a wait. Past the cap every
 * remaining child arrives together — the list still reads top-to-bottom,
 * because the first items are still staggered and they are the ones on screen.
 *
 * `enter * 2` (800ms), composed from the scale rather than picked: the last
 * child *starts* no later than twice the longest single transition the scale
 * defines, and with a default `RevealV4` on top the whole list has finished
 * arriving by 1.2s. At the default interval that means the first eight items
 * cascade and the rest land as a block, which is what a long list wants
 * anyway — nobody is watching item thirty-nine wait its turn.
 */
export declare const STAGGER_V4_MAX_DELAY: number;
export interface StaggerV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Delay increment between consecutive children, in ms. Defaults to
     * `V4_MOTION.quick` (100) — the number the base already used, said properly.
     */
    interval?: number;
    /** Base delay added to every child, in ms. */
    delay?: number;
    /**
     * Ceiling on the *accumulated* `interval * index` offset, in ms. Defaults to
     * {@link STAGGER_V4_MAX_DELAY} (800). `delay` is added on top and is never
     * capped: a base delay is an explicit instruction from the caller, while the
     * accumulation is an emergent number nobody chose.
     */
    maxDelay?: number;
}
/**
 * **V4 stagger** — same props as {@link Stagger}, plus the guard it lacked.
 *
 * Two changes, one of them invisible.
 *
 * 1. **`interval` comes from the scale.** The base defaulted to a hand-typed
 *    `100`, which happens to be `V4_MOTION.quick` exactly — right number, wrong
 *    provenance (brief §1). Naming it means the next person who tunes the scale
 *    tunes this too.
 * 2. **The cascade is bounded.** See {@link STAGGER_V4_MAX_DELAY}.
 *
 * **How the cap is enforced, and why it is done this way.** The base handed
 * children a `{ interval, delay }` config and let each `Reveal` compute
 * `delay + index * interval` for itself — so a cap living in this component
 * could only be a *request*, and any plain `Reveal` (or any other consumer of
 * the context) would ignore it. Instead this component resolves the arithmetic
 * itself and hands each child its already-final offset as
 * `{ interval: 0, delay: <resolved> }`. Every existing consumer computes
 * `resolved + index * 0` and lands on the capped number without knowing the cap
 * exists, so `StaggerV4` bounds a subtree of plain `Reveal`s just as well as a
 * subtree of `RevealV4`s. The contexts are the base's, imported not copied, for
 * the same reason.
 *
 * Non-`Reveal` children still advance the index, keeping visual order stable in
 * a mixed list — unchanged from the base.
 *
 * Reduced motion is not this component's business: it adds delays, and a delay
 * before a fade is still a fade. `RevealV4` decides what the movement is.
 */
export declare const StaggerV4: React.ForwardRefExoticComponent<StaggerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StaggerV4.d.ts.map