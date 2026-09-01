import * as React from 'react';
import type { WindCompassProps } from './WindCompass';
export type WindCompassV4Props = WindCompassProps;
/**
 * V4 design-line wind compass — a polished elevated white card carrying a clean
 * dial. Same props, defaults and behaviour as the base `WindCompass`: a
 * token-bordered ring with N/E/S/W ticks and a rotated arrow (CSS transform)
 * showing the bearing, the sustained speed centred, and an optional gust
 * caption. The cardinal direction is ALSO written out as text, so orientation
 * never relies on the arrow alone. All colors flow through Tailwind token
 * classes.
 */
export declare const WindCompassV4: React.ForwardRefExoticComponent<WindCompassProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WindCompassV4.d.ts.map