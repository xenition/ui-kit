import * as React from 'react';
import type { MediaFigureProps } from './MediaFigure';
export interface MediaFigureV4Props extends MediaFigureProps {
    /**
     * Accessible name for the press target when the item carries neither `alt`
     * nor `caption`. Default `'Open media'` — which the base hard-coded.
     */
    openLabel?: string;
    /** Announced after the name for a video item. Default `'video'`. */
    videoLabel?: string;
}
/**
 * **V4 media figure** — the web twin of the native `MediaFigureV4`, same props
 * as {@link MediaFigure} plus `openLabel` and `videoLabel`.
 *
 * ## Four changes
 *
 * 1. **A video inside a press target is no longer a `<video controls>` inside
 *    a `<button>`.** That is nested interactive content: invalid HTML, and in
 *    practice clicking the play control also fired `onActivate`, so the user
 *    got a lightbox instead of playback. With `onActivate` the figure shows the
 *    **poster** and a play badge and hands the intent over; without it the
 *    figure *is* the player and keeps the full `<video controls>`.
 * 2. **The placeholder ground is `muted`, not `bg-neutral-100`** — a ramp step
 *    carries the light orientation in both schemes, so it was a pale rectangle
 *    on a dark page.
 * 3. **The caption takes `muted-text`**, the slot with a contrast promise.
 * 4. **Focus is the shared `--xen-ring`**, not `ring-primary-300`, so a
 *    keyboard user sees the same indicator here as on every other control.
 */
export declare const MediaFigureV4: React.ForwardRefExoticComponent<MediaFigureV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MediaFigureV4.d.ts.map