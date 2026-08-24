import * as React from 'react';
import type { VehicleCardProps } from './VehicleCard';
/** Same public contract as {@link VehicleCard} — a drop-in alternate design. */
export type VehicleCardV3Props = VehicleCardProps;
/**
 * VehicleCard, redesigned (v3): a **dense fleet line**. A car glyph, the make/model
 * over a status·year·class·color subtitle with a status dot, and a plate chip on
 * the right — hairline-bordered for a fleet list. The opposite of v2's card.
 * Status is dot + word, never color alone. Same props, token-only.
 */
export declare const VehicleCardV3: React.ForwardRefExoticComponent<VehicleCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VehicleCardV3.d.ts.map