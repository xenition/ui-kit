import * as React from 'react';
import type { ShipmentCardProps } from './ShipmentCard';
/**
 * Drop-in for {@link ShipmentCardProps} — same props, the V4 "dispatch" design.
 * Reuses the base `variant` (`default` = full card, `compact` = dense row).
 */
export type ShipmentCardV4Props = ShipmentCardProps;
/**
 * ShipmentCard — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a shipment: an elevated rounded card with a
 * soft shadow, the tracking-number headline, a labelled glyph + word status
 * badge (never color alone), a soft-primary meta strip carrying the
 * `CarrierBadge` + piece count, an origin→destination lane, and an ETA line.
 * Clickable when `onClick` is set (keyboard-operable button). Honors the V4
 * `variant` — `full` (card, default) and `compact` (a dense single row) —
 * identical props/behavior to {@link ShipmentCardProps}. All colors from
 * `--xen-*` token classes (no literals).
 */
export declare const ShipmentCardV4: React.ForwardRefExoticComponent<ShipmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShipmentCardV4.d.ts.map