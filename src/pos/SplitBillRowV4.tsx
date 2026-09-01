import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, safeCents, TONE_SOFT_BG } from './internal';
import type { SplitBillRowProps } from './SplitBillRow';

/** Drop-in for {@link SplitBillRowProps} — same props, the V4 "register" design. */
export type SplitBillRowV4Props = SplitBillRowProps;

/**
 * SplitBillRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a split-bill row: a guest/share label with its item
 * count, this party's **share drawn big and bold** in `tabular-nums`, and a clear
 * **paid/unpaid** state — settled parties get a soft-success glow with a `✓ Paid`
 * flag (word, not color alone); unpaid parties get a large (≥44px) primary "pay"
 * settle control. `selected` draws an accent ring reflected in `aria-pressed`;
 * when `onClick` is set the row is a keyboard-operable `role="button"`. Same
 * props/behavior as {@link SplitBillRowProps}; all colors from `--xen-*` token
 * classes (no literals). Dark-mode safe.
 */
export const SplitBillRowV4 = React.forwardRef<HTMLDivElement, SplitBillRowV4Props>(function SplitBillRowV4(
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
  const settled = paid || (typeof paidCents === 'number' && safeCents(paidCents) >= amount && amount > 0);
  const remaining = typeof paidCents === 'number' ? Math.max(0, amount - safeCents(paidCents)) : amount;
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
        interactive ? `${label}, ${formatMoney(amount, currency)}${settled ? ', paid' : ''}` : undefined
      }
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border-2 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] transition-all',
        selected
          ? 'border-primary bg-primary-50 shadow-sm'
          : settled
            ? cn('border-transparent shadow-sm', TONE_SOFT_BG.success)
            : 'border-border bg-surface',
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
        <span className="text-base font-extrabold tabular-nums text-on-surface">
          {formatMoney(amount, currency)}
        </span>
        {settled ? (
          <span className="text-xs font-bold text-success">✓ Paid</span>
        ) : typeof paidCents === 'number' && safeCents(paidCents) > 0 ? (
          <span className="text-xs font-semibold text-warn">{formatMoney(remaining, currency)} left</span>
        ) : null}
      </div>

      {onTogglePaid ? (
        settled ? (
          <button
            type="button"
            role="checkbox"
            aria-checked
            aria-label={`Mark ${label} unpaid`}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePaid();
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-success bg-success focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <span aria-hidden="true" className="text-base font-bold text-on-success">
              ✓
            </span>
          </button>
        ) : (
          <button
            type="button"
            role="checkbox"
            aria-checked={false}
            aria-label={`Mark ${label} paid`}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePaid();
            }}
            className="flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-full bg-primary px-[var(--xen-space-md)] text-sm font-bold text-on-primary transition-colors hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            Pay
          </button>
        )
      ) : null}
    </div>
  );
});
