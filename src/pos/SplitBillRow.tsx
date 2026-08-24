import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, safeCents } from './internal';

export type SplitBillRowVariant = 'even' | 'custom';

export interface SplitBillRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Party label (e.g. "Guest 1", "Card ending 4242"). */
  label: string;
  /** This party's share in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** How many items assigned to this split (shown when > 0). */
  itemCount?: number;
  /** Already settled — shows a "Paid" flag (word, not color alone). */
  paid?: boolean;
  /** Selection state for the active party being edited/charged. */
  selected?: boolean;
  /** Amount already tendered against this split, in cents. */
  paidCents?: number;
  /** Toggle-paid handler; renders a settle control. */
  onTogglePaid?: () => void;
  /** `even` (default) is an equal share; `custom` hints an editable amount. */
  variant?: SplitBillRowVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * One party's slice when a bill is split — the DOM parity of the native
 * `SplitBillRow`: label, item count, this party's amount (integer **cents** via
 * `formatMoney`), a remaining/paid indicator, and a settle toggle. `paid` is
 * conveyed by a **glyph + word** flag, never color alone; `selected` draws an
 * accent ring reflected in `aria-pressed`. When `onClick` is set the row is a
 * keyboard-operable `role="button"`. Token-only.
 */
export const SplitBillRow = React.forwardRef<HTMLDivElement, SplitBillRowProps>(
  function SplitBillRow(
    {
      label,
      amountCents,
      currency = 'USD',
      itemCount,
      paid = false,
      selected = false,
      paidCents,
      onTogglePaid,
      variant = 'even',
      testID,
      onClick,
      onKeyDown,
      className,
      ...rest
    },
    ref
  ) {
    const amount = safeCents(amountCents);
    const settled =
      paid || (typeof paidCents === 'number' && safeCents(paidCents) >= amount && amount > 0);
    const remaining =
      typeof paidCents === 'number' ? Math.max(0, amount - safeCents(paidCents)) : amount;
    const interactive = typeof onClick === 'function';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      onKeyDown?.(e);
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        (onClick as (ev: React.SyntheticEvent) => void)(e);
      }
    };

    return (
      <div
        ref={ref}
        data-xen-split-bill-row=""
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-pressed={interactive ? selected : undefined}
        aria-label={
          interactive
            ? `${label}, ${formatMoney(amount, currency)}${settled ? ', paid' : ''}`
            : undefined
        }
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          selected ? 'border-2 border-primary bg-primary-50' : 'border-border bg-surface',
          interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold text-on-surface">{label}</span>
          <span className="text-xs text-muted">
            {variant === 'custom' ? 'Custom' : 'Even split'}
            {typeof itemCount === 'number' && itemCount > 0
              ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}`
              : ''}
          </span>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <span className="text-sm font-bold tabular-nums text-on-surface">
            {formatMoney(amount, currency)}
          </span>
          {settled ? (
            <span className="text-xs font-bold text-success">✓ Paid</span>
          ) : typeof paidCents === 'number' && safeCents(paidCents) > 0 ? (
            <span className="text-xs font-semibold text-warn">
              {formatMoney(remaining, currency)} left
            </span>
          ) : null}
        </div>

        {onTogglePaid ? (
          <button
            type="button"
            role="checkbox"
            aria-checked={settled}
            aria-label={settled ? `Mark ${label} unpaid` : `Mark ${label} paid`}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePaid();
            }}
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-[var(--xen-radius-sm)] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              settled ? 'border-success bg-success' : 'border-border bg-transparent'
            )}
          >
            {settled ? (
              <span aria-hidden="true" className="text-xs font-bold text-on-success">
                ✓
              </span>
            ) : null}
          </button>
        ) : null}
      </div>
    );
  }
);
