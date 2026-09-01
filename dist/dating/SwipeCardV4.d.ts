import * as React from 'react';
import type { DeckDecision } from './deck-v4';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';
export interface SwipeCardV4Props extends SwipeCardProps {
    /**
     * The card's aspect ratio as `width / height`. Overrides `variant`'s own.
     *
     * The native twin has always had it; the web twin was locked to 3:4 and 16:9
     * with no way out, so a deck built to a different frame could not use the
     * same card on both platforms.
     */
    aspectRatio?: number;
    /** Name for the verified mark. Default `'Verified'`. */
    verifiedLabel?: string;
    /** Override the words on the decision stamps. Defaults `LIKE` / `NOPE` / `SUPER`. */
    decisionLabels?: Partial<Record<DeckDecision, string>>;
}
/**
 * A drag overlay named as a *decision*, so `decisionLabels` is keyed by the
 * thing the deck emits rather than by the thing the card draws. `'nope'` and
 * `'pass'` were two names for one outcome across the two files.
 */
export declare const OVERLAY_DECISION: Record<SwipeOverlay, DeckDecision>;
export interface SwipeStampV4Props {
    /** Which decision is being previewed. */
    overlay: SwipeOverlay;
    /** Drag progress, 0–1. Defaults to 1. */
    opacity?: number;
    /** Override the stamp words. */
    labels?: Partial<Record<DeckDecision, string>>;
}
/**
 * A decision stamp, on its own.
 *
 * It is a separate export because `SwipeDeckV4` renders it as a **sibling** of
 * whatever `renderCard` returned: the base computed the overlay and its
 * progress and then threw both away in that branch, so a caller who supplied
 * their own card lost the LIKE/NOPE feedback entirely and had no way to draw
 * it. Native already stacked them as siblings; this is what lets web do the
 * same.
 *
 * The fill is `ACTION_SKIN`'s — the same tint and ring the matching button in
 * `LikePassButtonsV4` wears — so the stamp a drag reveals and the button that
 * commits it are demonstrably one action. `like` and `pass` are no longer
 * `success` and `danger`.
 */
export declare function SwipeStampV4({ overlay, opacity, labels }: SwipeStampV4Props): React.ReactElement;
/**
 * **V4 swipe card** — the web twin of the native `SwipeCardV4`, same props as
 * {@link SwipeCard} plus `aspectRatio`, `verifiedLabel` and `decisionLabels`.
 *
 * ## Five changes
 *
 * 1. **The photo's scrim stops inverting.** `from-neutral-950` reads as "the
 *    darkest step", but the web ramp *mirrors* under `[data-theme="dark"]`, so
 *    in a dark theme it resolved to the **lightest** step: the bottom of every
 *    profile photo washed near-white and took the white name, tagline and
 *    distance on it with it. A photograph does not follow the scheme, so its
 *    scrim must not either — `PHOTO_SCRIM` and `PHOTO_INK` are fixed in both.
 * 2. **The card is not a picture.** It reported `role="img"` with a name of
 *    `"Ada, 29. Loves ferries"` — so the verified mark, the online state and
 *    the distance, all drawn on the card, were removed from the accessibility
 *    tree by that role and absent from the name that replaced them. It is a
 *    `group`; the name carries the marks the glyphs stand for, and the distance
 *    badge keeps its own correctly formatted label rather than being flattened
 *    into a number without a unit.
 * 3. **Liking and passing are not success and failure.** See
 *    {@link SwipeStampV4}.
 * 4. **NOPE is drawn in the NOPE corner** — see {@link STAMP_PLACE} — and the
 *    stamp is a shared component, so the two twins cannot drift on its fill,
 *    its lean or its side.
 * 5. **The frame is the caller's.** See `aspectRatio`.
 */
export declare const SwipeCardV4: React.ForwardRefExoticComponent<SwipeCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwipeCardV4.d.ts.map