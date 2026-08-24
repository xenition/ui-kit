import * as React from 'react';
import { type StopStatus } from './internal';
export interface RouteStopProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** 1-based stop sequence number shown in the marker. */
    sequence: number;
    /** Address / place name (headline). */
    address: string;
    /** Recipient / customer or note sub-line. */
    recipient?: string;
    /** Stop status — glyph + word, never color alone. */
    status: StopStatus;
    /** Human ETA / window (e.g. `9:00–9:30 AM`). */
    eta?: string;
    /** Number of packages to drop at this stop. */
    packages?: number;
    /** Draws the connector line down to the next stop (false for the last). */
    connected?: boolean;
    /** Makes the stop clickable. */
    onClick?: () => void;
}
/**
 * One stop on a delivery route: a numbered sequence marker joined by a
 * connector rail, the address + recipient, an ETA/window and a package count.
 * The stop status is carried by a glyph + word chip (tone as reinforcement),
 * and the marker fills with the status tone once the stop is completed. All
 * colors are theme tokens. Web parity of the native `RouteStop`.
 */
export declare const RouteStop: React.ForwardRefExoticComponent<RouteStopProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RouteStop.d.ts.map