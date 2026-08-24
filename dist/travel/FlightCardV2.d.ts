import * as React from 'react';
import type { FlightCardProps } from './FlightCard';
/** Same public contract as {@link FlightCard} — a drop-in alternate design. */
export type FlightCardV2Props = FlightCardProps;
/**
 * FlightCard, redesigned (v2): a **bold boarding-style card**. The airline heads
 * the card; a large FROM code/time — a duration/stops connector with a plane — TO
 * code/time forms the route, and the fare sits prominent beneath. Elevated.
 * Distinct from v1's row. Same props, token-only.
 */
export declare const FlightCardV2: React.ForwardRefExoticComponent<FlightCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlightCardV2.d.ts.map