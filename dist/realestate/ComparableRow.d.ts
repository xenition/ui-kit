import * as React from 'react';
/** Sale state of a comparable ("comp"). */
export type ComparableStatus = 'active' | 'pending' | 'sold';
export interface ComparableRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Comp address / headline. */
    address: string;
    /** Sale or list price in integer minor units (cents). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Interior area in square feet; drives the $/sqft figure. */
    sqft?: number;
    /** Bedroom count. */
    beds?: number;
    /** Bathroom count. */
    baths?: number;
    /** Distance label (e.g. "0.3 mi"). */
    distance?: string;
    /** Sale/list state chip. */
    status?: ComparableStatus;
}
/**
 * Web parity of the native `ComparableRow`: a comparable-sale ("comp") row for a
 * valuation table — address, price, the beds/baths/sqft facts, a derived $/sqft
 * figure, distance, and a status chip. The $/sqft is guarded against a missing or
 * zero `sqft`. Data + `onClick` only; nothing fetches. Reuses `Badge` and the
 * shared `formatMoney`; all colors come from the `--xen-*` tokens — no literal
 * colors. Pass `onClick` to make the row an activatable button.
 */
export declare const ComparableRow: React.ForwardRefExoticComponent<ComparableRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComparableRow.d.ts.map