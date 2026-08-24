import * as React from 'react';
/** Availability state of a parking spot. */
export type ParkingStatus = 'available' | 'occupied' | 'reserved' | 'disabled';
/** Presentation for a {@link ParkingSpot}. */
export type ParkingSpotVariant = 'tile' | 'row';
export interface ParkingSpotProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Spot identifier, e.g. `'B-12'`. */
    spotId: string;
    /** Level / zone label, e.g. `'Level 2'`. */
    level?: string;
    /** Availability status. */
    status?: ParkingStatus;
    /** Price per hour in integer minor units (cents). */
    priceCentsPerHour?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Distance to the spot, pre-formatted (e.g. `'80 m'`). */
    distanceLabel?: string;
    /** Marks EV-charging capable. */
    evCharging?: boolean;
    /** Presentation variant. */
    variant?: ParkingSpotVariant;
    /** Fires when the spot is pressed (only for `available` spots). */
    onSelect?: () => void;
}
/**
 * A single parking spot — its id, level, availability status, hourly price, and
 * an optional EV-charging marker. The status carries a glyph plus a spelled-out
 * word and an a11y label, so meaning never rests on color; only `available`
 * spots are selectable and non-selectable spots expose a disabled a11y state.
 * Data + `onSelect` only; nothing fetches. Colors come from `--xen-*` token
 * classes — no literal colors. `variant="row"` renders a list line. Web parity
 * of the native `ParkingSpot`.
 */
export declare const ParkingSpot: React.ForwardRefExoticComponent<ParkingSpotProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ParkingSpot.d.ts.map