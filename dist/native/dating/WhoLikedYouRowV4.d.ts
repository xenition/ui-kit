import * as React from 'react';
import type { WhoLikedYouRowProps } from './WhoLikedYouRow';
export interface WhoLikedYouRowV4Props extends WhoLikedYouRowProps {
    /** Say the total. Default `'12 likes'` / `'1 like'`. */
    formatCount?: (count: number) => string;
    /** Announced for an obscured tile. Default `'Locked'`. */
    lockedLabel?: string;
}
/**
 * **V4 who-liked-you row** — same props as {@link WhoLikedYouRow} plus
 * `formatCount` and `lockedLabel`.
 *
 * ## Five changes
 *
 * 1. **The like count is not an error.** "14 people liked you" is the most
 *    positive number in the product and the base painted it in `danger`, the
 *    slot reserved for something having gone wrong — a red pill beside
 *    "Liked you" reads as a warning at a glance, which is the opposite of what
 *    it says. It is a `primary` badge.
 * 2. **The lock scrim is dark in a dark theme.** It was
 *    `withAlpha(colors.onSurface, 0.45)` over a face — the ink slot, which is
 *    *light* on a dark scheme, so the veil hiding an identity became a pale
 *    wash that revealed it, with a near-white padlock on top of it. Fixed
 *    photo scrim and photo ink: an obscured face is obscured in both schemes.
 * 3. **A locked tile with nowhere to go is disabled.** With `locked` and no
 *    `onUnlock`, every tile was a button whose press did nothing. It is
 *    genuinely disabled now — announced as such, at M3's 0.38 — rather than
 *    silently inert.
 * 4. **The heading is a heading**, so a reader can jump to the section
 *    instead of walking the rail to find out what it is; the total travels
 *    with it through `formatCount` rather than being a loose numeral.
 * 5. **Press is a state layer, loading is a real skeleton**, and the tiles
 *    are the same size as the web twin's.
 */
export declare function WhoLikedYouRowV4({ likers, total, locked, title, onPressLiker, onUnlock, loading, emptyLabel, formatCount, lockedLabel, style, }: WhoLikedYouRowV4Props): React.ReactElement;
//# sourceMappingURL=WhoLikedYouRowV4.d.ts.map