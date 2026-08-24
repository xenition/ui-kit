import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CarouselPhoto {
    /** Remote image URI. */
    uri: string;
    /** Alt text announced to screen readers. */
    alt?: string;
}
export type PhotoCarouselRatio = 'portrait' | 'square' | 'landscape';
export interface PhotoCarouselProps {
    /** Ordered photos. */
    photos?: CarouselPhoto[];
    /** Controlled active index. */
    index?: number;
    /** Fires when the active photo changes. */
    onIndexChange?: (index: number) => void;
    /** Aspect ratio of the frame. Defaults to `portrait`. */
    ratio?: PhotoCarouselRatio;
    /** Rounded corners. Defaults to true. */
    rounded?: boolean;
    /** Loading skeleton. */
    loading?: boolean;
    /** Empty-state copy when there are no photos. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Swipeable photo pager for a profile — the native photo carousel. Tapping the
 * left/right half of the frame steps between photos (mobile-friendly, no gesture
 * library) with a segmented progress bar and dot indicators on top. Supports
 * controlled (`index`/`onIndexChange`) and uncontrolled use, plus explicit
 * empty and loading states. All colors/overlays derive from theme tokens via
 * `withAlpha` — no literal colors. Array access is guarded.
 */
export declare function PhotoCarousel({ photos, index, onIndexChange, ratio, rounded, loading, emptyLabel, style, }: PhotoCarouselProps): React.ReactElement;
//# sourceMappingURL=PhotoCarousel.d.ts.map