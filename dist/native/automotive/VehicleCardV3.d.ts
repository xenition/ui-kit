import * as React from 'react';
import type { VehicleCardProps } from './VehicleCard';
/**
 * Alternate design (v3) of {@link VehicleCard} — a drop-in with the **same
 * props**. The *dense line*: a small vehicle glyph, the make/model with an
 * inline plate, and a trailing status glyph + word. Built for fleet lists. The
 * status is a glyph + spelled-out word + a11y label, so meaning never rests on
 * color. Token-pure: semantic slots + `withAlpha` tints only.
 */
export type VehicleCardV3Props = VehicleCardProps;
export declare function VehicleCardV3({ name, plate, vehicleClass, color, year, status, onPress, loading, style, }: VehicleCardV3Props): React.ReactElement;
//# sourceMappingURL=VehicleCardV3.d.ts.map