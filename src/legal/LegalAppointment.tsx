import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  APPOINTMENT_STATUS_META,
  APPOINTMENT_TYPE_META,
  activateOnKey,
  toneSoftBgClass,
  type AppointmentStatus,
  type AppointmentType,
} from './internal';

export type LegalAppointmentVariant = 'default' | 'compact';

export interface LegalAppointmentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Appointment type — glyph + word chip. */
  type: AppointmentType;
  /** Pre-formatted date label (e.g. "Mon, Aug 24"). */
  date: string;
  /** Pre-formatted time / range label (e.g. "10:00–11:00 AM"). */
  time?: string;
  /** Location / room / video-link label. */
  location?: string;
  /** Client or counterparty name. */
  client?: string;
  /** Scheduling state — glyph + word pill, never color alone. */
  status?: AppointmentStatus;
  /** Density. */
  variant?: LegalAppointmentVariant;
  /** Whether to render the confirm/cancel action row (when scheduled). */
  actionable?: boolean;
  /** Click handler for the whole card. */
  onClick?: () => void;
  /** Confirm the appointment (renders "Confirm" when actionable + scheduled). */
  onConfirm?: () => void;
  /** Cancel the appointment. */
  onCancel?: () => void;
  testID?: string;
}

/**
 * A scheduled legal appointment — consultation, deposition, mediation, hearing —
 * with a leading date block, type + status pills (each glyph + word so state
 * never rests on color alone), and optional location / client. When `actionable`
 * and still `scheduled`, a confirm/cancel row of real `<button>`s is shown. When
 * `onClick` is set the card is an accessible `role="button"`. All colors are
 * `--xen-*` token classes — no literals.
 */
export const LegalAppointment = React.forwardRef<HTMLDivElement, LegalAppointmentProps>(
  function LegalAppointment(
    {
      type,
      date,
      time,
      location,
      client,
      status = 'scheduled',
      variant = 'default',
      actionable = false,
      onClick,
      onConfirm,
      onCancel,
      testID,
      className,
      ...rest
    },
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
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${typeMeta.label} on ${date}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          cancelled && 'opacity-60',
          interactive && 'cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            'flex min-w-[44px] items-center justify-center rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] py-[var(--xen-space-xs)]',
            toneSoftBgClass(typeMeta.tone)
          )}
        >
          <span aria-hidden="true" className="text-base leading-none">
            {typeMeta.glyph}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <span className="text-sm font-bold text-on-surface">{date}</span>
            {time ? <span className="text-xs text-muted">{time}</span> : null}
          </div>
          <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            <StatusPill meta={typeMeta} variant="inline" size="sm" />
            {status ? <StatusPill meta={APPOINTMENT_STATUS_META[status]} size="sm" /> : null}
          </div>
          {!compact && (location || client) ? (
            <span className="truncate text-xs text-muted">
              {[location, client].filter(Boolean).join(' · ')}
            </span>
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
  }
);
