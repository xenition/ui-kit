import * as React from 'react';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';
export interface VehicleCardV4Props extends VehicleCardProps {
    /** Override the status words — four English phrases lived inside. */
    statusLabels?: Partial<Record<VehicleStatus, string>>;
}
/**
 * **V4 vehicle card** — same props as {@link VehicleCard} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The plate is monospaced-by-figures and boxed.** A registration is an
 *    identifier a user matches against a real car in a car park; the base set
 *    it as ordinary caption text among the other specs.
 * 2. **The spec list is a real definition list**, announced as label/value
 *    pairs rather than as a run of loose strings.
 * 3. **Press is a state layer**, not `opacity` on the card's content.
 * 4. **The skeleton is opaque** and the ground is `card`, so the tile reads as
 *    an object on a dark page instead of a bordered region.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function VehicleCardV4({ name, plate, vehicleClass, color, year, status, specs, variant, statusLabels, onPress, loading, style, }: VehicleCardV4Props): React.ReactElement | null;
//# sourceMappingURL=VehicleCardV4.d.ts.map