import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Reservation lifecycle. */
export type ReservationStatus = 'requested' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
export interface TableReservationRowProps {
    /** Guest / booking name. */
    name: string;
    /** Party size (number of guests). */
    partySize: number;
    /** Date text (e.g. "Fri, Aug 29"). */
    dateText?: string;
    /** Time text (e.g. "7:30 PM"). */
    timeText?: string;
    /** Table label / number (e.g. "Table 12"). */
    tableLabel?: string;
    /** Reservation status; drives the status badge (default `requested`). */
    status?: ReservationStatus;
    /** Press handler for the whole row. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single table-reservation row — guest name, a party-size chip, date/time,
 * an optional table label, and a status `Badge`. The status is shown as a
 * labelled badge (text + tone), so it never depends on color alone. Optionally
 * pressable to open the booking. Reuses the `Badge` and `Icon` primitives.
 * Token-only.
 */
export declare function TableReservationRow({ name, partySize, dateText, timeText, tableLabel, status, onPress, style, }: TableReservationRowProps): React.ReactElement;
//# sourceMappingURL=TableReservationRow.d.ts.map