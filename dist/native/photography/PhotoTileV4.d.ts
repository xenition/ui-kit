import * as React from 'react';
import type { PhotoTileProps } from './PhotoTile';
/** Drop-in for {@link PhotoTileProps} — same props, the V4 "studio" design. */
export type PhotoTileV4Props = PhotoTileProps;
/**
 * PhotoTile — **V4** "studio" design. The matted, image-forward take on a photo
 * tile: an elevated card whose photo floats inside a thin neutral **mat** ring,
 * honoring all three `ratio` presets — `square`, `portrait` (3/4), and
 * `landscape` (4/3). `selected` and `favorite` are shown by a glyph + token
 * color (never color alone), the `caption` reads as a small soft-primary chip,
 * and `loading` draws a token skeleton. Identical props/behavior to
 * {@link PhotoTileProps}; `onPress` makes the whole tile a button. Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function PhotoTileV4({ url, alt, caption, ratio, selected, favorite, loading, onPress, style, }: PhotoTileV4Props): React.ReactElement;
//# sourceMappingURL=PhotoTileV4.d.ts.map