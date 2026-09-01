/**
 * Money, sign and precision — **pure, and shared by both twins**, the way
 * `crypto/amount-v4.ts` is. The native twin imports it as
 * `../../finance/money-v4`.
 *
 * Nothing here is exported from the package.
 */
/** A signed amount's three cues, so direction is never carried by hue alone. */
export interface SignParts {
    direction: 'credit' | 'debit' | 'zero';
    /** The word a reader hears. */
    word: string;
    /** `+` / `−` / `` — the glyph a sighted user sees. */
    sign: string;
    /** `success` / `danger` / `neutral`, resolved to *ink* by the caller. */
    tone: 'success' | 'danger' | 'neutral';
}
/**
 * Split a signed amount.
 *
 * ## Two bugs this replaces
 *
 * `MoneyAmount` derived the announced direction from the **sign** while the
 * colour came from `tone`, so a caller passing an unsigned magnitude with
 * `tone="expense"` — which is exactly what that prop is for — got a red amount
 * announced as "credit $12.00".
 *
 * And with `signDisplay="never"` the glyph string for −$50.00 is identical to
 * +$50.00, leaving `text-success` against `text-danger` as the only difference.
 * `BudgetBar` is a live caller of that path.
 *
 * `tone` wins when it is given, because a caller who names the direction means
 * it; the sign is the fallback.
 */
export declare function signParts(cents: number, tone?: 'income' | 'expense' | 'neutral' | 'muted', words?: {
    credit?: string;
    debit?: string;
    zero?: string;
}): SignParts;
/**
 * A line total, in integer cents.
 *
 * `InvoiceLine` truncated the unit price and left the quantity alone, so
 * `333 x 3.5` produced `1165.5` — a non-integer cents value that `MoneyAmount`
 * then floored to `$11.65`, while the breakdown line above it honestly printed
 * "3.5 x $3.33". The line under-reported and disagreed with itself.
 */
export declare function lineTotal(unitPriceCents: number, quantity: number): number;
/**
 * A percentage, through `Intl` rather than `toFixed`.
 *
 * `BalanceHeader` built its percentage by string concatenation — unrounded and
 * unclamped, so `12.3456789` printed in full — and `ExchangeRateRow` used
 * `toFixed`, which hard-locks the decimal mark to `.` while the amount beside
 * it went through `Intl`. A de-DE app showed "1.234,56 EUR" next to "0.9184".
 */
export declare function pctText(value: number, locale?: string, decimals?: number): string;
/**
 * A ratio for a meter, and the true figure for its label.
 *
 * `BudgetBar` clamped the bar and left the announced percentage uncapped, so
 * at 300% spent one element reported `aria-valuenow="100"` and a name saying
 * "300% of budget used". Both numbers are real; they are not the same number,
 * and the caller needs each one for a different job.
 */
export declare function meterParts(value: number, total: number): {
    ratio: number;
    percent: number;
    over: boolean;
};
/**
 * Round a rate to a precision `toFixed` will actually accept.
 *
 * `ExchangeRateRow` clamped `precision` at the bottom and not the top, so any
 * value above 100 threw a `RangeError`.
 */
export declare function ratePrecision(precision: number): number;
//# sourceMappingURL=money-v4.d.ts.map