import * as React from 'react';
import type { CarrierBadgeProps } from './CarrierBadge';
/** Drop-in for {@link CarrierBadgeProps} — same props, the V4 "dispatch" design. */
export type CarrierBadgeV4Props = CarrierBadgeProps;
/**
 * CarrierBadge — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on the carrier identity chip: a rounded pill
 * with the carrier glyph tucked in its own tone-tinted well, the carrier name,
 * and an optional service level — so the carrier is never conveyed by color
 * alone. Keeps the base `variant` (`soft` / `solid` / `outline`) and `size`
 * (`sm` / `md`) props. Colors resolve from the carrier's tone token class; no
 * literal colors. Identical props/behavior to {@link CarrierBadgeProps}.
 */
export declare const CarrierBadgeV4: React.ForwardRefExoticComponent<CarrierBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=CarrierBadgeV4.d.ts.map