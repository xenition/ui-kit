import * as React from 'react';
import type { FlightCardProps } from './FlightCard';
/** Same public contract as {@link FlightCard} — a drop-in alternate design. */
export type FlightCardV3Props = FlightCardProps;
/**
 * FlightCard, redesigned (v3): a **dense fare line**. Times and codes read
 * `08:15 SFO → 13:55 JFK` on one row over an airline·duration·stops subtitle, with
 * the fare pinned right — hairline-bordered for a results list. The opposite of
 * v2's boarding card. Same props, token-only.
 */
export declare const FlightCardV3: React.ForwardRefExoticComponent<FlightCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FlightCardV3.d.ts.map