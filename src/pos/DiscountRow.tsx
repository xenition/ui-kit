import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, safeCents, type DiscountType } from './internal';

export type DiscountRowVariant = 'default' | 'compact';

export interface DiscountRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Discount label (e.g. "Loyalty 10%", "Manager comp"). */
  label?: string;
  /** How the discount is expressed. */
  type?: DiscountType;
  /** The raw value: a percentage (0–100) for `percent`, else cents for `amount`. */
  value?: number;
  /** The resolved money impact in integer **cents** (always shown negative). */
  amountCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Optional reason / authorization note. */
  note?: string;
  /**
   * When `false` (or omitted with an `onAdd`), the row renders an "Add
   * discount" affordance instead of a resolved discount.
   */
  active?: boolean;
  /** Edit handler; makes the resolved row tappable. */
  onEdit?: () => void;
  /** Remove handler; renders a remove control. */
  onRemove?: () => void;
  /** Add handler; used by the empty/add affordance. */
  onAdd?: () => void;
  /** Copy for the add affordance (default `Add discount`). */
  addLabel?: string;
  /** Density. */
  variant?: DiscountRowVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * A discount line on the ticket — the DOM parity of the native `DiscountRow`. In
 * its resolved state it shows the label, the percent/amount basis, an optional
 * note, the negative money impact (integer **cents** via `formatMoney`, drawn in
 * the `success`/savings tone), and a remove control. With no active discount it
 * collapses to a dashed "Add discount" `<button>` that fires `onAdd`. Token-only
 * colors; real buttons for the actions.
 */
export const DiscountRow = React.forwardRef<HTMLDivElement, DiscountRowProps>(function DiscountRow(
  {
    label,
    type = 'amount',
    value,
    amountCents,
    currency = 'USD',
    note,
    active,
    onEdit,
    onRemove,
    onAdd,
    addLabel = 'Add discount',
    variant = 'default',
    testID,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const isActive = active ?? (safeCents(amountCents) > 0 || (label != null && label !== ''));

  if (!isActive) {
    return (
      <div ref={ref} data-xen-discount-row="" data-testid={testID} className={className} {...rest}>
        <button
          type="button"
          aria-label={addLabel}
          onClick={onAdd}
          className={cn(
            'flex w-full items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-primary',
            'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          <span aria-hidden="true" className="font-bold">
            ＋
          </span>
          <span>{addLabel}</span>
        </button>
      </div>
    );
  }

  const basis =
    type === 'percent' && typeof value === 'number'
      ? `${value}%`
      : type === 'amount' && typeof value === 'number'
        ? formatMoney(value, currency)
        : undefined;

  const editable = typeof onEdit === 'function';

  return (
    <div
      ref={ref}
      data-xen-discount-row=""
      data-testid={testID}
      role={editable ? 'button' : undefined}
      tabIndex={editable ? 0 : undefined}
      aria-label={editable ? `Edit ${label ?? 'discount'}` : undefined}
      onClick={editable ? onEdit : undefined}
      onKeyDown={
        editable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onEdit?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center justify-between gap-[var(--xen-space-md)]',
        compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]',
        editable
          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : '',
        className
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className="text-sm text-success">
            🏷
          </span>
          <span className="truncate text-sm font-semibold text-on-surface">
            {label ?? 'Discount'}
            {basis ? ` · ${basis}` : ''}
          </span>
        </div>
        {!compact && note ? <span className="truncate text-xs text-muted">{note}</span> : null}
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className="text-sm font-bold tabular-nums text-success">
          −{formatMoney(amountCents ?? 0, currency)}
        </span>
        {onRemove ? (
          <button
            type="button"
            aria-label={`Remove ${label ?? 'discount'}`}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-base text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          >
            <span aria-hidden="true">✕</span>
          </button>
        ) : null}
      </div>
    </div>
  );
});
