import * as React from 'react';
/** Reservation lifecycle. */
export type ReservationStatus = 'requested' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
export interface TableReservationRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Whole-row activation handler (native `onPress`). */
    onClick?: () => void;
}
/**
 * A single table-reservation row — guest name, a party-size chip, date/time,
 * an optional table label, and a status `Badge`. The status is shown as a
 * labelled badge (text + tone), so it never depends on color alone. Optionally
 * activatable to open the booking. Reuses the `Badge` and `Icon` primitives.
 * Web parity of the native `TableReservationRow`; token-only. When `onClick` is
 * set the root is a keyboard-operable `role="button"`.
 */
export declare const TableReservationRow: React.ForwardRefExoticComponent<TableReservationRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TableReservationRow.d.ts.map