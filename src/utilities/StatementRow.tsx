import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { billStatus, type BillStatus } from './internal/status';

export type { BillStatus };

export interface StatementRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Localized statement period (e.g. "March 2026"). */
  period: string;
  /** Statement total in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional bill lifecycle — renders a status `Badge` when supplied. */
  status?: BillStatus;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires when the download action is pressed; the icon button renders only then. */
  onDownload?: () => void;
  /** Fires on row click (e.g. open statement); becomes a button when supplied. */
  onClick?: () => void;
}

/**
 * One line in a statement history (web parity) — the clean V4 look: a
 * brand-gradient disc with a document glyph (the signature touch), the period
 * with an optional status pill carrying text + glyph + color, and the total in
 * integer cents via `formatMoney`. An optional download icon button renders only
 * when `onDownload` is supplied, and the whole row becomes a `role="button"`
 * when `onClick` is set. Token-only colors.
 */
export const StatementRow = React.forwardRef<HTMLDivElement, StatementRowProps>(function StatementRow(
  {
    period,
    amountCents,
    currency = 'USD',
    status,
    formatMoney: format = formatMoney,
    onDownload,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const sd = status != null ? billStatus(status) : null;
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `Statement ${period}, ${format(amount, currency)}${sd != null ? `, ${sd.label}` : ''}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      {...rest}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
        <Icon glyph="📄" color="onPrimary" size="lg" aria-label="Statement" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
        <span className="truncate text-base font-bold text-on-surface">{period}</span>
        {sd != null ? (
          <div className="flex">
            <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className="text-base font-bold text-on-surface">{format(amount, currency)}</span>
        {onDownload != null ? (
          <button
            type="button"
            aria-label="Download statement"
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⬇" color="onSurface" />
          </button>
        ) : null}
      </div>
    </div>
  );
});
