import * as React from 'react';
import type { FlightCardProps } from './FlightCard';
/**
 * Drop-in alternate design for {@link FlightCard} — same props, different look.
 *
 * V3 is an **elevated boarding-pass**: a floating shadowed surface split into a
 * main panel (route + times) and a right stub (carrier / price) by a vertical
 * perforation of dots, echoing a tear-off ticket. Ignores `appearance` in favour
 * of its own committed treatment. Token-only colors; identical `FlightCardProps`.
 */
export type FlightCardV3Props = FlightCardProps;
export declare function FlightCardV3({ airline, flightNumber, from, to, duration, stops, priceCents, currency, variant, onPress, loading, style, }: FlightCardV3Props): React.ReactElement;
//# sourceMappingURL=FlightCardV3.d.ts.map