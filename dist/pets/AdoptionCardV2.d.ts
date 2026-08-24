import * as React from 'react';
import type { AdoptionCardProps } from './AdoptionCard';
/** Same public contract as {@link AdoptionCard} — a drop-in alternate design. */
export type AdoptionCardV2Props = AdoptionCardProps;
/**
 * AdoptionCard, redesigned (v2): a **full-bleed cover card**. The photo fills a
 * tall banner with a favorite ♥ floating top-right and the status chip top-left;
 * the name, breed·age·sex, shelter, fee, and Apply CTA sit on the surface below.
 * Elevated, hover-lift. Same props as {@link AdoptionCard}, token-only.
 */
export declare const AdoptionCardV2: React.ForwardRefExoticComponent<AdoptionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AdoptionCardV2.d.ts.map