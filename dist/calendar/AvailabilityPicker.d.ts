import * as React from 'react';
import type { AvailabilitySlot } from './types';
export interface AvailabilityPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** The bookable slots to show. */
    slots?: AvailabilitySlot[];
    /** Selected slot start(s). A single `Date` or an array when `multiple`. */
    value?: Date | Date[] | null;
    /** Allow selecting more than one slot. */
    multiple?: boolean;
    /** Columns in the slot grid (default 3, clamped ≥ 1). */
    columns?: number;
    /** Fires with the tapped slot's start instant. */
    onSelect?: (start: Date, slot: AvailabilitySlot) => void;
    /** Renders skeleton tiles instead of content. */
    loading?: boolean;
    /** Message shown when there are no slots. */
    emptyLabel?: string;
}
/**
 * A tap-to-book availability grid — bookable time slots laid out in a wrapping
 * grid, with disabled (blocked) slots rendered but not selectable. Each slot is
 * a real `<button>`; selection is exposed via `aria-checked` and a filled tile
 * (never color-alone). Includes empty + loading states. Token colors only.
 */
export declare const AvailabilityPicker: React.ForwardRefExoticComponent<AvailabilityPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AvailabilityPicker.d.ts.map