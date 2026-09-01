import * as React from 'react';
import type { PhotoCarouselProps } from './PhotoCarousel';
export interface PhotoCarouselV4Props extends PhotoCarouselProps {
    /** Name for the step-back control. Default `'Previous photo'`. */
    previousLabel?: string;
    /** Name for the step-forward control. Default `'Next photo'`. */
    nextLabel?: string;
    /** Build the position line. Default `'Photo 2 of 6'`. */
    formatPosition?: (index: number, total: number) => string;
    /** Draw visible step controls over the frame. Default `true`. */
    showControls?: boolean;
}
/**
 * **V4 photo carousel** — same props as {@link PhotoCarousel} plus
 * `previousLabel`, `nextLabel`, `formatPosition` and `showControls`.
 *
 * ## Five changes
 *
 * 1. **The pager has controls you can see.** Both twins shipped two
 *    `Pressable`s with **no children** — invisible halves of the frame. A
 *    sighted user was given nothing that said the photo was steppable, and
 *    discovered it by accident or not at all. V4 draws two round chevron
 *    buttons over the frame, each clearing 44, each disabled at its end of the
 *    strip. The invisible halves stay (tap-anywhere is the gesture people
 *    expect on a profile) but are taken out of the accessibility tree when the
 *    real controls are drawn, so a reader gets one control per direction
 *    rather than two.
 * 2. **`alt` reaches the image.** `CarouselPhoto.alt` was documented, accepted
 *    and never passed to the native `Image` — every profile photo in the kit
 *    was silent on a phone. It is the image's accessible name now, with the
 *    position line beside it.
 * 3. **Nothing over a photograph is themed.** The indicator drew its unplayed
 *    segments from `withAlpha(colors.onSurface, 0.35)`, which is a *light*
 *    wash in a dark theme — so on a dark scheme the whole strip read as
 *    played. Segments and control grounds are the fixed photo scrim and photo
 *    ink, which mean the same thing in both schemes because a photograph does.
 * 4. **A step that goes nowhere does nothing.** `go()` set the internal index
 *    unconditionally and reported only a real move, so a tap at either end of
 *    the strip re-rendered the pager to say that nothing had happened.
 * 5. **Loading is a skeleton and empty says what to do.** The base's loading
 *    frame was a `border`-filled rectangle with a label and no role.
 */
export declare function PhotoCarouselV4({ photos, index, onIndexChange, ratio, rounded, loading, emptyLabel, previousLabel, nextLabel, formatPosition, showControls, style, }: PhotoCarouselV4Props): React.ReactElement;
//# sourceMappingURL=PhotoCarouselV4.d.ts.map