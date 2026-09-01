import * as React from 'react';
import type { MapCardProps } from './MapCard';
/** Drop-in for {@link MapCardProps} — same props, the V4 "journey" design. */
export type MapCardV4Props = MapCardProps;
/**
 * MapCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a location preview: a decorative accent→primary
 * "horizon" gradient ground stands in for the map tiles (the signature V4
 * touch), the pin sits inside a frosted glass tile with near-white ink, and the
 * label/caption ride a matching frosted card so the place name stays legible on
 * the saturated ground. It remains a STATIC, dependency-free placeholder — there
 * is intentionally no map library import, so it renders in any environment. Wire
 * a real map behind `onClick` when needed. Same props/behavior as
 * {@link MapCardProps}; all colors from `--xen-*` token classes (no literal
 * colors).
 */
export declare const MapCardV4: React.ForwardRefExoticComponent<MapCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MapCardV4.d.ts.map