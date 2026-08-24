import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  REFUND_STATUS_META,
  REFUND_REASON_META,
  type RefundStatus,
  type RefundReason,
} from './internal';

export type RefundRowVariant = 'default' | 'selectable';

export interface RefundRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Item / line name being refunded. */
  name: string;
  /** Quantity being returned. */
  quantity?: number;
  /** Refund amount in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Why the item is coming back — glyph + word chip. */
  reason?: RefundReason;
  /** Refund lifecycle status — glyph + word pill. */
  status?: RefundStatus;
  /** Restock flag (word, not color alone). */
  restock?: boolean;
  /**
   * `selectable` renders a checkbox so a clerk can choose which lines to
   * refund; `selected`/`onToggle` drive it.
   */
  variant?: RefundRowVariant;
  /** Selection state (for `selectable`). */
  selected?: boolean;
  /** Toggle handler (for `selectable`). */
  onToggle?: () => void;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * One line of a return / refund — the DOM parity of the native `RefundRow`:
 * item, quantity, amount (integer **cents** via `formatMoney`), the return reason
 * and refund status as **glyph + word** chips (never color alone), and an
 * optional restock flag. In `selectable` mode a token-styled checkbox `<button>`
 * (reflected in `aria-checked`) lets a clerk pick lines to refund. When `onClick`
 * is set the row is a keyboard-operable `role="button"`. Token-only colors.
 */
export const RefundRow = React.forwardRef<HTMLDivElement, RefundRowProps>(function RefundRow(
  {
    name,
    quantity = 1,
    amountCents,
    currency = 'USD',
    reason,
    status,
    restock,
    variant = 'default',
    selected = false,
    onToggle,
    testID,
    onClick,
    onKeyDown,
    className,
    ...rest
  },
  ref
) {
  const selectable = variant === 'selectable';
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
      data-xen-refund-row=""
      data-testid={testID}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive ? `Refund ${name}, ${formatMoney(safeCents(amountCents), currency)}` : undefined
      }
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive
          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : '',
        className
      )}
      {...rest}
    >
      {selectable ? (
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          aria-label={`Refund ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            selected ? 'border-primary bg-primary' : 'border-border bg-transparent'
          )}
        >
          {selected ? (
            <span aria-hidden="true" className="text-xs font-bold text-on-primary">
              ✓
            </span>
          ) : null}
        </button>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-semibold text-on-surface">
          {quantity > 1 ? `${quantity}× ` : ''}
          {name}
        </span>
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          {reason ? <StatusPill meta={REFUND_REASON_META[reason]} variant="inline" size="sm" /> : null}
          {status ? <StatusPill meta={REFUND_STATUS_META[status]} variant="soft" size="sm" /> : null}
          {restock != null ? (
            <span className="text-xs text-muted">{restock ? '↩ Restock' : 'No restock'}</span>
          ) : null}
        </div>
      </div>

      <span className="text-sm font-bold tabular-nums text-danger">
        −{formatMoney(safeCents(amountCents), currency)}
      </span>
    </div>
  );
});
