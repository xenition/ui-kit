import * as React from 'react';
import { cn } from '../primitives/cn';
import { pressableProps } from './internal/pressable';

export interface ExchangeRateRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Base (from) currency code, e.g. `"USD"`. */
  baseCurrency: string;
  /** Quote (to) currency code, e.g. `"EUR"`. */
  quoteCurrency: string;
  /** Units of quote per one unit of base (e.g. `0.92`). */
  rate: number;
  /** Percentage change vs the prior period; tints + arrow (up = success). */
  changePct?: number;
  /** Number of decimals shown for the rate (default `4`). */
  precision?: number;
  /** Fires on row click — makes the row a keyboard-operable button. */
  onClick?: () => void;
}

/**
 * A currency-pair quote row: `BASE → QUOTE`, the rate at fixed precision, and an
 * optional signed change chip (up = `text-success`, down = `text-danger`). The
 * rate is a display-only number formatted to `precision` decimals via `toFixed`,
 * so the shown value never drifts. Colors trace to tokens; becomes a button when
 * `onClick` is given. Web parity of the native `ExchangeRateRow`.
 */
export const ExchangeRateRow = React.forwardRef<HTMLDivElement, ExchangeRateRowProps>(
  function ExchangeRateRow(
    { baseCurrency, quoteCurrency, rate, changePct, precision = 4, onClick, className, ...rest },
    ref
  ) {
    const safeRate = Number.isFinite(rate) ? rate : 0;
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const up = (changePct ?? 0) >= 0;
    const changeClass = up ? 'text-success' : 'text-danger';
    const fixed = safeRate.toFixed(Math.max(0, Math.trunc(precision)));
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `${baseCurrency} to ${quoteCurrency}, ${fixed}` : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span className="flex-1 text-base font-semibold text-on-surface">
          {baseCurrency} <span className="text-muted">→</span> {quoteCurrency}
        </span>
        <span className="text-base font-bold tabular-nums text-on-surface">{fixed}</span>
        {hasChange ? (
          <span className={cn('text-xs font-semibold', changeClass)}>
            {up ? '▲' : '▼'} {up ? '+' : ''}
            {(changePct as number).toFixed(2)}%
          </span>
        ) : null}
      </div>
    );
  }
);
