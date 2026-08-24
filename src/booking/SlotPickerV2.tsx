import * as React from 'react';
import { cn } from '../primitives/cn';
import { BookingSlot } from './types';
import { formatTimeInTz } from './datetime';
import type { SlotPickerProps } from './SlotPicker';

/** Same public contract as {@link SlotPicker} — a drop-in alternate design. */
export type SlotPickerV2Props = SlotPickerProps;

/**
 * SlotPicker, redesigned (v2): **big time tiles**. Each slot is a large rounded
 * button showing the time and a low-spots hint; a full slot is disabled with a
 * "Full" note, and the chosen tile fills primary. Bolder than v1. Same props,
 * token-only.
 */
export const SlotPickerV2 = React.forwardRef<HTMLDivElement, SlotPickerV2Props>(function SlotPickerV2(
  { slots, onPick, selected, formatTime, timeZone, columns = 3, lowSpotsThreshold = 3, fullLabel = 'Full', className, ...rest },
  ref
) {
  const fmt = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selKey = selected == null ? null : typeof selected === 'string' ? selected : selected.startsAt;
  const colClass = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-4' : 'grid-cols-3';

  return (
    <div ref={ref} data-xen-slot-picker="" role="group" aria-label="Available times" className={cn('grid gap-2', colClass, className)} {...rest}>
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
            className={cn('flex flex-col items-center justify-center rounded-lg border-2 py-3 text-sm font-semibold transition-colors', full ? 'border-border text-muted opacity-50' : selectedSlot ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10')}
          >
            <span>{fmt(slot.startsAt)}</span>
            {full ? <span className="text-[10px] font-normal">{fullLabel}</span> : low ? <span className={cn('text-[10px] font-normal', selectedSlot ? 'text-on-primary' : 'text-warn')}>{slot.spotsLeft} left</span> : null}
          </button>
        );
      })}
    </div>
  );
});
