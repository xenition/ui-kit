import * as React from 'react';
import type { NFTCardProps } from './NFTCard';
/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV2Props = NFTCardProps;
/**
 * NFTCard, redesigned (v2): **full-bleed artwork** with a scrim overlay. The
 * image fills the whole tile; a stacked translucent veil at the foot (built from
 * `onSurface` at low alpha, so it stays token-pure and adapts to both themes)
 * lets the collection, name, and floor sit over the art in the paired `surface`
 * text color, and the network chip floats top-right. Floor is fixed-precision
 * (no float drift). Distinct at a glance from v1's media-over-meta stack. Same
 * props; handles `loading` and a missing image.
 */
export declare function NFTCardV2({ name, collection, image, floorAmount, floorSymbol, floorDecimals, network, loading, onPress, style, }: NFTCardV2Props): React.ReactElement;
//# sourceMappingURL=NFTCardV2.d.ts.map