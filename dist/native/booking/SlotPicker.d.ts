import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { BookingSlot } from '../../booking/types';
export interface SlotPickerProps {
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
    /** Columns of time chips (default 3). */
    columns?: 2 | 3 | 4;
    /** Show the remaining-spots hint only when `spotsLeft <= this` (default 3). */
    lowSpotsThreshold?: number;
    /** Label shown on a full (spotsLeft === 0) slot (default `Full`). */
    fullLabel?: string;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
    /** Passed through to the underlying FlatList (e.g. `scrollEnabled`). */
    scrollEnabled?: boolean;
}
/**
 * Grid of bookable times for one day — the native mirror of the web
 * `SlotPicker`. Same `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/
 * `columns`/`fullLabel` contract (`onPick` is the native idiom for the web
 * click). A `FlatList` of `Pressable` time chips: a full slot
 * (`spotsLeft === 0`) is disabled and shows the `fullLabel`, low remaining
 * capacity surfaces a "{n} left" hint, and the selected chip fills with the
 * primary token. Accessible: each chip is a `button` with
 * `accessibilityState={{ selected, disabled }}`. Token-only.
 */
export declare function SlotPicker({ slots, onPick, selected, formatTime, timeZone, columns, lowSpotsThreshold, fullLabel, style, scrollEnabled, }: SlotPickerProps): React.ReactElement;
//# sourceMappingURL=SlotPicker.d.ts.map