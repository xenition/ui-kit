import * as React from 'react';
import type { AlbumCardProps } from './AlbumCard';
/** Drop-in for {@link AlbumCardProps} — same props, the V4 "studio" design. */
export type AlbumCardV4Props = AlbumCardProps;
/**
 * AlbumCard — **V4** "studio" design. The matted, image-forward take on an album
 * tile: an elevated card whose cover photo floats inside a thin neutral **mat**,
 * a bold title, and the photo-count as a small soft-primary chip with the date
 * trailing. Honors all three `variant` layouts — `cover` (matted photo on top),
 * `list` (horizontal matted thumbnail), and `compact` (dense) — identical
 * props/behavior to {@link AlbumCardProps}. A private album carries a labelled
 * `Badge` (never color alone). Token-only colors via `useXenitionTheme()`;
 * `loading` shows a token skeleton; `onPress` makes the whole card a button.
 */
export declare function AlbumCardV4({ title, photoCount, dateText, coverUrl, isPrivate, variant, loading, onPress, countLabel, style, }: AlbumCardV4Props): React.ReactElement;
//# sourceMappingURL=AlbumCardV4.d.ts.map