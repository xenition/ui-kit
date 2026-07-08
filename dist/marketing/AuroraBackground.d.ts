import * as React from 'react';
export type AuroraVariant = 'aurora' | 'mesh' | 'radial';
export type AuroraPattern = 'none' | 'dots' | 'grid';
export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Blob composition: drifting aurora, corner mesh, or a single radial glow. */
    variant?: AuroraVariant;
    /** Overlay an SVG noise/grain texture (inline feTurbulence data URI). */
    grain?: boolean;
    /** Overlay a subtle dot or grid pattern. */
    pattern?: AuroraPattern;
}
/**
 * Animated layered gradient background: blurred radial "aurora" blobs built
 * from the theme's primary/accent ramp steps (400–700), drifting on slow CSS
 * keyframe paths, with optional grain and dot/grid pattern overlays.
 *
 * Shared machinery behind `GradientHero` and `CTABanner`; use it directly to
 * build custom striking sections. Position it inside a `relative
 * overflow-hidden` parent — it renders `absolute inset-0` and is
 * `aria-hidden` (purely decorative). Dark mode needs nothing special: the
 * ramp variables are the theme, so the blobs read correctly over either
 * surface.
 */
export declare const AuroraBackground: React.ForwardRefExoticComponent<AuroraBackgroundProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuroraBackground.d.ts.map