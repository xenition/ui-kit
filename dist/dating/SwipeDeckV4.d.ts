import * as React from 'react';
import { type LikePassAction } from './LikePassButtonsV4';
import type { SwipeDeckProps } from './SwipeDeck';
export interface SwipeDeckV4Props extends SwipeDeckProps {
    /**
     * Fires when the undo action is used. The deck steps its own index back
     * first, so a caller that only wants the card returned can leave this unset.
     */
    onRewind?: () => void;
    /** Name for the undo control. Default `'Undo'`. */
    rewindLabel?: string;
    /**
     * Which controls the built-in row shows, left→right. Defaults to today's
     * `pass · superlike · like`; add `'rewind'` to make a pass recoverable.
     */
    actions?: LikePassAction[];
    /** An action slot on the empty state — "widen your filters", "get Boost". */
    emptyAction?: React.ReactNode;
    /** Build the spoken position. Default `'Profile 3 of 12'`. */
    formatPosition?: (index: number, total: number) => string;
}
/**
 * **V4 swipe deck** — the web twin of the native `SwipeDeckV4`, same props as
 * {@link SwipeDeck} plus `onRewind`, `rewindLabel`, `actions`, `emptyAction`
 * and `formatPosition`.
 *
 * ## Seven changes
 *
 * 1. **Every like and pass was emitted twice.** `onSwipe`, `onSwipeRight`,
 *    `onSwipeLeft` and `onEmpty` were called from **inside a `setIndex`
 *    updater**. An updater must be pure, and React deliberately invokes it
 *    twice in StrictMode to catch exactly this — so in development every swipe
 *    fired the caller's handler twice, and a deck wired to an API sent two
 *    likes for one card. They now fire after the state is set, which is what
 *    the native twin already did.
 * 2. **A pass is recoverable.** The deck hard-coded
 *    `actions={['pass','superlike','like']}` and `onButton` tested exactly
 *    three strings, letting `'rewind'` fall through to nothing — so the undo
 *    control `LikePassButtons` has always shipped could not be reached from
 *    the one component that needs it. `actions` opens the row, `'rewind'`
 *    routes to `onRewind` **and steps the index back**, and it is disabled
 *    rather than dead when there is nothing to undo.
 * 3. **A custom card keeps its decision stamps.** `renderCard` computed
 *    `activeOverlay` and `overlayProgress` and then discarded both in that
 *    branch, so a caller who supplied their own card got no LIKE/NOPE feedback
 *    and no way to add it. The stamp is a sibling of the card now — native's
 *    arrangement — so it survives whichever card is rendered.
 * 4. **A lost pointer capture no longer freezes the card.** Scroll the page
 *    mid-drag, drag out of the window, take a phone call: the browser fires
 *    `pointercancel` or `lostpointercapture` and never `pointerup`, so the
 *    card stayed translated and rotated under a drag that had ended, with the
 *    stamp still up. Both events settle it.
 * 5. **The position is announced.** `Profile 3 of 12` was built and hung on a
 *    role-less `<div>`, where a reader ignored it, and it was never
 *    re-announced when the deck moved. It is a live region.
 * 6. **The empty state has somewhere to go.** It was a headline and a sentence
 *    and no next step — see `emptyAction`.
 * 7. **Loading is the shape it is about to be**, announced, and the peek card
 *    behind the top one is set back rather than faded: `opacity: 0.7` is not
 *    depth, and 0.38 of it is M3's *disabled* band, so a stack drawn in
 *    opacity reads as a stack of unavailable cards.
 */
export declare const SwipeDeckV4: React.ForwardRefExoticComponent<SwipeDeckV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwipeDeckV4.d.ts.map