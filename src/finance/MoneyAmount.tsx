import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

/**
 * Semantic tone for a monetary value.
 * - `auto` derives from the sign of `cents` (income → success, expense →
 *   danger, zero → on-surface).
 * - `income` / `expense` force the credit / debit tone.
 * - `neutral` reads on-surface; `muted` reads muted.
 */
export type MoneyTone = 'auto' | 'income' | 'expense' | 'neutral' | 'muted';

export type MoneyAmountSize = 'sm' | 'md' | 'lg' | 'xl';

/** How the +/− prefix is shown. `auto` shows `−` for negatives only. */
export type MoneySignDisplay = 'auto' | 'always' | 'never';

export interface MoneyAmountProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Signed integer **minor units (cents)** — the sign carries direction, so no
   * float ever reaches the display (mirrors the kit-wide cents contract).
   */
  cents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Tone → token color class (default `auto`, derived from the sign). */
  tone?: MoneyTone;
  /** Visual scale (default `md`). */
  size?: MoneyAmountSize;
  /** Sign prefix behavior (default `auto` → `−` on negatives only). */
  signDisplay?: MoneySignDisplay;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
}

const SIZE_CLASS: Record<MoneyAmountSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
};

function toneClass(tone: MoneyTone, cents: number): string {
  switch (tone) {
    case 'income':
      return 'text-success';
    case 'expense':
      return 'text-danger';
    case 'neutral':
      return 'text-on-surface';
    case 'muted':
      return 'text-muted';
    case 'auto':
    default:
      if (cents > 0) return 'text-success';
      if (cents < 0) return 'text-danger';
      return 'text-on-surface';
  }
}

/**
 * The finance module's canonical money display: a single signed, token-toned
 * `<span>`. Amounts are integer cents so the printed value never drifts —
 * `formatMoney` renders exactly two decimals via `Intl.NumberFormat`, and the
 * magnitude is formatted from `Math.abs(cents)` with the sign applied
 * separately. Color traces to a `text-*` token class (income = `text-success`,
 * expense = `text-danger`) — never a literal. Every other finance component
 * funnels its amounts through here. Web parity of the native `MoneyAmount`.
 */
export const MoneyAmount = React.forwardRef<HTMLSpanElement, MoneyAmountProps>(function MoneyAmount(
  {
    cents,
    currency = 'USD',
    tone = 'auto',
    size = 'md',
    signDisplay = 'auto',
    formatMoney: format = formatMoney,
    className,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const safeCents = Number.isFinite(cents) ? Math.trunc(cents) : 0;
  const magnitude = format(Math.abs(safeCents), currency);

  let sign = '';
  if (safeCents < 0) sign = signDisplay === 'never' ? '' : '−'; // minus sign
  else if (safeCents > 0 && signDisplay === 'always') sign = '+';

  const text = `${sign}${magnitude}`;

  return (
    <span
      ref={ref}
      aria-label={
        ariaLabel ??
        `${safeCents < 0 ? 'debit' : safeCents > 0 ? 'credit' : ''} ${magnitude}`.trim()
      }
      className={cn('font-bold tabular-nums', toneClass(tone, safeCents), SIZE_CLASS[size], className)}
      {...rest}
    >
      {text}
    </span>
  );
});
