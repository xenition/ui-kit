import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { formatToken } from './internal/format';

/** A token that can sit on either side of the swap. */
export interface SwapToken {
  symbol: string;
  /** Fraction digits used when displaying this token's amount (default 4). */
  decimals?: number;
}

/** The controlled value bag emitted by {@link SwapForm}. */
export interface SwapValues {
  fromSymbol: string;
  toSymbol: string;
  /** Amount of the `from` token, parsed from the input (float). */
  fromAmount: number;
}

export interface SwapFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
  /** The token being sold. */
  from: SwapToken;
  /** The token being bought. */
  to: SwapToken;
  /** Controlled `from` amount (major token units). */
  fromAmount?: number;
  /** Price: how many `to` per 1 `from`. `toAmount = fromAmount * rate`. */
  rate?: number;
  /** Fires on every amount edit with the merged {@link SwapValues}. */
  onChange?: (values: SwapValues) => void;
  /** Fires when the swap-direction control is pressed. */
  onFlip?: () => void;
  /** Fires on a valid submit with the merged {@link SwapValues}. */
  onSubmit?: (values: SwapValues) => void;
  /** Submit label (default `Swap`). */
  submitLabel?: string;
  /** Submit loading state (disables the submit button — web Button has no spinner). */
  loading?: boolean;
}

/** Parse a user-typed amount to a non-negative float; blank/garbage → 0. */
function parseAmount(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, '');
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * A controlled token-swap panel: an editable `from` amount, a flip control, a
 * derived (read-only) `to` amount computed as `fromAmount * rate` with stable
 * fixed-precision formatting (no float drift on screen), and the effective rate
 * line. Submit is blocked (button disabled) until the amount is positive and
 * the two tokens differ. Every edit emits the full {@link SwapValues}. Web
 * parity of the native `SwapForm`.
 */
export const SwapForm = React.forwardRef<HTMLDivElement, SwapFormProps>(function SwapForm(
  {
    from,
    to,
    fromAmount = 0,
    rate,
    onChange,
    onFlip,
    onSubmit,
    submitLabel = 'Swap',
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const toAmount = rate != null ? fromAmount * rate : undefined;
  const sameToken = from.symbol === to.symbol;
  const canSubmit = fromAmount > 0 && !sameToken;

  const emit = (amount: number): void => {
    onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: amount });
  };

  const panel =
    'flex flex-col gap-1 rounded-[var(--xen-radius-md)] border border-border bg-neutral-100 p-[var(--xen-space-md)]';

  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      <div className={panel}>
        <span className="text-xs font-semibold text-muted">You pay</span>
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Input
            aria-label="Pay amount"
            inputMode="decimal"
            value={fromAmount === 0 ? '' : String(fromAmount)}
            placeholder="0.0"
            onChange={(event) => emit(parseAmount(event.target.value))}
            className="flex-1 border-0 bg-transparent px-0 text-xl font-bold focus:ring-0"
          />
          <span className="text-base font-bold text-on-surface">{from.symbol}</span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Flip swap direction"
        onClick={onFlip}
        disabled={!onFlip}
        className={cn(
          'flex h-8 w-8 items-center justify-center self-center rounded-full border border-border bg-surface text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
      >
        ⇅
      </button>

      <div className={panel}>
        <span className="text-xs font-semibold text-muted">You receive</span>
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span
            aria-label="Receive amount"
            className={cn(
              'flex-1 text-xl font-bold tabular-nums',
              toAmount != null ? 'text-on-surface' : 'text-muted'
            )}
          >
            {toAmount != null ? formatToken(toAmount, { decimals: to.decimals ?? 4 }) : '—'}
          </span>
          <span className="text-base font-bold text-on-surface">{to.symbol}</span>
        </div>
      </div>

      {rate != null ? (
        <span className="text-xs tabular-nums text-muted">
          {`1 ${from.symbol} ≈ ${formatToken(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}`}
        </span>
      ) : null}

      {sameToken ? (
        <p className="text-xs text-danger" role="alert">
          Choose two different tokens.
        </p>
      ) : null}

      <Button
        onClick={() => onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount })}
        disabled={!canSubmit || loading}
      >
        {submitLabel}
      </Button>
    </div>
  );
});
