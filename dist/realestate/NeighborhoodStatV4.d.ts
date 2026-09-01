import * as React from 'react';
import type { NeighborhoodStatProps } from './NeighborhoodStat';
/** Drop-in for {@link NeighborhoodStatProps} — same props, the V4 "listing" design. */
export type NeighborhoodStatV4Props = NeighborhoodStatProps;
/**
 * NeighborhoodStat — **V4** "listing" design (web parity of the native V4). The
 * editorial take on a single neighborhood metric: an optional glyph in a
 * soft-primary disc, a **big value numeral** with its label, and an
 * above/below-average trend indicator (arrow + delta, tinted `success` up /
 * `danger` down / `muted` flat). Same props/behavior as
 * {@link NeighborhoodStatProps} — the value/label/suffix/caption and the delta
 * tone/arrow logic are preserved. All colors from `--xen-*` token classes (no
 * literals).
 */
export declare const NeighborhoodStatV4: React.ForwardRefExoticComponent<NeighborhoodStatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NeighborhoodStatV4.d.ts.map