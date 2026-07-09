import * as React from 'react';
import { BookingSlot } from './types';
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
/**
 * Grid of bookable times for one day. Each slot is a real `<button>`; a full
 * slot (`spotsLeft === 0`) is disabled, and low remaining capacity surfaces a
 * "{n} left" hint. The selected slot is marked `aria-pressed`. Local times come
 * from the `formatTime` prop (default: timezone-aware). Token-only.
 */
export declare const SlotPicker: React.ForwardRefExoticComponent<SlotPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SlotPicker.d.ts.map