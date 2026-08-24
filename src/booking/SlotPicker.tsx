import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingSlot } from './types';
import { formatTimeInTz } from './datetime';

export interface SlotPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Bookable time slots for the chosen day. */
  slots: BookingSlot[];
  /** Called with the slot when a bookable time is picked. */
  onPick?: (slot: BookingSlot) => void;
  /** Currently selected slot (or its `startsAt` for matching). */
  selected?: BookingSlot | string | null;
  /** Render a slot's local time. Defaults to a timezone-aware `h:mm a`. */
  formatTime?: (iso: string) => string;
  /** IANA timezone used by the default `formatTime`. */
  timeZone?: string;
  /** Columns at the widest breakpoint (default 3). */
  columns?: 2 | 3 | 4;
  /** Show the remaining-spots hint only when `spotsLeft <= this` (default 3). */
  lowSpotsThreshold?: number;
  /** Label shown on a full (spotsLeft === 0) slot (default `Full`). */
  fullLabel?: string;
}

const COLUMN_CLASSES: Record<NonNullable<SlotPickerProps['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

const startOf = (s: SlotPickerProps['selected']): string | null =>
  s == null ? null : typeof s === 'string' ? s : s.startsAt;

/**
 * Grid of bookable times for one day. Each slot is a real `<button>`; a full
 * slot (`spotsLeft === 0`) is disabled, and low remaining capacity surfaces a
 * "{n} left" hint. The selected slot is marked `aria-pressed`. Local times come
 * from the `formatTime` prop (default: timezone-aware). Token-only.
 */
export const SlotPicker = React.forwardRef<HTMLDivElement, SlotPickerProps>(function SlotPicker(
  {
    slots,
    onPick,
    selected,
    formatTime,
    timeZone,
    columns = 3,
    lowSpotsThreshold = 3,
    fullLabel = 'Full',
    className,
    ...rest
  },
  ref
) {
  const format = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selectedStart = startOf(selected);

  return (
    <div
      ref={ref}
      role="group"
      data-xen-slot-picker=""
      className={cn('grid gap-[var(--xen-space-sm)]', COLUMN_CLASSES[columns], className)}
      {...rest}
    >
      {slots.map((slot) => {
        const full = slot.spotsLeft <= 0;
        const isSelected = selectedStart === slot.startsAt;
        const low = !full && slot.spotsLeft <= lowSpotsThreshold;
        return (
          <button
            key={slot.startsAt}
            type="button"
            data-xen-slot=""
            data-full={full ? 'true' : 'false'}
            aria-pressed={isSelected}
            disabled={full}
            onClick={() => onPick?.(slot)}
            className={cn(
              'flex flex-col items-center rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-sm)] text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isSelected
                ? 'border-primary bg-primary text-on-primary'
                : 'border-border bg-surface text-on-surface hover:border-primary hover:bg-primary-50'
            )}
          >
            <span className="font-medium tabular-nums">{format(slot.startsAt)}</span>
            <span
              data-xen-slot-spots=""
              className={cn('text-xs', isSelected ? 'text-on-primary' : 'text-muted')}
            >
              {full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`}
            </span>
          </button>
        );
      })}
    </div>
  );
});
