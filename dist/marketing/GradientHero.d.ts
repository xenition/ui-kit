import * as React from 'react';
import { AuroraPattern, AuroraVariant } from './AuroraBackground';
export interface GradientHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Small kicker line above the title. */
    eyebrow?: React.ReactNode;
    /** Main headline (rendered in an `<h1>`). */
    title: React.ReactNode;
    /** Supporting copy under the title. */
    subtitle?: React.ReactNode;
    /** Call-to-action row (buttons/links). */
    actions?: React.ReactNode;
    /** Optional media (screenshot, illustration) below the copy. */
    media?: React.ReactNode;
    /** Aurora composition. */
    variant?: AuroraVariant;
    /** Grain overlay on the aurora. */
    grain?: boolean;
    /** Dot/grid pattern overlay on the aurora. */
    pattern?: AuroraPattern;
    /** Horizontal alignment of the copy block. */
    align?: 'left' | 'center';
}
/**
 * Full-bleed marketing hero over an animated aurora gradient. Everything is
 * token-driven: the aurora reads the primary/accent ramps, text reads the
 * semantic slots — dark mode is just the flipped variables.
 */
export declare const GradientHero: React.ForwardRefExoticComponent<GradientHeroProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GradientHero.d.ts.map