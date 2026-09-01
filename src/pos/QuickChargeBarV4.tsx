import * as React from 'react';
import { cn } from '../primitives/cn';
import { Spinner } from '../primitives/Spinner';
import { formatMoney, safeCents } from './internal';
import type { QuickChargeBarProps } from './QuickChargeBar';

/** Drop-in for {@link QuickChargeBarProps} — same props, the V4 "register" design. */
export type QuickChargeBarV4Props = QuickChargeBarProps;

/**
 * QuickChargeBar — **V4** "register" design (web parity of the native V4). The
 * checkout peak: the running **total is big and bold** in `tabular-nums` on the
 * crisp bar, and the large (≥44px) **Charge** button sits on the brand gradient
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) with the total repeated
 * in near-white ink — the moment the counter is built around. An empty cart
 * (`itemCount === 0`) disables charging and swaps the total for the `emptyLabel`
 * hint, so the empty state reads by text + the button's `disabled` attribute,
 * never color alone. `loading` maps to `disabled` + an inline `Spinner`. Same
 * props/behavior as {@link QuickChargeBarProps}; all colors from `--xen-*` token
 * classes and the primary gradient utilities (no literals).
 */
export const QuickChargeBarV4 = React.forwardRef<HTMLDivElement, QuickChargeBarV4Props>(
  function QuickChargeBarV4(
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
          variant === 'bar' ? 'border-t border-border bg-surface p-[var(--xen-space-md)]' : '',
          className
        )}
        {...rest}
      >
        <div className="min-w-0 flex-1">
          {isEmpty ? (
            <span className="text-sm font-semibold text-muted">{emptyLabel}</span>
          ) : (
            <>
              <span className="block text-2xl font-extrabold tabular-nums text-on-surface">
                {formatMoney(total, currency)}
              </span>
              {typeof itemCount === 'number' ? (
                <span className="block text-xs font-medium text-muted">
                  {itemCount} item{itemCount === 1 ? '' : 's'}
                </span>
              ) : null}
            </>
          )}
        </div>

        {secondaryAction ? <div>{secondaryAction}</div> : null}

        <button
          type="button"
          onClick={onCharge}
          disabled={!canCharge}
          aria-label={isEmpty ? chargeLabel : `${chargeLabel} ${formatMoney(total, currency)}`}
          className={cn(
            'inline-flex min-h-[44px] items-center justify-center gap-[var(--xen-space-xs)]',
            'rounded-[var(--xen-radius-lg)] px-[var(--xen-space-lg)] py-[var(--xen-space-sm)]',
            'text-base font-extrabold tabular-nums text-on-primary shadow-md transition-all',
            'bg-gradient-to-br from-primary-500 to-primary-700',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            canCharge ? 'hover:opacity-95 active:scale-[0.98]' : 'pointer-events-none opacity-50'
          )}
        >
          {loading ? <Spinner size="sm" /> : null}
          {isEmpty ? chargeLabel : `${chargeLabel} ${formatMoney(total, currency)}`}
        </button>
      </div>
    );
  }
);
