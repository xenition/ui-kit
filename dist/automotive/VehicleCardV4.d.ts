import * as React from 'react';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';
export interface VehicleCardV4Props extends VehicleCardProps {
    /** Override the status words — four English phrases lived inside. */
    statusLabels?: Partial<Record<VehicleStatus, string>>;
}
/**
 * **V4 vehicle card** — the web twin of the native `VehicleCardV4`, same props
 * as {@link VehicleCard} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The plate is boxed and tabular.** A registration is an identifier a
 *    user matches against a real car in a car park; the base set it as
 *    ordinary caption text among the other specs.
 * 2. **The spec list is a real `<dl>`**, announced as label/value pairs.
 * 3. **An interactive card is a `<button>`**, not a div with `role="button"`.
 * 4. **The skeleton is opaque** and the ground is `card`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const VehicleCardV4: React.ForwardRefExoticComponent<VehicleCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VehicleCardV4.d.ts.map