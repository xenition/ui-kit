import * as React from 'react';
import { cn } from '../primitives/cn';
import { Sparkline } from '../charts/Sparkline';
import { changeGlyph, changeToneClass, changeToneKey, formatPct, formatPrice } from './internal/format';
import { pressableProps } from './internal/pressable';

export type PriceTickerVariant = 'compact' | 'detailed';

export interface PriceTickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Asset symbol/ticker (e.g. `BTC`). */
  symbol: string;
  /** Optional long name (`Bitcoin`) — shown in the `detailed` variant. */
  name?: string;
  /** Current price in fiat major units. */
  price: number;
  /** 24h change as a percentage (e.g. `2.4` → `+2.40%`; negative = loss). */
  changePct?: number;
  /** Fiat symbol for the price (default `$`). */
  currencySymbol?: string;
  /** Fraction digits for the price (default `2`). */
  priceDecimals?: number;
  /** Optional recent-price series drawn as a token-toned sparkline. */
  spark?: number[];
  variant?: PriceTickerVariant;
  /** Show a skeleton while the quote loads. */
  loading?: boolean;
  /** Fires on click — makes the row a keyboard-operable button. */
  onClick?: () => void;
}

/**
 * A single live-price line: symbol/name on the left, price + a token-toned
 * change on the right. Gains read `success`, losses `danger`, and each change
 * is prefixed with a ▲/▼ glyph so direction is never color-only. The
 * `detailed` variant adds the long name and an optional {@link Sparkline}.
 * Prices/percentages are fixed-precision — no float drift. Web parity of the
 * native `PriceTicker`.
 */
export const PriceTicker = React.forwardRef<HTMLDivElement, PriceTickerProps>(function PriceTicker(
  {
    symbol,
    name,
    price,
    changePct = 0,
    currencySymbol = '$',
    priceDecimals = 2,
    spark,
    variant = 'compact',
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const detailed = variant === 'detailed';
  const toneKey = changeToneKey(changePct);
  const glyph = changeGlyph(changePct);

  if (loading) {
    return (
      <div
        ref={ref}
        aria-label={`Loading ${symbol} price`}
        className={cn(
          'animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100',
          detailed ? 'h-14' : 'h-10',
          className
        )}
        {...rest}
      />
    );
  }

  const interactive = pressableProps(onClick);
  const sparkColor = toneKey === 'muted' ? 'primary' : toneKey;

  return (
    <div
      ref={ref}
      aria-label={interactive ? `${symbol} price` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-base font-bold text-on-surface">{symbol}</span>
        {detailed && name != null ? (
          <span className="truncate text-xs text-muted">{name}</span>
        ) : null}
      </div>

      {detailed && spark != null && spark.length > 0 ? (
        <Sparkline data={spark} width={64} height={28} color={sparkColor} />
      ) : null}

      <div className="flex flex-col items-end gap-0.5">
        <span className="text-base font-bold tabular-nums text-on-surface">
          {formatPrice(price, { symbol: currencySymbol, decimals: priceDecimals })}
        </span>
        <span
          aria-label={`${changePct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
          className={cn('text-xs font-semibold tabular-nums', changeToneClass(toneKey))}
        >
          {glyph} {formatPct(changePct)}
        </span>
      </div>
    </div>
  );
});
