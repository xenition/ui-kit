import * as React from 'react';
import type { IconName } from '../../primitives/icon-names';
import type { WatchlistRowProps } from './WatchlistRow';
export interface WatchlistRowV4Props extends WatchlistRowProps {
    /**
     * The mark drawn where a thumbnail would be when `imageUrl` is missing.
     * Default `'image'`.
     *
     * The base wrote the words "No photo" into the 64pt square — a caption
     * standing in for a picture, in a slot the eye reads as a picture. A tinted
     * `IconV4` badge is the §4.7 answer and it is also what every other empty
     * leading slot in the kit does.
     */
    placeholderIcon?: IconName;
    /**
     * Paint §4.3's `selected` ground — the row family's one exception to a
     * transparent row, for a watchlist in a multi-select mode. Default `false`.
     */
    selected?: boolean;
}
/**
 * **V4 watchlist row** — a saved listing: what it is, what it costs now, and
 * the one control that removes it.
 *
 * The anatomy is §4.3's, in §4.3's order — `[44 leading] [title / supporting]
 * [trailing value] [affordance]` — which for a watchlist means the thumbnail,
 * the title over its condition chips, **the price in the trailing column**, and
 * the watch toggle. Putting the price where the family puts its value is what
 * makes a watchlist scannable: brief rule 2 asks for tabular figures so a
 * column of prices has an edge, and a price buried mid-row under the title has
 * no column to be tabular *in*. `PriceTagV4` already sets tabular figures and
 * announces the struck compare-at price as "Was …", so it is composed rather
 * than redrawn (rules 1 and 7).
 *
 * What else changes against the base:
 *
 * 1. **The row metric, and no card of its own.** The bordered, rounded box
 *    goes; the container owns the card. The thumbnail moves from a hand-written
 *    64 square to the family's 44 leading slot, so a watchlist row and a
 *    settings row put their text on the same vertical line.
 * 2. **`colors.border` stops being a fill.** The base used the divider token as
 *    the placeholder ground. The empty thumbnail is an `IconV4` soft badge.
 * 3. **The heart is not `danger`.** The base painted the watched heart in the
 *    error tone. Brief rule 3: `danger` means danger, and a saved item is not a
 *    problem — it is the most positive thing on the row. Watched is `primary`
 *    and **filled**; unwatched is `muted` and **hollow**, so the state survives
 *    a colour-blind reading (rule 6) as it did not before. The glyphs are
 *    `IconV4`, not the bare `♥`/`♡` characters §1 rules out; `♡` has no name in
 *    the kit's set, so it takes the documented `glyph` escape hatch.
 * 4. **The toggle clears 44** on its own rather than borrowing `hitSlop` to
 *    cover a target that is painted at about 24.
 * 5. **`ended` stops being an opacity.** `opacity: 0.6` on the whole row dims
 *    the *price* too, which is the fact a watcher came back for. A sold item
 *    now reads through its "Sold" chip and a `mutedText` title, and the price
 *    stays at full strength.
 * 6. **The title keeps two lines.** The family truncates a title at one, but a
 *    listing title *is* the identity of a watchlist row and one line of it is
 *    often nothing but the brand. The row metric is a `minHeight` — a floor —
 *    so the row grows rather than clipping.
 * 7. **Press is the state layer, not a fade.** `opacity: pressed ? 0.85` and
 *    `pressed ? 0.7` both go: a dimmed row reads as disabled, which is what M3
 *    spends 0.38 to mean.
 */
export declare function WatchlistRowV4({ title, priceCents, currency, compareAtCents, imageUrl, condition, watched, ended, onToggleWatch, onPress, placeholderIcon, selected, style, }: WatchlistRowV4Props): React.ReactElement | null;
//# sourceMappingURL=WatchlistRowV4.d.ts.map