import * as React from 'react';
import type { RadarCardProps } from './RadarCard';
export type RadarCardV4Props = RadarCardProps;
/**
 * RadarCard — **sky scope** design (v4), web parity of the native `RadarCardV4`.
 * A dependency-free radar placeholder that actually looks like a scope: a gradient
 * sky canvas with concentric range rings, a crosshair, a rotated sweep beam, a
 * couple of translucent "precip" returns and a pinging center marker — all built
 * from `div`s (no maps SDK, no SVG, no image). A header carries the title and a
 * live pill. Pass `onClick` to open a full view. All colors flow through Tailwind
 * token classes; only geometry is inline. Same props as {@link RadarCardProps}.
 */
export declare const RadarCardV4: React.ForwardRefExoticComponent<RadarCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RadarCardV4.d.ts.map