import * as React from 'react';
import type { BookmarkButtonProps } from './BookmarkButton';
export interface BookmarkButtonV4Props extends BookmarkButtonProps {
    /** The `labeled` variant's word when the article is not saved. Default `'Save'`. */
    saveLabel?: string;
    /** The `labeled` variant's word when it is. Default `'Saved'`. */
    savedLabel?: string;
    /** The control's accessible name when it will add a bookmark. Default `'Bookmark article'`. */
    addLabel?: string;
    /** The control's accessible name when it will remove one. Default `'Remove bookmark'`. */
    removeLabel?: string;
}
/**
 * **V4 bookmark button** — the web twin of the native `BookmarkButtonV4`, same
 * props as {@link BookmarkButton} plus `saveLabel`, `savedLabel`, `addLabel`
 * and `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **One tone, on both twins.** Web painted the saved star `primary` and the
 *    word beside it `accent` — two brand colours inside one control — while
 *    native painted the star `accent`. Both twins now say `primary` for the
 *    glyph *and* the word, and both draw it with `primaryText`: `primary` is a
 *    fill slot with no contrast promise as ink.
 * 2. **It clears 44.** The button was roughly 26px on web with no recourse,
 *    and 26px on native rescued only by `hitSlop` — which does nothing for a
 *    pointer or a switch control.
 * 3. **Press is the state layer and disabled is 0.38.** The base invented
 *    `0.5` for disabled and `0.8` for hover; `0.5` sits inside M3's disabled
 *    band, so a hovered bookmark and a dead one looked alike.
 * 4. **The on-screen English is a prop.** `'Save'` and `'Saved'` were rendered
 *    text with no way to translate them.
 */
export declare const BookmarkButtonV4: React.ForwardRefExoticComponent<BookmarkButtonV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=BookmarkButtonV4.d.ts.map