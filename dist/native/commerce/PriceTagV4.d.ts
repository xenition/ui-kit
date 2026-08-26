import * as React from 'react';
import type { MoneyFormatter } from './money';
import type { PriceTagProps } from './PriceTag';
export type { PriceTagProps as PriceTagV4Props, MoneyFormatter };
/**
 * **V4 price tag** — same props as {@link PriceTag}, a different design line.
 *
 * The other component in the kit where a number is the hero. Every amount
 * still goes through {@link formatMoney} — integer cents in, a localized
 * currency string out, overridable per call — because a hand-written formatter
 * is how a kit ends up with `$1204.5` on one screen and `$1,204.50` on the
 * next.
 *
 * Four changes:
 *
 * 1. **Tabular figures.** A list of prices only reads as a list if the digits
 *    line up; with proportional figures `$9.99` and `$11.11` are different
 *    widths and the column has no edge to scan down (§33).
 * 2. **The display face, on both twins.** The web base already set
 *    `font-heading` on the price and the native base did not, so the same
 *    price was a different typeface on the two platforms. Both wear it now.
 * 3. **A price that reads as the decision.** One step up the scale at every
 *    size — `md` goes from `base` to `lg` — because the base was setting the
 *    most important figure on a product card at caption size (§6).
 * 4. **The "was" price is announced, not just struck through.** A screen
 *    reader given `$20.00 $14.00` reads two prices with no idea which is
 *    which; the compare-at now carries a `Was …` label. §46 puts that ahead of
 *    the design line.
 *
 * **A discounted price does not turn red.** §35.4 — semantic colours are not
 * brand colours, `danger` means danger, and a sale price painted in the error
 * tone teaches the reader to distrust the tone everywhere else in the app. The
 * discount is carried by the struck original beside it, which is what a
 * shopper already reads.
 *
 * **No badge, no container.** The percentage off is derivable from the two
 * props and deliberately not drawn: a price tag's job is the price, it is
 * composed inside cards and rows that have their own layout, and §7 gets the
 * last word on adding a second coloured element to a two-line component.
 */
export declare function PriceTagV4({ cents, currency, compareAtCents, formatMoney: format, size, style, }: PriceTagProps): React.ReactElement;
//# sourceMappingURL=PriceTagV4.d.ts.map