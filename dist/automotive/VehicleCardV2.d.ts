import * as React from 'react';
import type { VehicleCardProps } from './VehicleCard';
/** Same public contract as {@link VehicleCard} — a drop-in alternate design. */
export type VehicleCardV2Props = VehicleCardProps;
/**
 * VehicleCard, redesigned (v2): an **elevated vehicle card**. A big car glyph tile
 * leads the make/model and a year·class·color line, with a plate chip, a status
 * badge, and spec chips. Distinct from v1. Same props, token-only.
 */
export declare const VehicleCardV2: React.ForwardRefExoticComponent<VehicleCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VehicleCardV2.d.ts.map