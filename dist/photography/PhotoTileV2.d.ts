import * as React from 'react';
import type { PhotoTileProps } from './PhotoTile';
/** Same public contract as {@link PhotoTile} — a drop-in alternate design. */
export type PhotoTileV2Props = PhotoTileProps;
/**
 * PhotoTile, redesigned (v2): a **framed polaroid**. The image sits inset in a
 * padded surface frame with a soft shadow and the caption printed on a strip
 * beneath — selected draws an accent ring on the frame, favourite shows a ★.
 * Distinct from v1's flush tile. Same props, token-only.
 */
export declare const PhotoTileV2: React.ForwardRefExoticComponent<PhotoTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PhotoTileV2.d.ts.map