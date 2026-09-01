import * as React from 'react';
import type { DestinationCardProps } from './DestinationCard';
/** Drop-in for {@link DestinationCardProps} — same props, the V4 "journey" design. */
export type DestinationCardV4Props = DestinationCardProps;
/**
 * DestinationCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a destination tile: a decorative accent→primary
 * "horizon" gradient cover carries the destination name in near-white ink (the
 * signature V4 touch), with the "from" price sitting in a frosted glass tile
 * overlaid on the gradient. The overlaid glyph/emoji and optional badge ribbon
 * are preserved, and the country/tagline sit on the calm surface below. Same
 * props/behavior as {@link DestinationCardProps}; all colors from `--xen-*`
 * token classes (no literal colors). `variant="wide"` fills the container width.
 */
export declare const DestinationCardV4: React.ForwardRefExoticComponent<DestinationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DestinationCardV4.d.ts.map