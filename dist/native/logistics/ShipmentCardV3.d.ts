import * as React from 'react';
import type { ShipmentCardProps } from './ShipmentCard';
/** Drop-in for {@link ShipmentCard}: identical props, a distinct design. */
export type ShipmentCardV3Props = ShipmentCardProps;
/**
 * ShipmentCard, alternate design **V3** — a *dense list line*. Borderless and
 * single-row: a leading status-glyph chip, then a two-line stack (tracking
 * number + inline carrier glyph, then a muted `origin → destination · ETA`
 * meta line), with the status word right-aligned. Built to repeat tightly in a
 * shipments list — the inverse of V2's elevated card. Status stays glyph + word
 * (tone reinforces only). Same props; loading renders a slim skeleton line.
 */
export declare function ShipmentCardV3({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, loading, onPress, testID, style, }: ShipmentCardV3Props): React.ReactElement;
//# sourceMappingURL=ShipmentCardV3.d.ts.map