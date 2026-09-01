import * as React from 'react';
import type { WhoLikedYouRowProps } from './WhoLikedYouRow';
export interface WhoLikedYouRowV4Props extends WhoLikedYouRowProps {
    /** Render the total. Default `'12'`. */
    formatCount?: (count: number) => string;
    /** Name for a tile whose face is behind the gate. Default `'Locked'`. */
    lockedLabel?: string;
}
/**
 * **V4 who-liked-you row** — the web twin of the native `WhoLikedYouRowV4`,
 * same props as {@link WhoLikedYouRow} plus `formatCount` and `lockedLabel`.
 *
 * ## Five changes
 *
 * 1. **The count is not an error.** `bg-danger text-on-danger` — the most
 *    positive number in the product, painted in the slot that means something
 *    has gone wrong, at the top of the screen the whole premium tier exists to
 *    sell. It is `primary`.
 * 2. **The lock scrim stops inverting.** `bg-neutral-900` over a face, with
 *    `text-neutral-50` on it: the web ramp *mirrors* under `[data-theme="dark"]`,
 *    so in a dark theme the scrim resolved to the near-white step and the
 *    padlock on it vanished — the gate looked broken exactly when it mattered.
 *    `PHOTO_SCRIM_STRONG` and `PHOTO_INK` are fixed in both schemes.
 * 3. **A gate with no way through it is disabled.** `locked` without `onUnlock`
 *    left every tile a focusable `<button>` that did nothing: a keyboard user
 *    tabbed through twelve controls, activated them, and got no response and no
 *    explanation. Those tiles are `disabled`, and the rail itself becomes the
 *    tab stop so the strip is still reachable and scrollable.
 * 4. **The heading is a heading and the strip is a list**, so a reader hears
 *    "3 of 12" rather than twelve unanchored buttons.
 * 5. **Empty and loading are real.** Empty was a lone line of `muted` inside a
 *    dashed box; the skeleton was `bg-neutral-200`, a ramp step that is a
 *    near-white slab on a dark page.
 */
export declare const WhoLikedYouRowV4: React.ForwardRefExoticComponent<WhoLikedYouRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WhoLikedYouRowV4.d.ts.map