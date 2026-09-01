import * as React from 'react';
import type { ParkingSpotProps, ParkingStatus } from './ParkingSpot';
export interface ParkingSpotV4Props extends ParkingSpotProps {
    /** Override the status words — four English phrases lived inside the component. */
    statusLabels?: Partial<Record<ParkingStatus, string>>;
    /** Build the hourly price. Default `'$4.50/hr'`. */
    formatRate?: (price: string) => string;
    /** Announced for an EV bay. Default `'EV charging'`. */
    evLabel?: string;
}
/**
 * **V4 parking spot** — same props as {@link ParkingSpot} plus `statusLabels`,
 * `formatRate` and `evLabel`.
 *
 * ## Four changes
 *
 * 1. **The disc's glyph uses its *paired* ink.** The base filled the disc
 *    `colors[tone]` and inked the glyph `onPrimary` regardless — the compiler
 *    guarantees `onSuccess` against `success` and nothing about `onPrimary`
 *    on it. `onPair()` is the fix.
 * 2. **An unavailable spot cannot be pressed**, and dims at M3's 0.38. The
 *    base left `occupied` and `disabled` fully pressable.
 * 3. **Status is a word beside the colour**, not colour and a glyph alone.
 * 4. **The rate is tabular** so a list of bays lines up, and the EV marker is
 *    announced rather than being a bare lightning glyph.
 *
 * **Renders nothing without a `spotId`** (§4.5).
 */
export declare function ParkingSpotV4({ spotId, level, status, priceCentsPerHour, currency, distanceLabel, evCharging, variant, statusLabels, formatRate, evLabel, onSelect, style, }: ParkingSpotV4Props): React.ReactElement | null;
//# sourceMappingURL=ParkingSpotV4.d.ts.map