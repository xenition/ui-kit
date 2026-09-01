import * as React from 'react';
import type { SeedPhraseGridProps } from './SeedPhraseGrid';
export interface SeedPhraseGridV4Props extends SeedPhraseGridProps {
    /**
     * How one word is announced inside the grouped phrase. `index` is 0-based;
     * the tile shows `index + 1`. Default `'Word 1, satoshi'`.
     */
    wordLabel?: (index: number, word: string) => string;
    /** An extra caution shown only while the phrase is on screen. */
    revealWarning?: string;
}
/**
 * **V4 recovery-phrase grid** — same props as {@link SeedPhraseGrid} plus
 * `wordLabel` and `revealWarning`.
 *
 * ## Four changes
 *
 * 1. **`columns` works.** The base gave each tile `width: ${100 / cols}%`
 *    inside a `flexWrap` row that also carried a gap, so three tiles plus two
 *    gaps came to more than 100% and wrapped: a 12-word phrase set to 3
 *    columns rendered as **6 rows of 2**. The grid is laid out as real rows
 *    now, each tile flexing into its share, so the gap is paid out of the row
 *    rather than added to it.
 * 2. **Revealing does not read the phrase aloud, word by word.** The base
 *    exposed every tile as its own accessibility element, so revealing a seed
 *    phrase made a screen reader recite twelve recovery words in order, out
 *    loud, in whatever room the holder was standing in. The revealed grid is
 *    **one** element the user has to focus deliberately, and its name is built
 *    from `wordLabel`.
 * 3. **The reveal control is a target.** It was a text-sized pill; it now
 *    clears 44 and drops `accessibilityState={{ expanded }}`, which controlled
 *    no region and told a reader nothing true.
 * 4. **Press is a state layer**, the warning takes the readable `warnText`
 *    slot rather than the `warn` fill, and a tile's ground is `card` rather
 *    than a raw ramp index.
 */
export declare function SeedPhraseGridV4({ words, columns, revealed, onToggleReveal, revealLabel, hideLabel, warning, wordLabel, revealWarning, style, }: SeedPhraseGridV4Props): React.ReactElement;
//# sourceMappingURL=SeedPhraseGridV4.d.ts.map