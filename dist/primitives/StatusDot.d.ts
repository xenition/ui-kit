import * as React from 'react';
export type StatusDotTone = 'success' | 'warn' | 'danger' | 'primary' | 'accent';
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Semantic color slot for the dot (default `success` — "live"). */
    tone?: StatusDotTone;
    /** Emit the expanding echo pulse (default true; reduced motion disables it). */
    pulse?: boolean;
    /**
     * Accessible name (e.g. "Live"). When provided the dot is announced via
     * `role="img"`; when omitted it is purely decorative (`aria-hidden`).
     */
    label?: string;
}
/**
 * The pulsing "live" indicator distilled from the templates: a solid semantic
 * dot with an expanding, fading echo. CSS-only, token-only, and inert under
 * `prefers-reduced-motion`. Drop it inside chips, nav items, or the
 * `ProductMock` chrome bar.
 */
export declare const StatusDot: React.ForwardRefExoticComponent<StatusDotProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusDot.d.ts.map