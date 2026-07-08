import * as React from 'react';
export interface AnimatedCounterProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Final value. */
    to: number;
    /** Starting value. */
    from?: number;
    /** Count duration in ms. */
    duration?: number;
    /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
    format?: (value: number) => string;
    /** IntersectionObserver threshold. */
    threshold?: number;
}
/**
 * Counts up (or down) once scrolled into view, driven by
 * requestAnimationFrame. Under `prefers-reduced-motion` — or without
 * `IntersectionObserver` — the final value renders immediately.
 */
export declare const AnimatedCounter: React.ForwardRefExoticComponent<AnimatedCounterProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=AnimatedCounter.d.ts.map