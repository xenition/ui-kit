import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WindCompassProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Wind direction + speed dial. A dependency-free `View` compass: a token-bordered
 * ring with N/E/S/W tick labels and a rotated arrow (`transform: rotate`) showing
 * the bearing, with the sustained speed centred and an optional gust caption. The
 * cardinal direction is also written out as text, so orientation never relies on
 * the arrow alone. All colors/sizes come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no SVG/native deps.
 */
export declare function WindCompass({ direction, speed, gust, unit, size, style, }: WindCompassProps): React.ReactElement;
//# sourceMappingURL=WindCompass.d.ts.map