import * as React from 'react';
import type { TreatmentCardProps } from './TreatmentCard';
/** Same public contract as {@link TreatmentCard} — a drop-in alternate design. */
export type TreatmentCardV2Props = TreatmentCardProps;
/**
 * TreatmentCard, redesigned (v2): a **media-hero treatment card**. A tinted band
 * (or image) with the category glyph tops the name, a category·duration line, a
 * description, and a price + Book row. Elevated, hover-lift. Distinct from v1. Same
 * props, token-only.
 */
export declare const TreatmentCardV2: React.ForwardRefExoticComponent<TreatmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TreatmentCardV2.d.ts.map