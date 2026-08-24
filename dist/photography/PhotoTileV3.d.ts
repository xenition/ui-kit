import * as React from 'react';
import type { PhotoTileProps } from './PhotoTile';
/** Same public contract as {@link PhotoTile} — a drop-in alternate design. */
export type PhotoTileV3Props = PhotoTileProps;
/**
 * PhotoTile, redesigned (v3): a **full-bleed minimal tile**. The image fills a
 * borderless rounded frame that zooms slightly on hover; the caption fades in on
 * a bottom scrim only when present, and selected/favourite show a corner check /
 * ★. The opposite of v2's framed polaroid. Same props, token-only.
 */
export declare const PhotoTileV3: React.ForwardRefExoticComponent<PhotoTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PhotoTileV3.d.ts.map