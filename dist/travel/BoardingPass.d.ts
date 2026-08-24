import * as React from 'react';
/** A labelled field shown in the boarding-pass detail grid. */
export interface BoardingField {
    label: string;
    value: string;
}
export interface BoardingPassProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Passenger full name. */
    passenger: string;
    /** Origin IATA code. */
    from: string;
    /** Destination IATA code. */
    to: string;
    /** Flight designator, e.g. `'XN 482'`. */
    flight: string;
    /** Boarding gate. */
    gate?: string;
    /** Seat assignment, e.g. `'12A'`. */
    seat?: string;
    /** Boarding zone/group. */
    zone?: string;
    /** Pre-formatted boarding time. */
    boardingTime?: string;
    /** Extra fields appended to the detail grid. */
    extraFields?: readonly BoardingField[];
    /** Barcode payload string, rendered as a token-styled placeholder (no scan lib). */
    barcode?: string;
}
/**
 * Web parity of the native `BoardingPass`: a boarding pass — passenger, the
 * from→to route, flight, and a grid of gate/seat/zone/boarding fields, capped by
 * a token-styled barcode placeholder (no barcode dependency; the `barcode`
 * string is shown beneath it). Token-only colors.
 */
export declare const BoardingPass: React.ForwardRefExoticComponent<BoardingPassProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BoardingPass.d.ts.map