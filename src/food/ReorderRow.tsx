import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney as defaultFormat } from '../commerce';
import type { MoneyFormatter } from '../commerce';

export interface ReorderRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Restaurant or order title. */
  title: string;
  /** One-line items summary (e.g. "2× Pad Thai, 1× Spring rolls"). */
  itemsSummary?: string;
  /** When the order was placed (e.g. "Aug 12"). */
  dateText?: string;
  /** Order total in integer cents. */
  totalCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Thumbnail image URL. */
  imageUrl?: string;
  /** Reorder handler; renders the reorder button when provided. */
  onReorder?: () => void;
  /** Reorder button label (default `Reorder`). */
  reorderLabel?: string;
  /** Whole-row activation handler, e.g. open the past order (native `onPress`). */
  onClick?: () => void;
  /** Disable reordering (e.g. restaurant closed) and dim the row. */
  disabled?: boolean;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A past-order row with a one-tap reorder action — thumbnail, title, an items
 * summary, date and total, and a `Reorder` button. The whole row is optionally
 * activatable to open the order. `disabled` dims the row and blocks reordering.
 * Reuses the `Button` primitive and the shared money formatter. Web parity of
 * the native `ReorderRow`; token-only. When `onClick` is set the root is a
 * keyboard-operable `role="button"` so the nested reorder button still works.
 */
export const ReorderRow = React.forwardRef<HTMLDivElement, ReorderRowProps>(function ReorderRow(
  {
    title,
    itemsSummary,
    dateText,
    totalCents,
    currency = 'USD',
    imageUrl,
    onReorder,
    reorderLabel = 'Reorder',
    onClick,
    disabled = false,
    formatMoney = defaultFormat,
    className,
    ...rest
  },
  ref
) {
  const meta = [dateText, typeof totalCents === 'number' ? formatMoney(totalCents, currency) : undefined]
    .filter(Boolean)
    .join(' · ');

  const containerClass = cn(
    'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
    disabled && 'opacity-60',
    className
  );

  const inner = (
    <>
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
        {imageUrl ? (
          <img src={imageUrl} alt={title} loading="lazy" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate font-heading text-base font-semibold text-on-surface">{title}</p>
        {itemsSummary ? <p className="truncate text-sm text-muted">{itemsSummary}</p> : null}
        {meta ? <p className="text-xs text-muted">{meta}</p> : null}
      </div>
      {onReorder ? (
        <Button variant="secondary" size="sm" onClick={onReorder} disabled={disabled}>
          {reorderLabel}
        </Button>
      ) : null}
    </>
  );

  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      className={cn(
        containerClass,
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
      )}
      {...rest}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: disabled ? -1 : 0,
            'aria-label': `${title}${meta ? `, ${meta}` : ''}`,
            'aria-disabled': disabled || undefined,
            onClick,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
    >
      {inner}
    </div>
  );
});
