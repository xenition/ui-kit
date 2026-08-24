import * as React from 'react';
import type { NFTCardProps } from './NFTCard';
/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV3Props = NFTCardProps;
/**
 * NFTCard, redesigned (v3): a **grid tile with a bottom info strip**. The artwork
 * runs flush to the top corners as a square; a flat filled strip (neutral ramp)
 * below it — separated by a hairline — carries the name and, on its own line, the
 * collection (or network chip) with a right-aligned floor (fixed precision — no
 * float drift). No overlay, no shadow: a clean gallery tile that tessellates in a
 * grid. Distinct at a glance from the base's outlined card and v2's full-bleed
 * scrim. Same props; handles `loading` and a missing image.
 */
export declare const NFTCardV3: React.ForwardRefExoticComponent<NFTCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NFTCardV3.d.ts.map