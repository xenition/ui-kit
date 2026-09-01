import * as React from 'react';
import type { RadarCardProps } from './RadarCard';
/** Drop-in for {@link RadarCardProps} — same props, a different design. */
export type RadarCardV4Props = RadarCardProps;
/**
 * RadarCard — **sky scope** design (v4). A dependency-free radar placeholder that
 * actually looks like a scope: a gradient sky canvas with concentric range rings,
 * a crosshair, a rotated sweep beam, a couple of translucent "precip" returns, and
 * a pinging center marker — all built from `View`s (no maps SDK, no SVG, no image).
 * A header carries the title and a "live" pill. Optional `onPress` opens a full
 * view. Gradient stops, rings and ink derive from the brand ramp; returns use the
 * `accent`/`warn` tokens — no literal colors. Same props as {@link RadarCardProps}.
 */
export declare function RadarCardV4({ title, caption, height, onPress, placeholderLabel, style, }: RadarCardV4Props): React.ReactElement;
//# sourceMappingURL=RadarCardV4.d.ts.map