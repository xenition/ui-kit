/**
 * `@xenition/ui/media` — presentational gallery / lightbox components.
 *
 * Props mirror the media module: an album `{title}` and items
 * `{url,kind,caption,alt,width,height}`. Nothing fetches — the app passes
 * shaped data — and everything is styled via the `--xen-*` tokens. Images are
 * lazy-loaded and reserve their aspect ratio from `width`/`height`; the
 * `Lightbox` is a focus-trapped, keyboard-driven, reduced-motion-safe dialog.
 */
export { Gallery } from './Gallery';
export type { GalleryProps } from './Gallery';
export { Lightbox } from './Lightbox';
export type { LightboxProps } from './Lightbox';
export { MediaFigure } from './MediaFigure';
export type { MediaFigureProps } from './MediaFigure';
export type { MediaItem, MediaAlbum, MediaKind } from './types';
export { MediaFigureV4 } from './MediaFigureV4';
export type { MediaFigureV4Props } from './MediaFigureV4';
export { GalleryV4 } from './GalleryV4';
export type { GalleryV4Props } from './GalleryV4';
export { LightboxV4 } from './LightboxV4';
export type { LightboxV4Props } from './LightboxV4';
//# sourceMappingURL=index.d.ts.map