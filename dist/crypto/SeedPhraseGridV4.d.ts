import * as React from 'react';
import type { SeedPhraseGridProps } from './SeedPhraseGrid';
export interface SeedPhraseGridV4Props extends SeedPhraseGridProps {
    /**
     * Build one word's spoken form. `index` is **zero-based**, as it is in
     * `words`; the default adds one so a reader hears the position a user
     * counts. Default `` (i, word) => `Word ${i + 1}, ${word}` ``.
     */
    wordLabel?: (index: number, word: string) => string;
    /**
     * A second caution, shown only while the phrase is on screen.
     *
     * `warning` is about the phrase; this is about the *room*, and it is only
     * true once the words are visible. Default
     * `'Make sure nobody can see your screen.'`.
     */
    revealWarning?: string;
}
/**
 * **V4 seed-phrase grid** — the web twin of the native `SeedPhraseGridV4`, same
 * props as {@link SeedPhraseGrid} plus `wordLabel` and `revealWarning`.
 *
 * ## Four changes
 *
 * 1. **Revealing no longer makes a reader recite the recovery phrase.** Each
 *    tile was its own accessibility element with its own
 *    `aria-label="Word 3, harvest"`, so revealing turned twelve words into
 *    twelve stops read aloud in order — observed, not theorised, and the worst
 *    possible failure mode for this particular component. The tiles are
 *    decorative now and the grid is one group carrying one name, so nothing is
 *    spoken until the holder deliberately navigates into it.
 * 2. **A second warning while the words are visible.** See `revealWarning`.
 * 3. **The reveal control clears 44 and drops `aria-expanded`**, which pointed
 *    at nothing — the grid is always in the DOM, so the attribute described a
 *    disclosure that does not exist. The button's own label already flips
 *    between Reveal and Hide.
 * 4. **A press is a state layer, and the tile ground is a token.** The tiles
 *    were `bg-neutral-100` — a light-oriented ramp step, so a pale grid on a
 *    dark page — and the warning was inked with the `warn` fill.
 */
export declare const SeedPhraseGridV4: React.ForwardRefExoticComponent<SeedPhraseGridV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SeedPhraseGridV4.d.ts.map