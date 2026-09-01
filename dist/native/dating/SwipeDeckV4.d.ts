import * as React from 'react';
import type { SwipeAction } from './LikePassButtons';
import type { SwipeDeckProps } from './SwipeDeck';
export interface SwipeDeckV4Props extends SwipeDeckProps {
    /**
     * Fires when the user asks for the last decision back. Supplying it is what
     * makes `'rewind'` in `actions` do anything.
     */
    onRewind?: () => void;
    /** Name for the rewind control. Default `'Undo'`. */
    rewindLabel?: string;
    /** Which controls the built-in row shows. Default pass · superlike · like. */
    actions?: SwipeAction[];
    /** A next step rendered under the empty state — "Widen your filters". */
    emptyAction?: React.ReactNode;
    /** Build the announced position. Default `'Profile 3 of 12'`. */
    formatPosition?: (index: number, total: number) => string;
}
/**
 * **V4 swipe deck** — same props as {@link SwipeDeck} plus `onRewind`,
 * `rewindLabel`, `actions`, `emptyAction` and `formatPosition`.
 *
 * ## Six changes
 *
 * 1. **Pass is recoverable.** The deck hard-coded
 *    `actions={['pass', 'superlike', 'like']}` and its `onButton` tested only
 *    those three, so `'rewind'` — an action `LikePassButtons` has always
 *    shipped — fell through to nothing and no caller could add it anyway.
 *    Meanwhile a single 120px flick was enough to lose someone permanently,
 *    with no toast, no undo and no announcement. V4 takes `actions`, routes
 *    `'rewind'` to `onRewind` **and steps the index back**, and disables the
 *    control while there is nothing to undo.
 * 2. **The position is announced, and re-announced.** `deckPosition()` built
 *    the string and the base hung it on a role-less `Animated.View`, where it
 *    was ignored; it is a polite live region now, so a reader learns that a
 *    card has gone.
 * 3. **The empty state is not a dead end.** "You're all caught up" with
 *    nothing to do next is a wall; `emptyAction` puts the next step in it,
 *    and the headline is a heading rather than a run of text.
 * 4. **Loading is the shape of what is coming.** The base drew one
 *    `border`-filled rectangle. It is a card-shaped skeleton with the info
 *    block sketched in, on the opaque skeleton ground, and it says it is
 *    loading.
 * 5. **The peek card has depth, not 70% opacity.** A flat `opacity: 0.7`
 *    reads as *disabled* — M3's disabled band starts at 0.38 and everything
 *    below full reads along that scale. The card behind is scaled and inset
 *    instead, which is what "further away" looks like.
 * 6. **Reduced Motion settles the deck rather than freezing it.** The fly-off
 *    collapses to `instant` and the drag rotation is dropped, so the card
 *    still leaves — it just does not travel.
 *
 * Native already fired `onSwipe` / `onSwipeRight` / `onSwipeLeft` / `onEmpty`
 * **outside** the `setIndex` updater, which is the correct shape and the one
 * the web twin had to be moved to; it is kept exactly as it was here.
 */
export declare function SwipeDeckV4({ profiles, renderCard, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, onRewind, showButtons, threshold, loading, emptyTitle, emptySubtitle, rewindLabel, actions, emptyAction, formatPosition, style, }: SwipeDeckV4Props): React.ReactElement;
//# sourceMappingURL=SwipeDeckV4.d.ts.map