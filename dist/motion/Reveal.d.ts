import * as React from 'react';
export type RevealEffect = 'fade-up' | 'fade' | 'slide-left' | 'slide-right' | 'zoom' | 'blur-in';
export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Entrance effect. */
    effect?: RevealEffect;
    /** Transition delay in ms (added to any surrounding `Stagger` delay). */
    delay?: number;
    /** Transition duration in ms. */
    duration?: number;
    /** Animate only on the first intersection (default) or every time. */
    once?: boolean;
    /** IntersectionObserver threshold. */
    threshold?: number;
}
/**
 * Scroll-triggered entrance wrapper (no animation library — CSS transitions
 * plus one IntersectionObserver). Under `prefers-reduced-motion` — or when
 * `IntersectionObserver` is unavailable — children render instantly in their
 * final state.
 */
export declare const Reveal: React.ForwardRefExoticComponent<RevealProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Reveal.d.ts.map