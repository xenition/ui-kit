import * as React from 'react';
import { Animated } from 'react-native';
import type { DeckDecision } from '../../dating/deck-v4';
import type { SwipeCardProps, SwipeOverlay } from './SwipeCard';
export interface SwipeCardV4Props extends SwipeCardProps {
    /** Announced beside the name for a verified profile. Default `'Verified'`. */
    verifiedLabel?: string;
    /** Stamp copy per decision. Defaults `LIKE` / `NOPE` / `SUPER`. */
    decisionLabels?: Partial<Record<DeckDecision, string>>;
}
export interface SwipeStampV4Props {
    /** Which stamp to draw. */
    overlay: SwipeOverlay;
    /** 0–1, or the animated value a drag drives it with. Default `1`. */
    opacity?: number | Animated.AnimatedInterpolation<number>;
    /** Stamp copy per decision. */
    labels?: Partial<Record<DeckDecision, string>>;
}
/**
 * The LIKE / NOPE / SUPER stamp, on its own.
 *
 * It exists as a component because a caller who supplies `renderCard` to
 * `SwipeDeckV4` gets their own card and would otherwise lose the drag feedback
 * entirely; the deck renders these as **siblings** of whatever `renderCard`
 * returned, so a custom card keeps its stamps. The same component exists on
 * the web twin, drawing the same skin at the same rotation.
 *
 * The fill is `ACTION_SKIN`'s — the same tint and ring the matching button in
 * `LikePassButtonsV4` wears — so the stamp a drag reveals and the button that
 * commits it are demonstrably one action. `like` and `pass` are no longer
 * `success` and `danger`.
 */
export declare function SwipeStampV4({ overlay, opacity, labels, }: SwipeStampV4Props): React.ReactElement;
/**
 * **V4 swipe card** — same props as {@link SwipeCard} plus `verifiedLabel` and
 * `decisionLabels`.
 *
 * ## Five changes
 *
 * 1. **The bottom of the photo is dark in a dark theme.** The scrim was
 *    `withAlpha(colors.onSurface, 0.55)` and the text on it was
 *    `colors.surface` — both of which *invert*. On a dark scheme the scrim
 *    washed near-white and took the near-white name with it, so the one line
 *    identifying the person was unreadable on every card. A photograph does
 *    not follow the scheme, so its scrim does not either: `PHOTO_SCRIM` and
 *    `PHOTO_INK` are fixed in both.
 * 2. **NOPE is in the NOPE corner**, and a stamp is not a status — see
 *    {@link STAMP_PLACE} and {@link SwipeStampV4}. LIKE was `success` and NOPE
 *    `danger`, the two slots that mean something has gone wrong, on the two
 *    ordinary halves of a swipe.
 * 3. **The card is not one `role="img"`.** The base's label was the name and
 *    tagline, and being an image node it *swallowed* the distance badge, the
 *    verified mark and the presence dot — three facts a sighted user could see
 *    and a reader could not reach. The identity line is one spoken group that
 *    contains the verified and presence words.
 * 4. **The distance badge stays its own element** rather than being folded
 *    into that name. `DistanceBadgeV4` already builds a correctly rounded,
 *    unit-bearing phrase; repeating that formatting inside the card's label
 *    would make two places that decide how far away someone is.
 * 5. **A missing photo has a ground, not a `border`.** `border` is a hairline
 *    token; the placeholder is the shared skeleton ground.
 */
export declare function SwipeCardV4({ profile, variant, overlay, overlayOpacity, aspectRatio, verifiedLabel, decisionLabels, style, }: SwipeCardV4Props): React.ReactElement;
//# sourceMappingURL=SwipeCardV4.d.ts.map