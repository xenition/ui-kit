import * as React from 'react';
import type { AlbumCardProps } from './AlbumCard';
/** Drop-in alternate of {@link AlbumCardProps} — identical prop contract. */
export type AlbumCardV3Props = AlbumCardProps;
/**
 * AlbumCard — design variant **V3**: a **horizontal cover-left row**. A compact
 * square cover sits flush on the left with the title, count and date stacked in
 * a right column and a chevron affordance trailing when tappable — a tight list
 * row rather than a card, so it packs densely in a scrolling album list. Private
 * albums keep the labelled `Badge`. Same props as {@link AlbumCardProps};
 * token-only, guarded, with a loading skeleton.
 */
export declare function AlbumCardV3({ title, photoCount, dateText, coverUrl, isPrivate, loading, onPress, countLabel, style, }: AlbumCardV3Props): React.ReactElement;
//# sourceMappingURL=AlbumCardV3.d.ts.map