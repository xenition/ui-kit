import * as React from 'react';
import type { FlightCardProps } from './FlightCard';
/**
 * Drop-in alternate design for {@link FlightCard} — same props, different look.
 *
 * V2 is a **route timeline**: the two airport codes anchor either end as large
 * display type, and a horizontal connector rail runs between them with a plane
 * glyph riding the middle and end-node dots. Duration sits above the rail, the
 * stop count below it. Token-only colors; identical `FlightCardProps` so it is
 * interchangeable with the original.
 */
export type FlightCardV2Props = FlightCardProps;
export declare function FlightCardV2({ airline, flightNumber, from, to, duration, stops, priceCents, currency, variant, appearance, onPress, loading, style, }: FlightCardV2Props): React.ReactElement;
//# sourceMappingURL=FlightCardV2.d.ts.map