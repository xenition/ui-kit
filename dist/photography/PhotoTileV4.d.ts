import * as React from 'react';
import type { PhotoTileProps } from './PhotoTile';
/** Drop-in for {@link PhotoTileProps} — same props, the V4 "studio" design. */
export type PhotoTileV4Props = PhotoTileProps;
/**
 * PhotoTile — **V4** "studio" design (web parity of the native V4). The matted,
 * image-forward take on a photo tile: an elevated card whose photo floats inside
 * a thin neutral **mat** ring, honoring all three `ratio` presets — `square`,
 * `portrait` (3/4), and `landscape` (4/3). `selected` and `favorite` are shown by
 * a glyph + token color (never color alone), the `caption` reads as a small
 * soft-primary chip, and `loading` draws a token-only skeleton. Identical
 * props/behavior to {@link PhotoTileProps}; `onClick` makes the whole tile a
 * keyboard-operable button. All colors from `--xen-*` token classes (no literals).
 */
export declare const PhotoTileV4: React.ForwardRefExoticComponent<PhotoTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PhotoTileV4.d.ts.map