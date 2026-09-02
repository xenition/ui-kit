import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { BILLABLE_STATUS_META, billableCents, formatHours, formatMoney, activateOnKey } from './internal';
import type { BillableTimeRowProps } from './BillableTimeRow';

/** Drop-in for {@link BillableTimeRowProps} — same props, the V4 "chambers" design. */
export type BillableTimeRowV4Props = BillableTimeRowProps;

/**
 * BillableTimeRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a time entry: an elevated rounded row with a
 * soft shadow, a date + **tabular-nums** duration eyebrow, the narrative, the
 * timekeeper, a big legible **tabular-nums** amount (money carried as integer
 * cents through the shared `formatMoney`), and a labelled glyph + word billing
 * status (never color alone). When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. When `onClick` is set the row is a keyboard-activable
 * `role="button"`. Reuses the base `variant` (`default` / `compact`). All colors
 * from `--xen-*` token classes (no literals).
 */
export const BillableTimeRowV4 = React.forwardRef<HTMLDivElement, BillableTimeRowV4Props>(function BillableTimeRowV4(
  { date, description, hours, rateCents, amountCents, currency = 'USD', timekeeper, status = 'draft', variant = 'default', actionable = false, onLog, onClick, testID, className, ...rest },
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
      data-xen-billable-time-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Time entry ${date}, ${formatHours(hours)}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-md)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="text-xs font-bold tabular-nums text-muted">{date}</span>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-xs)] text-xs font-bold tabular-nums text-primary">{formatHours(hours)}</span>
          </div>
          <span className={cn('text-sm text-on-surface', compact ? 'truncate' : 'line-clamp-2')}>{description}</span>
          {!compact && timekeeper ? <span className="text-xs text-muted">{timekeeper}</span> : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-lg font-bold tabular-nums text-on-surface">{formatMoney(amount, currency)}</span>
          {status ? <StatusPill meta={BILLABLE_STATUS_META[status]} variant="soft" size="sm" /> : null}
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
});
