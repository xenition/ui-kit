import * as React from 'react';
import type { AlbumCardProps } from './AlbumCard';
/** Drop-in for {@link AlbumCardProps} — same props, the V4 "studio" design. */
export type AlbumCardV4Props = AlbumCardProps;
/**
 * AlbumCard — **V4** "studio" design (web parity of the native V4). The matted,
 * image-forward take on an album tile: an elevated card whose cover photo floats
 * inside a thin neutral **mat**, a bold title, and the photo-count as a small
 * soft-primary chip with the date trailing. Honors all three `variant` layouts —
 * `cover` (matted photo on top), `list` (horizontal matted thumbnail), and
 * `compact` (dense) — identical props/behavior to {@link AlbumCardProps}. A
 * private album carries a labelled `Badge` (never color alone). All colors from
 * `--xen-*` token classes (no literals); `loading` shows a token-only skeleton;
 * `onClick` makes the whole card a keyboard-operable button.
 */
export declare const AlbumCardV4: React.ForwardRefExoticComponent<AlbumCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AlbumCardV4.d.ts.map