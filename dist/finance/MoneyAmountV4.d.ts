import * as React from 'react';
import type { MoneyAmountProps } from './MoneyAmount';
export interface MoneyAmountV4Props extends MoneyAmountProps {
    /**
     * The words a reader hears for the two directions. Default `'credit'` and
     * `'debit'` — the base's own wording, now driven by the same `tone` that
     * picks the colour instead of by the sign.
     */
    directionLabels?: {
        credit?: string;
        debit?: string;
    };
}
/**
 * **V4 money amount** — the web twin of the native `MoneyAmountV4`, same props
 * as {@link MoneyAmount} plus `directionLabels`.
 *
 * Every figure in this module funnels through here, so its defects were
 * thirteen components' defects.
 *
 * ## Three changes
 *
 * 1. **Money is drawn in the contrast-corrected ink.** The base painted
 *    amounts `text-success` / `text-danger`, which are **fill** tokens — a
 *    rendered audit measured them at 1.32:1 as text — and `tone="muted"` in
 *    `text-muted`, a ramp step with no contrast promise at all, which is what
 *    `BudgetBar` draws a real remaining balance in. The native twin migrated
 *    to the `*Text` slots and carries a comment saying why; the web twin
 *    missed the migration wholesale.
 * 2. **A red amount is no longer announced as a credit.** The colour came from
 *    `tone` and the announced direction came from the *sign*, so a caller
 *    passing an unsigned magnitude with `tone="expense"` — which is exactly
 *    what that prop is for — got a danger-coloured figure a reader called
 *    "credit $12.00". `signParts()` resolves both from one place, and `tone`
 *    wins when it is given.
 * 3. **The glyph and the word agree.** With `signDisplay="never"` the string
 *    for −$50.00 was identical to +$50.00, leaving hue as the only difference
 *    — invisible in greyscale and to a red-green viewer. The sign now follows
 *    the resolved direction rather than the sign of `cents`, so `tone` moves
 *    the glyph too, and the name carries the direction as a word whether or
 *    not the glyph is drawn.
 *
 * Zero keeps `on-surface` rather than becoming muted: a balance of exactly
 * zero is a value, not an absence.
 */
export declare const MoneyAmountV4: React.ForwardRefExoticComponent<MoneyAmountV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=MoneyAmountV4.d.ts.map