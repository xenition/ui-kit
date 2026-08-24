import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button, type BadgeTone } from '../primitives';

/** Urgency of a service reminder. */
export type ServiceUrgency = 'upcoming' | 'due' | 'overdue';
/** Presentation for a {@link ServiceReminder}. */
export type ServiceReminderVariant = 'card' | 'row';

/** Urgency → badge tone + accent-bar class + spelled-out word (never color alone). */
const URGENCY: Record<ServiceUrgency, { tone: BadgeTone; barClass: string; word: string }> = {
  upcoming: { tone: 'primary', barClass: 'bg-primary', word: 'Upcoming' },
  due: { tone: 'warn', barClass: 'bg-warn', word: 'Due now' },
  overdue: { tone: 'danger', barClass: 'bg-danger', word: 'Overdue' },
};

export interface ServiceReminderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Service name, e.g. `'Oil change'`. */
  service: string;
  /** Urgency level. */
  urgency?: ServiceUrgency;
  /** Icon glyph/emoji for the service (default 🔧). */
  glyph?: string;
  /** When it is due, pre-formatted (e.g. `'Sep 30'` / `'in 2 weeks'`). */
  dueLabel?: string;
  /** Mileage context, pre-formatted (e.g. `'Due at 60,000 mi'`). */
  mileageLabel?: string;
  /** Supporting detail line. */
  detail?: string;
  /** Presentation variant. */
  variant?: ServiceReminderVariant;
  /** Label for the primary action button; button hidden when omitted. */
  actionLabel?: string;
  /** Fires when the action button is pressed (e.g. book service). */
  onAction?: () => void;
  /** Fires when the dismiss/snooze control is pressed. */
  onDismiss?: () => void;
}

/**
 * A vehicle service reminder — the service name, an urgency level
 * (upcoming/due/overdue) shown as a text-labelled badge with a left accent bar
 * so meaning never rests on color, plus due-date and mileage context and an
 * optional action. An `overdue` reminder maps to the `danger` tone per contract.
 * Data + `onAction`/`onDismiss` callbacks only; nothing fetches. Colors come
 * from `--xen-*` token classes — no literal colors. `variant="row"` renders a
 * denser list line. Web parity of the native `ServiceReminder`.
 */
export const ServiceReminder = React.forwardRef<HTMLDivElement, ServiceReminderProps>(
  function ServiceReminder(
    {
      service,
      urgency = 'upcoming',
      glyph = '🔧',
      dueLabel,
      mileageLabel,
      detail,
      variant = 'card',
      actionLabel,
      onAction,
      onDismiss,
      className,
      ...rest
    },
    ref
  ) {
    const u = URGENCY[urgency] ?? URGENCY.upcoming;
    const row = variant === 'row';
    const a11y = `${service}, ${u.word}${dueLabel ? `, ${dueLabel}` : ''}${mileageLabel ? `, ${mileageLabel}` : ''}`;

    return (
      <div
        ref={ref}
        data-xen-service-reminder=""
        aria-label={a11y}
        className={cn(
          'flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          className
        )}
        {...rest}
      >
        {/* Left accent bar — reinforces urgency alongside the text badge. */}
        <span aria-hidden="true" className={cn('w-1 shrink-0', u.barClass)} />
        <div
          className={cn(
            'flex flex-1 flex-col',
            row ? 'gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]' : 'gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]'
          )}
        >
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <span
              aria-hidden="true"
              className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 text-base"
            >
              {glyph}
            </span>
            <div className="min-w-0 flex-1">
              <span className="block truncate text-base font-bold text-on-surface">{service}</span>
              <span className="block text-xs text-muted">
                {[dueLabel, mileageLabel].filter(Boolean).join(' · ')}
              </span>
            </div>
            <Badge tone={u.tone}>{u.word}</Badge>
          </div>

          {detail && !row ? <span className="text-sm text-muted">{detail}</span> : null}

          {onAction || onDismiss ? (
            <div className="flex gap-[var(--xen-space-sm)]">
              {onDismiss ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  aria-label={`Snooze ${service} reminder`}
                  className="flex-1"
                >
                  Snooze
                </Button>
              ) : null}
              {onAction && actionLabel ? (
                <Button
                  variant={urgency === 'overdue' ? 'danger' : 'primary'}
                  size="sm"
                  onClick={onAction}
                  aria-label={`${actionLabel} — ${service}`}
                  className={onDismiss ? 'flex-[2]' : 'flex-1'}
                >
                  {actionLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
