import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { APPOINTMENT_STATUS_META, APPOINTMENT_TYPE_META, activateOnKey } from './internal';
import type { LegalAppointmentProps } from './LegalAppointment';

/** Same public contract as {@link LegalAppointment} — a drop-in alternate design. */
export type LegalAppointmentV3Props = LegalAppointmentProps;

/**
 * LegalAppointment, redesigned (v3): a **dense schedule line**. The type glyph, the
 * client + date·time over a location subtitle, an inline status word, and a compact
 * Confirm — hairline-bordered for a list. The opposite of v2's card. Same props,
 * token-only.
 */
export const LegalAppointmentV3 = React.forwardRef<HTMLDivElement, LegalAppointmentV3Props>(
  function LegalAppointmentV3({ type, date, time, location, client, status = 'scheduled', variant, actionable = false, onClick, onConfirm, onCancel, testID, className, ...rest }, ref) {
    void variant;
    void onCancel;
    const interactive = typeof onClick === 'function';
    const showConfirm = actionable && status === 'scheduled' && typeof onConfirm === 'function';
    const t = APPOINTMENT_TYPE_META[type];

    return (
      <div
        ref={ref}
        data-xen-legal-appointment=""
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${t.label} appointment`}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? activateOnKey(() => onClick?.()) : undefined}
        className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
        {...rest}
      >
        <span aria-hidden>{t.glyph}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">
            {client ?? t.label} · <span className="font-normal text-muted">{date}{time ? ` ${time}` : ''}</span>
          </p>
          {location ? <p className="truncate text-xs text-muted">{location}</p> : null}
        </div>
        <StatusPill meta={APPOINTMENT_STATUS_META[status]} variant="inline" size="sm" />
        {showConfirm ? <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onConfirm!(); }}>Confirm</Button> : null}
      </div>
    );
  }
);
