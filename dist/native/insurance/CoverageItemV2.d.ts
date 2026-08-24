import * as React from 'react';
import type { CoverageItemProps } from './CoverageItem';
/** Drop-in replacement for {@link CoverageItem} — identical props, distinct design. */
export type CoverageItemV2Props = CoverageItemProps;
/**
 * CoverageItem, alternate design **V2** — a standalone card. An included /
 * excluded pill (glyph + text + color, never color-alone) sits top-right of the
 * coverage label and detail; the limit lives in its own tinted block below so
 * the benefit ceiling is easy to scan. Excluded coverage dims and strikes the
 * label and shows "Not covered". Same `CoverageItemProps` (integer cents via
 * `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export declare function CoverageItemV2({ label, included, limitCents, detail, currency, formatMoney: format, style, }: CoverageItemV2Props): React.ReactElement;
//# sourceMappingURL=CoverageItemV2.d.ts.map