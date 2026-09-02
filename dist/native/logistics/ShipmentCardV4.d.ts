import * as React from 'react';
import type { ShipmentCardProps } from './ShipmentCard';
/**
 * Drop-in for {@link ShipmentCardProps} — same props, the V4 "dispatch" design.
 * Reuses the base `variant` (`default` = full card, `compact` = dense row).
 */
export type ShipmentCardV4Props = ShipmentCardProps;
/**
 * ShipmentCard — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a shipment: an elevated rounded card with a
 * soft shadow, the tracking-number headline, a labelled glyph + word status
 * badge (never color alone), a soft-primary meta strip carrying the
 * `CarrierBadge` + piece count, an origin→destination lane, and an ETA line.
 * Tappable when `onPress` is set. Honors the base `variant` — `default` (card)
 * and `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
export declare function ShipmentCardV4({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant, loading, onPress, testID, style, }: ShipmentCardV4Props): React.ReactElement;
//# sourceMappingURL=ShipmentCardV4.d.ts.map