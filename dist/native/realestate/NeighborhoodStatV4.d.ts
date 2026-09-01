import * as React from 'react';
import type { NeighborhoodStatProps } from './NeighborhoodStat';
/** Drop-in for {@link NeighborhoodStatProps} — same props, the V4 "listing" design. */
export type NeighborhoodStatV4Props = NeighborhoodStatProps;
/**
 * NeighborhoodStat — **V4** "listing" design. The editorial take on a single
 * neighborhood metric: an optional glyph in a soft-primary disc, a **big value
 * numeral** with its label, and an above/below-average trend indicator (arrow +
 * delta, tinted `success` up / `danger` down / `muted` flat). Same
 * props/behavior as {@link NeighborhoodStatProps} — the value/label/suffix/
 * caption and the delta tone/arrow logic are preserved. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function NeighborhoodStatV4({ label, value, delta, trend, suffix, glyph, caption, style, }: NeighborhoodStatV4Props): React.ReactElement;
//# sourceMappingURL=NeighborhoodStatV4.d.ts.map