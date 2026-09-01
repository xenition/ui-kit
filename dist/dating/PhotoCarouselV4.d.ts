import * as React from 'react';
import type { PhotoCarouselProps } from './PhotoCarousel';
export interface PhotoCarouselV4Props extends PhotoCarouselProps {
    /** Name for the previous control. Default `'Previous photo'`. */
    previousLabel?: string;
    /** Name for the next control. Default `'Next photo'`. */
    nextLabel?: string;
    /** Build the position line. Default `'Photo 2 of 5'`. */
    formatPosition?: (index: number, total: number) => string;
    /**
     * Draw the step controls. Default `true`.
     *
     * `false` is for a pager a caller drives itself through `index` — a deck
     * card, a thumbnail strip — where a chevron on the photo would be a control
     * that competes with the gesture.
     */
    showControls?: boolean;
}
/**
 * **V4 photo carousel** — the web twin of the native `PhotoCarouselV4`, same
 * props as {@link PhotoCarousel} plus `previousLabel`, `nextLabel`,
 * `formatPosition` and `showControls`.
 *
 * ## Four changes
 *
 * 1. **The frame looks steppable.** Both twins rendered two `<button>`s with
 *    **no children** — invisible halves of the photo, with no focus ring on
 *    web. Nothing told a sighted user that tapping the picture did anything,
 *    and a keyboard user tabbed onto a control with no visible location. The
 *    halves are kept, because a thumb-sized tap zone is the right target on a
 *    phone, and each one now carries a visible chevron.
 * 2. **The position is exposed, and re-announced when it moves.** The base
 *    built `Photo 2 of 5` and hung it on a role-less `<div>`, where a reader
 *    ignored it. It names the pager group *and* rides a polite live region, so
 *    stepping a photo says so.
 * 3. **The chevrons and the rail are pinned to the photo, not to the theme.**
 *    The indicator rail was `bg-surface` over `bg-neutral-500` — a themed slot
 *    and a ramp step, both of which invert under `[data-theme="dark"]` while
 *    the photograph underneath does not. They are `PHOTO_INK` on `PHOTO_SCRIM`.
 * 4. **Empty and loading are real.** The empty frame was an emoji over a line
 *    of `muted` (a decorative slot, used as text); loading was an undecorated
 *    `bg-neutral-200` block announced to nobody.
 */
export declare const PhotoCarouselV4: React.ForwardRefExoticComponent<PhotoCarouselV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PhotoCarouselV4.d.ts.map