import * as React from 'react';
import { AuroraPattern, AuroraVariant } from './AuroraBackground';
export interface CTABannerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Banner headline. */
    title: React.ReactNode;
    /** Supporting copy under the title (children also render here). */
    subtitle?: React.ReactNode;
    /** Call-to-action slot. */
    action?: React.ReactNode;
    /** Aurora composition behind the band. */
    variant?: AuroraVariant;
    grain?: boolean;
    pattern?: AuroraPattern;
}
/**
 * Closing gradient band — the same aurora machinery as `GradientHero` in a
 * compact rounded section with a single call to action.
 */
export declare const CTABanner: React.ForwardRefExoticComponent<CTABannerProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=CTABanner.d.ts.map