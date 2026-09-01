import * as React from 'react';
import type { PriceTickerProps } from './PriceTicker';
export interface PriceTickerV4Props extends PriceTickerProps {
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
 * **V4 price ticker** — the web twin of the native `PriceTickerV4`, same props
 * as {@link PriceTicker} plus `directionLabels`.
 *
 * ## Five changes
 *
 * 1. **The ticker announces its price.** `aria-label="BTC price"` sat on the
 *    interactive root and replaced the subtree, so the price and the change —
 *    the only two things on the row — were never read out.
 * 2. **A loss is no longer announced as a gain.** `` `${pct >= 0 ? 'up' :
 *    'down'} ${formatPct(Math.abs(pct))}` `` re-applied a sign after taking the
 *    absolute value, so a 2.4% drop read "down +2.40%", and a flat `0` was
 *    called "up" beside a `•` glyph. One `changeParts()` call now decides the
 *    word, the glyph and the tone together.
 * 3. **The change is inked, not filled.** `changeToneClass()` returns
 *    `text-success` / `text-danger` / `text-muted`, which are fills.
 * 4. **The skeleton is visible, and the row stops jumping.** It was
 *    `bg-neutral-100` — a light-oriented ramp step that paints a pale plate
 *    onto a dark page — in a bare `h-10` / `h-14` box that had nothing to do
 *    with the row's real metrics, so a list of tickers visibly shifted the
 *    moment the quotes landed. The placeholder is now the shared opaque mix,
 *    drawn inside the real row container, in a `role="status"` region rather
 *    than behind an `aria-label` on a `div` with no role.
 * 5. **A press is a state layer** on the shared row body, and the row is a
 *    real `<button>` rather than a `div` with `role="button"`, `tabIndex` and
 *    a hand-written Enter/Space handler.
 */
export declare const PriceTickerV4: React.ForwardRefExoticComponent<PriceTickerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceTickerV4.d.ts.map