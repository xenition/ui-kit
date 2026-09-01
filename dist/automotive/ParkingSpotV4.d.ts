import * as React from 'react';
import type { ParkingSpotProps, ParkingStatus } from './ParkingSpot';
export interface ParkingSpotV4Props extends ParkingSpotProps {
    /** Override the status words — four English phrases lived inside. */
    statusLabels?: Partial<Record<ParkingStatus, string>>;
    /** Build the hourly price. Default `'$4.50/hr'`. */
    formatRate?: (price: string) => string;
    /** Announced for an EV bay. Default `'EV charging'`. */
    evLabel?: string;
}
/**
 * **V4 parking spot** — the web twin of the native `ParkingSpotV4`, same props
 * as {@link ParkingSpot} plus `statusLabels`, `formatRate` and `evLabel`.
 *
 * ## Four changes
 *
 * 1. **The disc's glyph uses its *paired* ink** (`TONE_ON`). The base painted
 *    the disc `bg-[tone]` and its glyph `text-on-primary` regardless, and the
 *    compiler guarantees nothing about that pairing.
 * 2. **An unavailable spot is a `disabled` button**, not a live one. The base
 *    left `occupied` and `disabled` fully clickable.
 * 3. **Status is a word beside the colour.**
 * 4. **The rate is tabular** and the EV marker is announced.
 *
 * **Renders nothing without a `spotId`** (§4.5).
 */
export declare const ParkingSpotV4: React.ForwardRefExoticComponent<ParkingSpotV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ParkingSpotV4.d.ts.map