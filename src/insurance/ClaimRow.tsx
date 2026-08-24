import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { claimStatus, type ClaimStatus } from './internal/status';
import { TONE_TINT } from './internal/tint';
import { pressableProps } from './internal/pressable';

export type { ClaimStatus };

export interface ClaimRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Claim reference / number (e.g. "CLM-20481"). */
  claimNumber: string;
  /** Short description of the claim (e.g. "Windshield replacement"). */
  title: string;
  /** Claim lifecycle status — conveyed by text + glyph + color. */
  status: ClaimStatus;
  /** Claimed / settled amount in integer **cents**. */
  amountCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Localized date string (already formatted by the caller). */
  date?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on row click (e.g. open claim detail / continue filing). */
  onClick?: () => void;
}

/**
 * One line in a claims list: a tinted status glyph disc, a title/number stack,
 * a status pill, and an optional right-aligned amount + date. The status is
 * conveyed redundantly (glyph + label + a color that traces to a semantic token
 * slot: approved → success, denied → danger) so it is never color-alone. Amount
 * is integer cents via `formatMoney`. Becomes a keyboard-operable button only
 * when `onClick` is supplied. Web parity of the native `ClaimRow`.
 */
export const ClaimRow = React.forwardRef<HTMLDivElement, ClaimRowProps>(function ClaimRow(
  {
    claimNumber,
    title,
    status,
    amountCents,
    currency = 'USD',
    date,
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const sd = claimStatus(status);
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Claim ${claimNumber}, ${title}, ${sd.label}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          TONE_TINT[sd.tone]
        )}
      >
        <Icon glyph={sd.glyph} aria-label={sd.label} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-on-surface">{title}</p>
        <div className="mt-0.5 flex items-center gap-[var(--xen-space-xs)]">
          <span className="text-xs text-muted">{claimNumber}</span>
          <Badge tone={sd.tone}>
            <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        {amountCents != null ? (
          <span className="text-base font-bold text-on-surface">
            {format(Math.max(0, Math.trunc(amountCents)), currency)}
          </span>
        ) : null}
        {date != null ? <span className="text-xs text-muted">{date}</span> : null}
      </div>
    </div>
  );
});
