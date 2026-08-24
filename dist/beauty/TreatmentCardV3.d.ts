import * as React from 'react';
import type { TreatmentCardProps } from './TreatmentCard';
/** Same public contract as {@link TreatmentCard} — a drop-in alternate design. */
export type TreatmentCardV3Props = TreatmentCardProps;
/**
 * TreatmentCard, redesigned (v3): a **dense treatment row**. A category glyph tile,
 * the name over a category·duration·description line, the price, and a compact Book
 * — hairline-bordered for a menu list. The opposite of v2's media hero. Same props,
 * token-only.
 */
export declare const TreatmentCardV3: React.ForwardRefExoticComponent<TreatmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TreatmentCardV3.d.ts.map