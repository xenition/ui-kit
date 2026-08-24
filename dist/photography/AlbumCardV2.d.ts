import * as React from 'react';
import type { AlbumCardProps } from './AlbumCard';
/** Same public contract as {@link AlbumCard} — a drop-in alternate design. */
export type AlbumCardV2Props = AlbumCardProps;
/**
 * AlbumCard, redesigned (v2): a **full-bleed cover hero**. The cover fills the
 * card; a Private badge floats top-left and the title over a photo-count·date
 * line sits on a gradient scrim at the bottom. Elevated, hover-lift. Same props
 * as {@link AlbumCard}, token-only.
 */
export declare const AlbumCardV2: React.ForwardRefExoticComponent<AlbumCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AlbumCardV2.d.ts.map