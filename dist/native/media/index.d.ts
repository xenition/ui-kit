/**
 * `@xenition/ui/native/media` — presentational gallery / lightbox components for
 * React Native, mirroring the web `@xenition/ui/media` prop contracts exactly.
 * An album `{title}` and items `{url,kind,caption,alt,width,height}`. Nothing
 * fetches — the app passes shaped data — and everything is styled via compiled
 * theme tokens (`useXenitionTheme()`). `Gallery` is `FlatList`-backed (windowing
 * gives the web's lazy loading); `Lightbox` is a reduced-motion-safe RN `Modal`
 * with `PanResponder` swipe (RN core — no extra gesture dependency). Event
 * idioms are native (`onOpen`/`onActivate`/`onClose`/`onPrev`/`onNext`).
 */
export { Gallery } from './Gallery';
export type { GalleryProps } from './Gallery';
export { Lightbox } from './Lightbox';
export type { LightboxProps } from './Lightbox';
export { MediaFigure } from './MediaFigure';
export type { MediaFigureProps } from './MediaFigure';
export type { MediaItem, MediaAlbum, MediaKind } from '../../media/types';
export { MediaFigureV4 } from './MediaFigureV4';
export type { MediaFigureV4Props } from './MediaFigureV4';
export { GalleryV4 } from './GalleryV4';
export type { GalleryV4Props } from './GalleryV4';
export { LightboxV4 } from './LightboxV4';
export type { LightboxV4Props } from './LightboxV4';
//# sourceMappingURL=index.d.ts.map