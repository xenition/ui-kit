import * as React from 'react';
import type { FlightCardProps } from './FlightCard';
/** Drop-in for {@link FlightCardProps} — same props, the V4 "journey" design. */
export type FlightCardV4Props = FlightCardProps;
/**
 * FlightCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a bookable flight: an elevated clean card, the
 * origin→destination route drawn as a rail with a small brand-gradient plane
 * disc at its midpoint (the signature V4 touch), and the fare sitting below a
 * dashed boarding-pass tear line. Same props/behavior as {@link FlightCardProps};
 * all colors from `--xen-*` token classes (no literal colors). Pass `loading`
 * for a placeholder recap and `variant="compact"` for a denser row.
 */
export declare const FlightCardV4: React.ForwardRefExoticComponent<FlightCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlightCardV4.d.ts.map