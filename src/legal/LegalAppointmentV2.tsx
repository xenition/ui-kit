import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { APPOINTMENT_STATUS_META, APPOINTMENT_TYPE_META, activateOnKey } from './internal';
import type { LegalAppointmentProps } from './LegalAppointment';

/** Same public contract as {@link LegalAppointment} — a drop-in alternate design. */
export type LegalAppointmentV2Props = LegalAppointmentProps;

/**
 * LegalAppointment, redesigned (v2): an **elevated appointment card**. A tinted
 * date/time medallion leads the type pill, client and location; a status pill sits
 * on the header, and Confirm/Cancel anchor the card when actionable. Distinct from
 * v1. Same props, token-only.
 */
export const LegalAppointmentV2 = React.forwardRef<HTMLDivElement, LegalAppointmentV2Props>(
  function LegalAppointmentV2({ type, date, time, location, client, status = 'scheduled', variant, actionable = false, onClick, onConfirm, onCancel, testID, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const showActions = actionable && status === 'scheduled';

    return (
      <div
        ref={ref}
        data-xen-legal-appointment=""
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${APPOINTMENT_TYPE_META[type].label} appointment`}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? activateOnKey(() => onClick?.()) : undefined}
        className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...rest}
      >
        <div className="flex gap-3">
          <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 py-2 text-center">
            <span className="text-xs font-semibold text-primary">{date}</span>
            {time ? <span className="text-xs font-bold text-on-surface">{time}</span> : null}
          </div>
          <div className="min-w-0 flex-1">
            <StatusPill meta={APPOINTMENT_TYPE_META[type]} variant="soft" size="sm" />
            {client ? <p className="mt-1 truncate text-sm font-semibold text-on-surface">{client}</p> : null}
            {location ? <p className="truncate text-xs text-muted">📍 {location}</p> : null}
          </div>
          <StatusPill meta={APPOINTMENT_STATUS_META[status]} size="sm" />
        </div>
        {showActions && (onConfirm || onCancel) ? (
          <div className="flex gap-2">
            {onConfirm ? <Button size="md" variant="primary" className="flex-1" onClick={(e) => { e.stopPropagation(); onConfirm(); }}>Confirm</Button> : null}
            {onCancel ? <Button size="md" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); onCancel(); }}>Cancel</Button> : null}
          </div>
        ) : null}
      </div>
    );
  }
);
