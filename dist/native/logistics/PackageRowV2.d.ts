import * as React from 'react';
import type { PackageRowProps } from './PackageRow';
/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV2Props = PackageRowProps;
/**
 * PackageRow, alternate design **V2** — an *elevated package card*. Where the
 * classic is a flat dense row, V2 is a shadowed card: a large rounded package
 * glyph tile on the left, the id + contents stacked beside it, and the
 * weight/dimensions promoted into two labelled metric pills on their own row.
 * The status is a glyph + word badge in the header corner. Selection is a full
 * primary ring (plus a token scan-bar accent), never color alone. Springs on
 * press; fades in on mount. Same props. No literal colors.
 */
export declare function PackageRowV2({ packageId, contents, weight, weightUnit, dimensions, status, selected, onPress, testID, style, }: PackageRowV2Props): React.ReactElement;
//# sourceMappingURL=PackageRowV2.d.ts.map