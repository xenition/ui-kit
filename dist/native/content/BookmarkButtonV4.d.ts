import * as React from 'react';
import type { BookmarkButtonProps } from './BookmarkButton';
export interface BookmarkButtonV4Props extends BookmarkButtonProps {
    /** Word shown in the `labeled` variant when the article is not saved. Default `'Save'`. */
    saveLabel?: string;
    /** Word shown in the `labeled` variant when it is saved. Default `'Saved'`. */
    savedLabel?: string;
    /** Announced when pressing would save. Default `'Bookmark article'`. */
    addLabel?: string;
    /** Announced when pressing would unsave. Default `'Remove bookmark'`. */
    removeLabel?: string;
}
/**
 * **V4 bookmark toggle** — same props as {@link BookmarkButton} plus
 * `saveLabel`, `savedLabel`, `addLabel` and `removeLabel`.
 *
 * ## Five changes
 *
 * 1. **One tone, one control.** The web twin drew the saved star in `primary`
 *    and the word beside it in `accent` — two brand colours inside a single
 *    button — and this twin drew the star in `accent`, so the same saved
 *    article was a different colour on a phone and on a laptop. Both are now
 *    the primary tone, taken as *ink* (`primaryText`) rather than as the fill
 *    slot, which measured as low as 1.32:1 on a pale seed.
 * 2. **It is a real target.** The button was roughly 26px, rescued here by
 *    `hitSlop` and on the web by nothing at all. It now clears 44 outright, so
 *    the thing a user sees is the thing they can hit.
 * 3. **Press is a state layer.** `opacity: 0.7` fades the star itself, which
 *    is close enough to M3's 0.38 disabled band to read as "unavailable"
 *    rather than "heard you".
 * 4. **Disabled is 0.38**, the band that actually means unavailable, not the
 *    invented 0.5.
 * 5. **The `labeled` variant's English is a prop**, and the dead zero-size
 *    `View` the `icon` branch rendered instead of nothing is gone.
 */
export declare function BookmarkButtonV4({ bookmarked, onToggle, variant, disabled, saveLabel, savedLabel, addLabel, removeLabel, style, }: BookmarkButtonV4Props): React.ReactElement;
//# sourceMappingURL=BookmarkButtonV4.d.ts.map