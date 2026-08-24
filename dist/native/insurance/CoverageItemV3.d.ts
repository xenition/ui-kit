import * as React from 'react';
import type { CoverageItemProps } from './CoverageItem';
/** Drop-in replacement for {@link CoverageItem} — identical props, distinct design. */
export type CoverageItemV3Props = CoverageItemProps;
/**
 * CoverageItem, alternate design **V3** — a compact list line. A bare leading
 * glyph (✓ included / ✕ excluded, colored by the success/muted slot but always
 * paired with the glyph and, for excluded, a struck label — never color-alone)
 * runs into the label and, on the right, the limit or an em-dash. No disc, no
 * card; the tightest possible benefits line. Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export declare function CoverageItemV3({ label, included, limitCents, detail, currency, formatMoney: format, style, }: CoverageItemV3Props): React.ReactElement;
//# sourceMappingURL=CoverageItemV3.d.ts.map