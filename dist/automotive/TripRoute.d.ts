import * as React from 'react';
/** An endpoint plotted on the static route frame. */
export interface RoutePoint {
    /** Short label shown under the row (e.g. `'Pickup'`). */
    label: string;
    /** Address / place line. */
    address?: string;
    /**
     * Position as fractions of the frame, `0`–`1` (clamped). Defaults place the
     * pickup lower-left and drop-off upper-right.
     */
    at?: {
        x: number;
        y: number;
    };
}
export interface TripRouteProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Trip start endpoint. */
    origin: RoutePoint;
    /** Trip end endpoint. */
    destination: RoutePoint;
    /** Optional intermediate waypoints (stops), plotted in order. */
    waypoints?: RoutePoint[];
    /** Pre-formatted total distance (e.g. `'8.4 mi'`). */
    distance?: string;
    /** Pre-formatted ETA / duration (e.g. `'22 min'`). */
    duration?: string;
    /** Frame height in px (default 180). */
    height?: number;
    /** Fires when the frame is pressed (e.g. to open a real map elsewhere). */
    onClick?: () => void;
}
/**
 * A trip's origin→destination route rendered as a STATIC, dependency-free styled
 * `div` placeholder — NOT a live map. It draws a token-tinted frame with faux
 * grid tiles, a dashed connecting line, and labelled A/B (plus numbered
 * waypoint) markers; there is intentionally no map library, so it renders in any
 * environment. Endpoints are text-labelled, not color-coded alone. Colors come
 * from `--xen-*` token classes — no literal colors. Wire a real map behind
 * `onClick` when needed. Web parity of the native `TripRoute`.
 */
export declare const TripRoute: React.ForwardRefExoticComponent<TripRouteProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TripRoute.d.ts.map