import * as React from 'react';
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Slides to render; falls back to `children` when omitted. */
    items?: React.ReactNode[];
    /** Show the prev/next arrow controls. */
    arrows?: boolean;
    /** Show the dot pager. */
    dots?: boolean;
    /** Auto-advance interval in ms (0 disables). Paused on hover/focus and under reduced motion. */
    autoplay?: number;
    /** Accessible label for the carousel region. */
    label?: string;
}
/**
 * Horizontal, scroll-snapping slider for cards, images, or testimonials.
 * Native swipe/scroll drives the active dot; arrows and dots page through it,
 * ArrowLeft/ArrowRight move focus-driven navigation, and optional autoplay
 * honors hover/focus pauses and `prefers-reduced-motion`.
 */
export declare const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Carousel.d.ts.map