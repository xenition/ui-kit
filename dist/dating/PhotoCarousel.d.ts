import * as React from 'react';
export interface CarouselPhoto {
    /** Remote image URL. */
    uri: string;
    /** Alt text announced to screen readers. */
    alt?: string;
}
export type PhotoCarouselRatio = 'portrait' | 'square' | 'landscape';
export interface PhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * Photo pager for a profile — the web parity of the native photo carousel.
 * Clicking the left/right half of the frame steps between photos (real
 * `<button>` tap zones) with a segmented progress bar on top. Supports controlled
 * (`index`/`onIndexChange`) and uncontrolled use, plus explicit empty and loading
 * states. Token classes only — array access is guarded.
 */
export declare const PhotoCarousel: React.ForwardRefExoticComponent<PhotoCarouselProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PhotoCarousel.d.ts.map