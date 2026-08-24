import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, type BadgeTone, type IconColor } from '../primitives';
import { DISC_TINT, formatDuration, formatMoney, type FieldSlot, type MoneyFormatter } from './internal/format';

/** Clock state — text + glyph + color (never color-alone). */
export type TimeLogStatus = 'running' | 'stopped' | 'approved' | 'rejected';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Semantic slot for the tinted disc + glyph. */
  slot: FieldSlot;
}

const TIME_LOG_STATUS: Record<TimeLogStatus, StatusDescriptor> = {
  running: { label: 'Running', glyph: '⏱', tone: 'primary', slot: 'primary' },
  stopped: { label: 'Logged', glyph: '■', tone: 'neutral', slot: 'muted' },
  approved: { label: 'Approved', glyph: '✓', tone: 'success', slot: 'success' },
  rejected: { label: 'Rejected', glyph: '✕', tone: 'danger', slot: 'danger' },
};

export interface TimeLogRowProps {
  /** Activity / task label (e.g. "On-site diagnostics"). */
  label: string;
  /** Elapsed time in whole minutes. */
  minutes: number;
  /** Clock / approval state — text + glyph + color. */
  status: TimeLogStatus;
  /** Localized clock-in–out window (e.g. "8:00–10:15 AM"). */
  window?: string;
  /** Marks the entry as billable, shown as a chip. */
  billable?: boolean;
  /** Billing rate in integer **cents per hour**; when set, shows the line total. */
  rateCentsPerHour?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires on row click (e.g. edit the entry). */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * One line in a time-log / timesheet: a tinted status glyph disc, a
 * label/window stack with an optional billable chip, and a right-aligned
 * duration + computed line total. Duration comes from whole minutes via
 * `formatDuration`; the total is `minutes/60 * rate` in integer cents through
 * `formatMoney` (guarded against a missing rate). Status is text + glyph + a
 * color that traces to a semantic token — never color alone. Becomes a
 * `role="button"` surface only when `onClick` is supplied. No literals.
 */
export const TimeLogRow = React.forwardRef<HTMLDivElement, TimeLogRowProps>(function TimeLogRow(
  {
    label,
    minutes,
    status,
    window,
    billable = false,
    rateCentsPerHour,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    style,
  },
  ref
) {
  const sd = TIME_LOG_STATUS[status] ?? TIME_LOG_STATUS.stopped;
  const iconColor: IconColor = sd.slot === 'muted' ? 'muted' : (sd.slot as IconColor);
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
  const totalCents =
    rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
      ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
      : undefined;
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      style={style}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `${label}, ${formatDuration(safeMinutes)}, ${sd.label}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive && 'cursor-pointer',
        className
      )}
    >
      <span className={cn('flex h-10 w-10 items-center justify-center rounded-full', DISC_TINT[sd.slot])}>
        <Icon glyph={sd.glyph} color={iconColor} aria-label={sd.label} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{label}</span>
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          {window != null ? <span className="text-xs text-muted">{window}</span> : null}
          <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge>
          {billable ? <Badge tone="primary">$ Billable</Badge> : null}
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-base font-bold text-on-surface">{formatDuration(safeMinutes)}</span>
        {totalCents != null ? (
          <span className="text-xs text-muted">{format(totalCents, currency)}</span>
        ) : null}
      </div>
    </div>
  );
});
