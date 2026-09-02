import * as React from 'react';
import type { StickerRewardProps } from './StickerReward';
export interface StickerRewardV4Props extends StickerRewardProps {
    /** The earned/total summary. Default `'3/12'`. */
    formatCount?: (earned: number, total: number) => string;
    /** Announced for an unlocked sticker. Default `'earned'`. */
    earnedLabel?: string;
    /** Announced for a locked sticker. Default `'locked'`. */
    lockedLabel?: string;
}
/**
 * **V4 sticker board** — same props as {@link StickerReward} plus
 * `formatCount`, `earnedLabel` and `lockedLabel`.
 *
 * ## Four changes
 *
 * 1. **`columns={4}` renders four columns.** Each cell was `width: '25%'` and
 *    the grid added a `gap` *on top of* that, so four cells plus three gaps
 *    exceeded the line and the fourth wrapped: the prop rendered **three**
 *    columns and quietly meant something other than what it said. The grid now
 *    measures itself and subtracts the gaps before dividing, so `columns={n}`
 *    is `n` at any width, on any seed's spacing scale.
 * 2. **A locked sticker is dimmed to M3's band, not to a guess.** `0.45` was
 *    picked by hand; `state.disabledContent` is 0.38 and is the same number
 *    every other unavailable thing in the kit uses, so a locked sticker and a
 *    disabled button read alike.
 * 3. **A sticker is a target.** The pressable was the cell with no size floor
 *    under it at all, and the glyph inside it was a 44 circle whose padding was
 *    the only thing keeping it near the tap floor. Every cell now clears 44,
 *    and press is a state layer rather than `opacity: pressed ? 0.6 : 1` —
 *    which is inside M3's *disabled* band, so a pressed sticker read as a
 *    locked one.
 * 4. **The board is a card and its skeleton is a skeleton.** It painted
 *    `colors.surface` — the page colour — and drew its loading blocks in
 *    `colors.border`, the hairline colour used as a fill.
 */
export declare function StickerRewardV4({ stickers, title, columns, loading, emptyLabel, formatCount, earnedLabel, lockedLabel, onCollect, style, }: StickerRewardV4Props): React.ReactElement;
//# sourceMappingURL=StickerRewardV4.d.ts.map