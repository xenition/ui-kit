import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch } from '../primitives/Switch';
import { formatPrice } from './internal/format';

/** Fire when the price crosses above / below the target. */
export type AlertCondition = 'above' | 'below';

export interface PriceAlertRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Asset symbol the alert watches (e.g. `BTC`). */
  symbol: string;
  /** Trigger direction. */
  condition: AlertCondition;
  /** Target price in fiat major units. */
  targetPrice: number;
  /** Optional current price, shown for context. */
  currentPrice?: number;
  /** Fiat symbol (default `$`). */
  currencySymbol?: string;
  /** Fraction digits for prices (default `2`). */
  decimals?: number;
  /** Whether the alert is armed. */
  enabled?: boolean;
  /** Fires with the next enabled state when the switch is toggled. */
  onToggle?: (enabled: boolean) => void;
}

const CONDITION_META: Record<AlertCondition, { label: string; glyph: string; text: string }> = {
  above: { label: 'Above', glyph: '▲', text: 'text-success' },
  below: { label: 'Below', glyph: '▼', text: 'text-danger' },
};

/**
 * One configurable price alert: the watched symbol, a condition line (glyph +
 * `Above`/`Below` label, so direction is not color-only) with the target price,
 * an optional current-price context line, and a {@link Switch} to arm or disarm
 * it. Prices are fixed-precision — no float drift. The row's opacity drops while
 * disabled to reinforce the state beyond the switch alone. Web parity of the
 * native `PriceAlertRow`.
 */
export const PriceAlertRow = React.forwardRef<HTMLDivElement, PriceAlertRowProps>(
  function PriceAlertRow(
    {
      symbol,
      condition,
      targetPrice,
      currentPrice,
      currencySymbol = '$',
      decimals = 2,
      enabled = false,
      onToggle,
      className,
      ...rest
    },
    ref
  ) {
    const meta = CONDITION_META[condition];
    const target = formatPrice(targetPrice, { symbol: currencySymbol, decimals });

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          enabled ? 'opacity-100' : 'opacity-60',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{symbol}</span>
          <span className="flex items-center gap-1">
            <span aria-hidden="true" className={cn('text-sm', meta.text)}>
              {meta.glyph}
            </span>
            <span className="text-sm text-muted">{meta.label}</span>
            <span className="text-sm font-semibold tabular-nums text-on-surface">{target}</span>
          </span>
          {currentPrice != null ? (
            <span className="text-xs tabular-nums text-muted">
              {`Now ${formatPrice(currentPrice, { symbol: currencySymbol, decimals })}`}
            </span>
          ) : null}
        </div>

        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          aria-label={`${symbol} alert ${meta.label.toLowerCase()} ${target}`}
        />
      </div>
    );
  }
);
