import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  TONE_SOFT_BG,
  REFUND_STATUS_META,
  REFUND_REASON_META,
  type RefundStatus,
  type RefundReason,
} from './internal';
import type { RefundRowProps } from './RefundRow';

/** Re-exported so consumers of the V4 line can type refund reasons/status. */
export type { RefundReason, RefundStatus };

/** Drop-in for {@link RefundRowProps} — same props, the V4 "register" design. */
export type RefundRowV4Props = RefundRowProps;

/**
 * RefundRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a return line: a return glyph in a soft-tint disc, the
 * item + quantity, the reason and refund status as **glyph + word** chips (never
 * color alone), an optional restock flag, and the **refunded amount big and bold**
 * in `tabular-nums` inside a danger-tinted pill. In `selectable` mode a large
 * (≥44px) token-styled checkbox `<button>` (reflected in `aria-checked`) lets a
 * clerk pick lines to refund; when `onClick` is set the row is a keyboard-operable
 * `role="button"`. Same props/behavior as {@link RefundRowProps}; all colors from
 * `--xen-*` token classes (no literals). Dark-mode safe.
 */
export const RefundRowV4 = React.forwardRef<HTMLDivElement, RefundRowV4Props>(function RefundRowV4(
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
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive
          ? 'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
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
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            selected ? 'border-primary bg-primary' : 'border-border bg-transparent'
          )}
        >
          {selected ? (
            <span aria-hidden="true" className="text-base font-bold text-on-primary">
              ✓
            </span>
          ) : null}
        </button>
      ) : (
        <span
          aria-hidden="true"
          className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base text-danger', TONE_SOFT_BG.danger)}
        >
          ↩
        </span>
      )}

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

      <span className={cn('rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-0.5 text-base font-extrabold tabular-nums text-danger', TONE_SOFT_BG.danger)}>
        −{formatMoney(safeCents(amountCents), currency)}
      </span>
    </div>
  );
});
