import * as React from 'react';
import { MediaItem } from './types';
export interface MediaFigureProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
    /** The media item to render. */
    item: MediaItem;
    /** Native image loading hint (default `lazy`). */
    loading?: 'lazy' | 'eager';
    /** Reserve the item's aspect ratio from `width`/`height` (default true). */
    reserveAspect?: boolean;
    /** Click handler on the media (e.g. open a lightbox). */
    onActivate?: () => void;
}
/**
 * A single media item with its caption — an image (or video) inside an
 * aspect-ratio box (from `width`/`height`, so no layout shift) and a
 * `<figcaption>`. Token-only. Lazy-loaded by default.
 */
export declare const MediaFigure: React.ForwardRefExoticComponent<MediaFigureProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MediaFigure.d.ts.map