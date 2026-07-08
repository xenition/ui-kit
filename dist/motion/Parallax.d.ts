import * as React from 'react';
export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Parallax intensity. Positive values scroll slower than the page,
     * negative values faster. Clamped to ±0.5 so content never detaches.
     */
    speed?: number;
}
/**
 * Subtle scroll parallax: translates its children on the Y axis via a
 * passive scroll listener + requestAnimationFrame. Disabled entirely under
 * `prefers-reduced-motion` and on the server.
 */
export declare const Parallax: React.ForwardRefExoticComponent<ParallaxProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Parallax.d.ts.map