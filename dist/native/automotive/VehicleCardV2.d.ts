import * as React from 'react';
import type { VehicleCardProps } from './VehicleCard';
/**
 * Alternate design (v2) of {@link VehicleCard} — a drop-in with the **same
 * props**. Where the original leads with a text title, V2 pairs a large tinted
 * **vehicle glyph tile** with the identity block: make/model, a status chip, a
 * bold plate, then full-width spec chips. Elevated (shadow, no border). The
 * status carries a glyph + spelled-out word + a11y label, so meaning never rests
 * on color. Spec indexing is guarded. Token-pure: semantic slots + `withAlpha`.
 */
export type VehicleCardV2Props = VehicleCardProps;
export declare function VehicleCardV2({ name, plate, vehicleClass, color, year, status, specs, onPress, loading, style, }: VehicleCardV2Props): React.ReactElement;
//# sourceMappingURL=VehicleCardV2.d.ts.map