import * as React from 'react';
import type { CoverageItemProps } from './CoverageItem';
/** Same public contract as {@link CoverageItem} — a drop-in alternate design. */
export type CoverageItemV2Props = CoverageItemProps;
/**
 * CoverageItem, redesigned (**V2**) — a **standalone elevated card**. An
 * included / excluded `Badge` (glyph + text + color, never color-alone) sits
 * top-right of the coverage label and detail; the limit lives in its own tinted
 * block below so the benefit ceiling is easy to scan. Excluded coverage dims and
 * strikes the label and shows "Not covered". Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export declare const CoverageItemV2: React.ForwardRefExoticComponent<CoverageItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CoverageItemV2.d.ts.map