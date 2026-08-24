import * as React from 'react';
import type { CoverageItemProps } from './CoverageItem';
/** Same public contract as {@link CoverageItem} — a drop-in alternate design. */
export type CoverageItemV3Props = CoverageItemProps;
/**
 * CoverageItem, redesigned (**V3**) — a **compact list line**. A bare leading
 * glyph (✓ included / ✕ excluded, colored by the success/muted slot but always
 * paired with the glyph and, for excluded, a struck label — never color-alone)
 * runs into the label and, on the right, the limit or an em-dash. No disc, no
 * card — the tightest possible benefits line. Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export declare const CoverageItemV3: React.ForwardRefExoticComponent<CoverageItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CoverageItemV3.d.ts.map