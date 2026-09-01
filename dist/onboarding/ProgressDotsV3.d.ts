import * as React from 'react';
import type { ProgressDotsProps } from './ProgressDots';
/** Drop-in for {@link ProgressDots} — identical props, different design. */
export type ProgressDotsV3Props = ProgressDotsProps;
/**
 * Paged progress — V3, the compact line: **rings**. Every step is an outlined
 * circle; the ones already walked are filled and dimmed, the current one is
 * filled solid, the rest stay hollow.
 *
 * Where it earns its place: over artwork. The base's filled bars and V2's
 * track both need a quiet ground to read against, and an onboarding whose hero
 * runs to the top edge does not have one — hollow rings with a stroke survive a
 * busy photograph in a way a low-contrast bar does not.
 *
 * `variant` is accepted and ignored: this line has one treatment, and a
 * `'bars'` request here is an app asking for the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
export declare const ProgressDotsV3: React.ForwardRefExoticComponent<ProgressDotsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressDotsV3.d.ts.map