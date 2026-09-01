import * as React from 'react';
import type { GameCardProps } from './GameCard';
export interface GameCardV4Props extends GameCardProps {
    /** The primary action's label once the title is installed. Default `'Play'`. */
    playLabel?: string;
    /** Its label while the title is not installed. Default `'Install'`; `game.price` still wins. */
    installLabel?: string;
}
/**
 * **V4 game card** — same props as {@link GameCard} plus `playLabel` and
 * `installLabel`.
 *
 * ## Five changes
 *
 * 1. **Play is reachable, and it is a sibling of the card's activation.** The
 *    base wrapped the whole card — Play included — in a `Pressable` that is
 *    `accessible` by default and carried `accessibilityLabel={game.title}`, so
 *    VoiceOver flattened the card to one leaf and there was no gesture that
 *    installed or launched a game. (The web twin fails the same moment through
 *    the other door: Enter on Play fires both handlers and Space fires only the
 *    card's, because the card's bubbled keydown `preventDefault()`s the
 *    button's own activation.) The activation now wraps the cover and the meta
 *    only; the button sits beside it.
 * 2. **The card announces what it shows** — title, genre, price or installed
 *    state, and the rating — where the base's name was the title and nothing
 *    else, and the star row was a second, wordless stop.
 * 3. **A genre is identity, not a status.** It was `accent` here and `primary`
 *    on web, so the same genre was two colours across the product and a
 *    category was wearing a slot that should mean something happened. It is a
 *    neutral chip on both twins now.
 * 4. **A missing cover is a placeholder, not a brand-filled tile.** The base
 *    painted it `colors.primary` and the loaded `Image`'s ground `colors.border`
 *    — the hairline token used as a fill. Both are now the module's opaque
 *    placeholder ground, which is mixed from the card and so survives dark
 *    mode.
 * 5. **A press is a state layer** on the activation region, not
 *    `opacity: 0.9` on the whole card — 0.38 is M3's *disabled* band, so
 *    dimming a pressed card makes it read as unavailable.
 */
export declare function GameCardV4({ game, variant, loading, playLabel, installLabel, onPress, onPlay, style, }: GameCardV4Props): React.ReactElement;
//# sourceMappingURL=GameCardV4.d.ts.map