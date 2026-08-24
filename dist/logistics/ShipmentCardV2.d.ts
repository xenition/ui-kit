import * as React from 'react';
import type { ShipmentCardProps } from './ShipmentCard';
/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV2Props = ShipmentCardProps;
/**
 * ShipmentCard, alternate design **V2** — an *elevated hero card*. Where the
 * classic is a flat outlined summary, V2 floats on a soft shadow, leads with a
 * carrier badge + a bold status pill on one header line, dedicates a full-width
 * tinted "route strip" to origin → destination with the tone-glyph as the arrow,
 * and closes with a prominent ETA footer. Status is glyph + word (tone only
 * reinforces). Loading and every prop behave exactly as the classic. No literal
 * colors.
 */
export declare const ShipmentCardV2: React.ForwardRefExoticComponent<ShipmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShipmentCardV2.d.ts.map