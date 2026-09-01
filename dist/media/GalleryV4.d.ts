import * as React from 'react';
import type { GalleryProps } from './Gallery';
export interface GalleryV4Props extends GalleryProps {
    /**
     * Copy for the empty state. Default `'No media yet.'`.
     *
     * The base mapped over `items` with no guard, so an album with nothing in it
     * was a silent blank region — §4.5's "never a blank bordered box" in its most
     * literal form.
     */
    emptyMessage?: string;
    /** Announced after a video tile's name. Default `'video'`. */
    videoLabel?: string;
    /**
     * Build a tile's accessible name when the item carries neither `alt` nor
     * `caption`. Default `'Open item 3 of 12'` — the base said `'Open item 3'`,
     * which tells a screen-reader user nothing about how far through they are.
     */
    formatItemLabel?: (position: number, total: number) => string;
}
/**
 * **V4 gallery** — the web twin of the native `GalleryV4`, same props as
 * {@link Gallery} plus `emptyMessage`, `videoLabel` and `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **A video tile is a poster with a play badge**, never an autoplaying or
 *    control-bearing `<video>` inside a button. A grid of video elements is a
 *    grid of nested interactive controls; a gallery tile's job is to open the
 *    thing, and the lightbox is where it plays.
 * 2. **An empty album says so.**
 * 3. **The placeholder ground is `muted`**, not the `bg-neutral-100` ramp step
 *    that is near-white on a dark page.
 * 4. **Focus is the shared `--xen-ring`**, and the tile's name carries its
 *    position in the album.
 */
export declare const GalleryV4: React.ForwardRefExoticComponent<GalleryV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GalleryV4.d.ts.map