import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';

/** Lifecycle of a pledge. */
export type PledgeStatus = 'pending' | 'fulfilled' | 'overdue' | 'declined';

export interface PledgeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Donor name. */
  donorName: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Pledged amount, integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Pledge status (default `pending`). */
  status?: PledgeStatus;
  /** Pre-formatted due-date label (e.g. `Due Sep 1`). */
  dueLabel?: string;
  /** Fires when a pending/overdue pledge is marked fulfilled. */
  onFulfill?: () => void;
  /** Fires when the row is clicked (e.g. to open detail; mirrors native `onPress`). */
  onClick?: () => void;
  /** Block the fulfill action (web `Button` has no `loading`, so it is disabled). */
  loading?: boolean;
}

const STATUS: Record<PledgeStatus, { tone: BadgeTone; label: string }> = {
  pending: { tone: 'warn', label: 'Pending' },
  fulfilled: { tone: 'success', label: 'Fulfilled' },
  overdue: { tone: 'danger', label: 'Overdue' },
  declined: { tone: 'neutral', label: 'Declined' },
};

/**
 * Web parity of the native `PledgeRow`: a single pledge in a campaign ledger —
 * donor avatar + name, the pledged amount (integer cents → `formatMoney`), a
 * status badge, and — for still-open pledges — a "Mark fulfilled" action button.
 * Status is carried by both the badge text and the row `aria-label`, never color
 * alone. When `onClick` is set the row is a `role="button"` target with keyboard
 * activation; the fulfill button stops propagation so it does not also open the
 * row. All colors come from the `--xen-*` token classes — no literal colors.
 */
export const PledgeRow = React.forwardRef<HTMLDivElement, PledgeRowProps>(function PledgeRow(
  {
    donorName,
    avatarUrl,
    amountCents,
    currency = 'USD',
    status = 'pending',
    dueLabel,
    onFulfill,
    onClick,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const meta = STATUS[status];
  const open = status === 'pending' || status === 'overdue';
  const label = `${donorName}, ${formatMoney(amountCents, currency)} pledge, ${meta.label}`;

  const inner = (
    <>
      <Avatar name={donorName} src={avatarUrl} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-sm">
          <span className="text-base font-semibold text-on-surface">{donorName}</span>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
        {dueLabel ? <span className="text-sm text-muted">{dueLabel}</span> : null}
      </div>
      <div className="flex flex-col items-end gap-xs">
        <span className="text-base font-bold text-on-surface">{formatMoney(amountCents, currency)}</span>
        {open && onFulfill ? (
          <Button
            size="sm"
            variant="secondary"
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              onFulfill();
            }}
          >
            Mark fulfilled
          </Button>
        ) : null}
      </div>
    </>
  );

  const rowClass = 'flex items-center gap-md rounded-md bg-surface px-md py-sm';

  if (onClick) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          rowClass,
          'cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={ref} aria-label={label} className={cn(rowClass, className)} {...rest}>
      {inner}
    </div>
  );
});
