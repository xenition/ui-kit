import * as React from 'react';
export interface WindCompassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
    /** Wind bearing in degrees (0 = from North). Default `0`. */
    direction?: number;
    /** Sustained wind speed. */
    speed?: number;
    /** Peak gust speed. */
    gust?: number;
    /** Unit label for speed (e.g. `'mph'`, `'km/h'`). Default `'mph'`. */
    unit?: string;
    /** Diameter of the dial in px. Default `120`. */
    size?: number;
}
/**
 * Wind direction + speed dial (web parity of the native `WindCompass`). A
 * dependency-free `div` compass: a token-bordered ring with N/E/S/W tick labels
 * and a rotated arrow (CSS `transform: rotate`) showing the bearing, with the
 * sustained speed centred and an optional gust caption. The cardinal direction
 * is ALSO written out as text, so orientation never relies on the arrow alone.
 * All colors/sizes come from the `--xen-*` tokens via Tailwind classes — no
 * literal colors, no SVG deps.
 */
export declare const WindCompass: React.ForwardRefExoticComponent<WindCompassProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WindCompass.d.ts.map