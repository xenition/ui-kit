import * as React from 'react';
import type { CarrierBadgeProps } from './CarrierBadge';
/** Drop-in for {@link CarrierBadgeProps} — same props, the V4 "dispatch" design. */
export type CarrierBadgeV4Props = CarrierBadgeProps;
/**
 * CarrierBadge — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on the carrier identity chip: a rounded pill
 * with the carrier glyph tucked in its own tone-tinted well, the carrier name,
 * and an optional service level — so the carrier is never conveyed by color
 * alone. Keeps the base `variant` (`soft` / `solid` / `outline`) and `size`
 * (`sm` / `md`) props. Colors resolve from the carrier's tone token (or a
 * `withAlpha` tint of it); no literal colors.
 */
export declare function CarrierBadgeV4({ carrier, name, service, variant, size, style, }: CarrierBadgeV4Props): React.ReactElement;
//# sourceMappingURL=CarrierBadgeV4.d.ts.map