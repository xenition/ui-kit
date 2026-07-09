import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MediaItem } from '../../media/types';
export interface MediaFigureProps {
    /** The media item to render. */
    item: MediaItem;
    /** Reserve the item's aspect ratio from `width`/`height` (default true). */
    reserveAspect?: boolean;
    /** Press handler on the media (e.g. open a lightbox). */
    onActivate?: () => void;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * A single media item with its caption — the native mirror of the web
 * `MediaFigure`. An `Image` inside an aspect-ratio box (from `width`/`height`,
 * via the RN `aspectRatio` style, so no layout jump) plus a caption. When
 * `onActivate` is provided the media is a `Pressable` `button`. Token-only.
 */
export declare function MediaFigure({ item, reserveAspect, onActivate, style, }: MediaFigureProps): React.ReactElement;
//# sourceMappingURL=MediaFigure.d.ts.map