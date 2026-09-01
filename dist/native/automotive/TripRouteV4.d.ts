import * as React from 'react';
import type { TripRouteProps } from './TripRoute';
export interface TripRouteV4Props extends TripRouteProps {
    /** Glyphs on the two end markers. Defaults `'A'` / `'B'`. */
    originGlyph?: string;
    destinationGlyph?: string;
    /** Announced for the whole map. Default `'Route from A to B'`. */
    formatRouteLabel?: (origin: string, destination: string) => string;
}
/**
 * **V4 trip route** — same props as {@link TripRoute} plus `originGlyph`,
 * `destinationGlyph` and `formatRouteLabel`.
 *
 * ## Four changes
 *
 * 1. **The markers use their *paired* ink.** This is the defect that put
 *    `onPair()` in `tone-v4`: the base filled each marker `colors[tone]` and
 *    inked its glyph `colors.onPrimary` regardless, so a `success` origin
 *    marker was a green disc wearing the brand's ink and whether it was
 *    readable depended on the seed. Both sides are `string`, so no type could
 *    catch it.
 * 2. **The marker's size comes off the spacing scale.** `width: 24,
 *    height: 24, marginLeft: -12, marginTop: -12` was four literals that had
 *    to stay in sync and did not scale with the seed; the offset is now
 *    derived from the diameter.
 * 3. **The map has one accessible name** naming both endpoints, rather than
 *    being a decorative box with two unlabelled discs in it.
 * 4. **The ground is a mixed tint**, not a flat neutral, so it reads as a
 *    surface behind the route in both schemes.
 */
export declare function TripRouteV4({ origin, destination, waypoints, distance, duration, height, originGlyph, destinationGlyph, formatRouteLabel, onPress, style, }: TripRouteV4Props): React.ReactElement;
//# sourceMappingURL=TripRouteV4.d.ts.map