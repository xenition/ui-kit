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
export function signParts(
  cents: number,
  tone?: 'income' | 'expense' | 'neutral' | 'muted',
  words: { credit?: string; debit?: string; zero?: string } = {}
): SignParts {
  const safe = Number.isFinite(cents) ? cents : 0;

  // `neutral` and `muted` are the caller saying "this figure has no
  // direction" — an account balance, an invoice total, a category spend. An
  // earlier draft let them fall through to the sign, so a positive balance
  // announced as "credit $412.00", which is the same class of bug as the one
  // this helper exists to fix, pointing the other way.
  if (tone === 'neutral' || tone === 'muted') {
    return { direction: 'zero', word: words.zero ?? '', sign: '', tone: 'neutral' };
  }

  const direction: SignParts['direction'] =
    tone === 'income' ? 'credit' : tone === 'expense' ? 'debit' : safe > 0 ? 'credit' : safe < 0 ? 'debit' : 'zero';

  if (direction === 'credit') {
    return { direction, word: words.credit ?? 'credit', sign: '+', tone: 'success' };
  }
  if (direction === 'debit') {
    return { direction, word: words.debit ?? 'debit', sign: '−', tone: 'danger' };
  }
  // Zero is not a gain. `>= 0` drew "+$0.00" in the success tone in three
  // components.
  return { direction, word: words.zero ?? '', sign: '', tone: 'neutral' };
}

/**
 * A line total, in integer cents.
 *
 * `InvoiceLine` truncated the unit price and left the quantity alone, so
 * `333 x 3.5` produced `1165.5` — a non-integer cents value that `MoneyAmount`
 * then floored to `$11.65`, while the breakdown line above it honestly printed
 * "3.5 x $3.33". The line under-reported and disagreed with itself.
 */
export function lineTotal(unitPriceCents: number, quantity: number): number {
  const price = Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0;
  const qty = Number.isFinite(quantity) ? quantity : 0;
  return Math.round(price * qty);
}

/**
 * A percentage, through `Intl` rather than `toFixed`.
 *
 * `BalanceHeader` built its percentage by string concatenation — unrounded and
 * unclamped, so `12.3456789` printed in full — and `ExchangeRateRow` used
 * `toFixed`, which hard-locks the decimal mark to `.` while the amount beside
 * it went through `Intl`. A de-DE app showed "1.234,56 EUR" next to "0.9184".
 */
export function pctText(value: number, locale?: string, decimals = 2): string {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    signDisplay: 'exceptZero',
  }).format(safe);
}

/**
 * A ratio for a meter, and the true figure for its label.
 *
 * `BudgetBar` clamped the bar and left the announced percentage uncapped, so
 * at 300% spent one element reported `aria-valuenow="100"` and a name saying
 * "300% of budget used". Both numbers are real; they are not the same number,
 * and the caller needs each one for a different job.
 */
export function meterParts(value: number, total: number): { ratio: number; percent: number; over: boolean } {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) {
    return { ratio: 0, percent: 0, over: false };
  }
  const percent = Math.round((value / total) * 100);
  return { ratio: Math.min(Math.max(value / total, 0), 1), percent, over: value > total };
}

/**
 * Round a rate to a precision `toFixed` will actually accept.
 *
 * `ExchangeRateRow` clamped `precision` at the bottom and not the top, so any
 * value above 100 threw a `RangeError`.
 */
export function ratePrecision(precision: number): number {
  if (!Number.isFinite(precision)) return 2;
  return Math.min(20, Math.max(0, Math.trunc(precision)));
}
