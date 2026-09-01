import * as React from 'react';
import type { FlightCardProps } from './FlightCard';
/** Drop-in for {@link FlightCardProps} — same props, the V4 "journey" design. */
export type FlightCardV4Props = FlightCardProps;
/**
 * FlightCard — **V4** "journey" design. The boarding-pass take on a bookable
 * flight: an elevated clean card, the origin→destination route drawn as a rail
 * with a small brand-gradient plane disc at its midpoint (the signature V4
 * touch), and the fare sitting below a dashed boarding-pass tear line. Same
 * props/behavior as {@link FlightCardProps}; token-only colors via
 * `useXenitionTheme()`. `loading` shows a placeholder recap; `variant="compact"`
 * tightens the padding.
 */
export declare function FlightCardV4({ airline, flightNumber, from, to, duration, stops, priceCents, currency, variant, onPress, loading, style, }: FlightCardV4Props): React.ReactElement;
//# sourceMappingURL=FlightCardV4.d.ts.map