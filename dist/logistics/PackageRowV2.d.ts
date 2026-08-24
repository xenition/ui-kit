import * as React from 'react';
import type { PackageRowProps } from './PackageRow';
/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV2Props = PackageRowProps;
/**
 * PackageRow, alternate design **V2** — an *elevated package card*. Where the
 * classic is a flat dense row, V2 is a shadowed card: a large rounded package
 * glyph tile on the left, the id + contents stacked beside it, and the
 * weight/dimensions promoted into labelled metric pills on their own row. The
 * status is a glyph + word pill in the header corner. Selection is a full
 * primary ring plus `aria-selected`, never color alone. Same props. No literal
 * colors.
 */
export declare const PackageRowV2: React.ForwardRefExoticComponent<PackageRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PackageRowV2.d.ts.map