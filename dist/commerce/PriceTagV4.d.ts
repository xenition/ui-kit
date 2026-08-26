import * as React from 'react';
import type { MoneyFormatter } from './money';
import type { PriceTagProps } from './PriceTag';
export type { PriceTagProps as PriceTagV4Props, MoneyFormatter };
/**
 * **V4 price tag** — the web twin of the native `PriceTagV4`, same props as
 * {@link PriceTag}, a different design line.
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
 * 2. **The display face, on both twins.** This twin already set
 *    `font-heading`; its native counterpart did not, so the same price was a
 *    different typeface on the two platforms. Fixed on the native side, kept
 *    here.
 * 3. **A price that reads as the decision.** One step up the scale at every
 *    size — `md` goes from `text-base` to `text-lg` — because the base was
 *    setting the most important figure on a product card at caption size (§6).
 * 4. **The "was" price is announced, not just struck through.** It becomes an
 *    `<s>` (semantically "no longer accurate", which is exactly what it is)
 *    carrying a `Was …` label, so a screen reader given two prices knows which
 *    is which instead of reading them as a pair. §46 puts that ahead of the
 *    design line.
 *
 * **A discounted price does not turn red.** §35.4 — semantic colours are not
 * brand colours, `danger` means danger, and a sale price painted in the error
 * tone teaches the reader to distrust the tone everywhere else in the app.
 *
 * **No badge, no container.** The percentage off is derivable from the two
 * props and deliberately not drawn: a price tag's job is the price, it is
 * composed inside cards and rows that have their own layout, and §7 gets the
 * last word on adding a second coloured element to a two-line component.
 */
export declare const PriceTagV4: React.ForwardRefExoticComponent<PriceTagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=PriceTagV4.d.ts.map