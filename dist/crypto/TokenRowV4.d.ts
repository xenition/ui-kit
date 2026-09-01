import * as React from 'react';
import type { TokenRowProps } from './TokenRow';
export interface TokenRowV4Props extends TokenRowProps {
    /**
     * The words the 24h direction is announced with. Defaults `'up'`, `'down'`,
     * `'unchanged'` — the third of which the base did not have at all.
     */
    directionLabels?: {
        up?: string;
        down?: string;
        flat?: string;
    };
}
/**
 * **V4 token row** — the web twin of the native `TokenRowV4`, same props as
 * {@link TokenRow} plus `directionLabels`.
 *
 * ## Five changes
 *
 * 1. **The row announces its numbers.** `aria-label="ETH holding"` sat on the
 *    interactive root, and an accessible name *replaces* the subtree — so the
 *    quantity, the fiat value and the 24h change, which are the entire reason
 *    the row exists, were never spoken. One name now carries all of them.
 * 2. **A loss is no longer announced as a gain.** The label was built as
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``, and
 *    `formatPct` re-applies a sign — so `Math.abs` guaranteed a `+` and a 3.2%
 *    drop read "down +3.20%". `>= 0` also sent a flat `0` down the "up" branch
 *    while the glyph beside it was `•`. Word, glyph and tone now come from one
 *    `changeParts()` call and cannot disagree.
 * 3. **The change is inked, not filled.** `changeToneClass()` hands back
 *    `text-success` / `text-danger` / `text-muted` — fill slots, with no
 *    contrast promise for text.
 * 4. **The ticker is not truncated to three characters.** `slice(0, 3)` turned
 *    every four-letter ticker into a different token on screen; the disc shows
 *    the symbol and ellipsises if it must.
 * 5. **A press is a state layer** on the shared row body, so a token row, a
 *    settings row and a notification are one family — and it is a real
 *    `<button>`, not a `div` wearing `role="button"` and a hand-written
 *    Enter/Space handler.
 */
export declare const TokenRowV4: React.ForwardRefExoticComponent<TokenRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TokenRowV4.d.ts.map