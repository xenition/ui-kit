import * as React from 'react';
import type { AlbumCardProps } from './AlbumCard';
/** Drop-in alternate of {@link AlbumCardProps} — identical prop contract. */
export type AlbumCardV2Props = AlbumCardProps;
/**
 * AlbumCard — design variant **V2**: a **full-bleed cover** tile. The cover photo
 * fills the whole card and the title, photo-count and date sit over a bottom
 * gradient-style scrim, so the image is the card rather than a thumbnail beside
 * text. A private album still shows a labelled `Badge`, floated top-right over
 * the cover. Same props as {@link AlbumCardProps}; token-only scrim from the
 * neutral ramp, guarded, with a loading skeleton.
 */
export declare function AlbumCardV2({ title, photoCount, dateText, coverUrl, isPrivate, loading, onPress, countLabel, style, }: AlbumCardV2Props): React.ReactElement;
//# sourceMappingURL=AlbumCardV2.d.ts.map