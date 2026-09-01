import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { AppointmentSlotProps, AppointmentSlotStatus } from './AppointmentSlot';

export interface AppointmentSlotV4Props extends AppointmentSlotProps {
  /**
   * Override the status words. Defaults `'Available'` / `'Selected'` /
   * `'On hold'` / `'Booked'` — four English words that lived inside the
   * component and only ever reached assistive tech.
   */
  statusLabels?: Partial<Record<AppointmentSlotStatus, string>>;
}

const STATUS_META: Record<AppointmentSlotStatus, { label: string; disabled: boolean }> = {
  available: { label: 'Available', disabled: false },
  selected: { label: 'Selected', disabled: false },
  held: { label: 'On hold', disabled: true },
  booked: { label: 'Booked', disabled: true },
};

/**
 * **V4 appointment slot** — the web twin of the native `AppointmentSlotV4`,
 * same props as {@link AppointmentSlot} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **It clears 44.** A slot grid is the densest target in a booking flow and
 *    the base sized it by its padding alone.
 * 2. **A booked or held slot is a `disabled` button**, not a live one that
 *    reports the click.
 * 3. **The time is tabular**, so a column of slots has an edge to scan.
 * 4. **Hover and press are the shared chrome layers.**
 *
 * **Renders nothing without a `time`** (§4.5).
 */
export const AppointmentSlotV4 = React.forwardRef<HTMLButtonElement, AppointmentSlotV4Props>(
  function AppointmentSlotV4(
    { time, status = 'available', meta, statusLabels, onClick, className, ...rest },
    ref
  ) {
    if (!time) return null;

    const info = STATUS_META[status];
    const word = statusLabels?.[status] ?? info.label;
    const selected = status === 'selected';
    const blocked = info.disabled;

    return (
      <button
        ref={ref}
        type="button"
        data-xen-appointment-slot={status}
        aria-pressed={selected}
        aria-label={[time, word, meta].filter(Boolean).join(', ')}
        disabled={blocked}
        onClick={onClick}
        data-xen-v4-chrome={selected ? 'filled-primary' : 'on-surface'}
        className={cn(
          'flex flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)] border px-md py-sm',
          MIN_TAP_CLASS,
          selected
            ? 'border-primary bg-primary text-on-primary'
            : 'border-border bg-card text-on-card',
          blocked && 'opacity-[0.38]',
          className
        )}
        {...rest}
      >
        <span className="text-sm font-semibold [font-variant-numeric:tabular-nums]">{time}</span>
        {meta ? (
          <span className={cn('text-xs', selected ? 'text-on-primary' : 'text-muted-text')}>
            {meta}
          </span>
        ) : null}
      </button>
    );
  }
);
