import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, safeCents, TONE_SOFT_BG, type DiscountType } from './internal';
import type { DiscountRowProps } from './DiscountRow';

/** Re-exported so consumers of the V4 line can type discount kinds. */
export type { DiscountType };

/** Drop-in for {@link DiscountRowProps} — same props, the V4 "register" design. */
export type DiscountRowV4Props = DiscountRowProps;

/**
 * DiscountRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a discount line: a tag glyph in a soft-tint disc, the
 * label with its percent/amount basis, an optional note, and the **negative money
 * impact drawn big and bold** in `tabular-nums` (the savings that matter at the
 * counter) — plus a large (≥44px) remove affordance. With no active discount it
 * collapses to a crisp, rounded dashed "Add discount" `<button>` that fires
 * `onAdd`. Same props/behavior as {@link DiscountRowProps}; all colors from
 * `--xen-*` token classes (no literals). One accent = **primary**; savings tone =
 * `success`. Dark-mode safe.
 */
export const DiscountRowV4 = React.forwardRef<HTMLDivElement, DiscountRowV4Props>(function DiscountRowV4(
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
            'flex min-h-[44px] w-full items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border-2 border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-base font-bold text-primary transition-colors',
            'hover:bg-primary-50 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
            ＋
          </span>
          <span>{addLabel}</span>
        </button>
      </div>
    );
  }

  const basis: string | undefined =
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
        'flex items-center justify-between gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]',
        compact ? 'px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]' : 'px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        editable
          ? 'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : '',
        className
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)]">
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full text-success',
            TONE_SOFT_BG.success,
            compact ? 'h-8 w-8 text-sm' : 'h-9 w-9 text-base'
          )}
        >
          🏷
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold text-on-surface">
            {label ?? 'Discount'}
            {basis ? ` · ${basis}` : ''}
          </span>
          {!compact && note ? <span className="truncate text-xs text-muted">{note}</span> : null}
        </div>
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className={cn('rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-0.5 text-base font-extrabold tabular-nums text-success', TONE_SOFT_BG.success)}>
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg text-danger transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          >
            <span aria-hidden="true">✕</span>
          </button>
        ) : null}
      </div>
    </div>
  );
});
