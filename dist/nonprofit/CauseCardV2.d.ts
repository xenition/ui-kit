import * as React from 'react';
import type { CauseCardProps } from './CauseCard';
/** Same public contract as {@link CauseCard} — a drop-in alternate design. */
export type CauseCardV2Props = CauseCardProps;
/**
 * CauseCard, redesigned (v2): a **full-bleed cover hero**. The image fills the
 * card; the category badge floats top-left and the title/description sit on a
 * gradient scrim at the bottom, with a mini progress meter when funding data is
 * present. Elevated, hover-lift. Same props as {@link CauseCard}, token-only.
 */
export declare const CauseCardV2: React.ForwardRefExoticComponent<CauseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CauseCardV2.d.ts.map