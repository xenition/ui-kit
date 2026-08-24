import * as React from 'react';
import type { NFTCardProps } from './NFTCard';
/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV2Props = NFTCardProps;
/**
 * NFTCard, redesigned (v2): **full-bleed artwork with a scrim overlay**. The image
 * fills the whole tile; a bottom-up `neutral-900` → transparent gradient scrim
 * lets the collection, name, and floor sit over the art in near-white ramp ink
 * (readable in both themes), and the network chip floats top-right. The tile is
 * elevated (shadow) and lifts on hover. Floor is fixed-precision (no float
 * drift). Distinct at a glance from the base's media-over-meta stack. Same props;
 * handles `loading` and a missing image.
 */
export declare const NFTCardV2: React.ForwardRefExoticComponent<NFTCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NFTCardV2.d.ts.map