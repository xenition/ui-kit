import * as React from 'react';
import type { StickerRewardProps } from './StickerReward';
export interface StickerRewardV4Props extends StickerRewardProps {
    /** Build the earned/total summary. Default `'3 of 8 earned'`. */
    formatCount?: (earned: number, total: number) => string;
    /** The word an unlocked sticker carries. Default `'earned'`. */
    earnedLabel?: string;
    /** The word a locked one carries. Default `'locked'`. */
    lockedLabel?: string;
}
/**
 * **V4 sticker reward** — same props as {@link StickerReward} plus
 * `formatCount`, `earnedLabel` and `lockedLabel`.
 *
 * ## Six changes
 *
 * 1. **`columns={4}` renders four columns.** It rendered three. The cells were
 *    `width: 100/cols%` in a `flex-wrap` container with a gap, so four 25%
 *    cells plus three gaps exceeded the line and the fourth wrapped — on both
 *    twins. The board is a CSS grid of `repeat(n, minmax(0, 1fr))` now, where
 *    the gap is subtracted from the tracks rather than added to them, so the
 *    prop means what it says at any column count.
 * 2. **A locked sticker is locked, not disabled.** It was drawn at
 *    `opacity-45` — inside M3's *disabled* band — so an unearned sticker and a
 *    dead control looked identical. Locked is now a glyph and a word, at full
 *    strength, which is also the only form a colour-blind child can read.
 * 3. **Every cell clears 44.** A sticker is the most-tapped thing on the
 *    screen, by the youngest users in the product.
 * 4. **The summary is a string a caller owns.** `3/8` was assembled inline, as
 *    were "earned" and "locked" in every cell's accessible name.
 * 5. **The grid is a list.** Each cell was a bare `div` carrying an
 *    `aria-label`, which browsers ignore outright — so the earned/locked state
 *    of every sticker on a read-only board was silent. Cells are list items now
 *    and their state is real text.
 * 6. **Tokens and press.** The skeleton was `bg-neutral-200`, a ramp step that
 *    inverts under `[data-theme="dark"]`; the earned ring is `accent`, matching
 *    the native twin; press is the M3 state layer rather than
 *    `hover:opacity-70`, which is the band M3 spends on unavailable.
 */
export declare const StickerRewardV4: React.ForwardRefExoticComponent<StickerRewardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StickerRewardV4.d.ts.map