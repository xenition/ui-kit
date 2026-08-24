import * as React from 'react';
import type { AdoptionCardProps } from './AdoptionCard';
/** Same public contract as {@link AdoptionCard} — a drop-in alternate design. */
export type AdoptionCardV3Props = AdoptionCardProps;
/**
 * AdoptionCard, redesigned (v3): a **dense adoption row**. A small thumbnail, the
 * name over a breed·age·shelter line, the status badge, a compact favorite ♥, and
 * a small Apply button — hairline-bordered for a shelter list. The opposite of
 * v2's cover card. Same props, token-only.
 */
export declare const AdoptionCardV3: React.ForwardRefExoticComponent<AdoptionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AdoptionCardV3.d.ts.map