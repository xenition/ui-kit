import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  BILLABLE_STATUS_META,
  billableCents,
  formatHours,
  formatMoney,
  activateOnKey,
  type BillableStatus,
} from './internal';

export type BillableTimeRowVariant = 'default' | 'compact';

export interface BillableTimeRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Pre-formatted entry date (e.g. "Aug 24"). */
  date: string;
  /** Narrative / description of the work performed. */
  description: string;
  /** Time spent, in decimal hours (e.g. `1.5`). */
  hours: number;
  /** Hourly rate in integer **cents** (drives the computed amount). */
  rateCents?: number;
  /**
   * Amount in integer **cents**. When omitted it is computed from
   * `hours × rateCents`; either way it renders through `formatMoney` for a
   * stable 2-decimal string.
   */
  amountCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Timekeeper initials / name. */
  timekeeper?: string;
  /** Billing state — glyph + word pill, never color alone. */
  status?: BillableStatus;
  /** Density. */
  variant?: BillableTimeRowVariant;
  /** Render the "Log time" action (when draft / unbilled). */
  actionable?: boolean;
  /** Commit the time entry (renders "Log time" when actionable + unbilled). */
  onLog?: () => void;
  /** Click handler for the whole row (edit the entry). */
  onClick?: () => void;
  testID?: string;
}

/**
 * One billable time entry: date, narrative, duration, and the computed amount.
 * Money is carried as integer **cents** (computed from `hours × rateCents` when
 * `amountCents` is absent) and rendered through the shared `formatMoney` for a
 * stable 2-decimal string. Billing status is a glyph + word pill so it never
 * rests on color alone. When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. When `onClick` is set the row is an accessible
 * `role="button"`. All colors are `--xen-*` token classes — no literals.
 */
export const BillableTimeRow = React.forwardRef<HTMLDivElement, BillableTimeRowProps>(
  function BillableTimeRow(
    {
      date,
      description,
      hours,
      rateCents,
      amountCents,
      currency = 'USD',
      timekeeper,
      status = 'draft',
      variant = 'default',
      actionable = false,
      onLog,
      onClick,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const amount = amountCents ?? billableCents(hours, rateCents);
    const canLog = actionable && (status === 'draft' || status === 'unbilled');
    const interactive = Boolean(onClick);

    return (
      <div
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Time entry ${date}, ${formatHours(hours)}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-[var(--xen-space-sm)]">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-[var(--xen-space-xs)]">
              <span className="text-xs font-bold text-muted">{date}</span>
              <span className="text-xs font-bold text-primary">{formatHours(hours)}</span>
            </div>
            <span className={cn('text-sm text-on-surface', compact ? 'truncate' : 'line-clamp-2')}>
              {description}
            </span>
            {!compact && timekeeper ? (
              <span className="text-xs text-muted">{timekeeper}</span>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-base font-bold text-on-surface">
              {formatMoney(amount, currency)}
            </span>
            {status ? (
              <StatusPill meta={BILLABLE_STATUS_META[status]} variant="inline" size="sm" />
            ) : null}
          </div>
        </div>

        {canLog && onLog ? (
          <Button
            size="sm"
            variant="primary"
            className="self-start"
            onClick={(e) => {
              e.stopPropagation();
              onLog();
            }}
          >
            Log time
          </Button>
        ) : null}
      </div>
    );
  }
);
