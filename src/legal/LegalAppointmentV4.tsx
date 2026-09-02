import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { APPOINTMENT_STATUS_META, APPOINTMENT_TYPE_META, activateOnKey } from './internal';
import type { LegalAppointmentProps } from './LegalAppointment';

/** Drop-in for {@link LegalAppointmentProps} — same props, the V4 "chambers" design. */
export type LegalAppointmentV4Props = LegalAppointmentProps;

/**
 * LegalAppointment — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a scheduled appointment: an elevated rounded
 * card with a soft shadow, a leading soft-primary date-glyph block, the date +
 * time, type + status pills (each a glyph + word so state never rests on color
 * alone), and optional location / client. When `actionable` and still
 * `scheduled`, a confirm/cancel row of real `<button>`s is shown. When `onClick`
 * is set the card is a keyboard-activable `role="button"`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
export const LegalAppointmentV4 = React.forwardRef<HTMLDivElement, LegalAppointmentV4Props>(function LegalAppointmentV4(
  { type, date, time, location, client, status = 'scheduled', variant = 'default', actionable = false, onClick, onConfirm, onCancel, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const typeMeta = APPOINTMENT_TYPE_META[type];
  const showActions = actionable && status === 'scheduled';
  const cancelled = status === 'cancelled';
  const interactive = Boolean(onClick);

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-legal-appointment=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${typeMeta.label} on ${date}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-md)]',
        cancelled && 'opacity-60',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10">
        <span aria-hidden="true" className="text-lg leading-none">{typeMeta.glyph}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span className="text-sm font-bold text-on-surface">{date}</span>
          {time ? <span className="text-xs tabular-nums text-muted">{time}</span> : null}
        </div>
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          <StatusPill meta={typeMeta} variant="inline" size="sm" />
          {status ? <StatusPill meta={APPOINTMENT_STATUS_META[status]} variant="soft" size="sm" /> : null}
        </div>
        {!compact && (location || client) ? (
          <span className="truncate text-xs text-muted">{[location, client].filter(Boolean).join(' · ')}</span>
        ) : null}

        {showActions ? (
          <div className="mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-xs)]">
            {onConfirm ? (
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm();
                }}
              >
                Confirm
              </Button>
            ) : null}
            {onCancel ? (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel();
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});
