import * as React from 'react';
import { OrnamentShape, OrnamentTone } from './OrnamentRule';
export type SectionDividerVariant = 'hairline' | 'ornament' | 'fade';
export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * `hairline` — a 1px primary→accent gradient rule (the SaaS band divider).
     * `ornament` — delegates to `OrnamentRule` (the restaurant diamond rule).
     * `fade`     — a tall gradient that melts the section into the surface.
     */
    variant?: SectionDividerVariant;
    /**
     * Optional parallax speed (±0.5, see `Parallax`). The divider drifts
     * slightly against scroll; reduced motion disables it automatically.
     */
    parallax?: number;
    /** Ornament shape when `variant="ornament"` (default `diamond`). */
    ornament?: OrnamentShape;
    /** Token tone when `variant="ornament"` (default `accent`). */
    tone?: OrnamentTone;
}
/**
 * Section separators distilled from all three templates, optionally
 * parallax-capable: wrap any variant with a small counter-scroll drift by
 * passing `parallax`. Decorative (`role="separator"`), token-only, and
 * motion-free unless parallax is requested (which the motion layer already
 * guards for reduced motion and SSR).
 */
export declare const SectionDivider: React.ForwardRefExoticComponent<SectionDividerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SectionDivider.d.ts.map