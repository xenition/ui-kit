import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Spinner } from '../primitives/Spinner';
import { formatMoney, safeCents } from './internal';

export type QuickChargeBarVariant = 'bar' | 'inline';

export interface QuickChargeBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Order total in integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Item count — when `0` the bar disables and shows the empty hint. */
  itemCount?: number;
  /** Charge handler. */
  onCharge?: () => void;
  /** Charge button copy (default `Charge`). The total is appended. */
  chargeLabel?: string;
  /** Show a spinner and block the charge (payment in flight). */
  loading?: boolean;
  /** Force-disable regardless of item count. */
  disabled?: boolean;
  /** Copy shown (in place of the total) when the cart is empty. */
  emptyLabel?: string;
  /** Secondary action slot (e.g. a "Split" button) rendered before Charge. */
  secondaryAction?: React.ReactNode;
  /** `bar` (default) is a bordered sticky footer; `inline` drops the chrome. */
  variant?: QuickChargeBarVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * The register's charge affordance — the DOM parity of the native
 * `QuickChargeBar`. A sticky footer showing the running total (integer **cents**
 * via `formatMoney`) and item count beside a primary Charge button. An empty
 * cart (`itemCount === 0`) disables charging and swaps the total for an
 * `emptyLabel` hint, so the empty state is conveyed by text and the button's
 * `disabled` attribute, never color alone. The web `Button` has no `loading`
 * prop, so `loading` maps to `disabled` + an inline `Spinner`. Composed from the
 * `Button` primitive; token-only colors.
 */
export const QuickChargeBar = React.forwardRef<HTMLDivElement, QuickChargeBarProps>(
  function QuickChargeBar(
    {
      totalCents,
      currency = 'USD',
      itemCount,
      onCharge,
      chargeLabel = 'Charge',
      loading = false,
      disabled = false,
      emptyLabel = 'Cart empty',
      secondaryAction,
      variant = 'bar',
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const isEmpty = itemCount === 0;
    const canCharge = !disabled && !isEmpty && !loading;
    const total = safeCents(totalCents);

    return (
      <div
        ref={ref}
        data-xen-quick-charge-bar=""
        data-testid={testID}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)]',
          variant === 'bar'
            ? 'border-t border-border bg-surface p-[var(--xen-space-md)]'
            : '',
          className
        )}
        {...rest}
      >
        <div className="min-w-0 flex-1">
          {isEmpty ? (
            <span className="text-sm font-semibold text-muted">{emptyLabel}</span>
          ) : (
            <>
              <span className="block text-xl font-bold tabular-nums text-on-surface">
                {formatMoney(total, currency)}
              </span>
              {typeof itemCount === 'number' ? (
                <span className="block text-xs text-muted">
                  {itemCount} item{itemCount === 1 ? '' : 's'}
                </span>
              ) : null}
            </>
          )}
        </div>

        {secondaryAction ? <div>{secondaryAction}</div> : null}

        <Button variant="primary" size="lg" onClick={onCharge} disabled={!canCharge}>
          {loading ? <Spinner size="sm" className="mr-[var(--xen-space-xs)]" /> : null}
          {isEmpty ? chargeLabel : `${chargeLabel} ${formatMoney(total, currency)}`}
        </Button>
      </div>
    );
  }
);
