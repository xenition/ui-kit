import * as React from 'react';
import type { ShipmentCardProps } from './ShipmentCard';
/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV2Props = ShipmentCardProps;
/**
 * ShipmentCard, alternate design **V2** — an *elevated hero card*. Where the
 * classic card is a flat outlined summary, V2 floats on a soft shadow, leads
 * with a carrier badge + a bold status pill on one header line, then dedicates a
 * full-width tinted "route strip" to origin → destination with the tone-glyph as
 * the arrow, and closes with a prominent ETA footer. It fades/rises in on mount
 * and springs on press. Status is glyph + word (tone only reinforces). Loading
 * and every prop behave exactly as the classic. No literal colors.
 */
export declare function ShipmentCardV2({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant, loading, onPress, testID, style, }: ShipmentCardV2Props): React.ReactElement;
//# sourceMappingURL=ShipmentCardV2.d.ts.map