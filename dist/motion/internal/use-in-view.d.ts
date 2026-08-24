import * as React from 'react';
export interface UseInViewOptions {
    /** IntersectionObserver threshold. */
    threshold?: number;
    /** Stop observing after the first intersection. */
    once?: boolean;
    /** Treat the element as immediately in view (reduced motion, SSR, tests). */
    disabled?: boolean;
}
/**
 * Tracks whether `ref`'s element intersects the viewport. SSR-safe and
 * IO-safe: when `IntersectionObserver` is unavailable (server, ancient
 * browsers) or `disabled` is set, it reports `true` immediately so content is
 * never hidden forever.
 */
export declare function useInView(ref: React.RefObject<Element | null>, { threshold, once, disabled }?: UseInViewOptions): boolean;
//# sourceMappingURL=use-in-view.d.ts.map