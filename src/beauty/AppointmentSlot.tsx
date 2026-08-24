import * as React from 'react';
import { cn } from '../primitives/cn';

export type AppointmentSlotStatus = 'available' | 'selected' | 'held' | 'booked';

interface StatusMeta {
  note?: string;
  disabled: boolean;
}

const STATUS_META: Record<AppointmentSlotStatus, StatusMeta> = {
  available: { disabled: false },
  selected: { note: 'Selected', disabled: false },
  held: { note: 'On hold', disabled: true },
  booked: { note: 'Booked', disabled: true },
};

export interface AppointmentSlotProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Display time, e.g. "9:30 AM". */
  time: string;
  /** Slot state; drives accent, fill, and interactivity. Default `available`. */
  status?: AppointmentSlotStatus;
  /** Optional secondary line (e.g. stylist name or "45 min"). */
  meta?: string;
  /** Fires when an interactive slot is activated. */
  onClick?: () => void;
}

/**
 * A single bookable time slot rendered as a real `<button>`. `status` carries
 * the meaning (never color alone): `selected` fills with the primary and sets
 * `aria-pressed`; `held`/`booked` are disabled + labelled; `available` is an
 * outlined tap target. The accessible name always includes the status word.
 * Token-only colors.
 */
export const AppointmentSlot = React.forwardRef<HTMLButtonElement, AppointmentSlotProps>(
  function AppointmentSlot(
    { time, status = 'available', meta, onClick, className, ...rest },
    ref
  ) {
    const info = STATUS_META[status] ?? STATUS_META.available;
    const isSelected = status === 'selected';
    const interactive = !info.disabled;

    return (
      <button
        ref={ref}
        type="button"
        data-xen-appointment-slot={status}
        aria-pressed={isSelected}
        aria-disabled={info.disabled || undefined}
        disabled={info.disabled}
        onClick={interactive ? onClick : undefined}
        className={cn(
          'flex min-w-[84px] flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          isSelected
            ? 'border-primary bg-primary text-on-primary'
            : info.disabled
              ? 'border-border bg-neutral-100 text-muted'
              : 'border-primary bg-surface text-on-surface hover:bg-primary-50',
          info.disabled && 'cursor-not-allowed',
          className
        )}
        {...rest}
      >
        <span className="text-sm font-bold">{time}</span>
        {info.note ? (
          <span
            className={cn(
              'text-xs font-semibold',
              isSelected ? 'text-on-primary' : status === 'held' ? 'text-warn' : 'text-muted'
            )}
          >
            {info.note}
          </span>
        ) : meta ? (
          <span
            className={cn('truncate text-xs', isSelected ? 'text-on-primary' : 'text-muted')}
          >
            {meta}
          </span>
        ) : null}
      </button>
    );
  }
);
