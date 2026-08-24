import * as React from 'react';
import type { AlbumCardProps } from './AlbumCard';
/** Same public contract as {@link AlbumCard} — a drop-in alternate design. */
export type AlbumCardV3Props = AlbumCardProps;
/**
 * AlbumCard, redesigned (v3): a **compact album row**. A small square cover
 * thumbnail, the title over a photo-count·date line, and a Private chip on the
 * trailing edge — hairline-bordered for an albums list. The opposite of v2's
 * cover hero. Same props, token-only.
 */
export declare const AlbumCardV3: React.ForwardRefExoticComponent<AlbumCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AlbumCardV3.d.ts.map