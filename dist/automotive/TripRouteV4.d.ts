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
 * **V4 trip route** — the web twin of the native `TripRouteV4`, same props as
 * {@link TripRoute} plus `originGlyph`, `destinationGlyph` and
 * `formatRouteLabel`.
 *
 * ## Three changes
 *
 * 1. **The markers use their *paired* ink** (`TONE_ON`). This is the defect
 *    that put the table in `tone-v4`: the base painted each marker `bg-[tone]`
 *    and its glyph `text-on-primary` regardless, so a `success` origin marker
 *    was a green disc wearing the brand's ink and whether it was readable
 *    depended on the seed.
 * 2. **The map has one accessible name** naming both endpoints, rather than
 *    being a decorative box with two unlabelled discs in it.
 * 3. **The ground is a mixed tint**, so it reads as a surface behind the route
 *    in both schemes instead of a flat neutral.
 */
export declare const TripRouteV4: React.ForwardRefExoticComponent<TripRouteV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TripRouteV4.d.ts.map