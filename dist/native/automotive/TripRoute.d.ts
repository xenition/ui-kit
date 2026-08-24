import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface TripRouteProps {
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
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A trip's origin→destination route rendered as a STATIC, dependency-free styled
 * placeholder — NOT a live map. It draws a token-tinted frame with faux grid
 * tiles, a dashed connecting line, and labelled A/B (plus numbered waypoint)
 * markers; there is intentionally no `react-native-maps`/`MapView` import, so it
 * renders in any environment. Endpoints are text-labelled, not color-coded
 * alone. Colors come from semantic tokens and `withAlpha` tints — no literal
 * colors. Wire a real map behind `onPress` when needed.
 */
export declare function TripRoute({ origin, destination, waypoints, distance, duration, height, onPress, style, }: TripRouteProps): React.ReactElement;
//# sourceMappingURL=TripRoute.d.ts.map