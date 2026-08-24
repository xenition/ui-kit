import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Availability of a single seat. */
export type SeatStatus = 'available' | 'occupied' | 'selected';
/** A seat in the cabin map. */
export interface Seat {
    /** Stable id, typically the seat label, e.g. `'12A'`. */
    id: string;
    /** Visible/announced label (defaults to `id`). */
    label?: string;
    /** Whether the seat can be booked. Occupied seats are never selectable. */
    occupied?: boolean;
}
export interface SeatPickerProps {
    /** Rows of seats; each inner array is one row across the aisle. */
    rows: readonly (readonly Seat[])[];
    /** Ids of the currently selected seats. */
    selectedIds?: readonly string[];
    /** Row-label letters/numbers shown on the left gutter (optional, per row). */
    rowLabels?: readonly string[];
    /** Fires with the pressed seat when an available seat is toggled. */
    onSelect?: (seat: Seat) => void;
    /** Max simultaneously selectable seats (informational; enforcement is caller-side). */
    maxSelectable?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A cabin seat map — a grid of pressable seats. Each seat announces its label
 * and status via `accessibilityLabel`/`accessibilityState` and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone.
 * Occupied seats are disabled and never fire `onSelect`. Selection is
 * controlled via `selectedIds`. Token-only colors.
 */
export declare function SeatPicker({ rows, selectedIds, rowLabels, onSelect, maxSelectable, style, }: SeatPickerProps): React.ReactElement;
//# sourceMappingURL=SeatPicker.d.ts.map