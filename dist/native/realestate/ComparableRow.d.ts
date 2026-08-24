import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Sale state of a comparable ("comp"). */
export type ComparableStatus = 'active' | 'pending' | 'sold';
export interface ComparableRowProps {
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
    /** Fires when the row is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A comparable-sale ("comp") row for a valuation table — address, price, the
 * beds/baths/sqft facts, a derived $/sqft figure, distance, and a status chip.
 * The $/sqft is guarded against a missing or zero `sqft`. Data + `onPress`
 * only; nothing fetches. Reuses `Badge` and the shared `formatMoney`; token-only
 * colors and an a11y summary.
 */
export declare function ComparableRow({ address, priceCents, currency, sqft, beds, baths, distance, status, onPress, style, }: ComparableRowProps): React.ReactElement;
//# sourceMappingURL=ComparableRow.d.ts.map