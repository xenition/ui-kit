import * as React from 'react';
import type { DestinationCardProps } from './DestinationCard';
/** Drop-in for {@link DestinationCardProps} — same props, the V4 "journey" design. */
export type DestinationCardV4Props = DestinationCardProps;
/**
 * DestinationCard — **V4** "journey" design. The boarding-pass take on a
 * destination tile: a decorative accent→primary "horizon" gradient cover carries
 * the destination name in near-white ink (the signature V4 touch), with the
 * "from" price sitting in a frosted glass tile overlaid on the gradient. The
 * overlaid glyph/emoji and optional badge ribbon are preserved, and the
 * country/tagline sit on the calm surface below. Same props/behavior as
 * {@link DestinationCardProps}; token-only colors via `useXenitionTheme()`.
 * `variant="wide"` fills the container width.
 */
export declare function DestinationCardV4({ name, country, tagline, glyph, fromCents, currency, badge, variant, onPress, style, }: DestinationCardV4Props): React.ReactElement;
//# sourceMappingURL=DestinationCardV4.d.ts.map