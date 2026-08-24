import * as React from 'react';
import type { CauseCardProps } from './CauseCard';
/** Same public contract as {@link CauseCard} — a drop-in alternate design. */
export type CauseCardV3Props = CauseCardProps;
/**
 * CauseCard, redesigned (v3): a **compact list row**. A small square thumbnail,
 * the title over a category·description line, and a thin progress meter beneath —
 * hairline-bordered for a dense causes list. The opposite of v2's cover hero.
 * Same props, token-only.
 */
export declare const CauseCardV3: React.ForwardRefExoticComponent<CauseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CauseCardV3.d.ts.map