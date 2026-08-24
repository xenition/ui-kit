import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingSlot } from './types';
import { formatTimeInTz } from './datetime';
import type { SlotPickerProps } from './SlotPicker';

/** Same public contract as {@link SlotPicker} — a drop-in alternate design. */
export type SlotPickerV3Props = SlotPickerProps;

/**
 * SlotPicker, redesigned (v3): a **compact time-chip wrap**. Small rounded time
 * pills flow inline; a full slot dims, and the chosen pill fills primary — a dense
 * picker for tight layouts. The opposite of v2's big tiles. Same props,
 * token-only. (`columns` is accepted for parity.)
 */
export const SlotPickerV3 = React.forwardRef<HTMLDivElement, SlotPickerV3Props>(function SlotPickerV3(
  { slots, onPick, selected, formatTime, timeZone, columns, lowSpotsThreshold = 3, fullLabel = 'Full', className, ...rest },
  ref
) {
  void columns;
  const fmt = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selKey = selected == null ? null : typeof selected === 'string' ? selected : selected.startsAt;

  return (
    <div ref={ref} data-xen-slot-picker="" role="group" aria-label="Available times" className={cn('flex flex-wrap gap-1.5', className)} {...rest}>
      {slots.map((slot: BookingSlot) => {
        const full = slot.spotsLeft <= 0;
        const selectedSlot = selKey === slot.startsAt;
        const low = !full && slot.spotsLeft <= lowSpotsThreshold;
        return (
          <button
            key={slot.startsAt}
            type="button"
            aria-pressed={selectedSlot}
            aria-label={`${fmt(slot.startsAt)}${full ? `, ${fullLabel}` : low ? `, ${slot.spotsLeft} left` : ''}`}
            disabled={full}
            onClick={() => onPick?.(slot)}
            className={cn('rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors', full ? 'border-border text-muted opacity-50' : selectedSlot ? 'border-primary bg-primary text-on-primary' : 'border-border text-on-surface hover:bg-neutral-50')}
          >
            {fmt(slot.startsAt)}
            {low && !full ? <span className={cn('ml-1 text-[10px] font-normal', selectedSlot ? 'text-on-primary' : 'text-warn')}>· {slot.spotsLeft}</span> : null}
          </button>
        );
      })}
    </div>
  );
});
