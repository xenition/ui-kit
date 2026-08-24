import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { AvailabilitySlot } from './types';
export interface AvailabilityPickerProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A tap-to-book availability grid — bookable time slots laid out in a wrapping
 * grid, with disabled (blocked) slots rendered but not selectable. Selection is
 * exposed via `accessibilityState.selected` and a filled tile (not color-alone).
 * Includes empty + loading states. Token colors only.
 */
export declare function AvailabilityPicker({ slots, value, multiple, columns, onSelect, loading, emptyLabel, style, }: AvailabilityPickerProps): React.ReactElement;
//# sourceMappingURL=AvailabilityPicker.d.ts.map