import * as React from 'react';
import type { GameCardProps } from './GameCard';
export interface GameCardV4Props extends GameCardProps {
    /** The primary action's copy while the title is installed. Default `'Play'`. */
    playLabel?: string;
    /** The primary action's copy while it is not. Default `'Install'`. */
    installLabel?: string;
}
/**
 * **V4 game card** — same props as {@link GameCard} plus `playLabel` and
 * `installLabel`.
 *
 * ## Four changes
 *
 * 1. **Play works from the keyboard.** This is a live bug, not a nicety. The
 *    card was a `role="button"` `<div>` with a hand-written key handler, and
 *    Play was *inside* it: the button guarded the click path with
 *    `stopPropagation()` and left the key path open, so the card's `onKeyDown`
 *    caught the keydown bubbling out of Play and ran
 *    `e.preventDefault(); onClick(game)`. Enter's default action on a
 *    `<button>` **is** the click that had just been cancelled, and Space's
 *    click fires on keyup, already cancelled too — so pressing Enter on Play
 *    opened the store page and installed nothing, and Space did nothing but
 *    open the store page. The fix is structural: the card is a plain `<div>`,
 *    the activation is a real `<button>` around the art and the copy, and Play
 *    is that button's **sibling**. There is no ancestor handler left to fire,
 *    so no guard is needed and none is written.
 * 2. **The card's name carries the card.** `aria-label={game.title}` on a
 *    `role="button"` made the genre, the installed state, the rating and the
 *    price presentational — every one of them drawn on the card and none of
 *    them reachable. The activation's name is the whole line.
 * 3. **The featured cover's scrim stops inverting.** `GameCardV2` built it out
 *    of `from-neutral-900/75` with `text-neutral-50`, and the web neutral ramp
 *    *mirrors* under `[data-theme="dark"]` while a JPEG does not — so in a dark
 *    theme the darkest step resolved to the lightest and the bottom of every
 *    key art washed near-white with white text on it. `ART_SCRIM` and
 *    `ART_INK` are fixed in both schemes, because the artwork is. The missing
 *    cover is `PLACEHOLDER_CLASS` rather than `bg-neutral-200`, for the same
 *    reason, and rather than a full-bleed slab of brand `primary`.
 * 4. **A genre is identity, not status.** It wore `primary` — the brand — so
 *    every genre chip in a store grid was the same colour as every primary
 *    action on the screen, and a status slot was spent on a category. It is a
 *    neutral chip carrying its own word. "Installed" keeps `success`: owning a
 *    title is an affirmative state of the title, not a name for it. Press is a
 *    state layer instead of `hover:opacity-90`, which is M3's *disabled*
 *    signal, and the activation clears 44.
 */
export declare const GameCardV4: React.ForwardRefExoticComponent<GameCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GameCardV4.d.ts.map