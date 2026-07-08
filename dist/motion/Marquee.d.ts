import * as React from 'react';
export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Scroll speed in px/s (loop duration is derived from content width). */
    speed?: number;
    /** Pause the loop while hovered. */
    pauseOnHover?: boolean;
}
/**
 * Infinite horizontal loop (pure CSS keyframes — the content is rendered
 * twice and the track translates by -50%). The duplicate copy is
 * `aria-hidden` so assistive tech reads the content once. Reduced-motion
 * users get a static, non-animated row.
 */
export declare const Marquee: React.ForwardRefExoticComponent<MarqueeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Marquee.d.ts.map