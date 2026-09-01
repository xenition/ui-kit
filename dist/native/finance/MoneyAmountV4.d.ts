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
 * **V4 money amount** — same props as {@link MoneyAmount} plus
 * `directionLabels`.
 *
 * Every figure in this module funnels through here, so its two defects were
 * thirteen components' defects.
 *
 * ## Three changes
 *
 * 1. **A red amount is no longer announced as a credit.** The colour came from
 *    `tone` and the announced direction came from the *sign*, so a caller
 *    passing an unsigned magnitude with `tone="expense"` — which is exactly
 *    what that prop is for — got a danger-coloured figure a reader called
 *    "credit $12.00". `signParts()` resolves both from one place, and `tone`
 *    wins when it is given.
 * 2. **The glyph and the word agree.** With `signDisplay="never"` the string
 *    for −$50.00 was identical to +$50.00, leaving hue as the only difference
 *    — invisible in greyscale and to a red-green viewer. The sign now follows
 *    the resolved direction rather than the sign of `cents`, so `tone` moves
 *    the glyph too, and the spoken name carries the direction as a word
 *    whether or not the glyph is drawn.
 * 3. **`tone="muted"` is readable.** It drew in `colors.muted`, a ramp step
 *    with no contrast promise, in a component whose whole job is text —
 *    `BudgetBar` draws a real remaining balance in it. It takes `mutedText`,
 *    the slot the theme added for this.
 *
 * Zero keeps `onSurface` rather than becoming muted: a balance of exactly zero
 * is a value, not an absence.
 */
export declare function MoneyAmountV4({ cents, currency, tone, size, signDisplay, formatMoney: format, directionLabels, accessibilityLabel, style, }: MoneyAmountV4Props): React.ReactElement;
//# sourceMappingURL=MoneyAmountV4.d.ts.map