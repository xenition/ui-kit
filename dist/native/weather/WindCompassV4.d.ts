import * as React from 'react';
import type { WindCompassProps } from './WindCompass';
/** Drop-in for {@link WindCompassProps} — same props, a different design. */
export type WindCompassV4Props = WindCompassProps;
/**
 * WindCompass — **elevated card** design (v4). A polished white card carrying a
 * bigger, cleaner dependency-free dial: a token-ringed compass with N/E/S/W tick
 * labels and a rotated arrow (`transform: rotate`) showing the bearing, the
 * sustained speed centred on a soft token-tinted hub, and an optional gust
 * caption. The cardinal direction is also written out as text, so orientation
 * never relies on the arrow alone. Every color/size traces to the compiled theme
 * via `useXenitionTheme()` — no literal colors, no SVG/native deps. Same props as
 * {@link WindCompassProps}.
 */
export declare function WindCompassV4({ direction, speed, gust, unit, size, style, }: WindCompassV4Props): React.ReactElement;
//# sourceMappingURL=WindCompassV4.d.ts.map